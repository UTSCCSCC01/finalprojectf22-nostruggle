import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import Features from '../features'

import NavBar from '../components/navigation/NavBar/NavBar';

import { Provider as UserProvider, useUserState } from '../features/SignUp/UserContext';

function StartPage() {
  
  // temporary navigator for setup, will be replaced with actual toggles/navbars
  const [ page, setPage ] = useState("Catherine")

  const { userState, setUserState } = useUserState()
  
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
  }, [ page, userState ] )

  const navigate = (pageId) => {
    if (!userState.signedIn){
      setPage("Catherine")
      alert("Not logged in")
    } else {
      setPage(pageId)
    }
  }

  return (
    <>
        { userState.signedIn && <NavBar active='Forum' /> }
        <Button onClick={() => navigate("Catherine")}>Login/Signup</Button>
        { userState.signedIn && 
          <>
            <Button onClick={() => navigate("Ishika")}>Forum</Button>
            <Button onClick={() => navigate("Madison")}>Create New Post</Button>
            <Button onClick={() => navigate("Tara")}>Derivative Calculator</Button>
            <Button onClick={() => navigate("Christine")}>To-do List</Button>
            <Button onClick={() => navigate("Zane")}>Linear Algebra Calculator</Button>
          </>
        }
        <Features page={page}/>
    </>
  );
}

export default StartPage;
