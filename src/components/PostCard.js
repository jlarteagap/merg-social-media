import { Card, Image, Button } from "semantic-ui-react";
import moment from 'moment'
import { Link } from "react-router-dom";
const PostCard =({post: {body, username, createdAt, id, likeCount, commentCount, likes}}) =>{

    const likePost =()=>{
        console.log('Like post')
    }
    const commentPost =()=>{
        console.log('Comment to post')
    }
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
                    <Button
                    onClick={likePost}
                    color='orange'
                    content='Like'
                    icon='heart'
                    label={{ 
                        basic: true, 
                        color: 'orange', 
                        pointing: 'left', 
                        content: likeCount }}
                    />
                    <Button
                    onClick={commentPost}
                    color='red'
                    content='Comments'
                    icon='comment'
                    label={{ 
                        basic: true, 
                        color: 'orange', 
                        pointing: 'left', 
                        content: commentCount }}
                    />
                    
                </div>
            </Card.Content>
        </Card>
    )
}

export default PostCard