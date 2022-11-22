import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Provider as UserProvider, contextState } from '../../../features/SignUp/UserContext';
import NavBar from './NavBar';
import ApiCall from '../../api/ApiCall';
const UserOutlet = () => {

    const [ userState, setUserState ] = useState(contextState)
    const [ hasNewNotifications, setHasNewNotifications ] = useState(false)
    const [ load, setLoad ] = useState(false)
    const navigate = useNavigate()
    const location = useLocation()

    const validateUserAndSignIn = async () => {
      console.log("validating user")
      const username = localStorage.getItem('nostruggle:username')
      const password = localStorage.getItem('nostruggle:password')
      if (username && password){
          console.log("signing in initial " + username + password)
          await ApiCall.get(`/users/get/${username}/${password}`)
          .then(res => {
            if (res.status === 200 && res.data.length > 0) {
              console.log(res.data)
              setUserState({
                ...userState, 
                user: res.data[0],
                signedIn: true
              })
              console.log("USER SUCCESS")
            } else {
              setUserState({
                ...userState, 
                user: {},
                signedIn: false
              })
              if (location.pathname !== '/logout') {
                console.log(location.pathname)
                navigate('/login')
              } else {
                console.log("LOGGED OUT")
              }
              console.log("USER FAIL")
            }
            setLoad(true)
          })
      } else {
        setUserState({
          ...userState, 
          user: {},
          signedIn: false
        })
        if (location.pathname !== '/logout') {
          console.log(location.pathname)
          navigate('/login')
        } else {
          console.log("LOGGED OUT")
        }
        setLoad(true)
        console.log("no user")
      }       
    }

    useEffect(() => {
      validateUserAndSignIn()
      if (userState.signedIn && !['/logout', '/login'].includes(location.pathname)) checkForNotifications()
    }, [location.pathname])
    
    useEffect(() => {
      validateUserAndSignIn()
    }, [])

    const checkForNotifications = async () => {
      console.log("Checking for notifs")
      await ApiCall.get(`/notification/new?userId=${userState.user._id}`)
      .then(res => {
          if (res.status === 200){
            console.log(res.data)
            const hasNotif = res.data.hasNewNotifications
            console.log("checked for notifications")
            setHasNewNotifications(hasNotif)
          }
      })
    }  
    
    return (
        <UserProvider value={ { userState, setUserState } }>
            <NavBar hasNewNotifications={hasNewNotifications} setHasNewNotifications={setHasNewNotifications} load={ load } /> 
        </UserProvider>
    )
}

export default UserOutlet