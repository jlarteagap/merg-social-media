import { useContext } from 'react'
import { useQuery} from '@apollo/client'
import { Grid, Transition } from 'semantic-ui-react'
import {POST_QUERY } from '../utils/graphql'
import PostCard from '../components/PostCard'
import PostForm from '../components/PostForm'

import { AuthContext } from '../context/auth'


const Home = () => {
    const { user } = useContext(AuthContext)
    const { loading, data} = useQuery(POST_QUERY)
    const {getPosts: posts} = data
    return(
        <div>
           <Grid columns={3} divided>
            <Grid.Row>
                <h1>Recent Post</h1>
            </Grid.Row>
            <Grid.Row>
                {user && (
                    <Grid.Column>
                        <PostForm />
                    </Grid.Column>
                )}
            </Grid.Row>
            <Grid.Row>
                {loading ? (
                    <h1>Loading all post...</h1>
                ): (
                    <Transition.Group>
                        {posts && posts.map(post => (
                        <Grid.Column key={post.id} style={{marginBottom: 20}}>
                            <PostCard post={post} /> 
                        </Grid.Column>
                        ))}
                    </Transition.Group>
                )}
            </Grid.Row>
        </Grid>
        </div>
    )
}

export default Home