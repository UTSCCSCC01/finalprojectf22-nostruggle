import React, { useState, useRef } from 'react';
import { Button, Container, Input } from '@mui/material';
import './App.css';
import Features from './components/features'
import { useNavigate } from "react-router-dom";
import Zane from './components/Linear_Algebra_Calculators.js';

import Timer from './components/features/Timer'
import NavBar from './components/NavBar';
function App() {

  const [buttonPopup, setButtonPopup] = useState(false);

  // temporary navigator for setup, will be replaced with actual toggles/navbars
  const [ page, setPage ] = useState("")

  

  return (
    <>
      <NavBar active='Home' />
    </>
    /*
    <Container maxWidth="lg">
      
      <Button onClick={() => setPage("Catherine")}>Login/Signup</Button>
      <Button onClick={() => setPage("Ishika")}>Forum</Button>
      <Button onClick={() => setPage("Madison")}>Create New Post</Button>
      <Button onClick={() => setPage("Tara")}>Derivative Calculator</Button>
      <Button onClick={() => setPage("Christine")}>To-do List</Button>
      <Button onClick={() => setButtonPopup(true)}>Linear Algebra Calculator</Button>
      <Zane trigger={buttonPopup} setTrigger={setButtonPopup}>
        <h3>Linear Algebra Calculators</h3>
      </Zane>
      <Features page={page}/>
      <Timer/>
    </Container>
    */
  );
}

export default App;
