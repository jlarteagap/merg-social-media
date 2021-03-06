import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Icon, Label } from 'semantic-ui-react' 
import { useMutation, gql } from '@apollo/client'

const LikeButton = ({user, post: id, likeCount, likes }) => {
    const [liked, setLiked] = useState(false)
    useEffect(() => {
        if(user && likes.find(like => like.username === user.username)){
            setLiked(true)
        } else setLiked(false)
    }, [user, likes])

    const [likePost] = useMutation(LIKE_POST, {
        variables: {postId: id}
    })

    const likeButton = user ? (
        liked ? (
                <Button color="orange">
                    <Icon name="heart" />
                </Button>
            ) : (
                <Button color="orange">
                    <Icon name="heart" />
                </Button>
            )
        ) : (
            <Button as={Link} to="/login" color="orange">
                <Icon name="heart" />
            </Button>
        )

    return(
        <Button as="div" labelPosition="right" onClick={likePost}>
            {likeButton}
            <Label basic color= "orange" pointing="legt">
                {likeCount}
            </Label>
        </Button>        
    )
}

const LIKE_POST = gql`
    mutation likePost($postId: ID){
        likePost(postId: $postId){
            id
            likes{
                id username
            }
            likeCount
        }
    }
`

export default LikeButton