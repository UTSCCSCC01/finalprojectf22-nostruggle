import { Autocomplete, TextField, Button } from "@mui/material";
import { useState } from 'react';
import axios from 'axios';

function Login() {
    const [user, setUser] = useState({username: "", password: ""});
    const [errMsg, setErrMsg] = useState("");

    const signIn = async (event) => {
        event.preventDefault();

        await axios.get(process.env.REACT_APP_SERVER_URL + "/users/get", { data: {
            "username": user.username,
            "password": user.password
        }})
        .then(res => console.log(res.data))
        .catch(e => console.log(e))
    }

    const signUp = async (event) => {
        event.preventDefault();

        await axios.post(process.env.REACT_APP_SERVER_URL + "/users/post", user)
        .then(res => console.log(res.data))
        .catch(e => {
            console.log(e);
            setErrMsg(e.response.data.message)
        });
    }

    return (
        <> 
            <p>Your username is {user.username} and password is {user.password}</p>
            <Autocomplete
            freeSolo
            options={[]}
            renderInput={(params) => <TextField
                {...params} 
                label="username" 
                id="usernameField"
                error={errMsg !== ""}
                 />}
            value={user.username || ""}
            onInput={(event) => setUser(previousState => {
                return {...previousState, username: event.target.value}
            })}
            />
            <Autocomplete
            freeSolo
            options={[]}
            renderInput={(params) => <TextField 
                {...params} 
                label="password" 
                id="passwordField"
                error={errMsg !== ""}
                helperText={errMsg}
                />}
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