import React, { useState, useRef } from 'react';
import { Button, Container, Input } from '@mui/material';
import './App.css';
import Features from './features'
import { useNavigate } from "react-router-dom";

import Timer from './features/Todo/StudyTimer/StudyTimer'
import NavBar from './components/navigation/NavBar/NavBar';

function App() {
  
  // temporary navigator for setup, will be replaced with actual toggles/navbars
  const [ page, setPage ] = useState("")

  return (
    <>
      <NavBar active='Forum' />
      <Button onClick={() => setPage("Catherine")}>Login/Signup</Button>
      <Button onClick={() => setPage("Ishika")}>Forum</Button>
      <Button onClick={() => setPage("Madison")}>Create New Post</Button>
      <Button onClick={() => setPage("Tara")}>Derivative Calculator</Button>
      <Button onClick={() => setPage("Christine")}>To-do List</Button>
      <Button onClick={() => setPage("Zane")}>Linear Algebra Calculator</Button>
      <Features page={page}/>
      <Timer/>
    </>
  );
}

export default App;
