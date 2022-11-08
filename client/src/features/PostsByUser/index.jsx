import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import ForumCard from '../../components/forumCard/ForumCard'
import ApiCall from '../../components/api/ApiCall'

const PostsByUser = () => {

    const params = useParams()
    const [ posts, setPosts ] = useState([])
    const getPosts = async () => {
        await ApiCall.get(`/forumPosts/get?title=${params.userId}`)
        .then( res => {
            if (res.status === 201) {
                console.log(res.data)
                setPosts(res.data)
            }
        })

    }
    useEffect(() => {
        getPosts()
    }, [])

    return (
        <div>
            <h1>Posts by {params.userId}</h1>
            {
                posts.map(item => (
                    <ForumCard editor={true} title={item.title} content={item.content} tag={item.tags}
                    date={item.created_At} nLikes={item.nLikes} postId={item._id} created_by={item.created_by} />
                ))
            }
        </div>
    )
}

export default PostsByUser