import { createContext, useContext } from 'react'

export const contextState = {
    postId: {postId: "123"},
    answerId: {}
}

const PostContext = createContext(contextState)

export default PostContext
export const { Provider, Consumer } = PostContext
export const usePostState = () => useContext(PostContext)