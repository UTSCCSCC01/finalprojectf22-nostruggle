import { createContext, useContext } from 'react'

export const contextState = {
    user: {},
    signedIn: false,
    postId: "",
    shift: true
}

const UserContext = createContext(contextState)

export default UserContext
export const { Provider, Consumer } = UserContext
export const useUserState = () => useContext(UserContext)