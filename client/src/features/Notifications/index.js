import { useState, useEffect, useCallback, useReducer } from "react"
import { Pagination } from "@mui/material"
import { useUserState } from "../SignUp/UserContext"
import ApiCall from "../../components/api/ApiCall"
import NotificationCard from "./NotificationCard"
import { formatMessages } from "./utils"
const Notifications = () => {
    
    const { userState } = useUserState()
    const [ notifications, setNotifications ] = useState([])
    const [ notificationsFormatted, setNotificationsFormatted ] = useState([])
    const [ pageCount, setPageCount ] = useState(1)
    const [ itemsPerPage, setItemsPerPage ] = useState(0)
    const [ currentPage, setCurrentPage ] = useState(1)

    const reducer = ( state, action) => {
        const copy = state.map(o => 0)
        console.log(copy)
        switch(action.type) {
            case "set":
                return action.payload
            case "edit":
                copy[action.payload.index] = action.payload.item
                return (copy)
            default:
                return state
        }
    }

    const [formattedNotifications, dispatch ] = useReducer(reducer, [])

    const computeItemsPerPage = () => {
        const num = (document.documentElement.clientHeight - 350) / 60
        setItemsPerPage(num)
        return num
    }
    const getPageCount = async () => {
        let pageCount = 1
        await ApiCall.get(`/notification/pagecount?userId=${userState.user._id}&numItems=${itemsPerPage}`)
        .then((res) => {
            console.log(res)
            if (res.status === 200){
                console.log(res)
                setPageCount(res.data.pageCount)
                pageCount = res.data.pageCount
            }
        }).catch( e => console.log(e))
        return pageCount
    }
    const getNotifications = async (pageNum = 1, itemsPerPage = computeItemsPerPage()) => {
        console.log("getting notifications")
        await ApiCall.get(`/notification/page/${pageNum}?userId=${userState.user._id}&numItems=${itemsPerPage}`)
        .then((res) => {
            console.log(res)
            if (res.status === 200){
                let fetchedNotifications = res.data
                setNotifications(fetchedNotifications)
                if (notificationsFormatted.length === 0) dispatch({ type: 'set', payload: fetchedNotifications.map(() => <div>... {notificationsFormatted.length}</div>) })
                
                setCurrentPage(pageNum)
            }
        }).catch( e => console.log(e))  
        console.log("sent")     
    }

    const hanglePageChange = async ( pageNum ) => {
        console.log(pageNum)
        console.log("handle page change")
        getPageCount(computeItemsPerPage())
        getNotifications(pageNum, itemsPerPage)
    }

    
    const setFormatNotificationsCallback = (notif) => {
        const formattedList = localStorage.getItem('notifications')
        dispatch({
            type: 'set',
            payload: notif
        })
    }

    const formatNotifications = () => {
        formatMessages(setFormatNotificationsCallback, notificationsFormatted, notifications)
    }

    useEffect(() => {
        console.log("Formatted notifs with length " + notificationsFormatted.length)
    }, [notificationsFormatted])

    useEffect(() => {
        formatNotifications()
    }, [notifications])

    useEffect(() => {
        //computeItemsPerPage()
        getNotifications()
    },[])

    useEffect(() => {
        //if (itemsPerPage <= 0) return
        //getPageCount(itemsPerPage)
    }, [itemsPerPage])

    useEffect(() => {
        getNotifications()
    }, [userState.hasNewNotifications])

    return (
        <div>
            <h1>Updates {itemsPerPage} {notifications.length}  {notificationsFormatted.length}</h1>
            {
                notificationsFormatted.map(notification => <NotificationCard notif={notification}/>)
            }
            {
                formattedNotifications.map(notification => <NotificationCard  notif={notification}/>)
            }
            <Pagination size='large' count={pageCount} page={currentPage} onChange={(e, pageNum) => hanglePageChange(pageNum)}></Pagination>
        </div>
    )
}

export default Notifications