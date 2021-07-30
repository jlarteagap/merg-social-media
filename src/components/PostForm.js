import { gql, useMutation } from '@apollo/client/'
import { Button, Form } from 'semantic-ui-react'
import {useForm} from '../utils/hooks'
import { POST_QUERY } from '../utils/graphql'
const PostForm = () => {
    const createPostCallBack = () => {
        createPost()
    }
    const { values, onChange, onSubmit} = useForm(createPostCallBack, {
        body: ''
    })

    const [createPost, {error}] = useMutation(CREATE_POST_MUTATION, {
        variables: values,
        update(proxy, result){
            const data = proxy.readQuery({
                query: POST_QUERY
            })
            data.getPosts = [result.data.createPost, ...data.getPosts]
            proxy.writeQuery({ query: POST_QUERY, data})
            values.body=''
        }
    })

    return(
        <>
        <Form onSubmit={onSubmit}>
            <h2>Create a post:</h2>
            <Form.Field>
                <Form.Input
                    placeholder = "Hola mundo"
                    name="body"
                    onChange={onChange}
                    value={values.body}
                    error={error ? true : false}
                />
                <Button type="submit" color="orange">
                    Submit
                </Button>
            </Form.Field>
        </Form>
        {error && (
            <div className="ui error message">
                <ul className="list">
                <li>{error.graphQLErrors[0].message}</li>
            </ul>
            </div>
        )}
        </>
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