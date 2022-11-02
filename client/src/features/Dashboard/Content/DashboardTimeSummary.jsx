import { useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import { useUserState } from '../../SignUp/UserContext';
import ApiCall from '../../../components/api/ApiCall';
const DashboardTimeSummary = () => {

    const { userState } = useUserState()
    const [ totalTime, setTotalTime ] = useState(0)

    const convertSecondsToString = (seconds) => {
        let date = new Date(seconds * 1000)
        let time = date.toISOString()
        return seconds / 60 / 60 >= 1 ? time.slice(11, 19) : time.slice(14, 19)
    }

    const getTotalTime = async () => {
        ApiCall.get(`/tasks/daily?userId=${userState.user._id}`)
        .then(res => {
            if (res.status === 200){
                console.log(res)
                const tasks = res.data
                const totalTimeSpent = tasks.reduce((prev, current) => {
                    return prev + current.timespent
                }, 0)                
                setTotalTime(totalTimeSpent)
            }    
            console.log(res)            
        })


    }
    useEffect(() => {
        getTotalTime()
    },[])
    return (
        <Typography sx={{ textAlign: 'center'}}>
            <Typography variant='h5'>You haven't struggled today for a total of</Typography>
            <Typography variant='h2' sx={{ fontWeight: 600 }}>{convertSecondsToString(totalTime)}</Typography>
            <Typography variant='h5'>{ totalTime > 0 ? "Keep it up!" : "Time to study!" }</Typography>

        </Typography>
    )
    }

export default DashboardTimeSummary