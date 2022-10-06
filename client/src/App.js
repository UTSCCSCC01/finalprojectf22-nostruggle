import React, { useState, useRef } from 'react';
import { Button, Container, Input } from '@mui/material';
import './App.css';
import Features from './components/features'
import { useNavigate } from "react-router-dom";
import Zane from './components/Zane';
function App() {

  const [buttonPopup, setButtonPopup] = useState(false);

  // temporary navigator for setup, will be replaced with actual toggles/navbars
  const [ page, setPage ] = useState("")

  

  return (
    <Container maxWidth="lg">
      

      <Button onClick={() => setPage("Catherine")}>Catherine</Button>
      <Button onClick={() => setPage("Ishika")}>Ishika</Button>
      <Button onClick={() => setPage("Madison")}>Madison</Button>
      <Button onClick={() => setPage("Tara")}>Tara</Button>
      <Button onClick={() => setPage("Christine")}>Christine</Button>
      <Button onClick={() => setButtonPopup(true)}>Zane</Button>
      <Zane trigger={buttonPopup} setTrigger={setButtonPopup}>
        <h3>Linear Algebra Calculators</h3>
      </Zane>
      <Features page={page}/>

    </Container>

  );
}

export default App;
