import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import { Provider as UserProvider, contextState } from '../../../features/SignUp/UserContext';
const UserOutlet = () => {

    const [ userState, setUserState ] = useState(contextState)

    return (
        <UserProvider value={ { userState, setUserState } }>
            <>UserId: {userState.user._id} Username: {userState.user.username} Password: {userState.user.password}</>

            <Outlet/>
        </UserProvider>
    )
}

export default UserOutlet