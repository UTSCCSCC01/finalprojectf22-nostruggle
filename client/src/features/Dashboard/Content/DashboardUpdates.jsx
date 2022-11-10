import { useState, useEffect } from 'react'
import { useUserState } from '../../SignUp/UserContext'
import { formatMessages } from '../../Notifications/utils'
import NotificationCard from '../../Notifications/NotificationCard'
import ApiCall from '../../../components/api/ApiCall'
const DashboardUpdates = () => {

    const { userState } = useUserState()
    const [ items, setItems ] = useState([])

    const getItems = () => {
        ApiCall.get(`/notification?userId=${userState.user._id}`)
        .then( res => {
            if (res.status === 200) {
                const updates = res.data
                formatMessages(setItems, updates.filter((n => n.type === 'comment')).slice(0,5))
            }
        })
    }

    useEffect(() => {
        getItems()
    }, [])
    return (
        <div>
            {
                items.map(item => (
                    <NotificationCard notif={item} size='thin'/>
                ))
            }
        </div>
    )
}

export default DashboardUpdates