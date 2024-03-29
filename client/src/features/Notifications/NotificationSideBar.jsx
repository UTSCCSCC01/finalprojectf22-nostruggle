import { useEffect, useState, useRef, useCallback } from "react"
import { useNavigate } from "react-router-dom"
import { Button, Typography, Container, Paper, TextField } from "@mui/material"
import ApiCall from "../../components/api/ApiCall"
import { useUserState } from "../SignUp/UserContext"
import { formatMessages } from "./utils"
const NotificationSideBar = ({ onViewAll, hasNewNotifications, setHasNewNotifications }) => {
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
                setHasNewNotifications(false)
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
                if (fetchedNotifications.length > 0) setUserState({...userState, hasNewNotifications: true })
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
    }, [hasNewNotifications])

    useEffect(() => {
        getNotifications()
    }, [])

    return (
        <Container className='NotificationSideBar' style={{ width: 300, padding: 10, display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h4" margin="auto">Updates</Typography>
            <Button onClick={markAsRead}>Mark as read</Button>
            <div style={{ overflow: 'hidden'}}>
                {
                    notificationsFormatted.map(item => <div>{item}</div>)
                }
            </div>
            <Button onClick={onViewAll} sx={{marginTop: 3}} variant='contained'>View Feed</Button>
        </Container>
    )
}

export default NotificationSideBar