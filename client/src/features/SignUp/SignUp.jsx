import { Autocomplete, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ApiCall from '../../components/api/ApiCall.js';

import UsernameField from '../../components/forms/UsernameField';
import PasswordField from '../../components/forms/PasswordField';

import { useUserState } from './UserContext';

const SignUp = () => {
    const navigate = useNavigate()
    const [user, setUser] = useState({ username: '', password: '' });
    const [errMsg, setErrMsg] = useState('');

    const { userState, setUserState } = useUserState()

    const signIn = async (event) => {
        if (!user.username || !user.password) return 
        clearErrMsg();
        if (event) event.preventDefault();
        console.log('trying: ' + process.env.REACT_APP_SERVER_URL + '/users/get/' + user.username + '/' + user.password)

        await ApiCall.get(`/users/get/${user.username}/${user.password}`)
        .then(res => {
            if (res.data.length > 0 ){
                saveUser(res.data[0])
                navigate('/home')
             } else {
                console.log("fail login user DNE")
             } 
        })
        .catch(e => console.log("fail" + e.message))
        setUser({})
    }

    const signUp = async (event) => {
        clearErrMsg();
        event.preventDefault();

        await ApiCall.post('/users/post', user)
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

    const saveUser = (userInfo) => {
        localStorage.setItem('nostruggle:username', userInfo.username)
        localStorage.setItem('nostruggle:password', userInfo.password)
        setUserState({
            ...userState,
            user: userInfo,
            signedIn: true
        })
    }

    useEffect(() => {
        console.log(userState.user)
        if (userState.user.username && userState.user.password){
            console.log("Saved session")
            const storedUser = {
                username: userState.user.username,
                password: userState.user.password                
            }
            setUser(storedUser)
        }
    }, [userState])

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