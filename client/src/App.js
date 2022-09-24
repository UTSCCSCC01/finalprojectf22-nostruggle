import React, { useState, useRef } from 'react';
import { Button, Container, Input } from '@material-ui/core';
import './App.css';
import axios from 'axios'

function App() {

  const [ users, setUsers ] = useState([])
  const [ error, setError ] = useState("")
  const inputRef = useRef()

  const goToUsers = async () =>{
    axios.get('http://localhost:5000/users/get').then( res => setUsers(res.data)).catch( err => setError(err.message))
  }
  const addUser = async () =>{
    setError("Post from client coming soon")
  }
  return (
    <Container maxWidth="lg">
      <h3>{ error != "" ? error : null}</h3>
      <Button onClick={goToUsers} color="primary">Click to get users (on /users/get )</Button>
      {users.map(user => 
        <h4>{user.username},{user.createdAt}</h4>
      )}
      <Container>
        <label>Add a user</label>
        <Input ref={inputRef}></Input>
        <Button onClick={addUser} color="primary">Click to add user ( on /users/post ) </Button>
      </Container>

    </Container>
  );
}

export default App;
