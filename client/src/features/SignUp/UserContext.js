import { createContext } from 'react'

export const contextState = {
    user: {},
    signedIn: false
}

const UserContext = createContext(contextState)

export default UserContext
export const { Provider, Consumer } = UserContext
