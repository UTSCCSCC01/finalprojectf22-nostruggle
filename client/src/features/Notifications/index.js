import { useState, useEffect } from "react"
import { useUserState } from "../SignUp/UserContext"
import ApiCall from "../../components/api/ApiCall"
const Notifications = () => {

    const { userState } = useUserState()
    const [ notifications, setNotifications ] = useState([])

    const getNotifications = async () => {
        console.log("getting notifications")
        await ApiCall.get(`/notification?userId=${userState.user._id}`)
        .then((res) => {
            console.log(res)
            if (res.status === 200){
                let fetchedNotifications = res.data
                fetchedNotifications.sort((n1, n2) =>  new Date(n2.createdAt) - new Date(n1.createdAt))
                setNotifications(fetchedNotifications)
            }
        }).catch( e => console.log(e))  
        console.log("sent")     
    }

    useEffect(() => {
        getNotifications()
    },[])
    return (
        <div>
            {
                notifications.map(notification => (
                    <div style={{ backgroundColor: notification.read ? 'cyan' : 'yellow'}}>Source: {notification.source}, read: {notification.read},  type {notification.type}, date: {notification.createdAt}</div>
                ))
            }
        </div>
    )
}

export default Notifications