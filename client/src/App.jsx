import React, { useState, useRef, useEffect, createContext, useCallback } from 'react';
import { Button, Container, Input } from '@mui/material';
import './App.css';
import Features from './features'
import { useNavigate } from "react-router-dom";

import Timer from './features/Todo/StudyTimer/StudyTimer'
import NavBar from './components/navigation/NavBar/NavBar';

import { Provider as UserProvider, contextState } from './features/SignUp/UserContext';

function App() {
  
  // temporary navigator for setup, will be replaced with actual toggles/navbars
  const [ page, setPage ] = useState("Catherine")

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
      <UserProvider value={ { userState, setUserState } }>
        <>UserId: {userState.user._id} Username: {userState.user.username} Password: {userState.user.password}</>
        <NavBar active='Forum' />
        <Button onClick={() => navigate("Catherine")}>Login/Signup</Button>
        <Button onClick={() => navigate("Ishika")}>Forum</Button>
        <Button onClick={() => navigate("Madison")}>Create New Post</Button>
        <Button onClick={() => navigate("Tara")}>Derivative Calculator</Button>
        <Button onClick={() => navigate("Christine")}>To-do List</Button>
        <Button onClick={() => navigate("Zane")}>Linear Algebra Calculator</Button>
        <Features page={page}/>
        { userState.signedIn && <Timer/> }
      </UserProvider>
    </>
  );
}

export default App;
