import {Button, Icon, Confirm} from 'semantic-ui-react'
import { useMutation, gql } from '@apollo/client'
import { useState } from 'react'
import { POST_QUERY } from '../utils/graphql'

const DeleteButton = ({postId, callback}) => {
    const [confirmOpen, setConfirmOpen] = useState(false)
    const [deletePost] = useMutation(DELETE_POST,{
        update(proxy){
            setConfirmOpen(false)
            const data = proxy.readQuery({
                query: POST_QUERY
            })

            data.getPosts = data.getPosts.filter(p => p.id !== postId)
            proxy.writeQuery({ query: POST_QUERY, data})
            if(callback) callback()
        },
        variables: {
            postId
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
            onConfirm={deletePost} />
        </>
    )
}

const DELETE_POST = gql`
    mutation deletePost($postId: ID!){
        deletePost(postId: $postId)
    }
`
export default DeleteButton