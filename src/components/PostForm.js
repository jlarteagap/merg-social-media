import { gql, useMutation } from '@apollo/client/'
import { Button, Form } from 'semantic-ui-react'
import {useForm} from '../utils/hooks'

const PostForm = () => {
    const createPostCallBack = () => {
        createPost()
    }
    const { values, onChange, onSubmit} = useForm(createPostCallBack, {
        body: ''
    })

    const [createPost, {error}] = useMutation(CREATE_POST_MUTATION, {
        variables: values,
        update(_, result){
            console.log(result)
            values.body=''
        }
    })

    return(
        <Form onSubmit={onSubmit}>
            <h2>Create a post:</h2>
            <Form.Field>
                <Form.Input
                    placeholder = "Hola mundo"
                    name="body"
                    onChange={onChange}
                    value={values.body}
                />
                <Button type="submit" color="orange">
                    Submit
                </Button>
            </Form.Field>
        </Form>
    )
}

const CREATE_POST_MUTATION = gql`
mutation createPost($body: String!){
    createPost(body: $body){
        id body createdAt username
        likes{
            id
            username
            createdAt
        }
        likeCount
        comments{
            id body username createdAt
        }
        commentCount
    }
}
`

export default PostForm