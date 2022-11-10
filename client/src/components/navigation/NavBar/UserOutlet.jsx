import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Provider as UserProvider, contextState } from '../../../features/SignUp/UserContext';
import NavBar from './NavBar';
import ApiCall from '../../api/ApiCall';
const UserOutlet = () => {

    const [ userState, setUserState ] = useState(contextState)
    const [ load, setLoad ] = useState(false)
    const navigate = useNavigate()
    const location = useLocation()

    const validateUserAndSignIn = async () => {
      console.log("validating user")
      const username = localStorage.getItem('nostruggle:username')
      const password = localStorage.getItem('nostruggle:password')
      let isSuccess = false
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
              isSuccess = true
            }
          })
      } 
      if (!isSuccess) {
        setUserState({
          ...userState, 
          user: {},
          signedIn: false
        })
        navigate('/login')
      }
      setLoad(true)
      
    }

    useEffect(() => {
      checkForNotifications()
      validateUserAndSignIn()
    }, [location.pathname])
    
    useEffect(() => {
      checkForNotifications()
      validateUserAndSignIn()
    }, [])

    const checkForNotifications = async () => {
      console.log("Checking for notifs")
      await ApiCall.get(`/notification/new?userId=${userState.user._id}`)
      .then(res => {
          if (res.status === 200){
            const hasNotif = res.data.hasNewNotifications
            console.log(userState)
            setUserState({...userState, hasNewNotifications: hasNotif})
          }
      })
    }  
    
    return (
        <UserProvider value={ { userState, setUserState } }>
            <>
            <NavBar /> 
            
            </>
            <div style={{ padding: '100px 100px' }}>
                { load && <Outlet/>}
            </div>
        </UserProvider>
    )
}

export default UserOutlet