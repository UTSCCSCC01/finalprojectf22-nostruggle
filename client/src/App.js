import React, { useState, useRef } from 'react';
import { Button, Container, Input } from '@mui/material';
import './App.css';
import Features from './components/features'
<<<<<<< HEAD
import { useNavigate } from "react-router-dom";
import Zane from './components/Zane';
=======
import Timer from './components/features/Timer'
>>>>>>> 6cccaadb3d07b8fc13175fbc4edd59de44e8866f
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
      <Timer/>
    </Container>

  );
}

export default App;
