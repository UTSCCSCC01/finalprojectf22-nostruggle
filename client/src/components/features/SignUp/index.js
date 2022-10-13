import { Autocomplete, Button } from '@mui/material';
import { useState } from 'react';
import axios from 'axios';

import UsernameField from './UsernameField';
import PasswordField from './PasswordField';

const SignUp = () => {
    const [user, setUser] = useState({ username: '', password: '' });
    const [errMsg, setErrMsg] = useState('');

    const signIn = async (event) => {
        clearErrMsg();
        event.preventDefault();
        console.log('trying: ' + process.env.REACT_APP_SERVER_URL + '/users/get/' + user.username + '/' + user.password)

        await axios.get(process.env.REACT_APP_SERVER_URL + '/users/get/' + user.username + '/' + user.password )
        .then(res => console.log(res.data))
        .catch(e => console.log(e))
    }

    const signUp = async (event) => {
        clearErrMsg();
        event.preventDefault();

        await axios.post(process.env.REACT_APP_SERVER_URL + '/users/post', user)
        .then(res => console.log(res.data))
        .catch(e => {
            console.log(e);
            setErrMsg(e.response.data.message)
        });
    }

    const enterUsername = (event) => {
        clearErrMsg();
        setUser(previousState => { return { ...previousState, username: event.target.value }});
    }

    const enterPassword = (event) => {
        clearErrMsg();
        setUser(previousState => { return { ...previousState, password: event.target.value }});
    }

    const clearErrMsg = () => {
        if (errMsg !== '') {
            setErrMsg('');
        }
    }

    return (
        <>
            <p>Your username is { user.username } and password is { user.password }</p>

            <Autocomplete
            freeSolo
            options={[]}
            renderInput={ (params) => <UsernameField innerRef={ params } errMsg={ errMsg } /> }
            value={ user.username || '' }
            onInput={ enterUsername }
            />
            
            <Autocomplete
            freeSolo
            options={[]}
            renderInput={ (params) => <PasswordField innerRef={ params } errMsg={ errMsg } /> }
            value={ user.password || '' }
            onInput={ enterPassword }
            />
            
            <Button onClick={ signIn }>Sign In</Button>
            <Button onClick={ signUp }>Sign Up</Button>
        </>
    )
}

export default SignUp