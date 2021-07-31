import {Button, Icon, Confirm} from 'semantic-ui-react'
import { useMutation, gql } from '@apollo/client'
import { useState } from 'react'
import { POST_QUERY } from '../utils/graphql'

const DeleteButton = ({postId, commentId, callback}) => {
    const [confirmOpen, setConfirmOpen] = useState(false)

    const mutation = commentId ? DELETE_COMMENT: DELETE_POST

    const [deletePostOrComment] = useMutation(mutation,{
        update(proxy){
            if(!commentId){
                setConfirmOpen(false)
                const data = proxy.readQuery({
                    query: POST_QUERY
                })

                data.getPosts = data.getPosts.filter(p => p.id !== postId)
                proxy.writeQuery({ query: POST_QUERY, data})
            }
            if(callback) callback()
        },
        variables: {
            postId,
            commentId
        }
    })
    return(
        <>
        <Button as="div" floated="right" color= "red" onClick={() => setConfirmOpen(true)}>
            <Icon name="trash" />
        </Button>
        <Confirm 
            open = {confirmOpen} 
            onCancel={() => setConfirmOpen(false)}
            onConfirm={deletePostOrComment} />
        </>
    )
}

const DELETE_POST = gql`
    mutation deletePost($postId: ID!){
        deletePost(postId: $postId)
    }
`

const DELETE_COMMENT = gql`
    mutation deleteComment($postId: ID!, $commentId: ID!){
        deleteComment(postId: $postId, commentId: $commentId){
            id
            comments{
                id username createdAt body
            }
        }
    }
`
export default DeleteButton