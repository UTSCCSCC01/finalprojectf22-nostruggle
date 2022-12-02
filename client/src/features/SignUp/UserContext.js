import { createContext, useContext } from 'react'

export const contextState = {
    user: {},
    signedIn: false,
    postId: "",
    signedOut: false,
    shift: true,
    derive: false,
    matrix: false,
    integrate: false,
    factor: false,
    standard: false,
    timer: false,
    time: 0
}

const UserContext = createContext(contextState)

export default UserContext
export const { Provider, Consumer } = UserContext
export const useUserState = () => useContext(UserContext)