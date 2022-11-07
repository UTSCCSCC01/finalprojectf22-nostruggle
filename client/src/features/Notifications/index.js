import { useState, useEffect } from "react"
import { Pagination } from "@mui/material"
import { useUserState } from "../SignUp/UserContext"
import ApiCall from "../../components/api/ApiCall"
import NotificationCard from "./NotificationCard"
const Notifications = () => {
    
    const { userState } = useUserState()
    const [ notifications, setNotifications ] = useState([])
    const [ pageCount, setPageCount ] = useState(1)
    const [ itemsPerPage, setItemsPerPage ] = useState(0)
    const [ currentPage, setCurrentPage ] = useState(1)

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
    const getNotifications = async (pageNum = 1) => {
        console.log("getting notifications")
        await ApiCall.get(`/notification/page/${pageNum}?userId=${userState.user._id}&numItems=${itemsPerPage}`)
        .then((res) => {
            console.log(res)
            if (res.status === 200){
                let fetchedNotifications = res.data
                setNotifications(fetchedNotifications)
                setCurrentPage(pageNum)
            }
        }).catch( e => console.log(e))  
        console.log("sent")     
    }

    const hanglePageChange = async ( pageNum ) => {
        console.log(pageNum)
        console.log("handle page change")
        getPageCount(computeItemsPerPage())
        getNotifications(pageNum)
    }

    useEffect(() => {
        computeItemsPerPage()
    },[])

    useEffect(() => {
        if (itemsPerPage <= 0) return
        getPageCount(itemsPerPage)
        getNotifications()
    }, [itemsPerPage])

    return (
        <div>
            <h1>Updates {itemsPerPage}</h1>
            {
                notifications.map(notification => (<NotificationCard notif={notification} />))
            }
            <Pagination size='large' count={pageCount} page={currentPage} onChange={(e, pageNum) => hanglePageChange(pageNum)}></Pagination>
        </div>
    )
}

export default Notifications