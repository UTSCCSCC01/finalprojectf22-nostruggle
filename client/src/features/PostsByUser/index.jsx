import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import ForumCard from '../../components/forumCard/ForumCard'
import ApiCall from '../../components/api/ApiCall'
import { Pagination } from '@mui/material'
const PostsByUser = () => {

    const postsPerPage = 10
    const params = useParams()
    const [ posts, setPosts ] = useState([])
    const [ page, setPage ] = useState(1)
    const getPosts = async () => {
        await ApiCall.get(`/forumPosts/get?created_by=${params.userId}`)
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
            <Pagination page={page} count={Math.ceil(posts.length / postsPerPage)} siblingCount={2} onChange={(e, n) => setPage(n)}/>
            {
                posts.slice(postsPerPage * (page-1), postsPerPage * (page)).map(item => (
                    <ForumCard title={item.title} content={item.content} tag={item.tags}
                    date={item.created_At} nLikes={item.nLikes} postId={item._id} likedBy={item.likedBy} created_by={item.created_by} />
                ))
            }
        </div>
    )
}

export default PostsByUser