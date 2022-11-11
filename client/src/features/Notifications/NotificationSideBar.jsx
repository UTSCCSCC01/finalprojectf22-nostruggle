import { useEffect, useState, useRef, useCallback } from "react"
import { useNavigate } from "react-router-dom"
import { Button, Typography, Container, Paper, TextField } from "@mui/material"
import ApiCall from "../../components/api/ApiCall"
import { useUserState } from "../SignUp/UserContext"
import { formatMessages } from "./utils"
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
    const [ notificationsFormatted, setNotificationsFormatted ] = useState([])

    const { userState, setUserState } = useUserState()

    const markAsRead = async () => {
        notifications.forEach(async (notification, index) => {
            console.log("reading")
            console.log(notification)
            await ApiCall.post(`/notification/read?notificationId=${notification._id}`)
            console.log("PPOSTED READ")
            if (index === notifications.length - 1) {
                setUserState({...userState, hasNewNotifications: false })
                getNotifications()
            }    
        })
    }

    const getNotifications = async () => {
        console.log("getting notifications")
        await ApiCall.get(`/notification?userId=${userState.user._id}&read=${false}`)
        .then((res) => {
            console.log(res)
            if (res.status === 200){
                let fetchedNotifications = res.data
                fetchedNotifications.sort((n1, n2) =>  new Date(n2.createdAt) - new Date(n1.createdAt))
                setNotifications(fetchedNotifications)
                if (notificationsFormatted.length === 0) setNotificationsFormatted(fetchedNotifications.map(() => <div>...</div>))
            }
        }).catch( e => console.log(e))  
        console.log("sent")     
    }



    const formatNotifications = () => {
        setNotificationsFormatted(formatMessages(notifications))
    }

    useEffect(() => {
        formatNotifications()
    },[notifications])

    useEffect(() => {
        getNotifications()
    }, [userState.hasNewNotifications])

    useEffect(() => {
        getNotifications()
    }, [])

    return (
        <Container className='NotificationSideBar' style={{ width: 300, padding: 10, display: 'flex', flexDirection: 'column' }}>NotificationSideBar
            <Button onClick={markAsRead}>Mark all as read</Button>
            <Button onClick={sendNotification}>Click to send notification</Button>
            <h1>Updates {notifications.length}  {notificationsFormatted.length}</h1>

            <TextField type='text' inputRef={notifInput}/>
            <div style={{ overflow: 'hidden'}}>
                {
                    notificationsFormatted.map(item => <div>{item}</div>)
                }
            </div>
            <Button onClick={onViewAll} variant='contained'>View All</Button>
        </Container>
    )
}

export default NotificationSideBar