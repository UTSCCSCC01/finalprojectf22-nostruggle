import { Button, Paper, Container, Input, Card, Box, Autocomplete, TextField, FormControl } from '@mui/material';
import { useState, useEffect, useRef } from 'react'
import ApiCall from '../../../../components/api/ApiCall';
import { useUserState } from '../../../SignUp/UserContext';
import { dateFormat, formatDateInput, formatLocaleDateInput } from '../../Scheduler/constants';
const StudyTimerSummary = () => {

    const { userState } = useUserState()
    const [ tasks, setTasks ] = useState([])
    const [ totalTime,  setTotalTime ] = useState('')
    const [ waiting, toggleWaiting ] = useState(false)
    const [ summaryDate, setSummaryDate ] = useState()
    const dateInput = useRef()

    // TODO: move this + format GMT-4 datet into a utils(?) file
    const formatTimeSpent = (seconds) => {
        let date = new Date(seconds * 1000)
        let time = date.toISOString()
        return seconds / 60 / 60 >= 1 ? time.slice(11, 19) : time.slice(14, 19)
    }

    const getDailySummaryToday = () => {
        toggleWaiting(true)
        ApiCall.get(`${process.env.REACT_APP_SERVER_URL}/tasks/daily?userId=${userState.user._id}`)
        .then( async res => {
            if (res.status === 200){
                const userTasks = await ApiCall.get(`${process.env.REACT_APP_SERVER_URL}/tasks?userId=${userState.user._id}`)
                const summaryTasksInfo = res.data.map((task) => {
                    const matchingUserTask = userTasks.data.find((userTask) => userTask._id === task.taskId)
                    return {
                        title: matchingUserTask.title,
                        timespent: task.timespent,
                        overall: matchingUserTask.timespent
                    }
                })
                setTasks(summaryTasksInfo)
                toggleWaiting(false)
                setSummaryDate(formatLocaleDateInput(new Date(Date.now()).toLocaleDateString('en-us', { ...dateFormat })))
            }    
            console.log(res)
            
        })
        .catch(e => console.log(e))
    }

    const getDailySummarySpecifiedDate = () => {

        const date = new Date(dateInput.current.value).toLocaleDateString('en-us', { timeZone: 'UTC', ...dateFormat })
        console.log(date)
        if (date === 'Invalid Date') {
            alert("Invalid date") 
            return
        }

        toggleWaiting(true)
        setSummaryDate(date)
        const specifiedDate = new Date(date)
        ApiCall.get(`${process.env.REACT_APP_SERVER_URL}/tasks/daily/date?userId=${userState.user._id}&date=${specifiedDate.getTime()}`)
        .then( async res => {
            if (res.status === 200){
                const userTasks = await ApiCall.get(`${process.env.REACT_APP_SERVER_URL}/tasks?userId=${userState.user._id}`)
                const summaryTasksInfo = res.data.map((task) => {
                    const matchingUserTask = userTasks.data.find((userTask) => userTask._id === task.taskId)
                    return {
                        title: matchingUserTask.title,
                        timespent: task.timespent,
                        overall: matchingUserTask.timespent
                    }
                })
                setTasks(summaryTasksInfo)
                toggleWaiting(false)
            }    
            console.log(res)
            
        })
        .catch(e => {
            console.log(e)
            toggleWaiting(false)
        })        
    }


    useEffect(() => {
        getDailySummaryToday()
    },[])

    useEffect(() => {
        const totalTimeSpent = tasks.reduce((prev, current) => {
            return prev + current.timespent
        }, 0)
        setTotalTime(formatTimeSpent(totalTimeSpent))
    }, [tasks])

    return (
        <div>
            <h1>NoStruggle Focusing</h1>
            { 
                waiting 
                ? "Fetching your tasks..."
                : <div style={{ width: '80%', margin: 'auto'}}>
                    <FormControl sx={{ display: 'flex', flexFlow: 'row wrap' }}>
                        <Input inputRef={dateInput} size="small" type="date" variant="outlined" ></Input>
                        <Button onClick={getDailySummarySpecifiedDate}>Set Date</Button>
                        <Button onClick={() => dateInput.current.value = formatDateInput(new Date(new Date(Date.now()).toLocaleDateString('en-us', { year: 'numeric', month: '2-digit',  day: '2-digit' })))}>
                            Set As Today
                        </Button>
                    </FormControl>
                    <h3>Date: {summaryDate}</h3>
                    <h3>Total Timespent: {totalTime}</h3>
                    {
                        tasks.map((task) => (
                            <Paper className='TodoListItem' variant='outlined'>
                                <header style={{ fontSize: '1.2rem'}}><strong>{task.title}</strong></header>
                                <div style={{ display: 'flex', flexFlow: 'column wrap', alignItems: 'end' }}>
                                    <div style={{ fontSize: '1.2rem', fontWeight: 700 }}>Time: {formatTimeSpent(task.timespent)}</div>
                                    <div style={{ fontSize: '0.8rem'}}>Total: {formatTimeSpent(task.overall)}</div>
                                </div>
                            </Paper>
                        ))
                    }
                  </div>  
        
            }

        </div>
    )
}

export default StudyTimerSummary