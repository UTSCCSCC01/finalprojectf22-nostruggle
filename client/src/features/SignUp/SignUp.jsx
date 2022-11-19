import { Autocomplete, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ApiCall from '../../components/api/ApiCall.js';

import UsernameField from '../../components/fields/UsernameField';
import PasswordField from '../../components/fields/PasswordField';

import { useUserState } from './UserContext';
import { ReactComponent as HomeIcon } from '../../assets/icons/home.svg'

const SignUp = () => {
    const navigate = useNavigate()
    const [user, setUser] = useState({ username: '', password: '' });
    const [errMsg, setErrMsg] = useState('');

    const { userState, setUserState } = useUserState()

    const signIn = async (event) => {
        if (!user.username || !user.password) return 
        clearErrMsg();
        if (event) event.preventDefault();
        console.log('trying: '+ '/users/get/' + user.username + '/' + user.password)

        await ApiCall.get(`/users/get/${user.username}/${user.password}`)
        .then(res => {
            if (res.data.length > 0 ){
                saveUser(res.data[0])
                navigate('/')
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
        console.log("saving user")
        localStorage.setItem('nostruggle:username', userInfo.username)
        localStorage.setItem('nostruggle:password', userInfo.password)
        setUserState({
            ...userState,
            user: userInfo,
            signedIn: true,
            signedOut: false
        })
    }

    const signInFromSession = async () => {
        const storedUser = {
            username: localStorage.getItem('nostruggle:username'),
            password: localStorage.getItem('nostruggle:password')               
        }
        await ApiCall.get(`/users/get/${storedUser.username}/${storedUser.password}`)
        .then(res => {
            if (res.data.length > 0 ){
                saveUser(res.data[0])
                navigate('/home')
             } else {
                console.log("fail login user DNE")
             } 
        })
        .catch(e => console.log("fail" + e.message))    
    }

    useEffect(() => {
        signInFromSession()    
    }, [])

    return (
        <div style={{ maxWidth: 400, margin: 'auto', display: 'flex', flexDirection: 'column'}}>
            <HomeIcon style={{ margin:"auto"}} width="250px" height="100px"/>

            <h2>Sign In</h2>
            <Autocomplete
            freeSolo
            options={[]}
            renderInput={ (params) => <UsernameField innerRef={ params } errMsg={ errMsg } /> }
            value={ user.username || '' }
            onInput={ enterUsername }
            />
            
            <Autocomplete
            sx={{ marginTop: '10px'}}
            freeSolo
            options={[]}
            renderInput={ (params) => <PasswordField innerRef={ params } errMsg={ errMsg } /> }
            value={ user.password || '' }
            onInput={ enterPassword }
            />
            <div>
                <Button onClick={ signIn }>Sign In</Button>
                <Button onClick={ signUp }>Sign Up</Button>
            </div>
            
        </div>
    )
}

export default SignUp