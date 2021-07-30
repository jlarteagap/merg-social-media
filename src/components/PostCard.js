import { Card, Image, Button, Icon } from "semantic-ui-react";
import moment from 'moment'
import { Link } from "react-router-dom";
import { AuthContext } from '../context/auth'
import { useContext } from "react";
import LikeButton from "./LikeButton";


const PostCard =({post: {body, username, createdAt, id, likeCount, commentCount, likes}}) =>{

    const { user } = useContext(AuthContext)

    return(
        <Card fluid>
            <Card.Content>
                <Image
                    floated='right'
                    size='mini'
                    src='https://react.semantic-ui.com/images/avatar/large/steve.jpg'
                    />
                <Card.Header>{username}</Card.Header>
                <Card.Meta as={Link} to={`posts/${id}`}>{moment(createdAt).fromNow(true)}</Card.Meta>
                <Card.Description> {body} </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <div>
                    <LikeButton post={{ id, likes, likeCount}}/>
                    <Button
                    as={Link}
                    to={`/post/${id}`}
                    
                    color='red'
                    content='Comments'
                    icon='comment'
                    label={{ 
                        basic: true, 
                        color: 'orange', 
                        pointing: 'left', 
                        content: commentCount }}
                    />

                    {user && user.username === username && (
                        <Button as="div" floated="right" color= "red" onClick={() => console.log('Delete Post')}>
                            <Icon name="trash" />
                        </Button>
                    )}
                    
                </div>
            </Card.Content>
        </Card>
    )
}

export default PostCard