import { useQuery, gql, useMutation } from "@apollo/client"
import moment from "moment"
import { useContext, useRef, useState } from "react"
import { Button, Card, Grid, Icon, Label, Image, Form } from "semantic-ui-react"
import DeleteButton from "../components/DeleteButton"
import LikeButton from "../components/LikeButton"
import { AuthContext } from '../context/auth'

const SinglePost = (props) => {
    const {user } = useContext(AuthContext)
    const postId = props.match.params.postId

    const commentInputRef = useRef(null)
    const [comment, setComment] = useState('')

    const {data: {getPost}} = useQuery(FETCH_POST, {
        variables: {
            postId
        }
    })

    const [submitComment] = useMutation(SUBMIT_COMMENT, {
        update(){
            setComment('')
            commentInputRef.current.blur()
        },
        variables:{
            postId,
            body: comment
        }
    })
    const deletePostCallback = () => {
        props.histoy.push('/')
    }
    let postMarkup
    if(!getPost){
        postMarkup = <p>Loading post...</p>
    } else {
        const {id, body, createdAt, username, comments, likes, likeCount, commentCount} = getPost

        postMarkup = (
            <Grid>
                <Grid.row>
                    <Grid.Column width= {2}>
                        <Image
                            floated='right'
                            size='mini'
                            src='https://react.semantic-ui.com/images/avatar/large/steve.jpg'
                        />
                    </Grid.Column>
                    <Grid.Column width= {10}>
                        <Card fluid>
                            <Card.Content>
                                <Card.Header>{username}</Card.Header>
                                <Card.Meta>{moment(createdAt).fromNow}</Card.Meta>
                                <Card.Description>{body}</Card.Description>
                            </Card.Content>
                            <hr />
                            <Card.Content extra>
                                <LikeButton user={user} post={{ id, likeCount, likes}} />
                                <Button as="div" labelPosition="right" onClick={() => console.log('Comment on post')}>
                                    <Button basic color="orange">
                                        <Icon name="comments" />
                                    </Button>
                                    <Label basic color="blue" pointing="left">
                                       {commentCount} 
                                    </Label>
                                </Button>
                                {user  && user.username === username &&(
                                    <DeleteButton postId={id} callback={deletePostCallback}/>
                                )}
                            </Card.Content>
                        </Card>
                        {user && (
                            <Card fluid>
                                <Card.Content>
                                    <p>Post and Coment</p>
                                    <Form>
                                        <div className="ui action input fluid">
                                            <input
                                                type="text"
                                                placeholder="Comment..."
                                                name="comment"
                                                value={comment}
                                                onChange={e => setComment(e.target.value)}
                                                ref={commentInputRef}
                                            />
                                            <button 
                                            type="submit" 
                                            className="ui button orange" 
                                            disabled={comment.trim() === ''} 
                                            onClick={submitComment}>
                                                Submit a comment
                                            </button>
                                        </div>
                                    </Form>
                                </Card.Content>
                            </Card>
                        )}
                        {comments.map(comment => (
                            <Card fluid key={comment.id}>
                                <Card.Content>
                                    {user && user.username === comment.username && (
                                        <DeleteButton postId={id} commentId={comment.id} />
                                    )}
                                    <Card.Header>{comment.username}</Card.Header>
                                    <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
                                    <Card.Description>{comment.body}</Card.Description>
                                </Card.Content>
                            </Card>
                        ))}
                    </Grid.Column>
                </Grid.row>
            </Grid>
        )
    }

    return(
        <postMarkup />
    )
}

const SUBMIT_COMMENT = gql`
  mutation($postId: String!, $body: String!) {
    createComment(postId: $postId, body: $body) {
      id
      comments {
        id
        body
        createdAt
        username
      }
      commentCount
    }
  }
`;

const FETCH_POST = gql`
  query($postId: ID!) {
    getPost(postId: $postId) {
      id
      body
      createdAt
      username
      likeCount
      likes {
        username
      }
      commentCount
      comments {
        id
        username
        createdAt
        body
      }
    }
  }
`;
export default SinglePost