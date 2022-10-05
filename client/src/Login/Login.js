import { Autocomplete, TextField, Button } from "@mui/material";
import { useState } from 'react';
import axios from 'axios';

function Login() {
    const [user, setUser] = useState({username: "", password: ""});

    const signIn = (event) => {
        event.preventDefault();

        axios.get(process.env.REACT_APP_SERVER_URL + "/users/get", {
            "username": user.username,
            "password": user.password
        })
        .then(res => console.log(res.data))
        .catch(e => console.log(e))
    }

    const signUp = (event) => {
        event.preventDefault();

        axios.post(process.env.REACT_APP_SERVER_URL + "/users/post", user)
        .then(res => console.log(res.data))
        .catch(e => console.log(e));
    }

    return (
        <> 
            <p>Your username is {user.username} and password is {user.password}</p>
            <Autocomplete
            freeSolo
            options={[]}
            renderInput={(params) => <TextField {...params} label="username" />}
            value={user.username || ""}
            onInput={(event) => setUser(previousState => {
                return {...previousState, username: event.target.value}
            })}
            />
            <Autocomplete
            freeSolo
            options={[]}
            renderInput={(params) => <TextField {...params} label="password" />}
            value={user.password || ""}
            onInput={(event) => setUser(previousState => {
                return {...previousState, password: event.target.value}
            })}            />
            <Button onClick={signIn}>Sign In</Button>
            <Button onClick={signUp}>Sign Up</Button>

        </>
    
    );
}

export default Login;