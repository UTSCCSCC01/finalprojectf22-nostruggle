import { Autocomplete, Button } from '@mui/material';
import { useState, useEffect, useContext } from 'react';
import ApiCall from '../../components/api/ApiCall.js';

import UsernameField from '../../components/forms/UsernameField';
import PasswordField from '../../components/forms/PasswordField';

import UserContext from './UserContext.js';

const SignUp = () => {
    const [user, setUser] = useState({ username: '', password: '' });
    const [errMsg, setErrMsg] = useState('');

    const { globalState, setGlobalState } = useContext(UserContext)

    const signIn = async (event) => {
        if (!user.username || !user.password) return 
        clearErrMsg();
        if (event) event.preventDefault();
        console.log('trying: ' + process.env.REACT_APP_SERVER_URL + '/users/get/' + user.username + '/' + user.password)

        await ApiCall.get(`/users/get/${user.username}/${user.password}`)
        .then(res => res.data.length > 0 ? saveUser(res.data[0]) : console.log("fail login user DNE"))
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
        setGlobalState({
            ...globalState,
            user: userInfo,
            signedIn: true
        })
    }

    useEffect(() => {
        console.log(globalState.user)
        if (globalState.user.username && globalState.user.password){
            console.log("Saved session")
            const storedUser = {
                username: globalState.user.username,
                password: globalState.user.password                
            }
            setUser(storedUser)
        }
    }, [globalState])

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