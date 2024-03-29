import { useUserState } from "./UserContext"
import { useEffect, useState } from "react"
import NavBar from "../../components/navigation/NavBar/NavBar"
import { Button } from "@mui/material"
import { Link } from "react-router-dom"
import { ReactComponent as HomeIcon } from '../../assets/icons/home.svg'

const SignOut = () => {

    const { userState, setUserState } = useUserState()
    const [ success, setSuccess ] = useState(false)
    
    useEffect(() => {
        console.log("signing out")
        localStorage.setItem('nostruggle:username', '')
        localStorage.setItem('nostruggle:password', '')
        setUserState({...userState, user: {}, signedIn: false, signedOut: true })
    },[])
    
    useEffect(() => {
        if (!userState.user.username && !userState.user.password){
            console.log("Success")
            setSuccess(true)
            console.log(userState)
        }
    }, [userState])
    return (
        <div>
            <HomeIcon style={{ margin:"auto"}} width="250px" height="100px"/>
            <h1>Sign Out</h1>
            { success ?
                <div>
                    <h2>You have been successfully signed out</h2>
                    <Link style={{ textDecoration: 'none'}} to='/login'>
                        <Button variant='contained'>
                            Login
                        </Button>
                    </Link>
                </div>
                : "signing out"
            }
        </div>
    )
}

export default SignOut