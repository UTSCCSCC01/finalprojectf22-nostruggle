import { useEffect, useState, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@mui/material"
import ApiCall from "../../components/api/ApiCall"
import { useUserState } from "../SignUp/UserContext"
const NotificationSideBar = ({ onViewAll }) => {
    const notifInput = useRef()
    const sendNotification = async () => {
        const data = {
            source: notifInput.current.value,
            toUserId: userState.user._id,
            type: 'comment'
        }
        await ApiCall.post('/notification', data )
        .then(() => getNotifications() )
        getNotifications()
        console.log("sent notif")
    }
    const [ notifications, setNotifications ] = useState([])
    const { userState, setUserState } = useUserState()

    const markAsRead = async () => {
        await notifications.forEach(async notification => {
            console.log("reading")
            console.log(notification)
            await ApiCall.post(`/notification/read?notificationId=${notification._id}`)
        })
        getNotifications()
    }

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
    }, [userState.hasNewNotifications])

    useEffect(() => {
        getNotifications()
    }, [])

    return (
        <div className='NotificationSideBar' style={{ width: 300, padding: 10, display: 'flex', flexDirection: 'column' }}>NotificationSideBar
            <Button onClick={markAsRead}>Mark all as read</Button>
            <Button onClick={sendNotification}>Click to send notification</Button>
                <input type='text' ref={notifInput}/>
            <div style={{ overflow: 'hidden'}}>
                {
                    notifications.map(notification => (
                        <div style={{ backgroundColor: notification.read ? 'cyan' : 'yellow'}}>Source: {notification.source}, read: {notification.read},  type {notification.type}, date: {notification.createdAt}</div>
                    ))
                }
            </div>
            <Button onClick={onViewAll} variant='contained'>View All</Button>
        </div>
    )
}

export default NotificationSideBar