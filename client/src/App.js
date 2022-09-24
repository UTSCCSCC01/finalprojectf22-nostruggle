import React, { useState } from 'react';
import { Button, Container } from '@material-ui/core';
import './App.css';
import axios from 'axios'

function App() {

  const [ users, setUsers ] = useState([])
  const [ error, setError ] = useState("")

  const goToUsers = async () =>{
    axios.get('http://localhost:5000/users/get').then( res => setUsers(res.data)).catch( err => setError(err.message))
  }

  return (
    <Container maxWidth="lg">
      { error != "" ? error : null}
      <Button  onClick={goToUsers} color="primary">Click to get users</Button>
      {users.map(user => 
        <h4>{user.username},{user.createdAt}</h4>
      )}
    </Container>
  );
}

export default App;
