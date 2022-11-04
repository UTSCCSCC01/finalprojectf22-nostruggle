import { createContext, useContext } from 'react';

const contextState = {
    postId: -1,
    answerId: -1
}

const PostContext = createContext(contextState);

export default PostContext;
export const { Provider, Consumer } = PostContext;
export const usePostState = () => useContext(PostContext);