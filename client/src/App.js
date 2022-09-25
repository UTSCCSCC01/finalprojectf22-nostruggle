import React, { useState, useRef } from 'react';
import { Button, Container, Input } from '@material-ui/core';
import './App.css';
import Features from './components/features'
function App() {

  // temporary navigator for setup, will be replaced with actual toggles/navbars
  const [ page, setPage ] = useState("")

  return (
    <Container maxWidth="lg">
      

      <Button onClick={() => setPage("Catherine")}>Catherine</Button>
      <Button onClick={() => setPage("Ishika")}>Ishika</Button>
      <Button onClick={() => setPage("Madison")}>Madison</Button>
      <Button onClick={() => setPage("Tara")}>Tara</Button>
      <Button onClick={() => setPage("Christine")}>Christine</Button>
      <Button onClick={() => setPage("Zane")}>Zane</Button>

      <Features page={page}/>

    </Container>
  );
}

export default App;
