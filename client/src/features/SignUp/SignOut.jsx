import { useUserState } from "./UserContext"
import { useEffect, useState } from "react"
import NavBar from "../../components/navigation/NavBar/NavBar"
const SignOut = () => {

    const { userState, setUserState } = useUserState()
    const [ success, setSuccess ] = useState(false)
    
    useEffect(() => {
        console.log("signing out")
        setUserState({...userState, user: {} })
    },[])
    
    useEffect(() => {
        if (!userState.user.username && !userState.user.password){
            console.log("Success")
            setSuccess(true)
        }
    }, [userState])
    return (
        <div>
            <NavBar/>
            SignOut
            { success ?
                <div>
                    You have been successfully signed out
                </div>
                : "signing out"
            }
        </div>
    )
}

export default SignOut