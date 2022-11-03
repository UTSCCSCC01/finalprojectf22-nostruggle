import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import Features from '../features'

import SignUp from '../features/SignUp/SignUp';
import { Provider as UserProvider, useUserState } from '../features/SignUp/UserContext';

function StartPage() {
  
  // temporary navigator for setup, will be replaced with actual toggles/navbars
  const [ page, setPage ] = useState("Madison")

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
      setPage(pageId)
  }

  return (
    <>
      { userState.signedIn ?
          <>
            <Button onClick={() => navigate("Ishika")}>Forum</Button>
            <Button onClick={() => navigate("Madison")}>Create New Post</Button>
            <Button onClick={() => navigate("Tara")}>Derivative Calculator</Button>
            <Button onClick={() => navigate("Christine")}>To-do List</Button>
            <Button onClick={() => navigate("Zane")}>Linear Algebra Calculator</Button>
            <Button onClick={() => navigate("TimeSummary")}>Study Timer Summary</Button>
            <Features page={page}/>
          </>
          : <SignUp/>
        }
    </>
  );
}

export default StartPage;
