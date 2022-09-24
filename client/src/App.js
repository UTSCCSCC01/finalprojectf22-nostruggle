import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Container } from '@material-ui/core';
import './App.css';

function App() {
  return (
    <Container maxWidth="lg">
      <Button component={Link} to="/users" color="primary">Click to go to users</Button>
    </Container>
  );
}

export default App;
