import { Outlet, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Provider as UserProvider, contextState } from '../../../features/SignUp/UserContext';
import NavBar from './NavBar';
import ApiCall from '../../api/ApiCall';
const UserOutlet = () => {

    const [ userState, setUserState ] = useState(contextState)
    const [ hasNotifications, setHasNotifications ] = useState(false)
    const location = useLocation()
    const checkForNotifications = async () => {
      console.log("Checking for notifs")
      await ApiCall.get(`/notification/new?userId=${userState.user._id}`)
      .then(res => {
          if (res.status === 200){
              const hasNotif = res.data.hasNewNotifications
              console.log(userState)
              setHasNotifications(hasNotif)
          }
      })
  }
    useEffect(() => {
        if (!userState.signedIn && !userState.signedOut) {    
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
        if (userState.signedIn) checkForNotifications()
      }, [location])
    
      
      useEffect(() => {
        setUserState({...userState, hasNewNotifications: hasNotifications})
      }, [hasNotifications])

      useEffect(() => {
        console.log(userState.user)
        if (!userState.user.username && !userState.user.password && userState.signedIn ){
          console.log("Not logged in")
          setUserState({...userState, signedIn: false})
        } 
      }, [ userState.user ] )

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