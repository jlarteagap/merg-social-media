import { useQuery, gql } from "@apollo/client"
import moment from "moment"
import { useContext } from "react"
import { Button, Card, Grid, Icon, Label } from "semantic-ui-react"
import DeleteButton from "../components/DeleteButton"
import LikeButton from "../components/LikeButton"
import { AuthContext } from '../context/auth'

const SinglePost = (props) => {
    const {user } = useContext(AuthContext)
    const postId = props.match.params.postId

    const {data: {getPost}} = useQuery(FETCH_POST, {
        variables: {
            postId
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
                    </Grid.Column>
                </Grid.row>
            </Grid>
        )
    }

    return(
        <postMarkup />
    )
}

const FETCH_POST = gql`
    query($postId: ID){
        getPost(postId: $postId{
            id body createdAt username likeCount
            likes{
                username
            }
            commentCount
            comments{
                id
                username
                createdAt
                body
            }
        }
    }
`
export default SinglePost