import { Outlet, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Provider as UserProvider, contextState } from '../../../features/SignUp/UserContext';
import NavBar from './NavBar';
const UserOutlet = () => {

    const [ userState, setUserState ] = useState(contextState)

    useEffect(() => {
        if (!userState.signedIn) {    
            const username = localStorage.getItem('nostruggle:username')
            const password = localStorage.getItem('nostruggle:password')
            if (username && password){
                console.log("signing in " + username + password)
                setUserState({
                  ...userState, 
                  user: {
                    username: username,
                    password: password
                  }
                })
            }  
          }
      }, [])
    
      useEffect(() => {
        console.log(userState.user)
        if (!userState.user.username && !userState.user.password && userState.signedIn ){
          console.log("Not logged in")
          setUserState({...userState, signedIn: false})
        } 
      }, [ userState ] )
    return (
        <UserProvider value={ { userState, setUserState } }>
            <>
            UserId:  {userState.user._id} Username: {userState.user.username} Password: {userState.user.password}
            <NavBar /> 
            
            </>
            <div style={{ padding: '100px 100px' }}>
                <Outlet/>
            </div>
        </UserProvider>
    )
}

export default UserOutlet