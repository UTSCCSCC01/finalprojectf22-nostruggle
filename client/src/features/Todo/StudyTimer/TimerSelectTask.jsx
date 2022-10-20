import { Button, Card, Box, Autocomplete, TextField, Popover } from '@mui/material';
import { useState, useReducer, useEffect, useCallback } from 'react'
import ApiCall from '../../../components/api/ApiCall';
import { useUserState } from '../../SignUp/UserContext';
import { anchorPopover } from '../../utils/styleUtils';
const TimerSelectTask = ({ onSelect, open, setOpen }) => {

    const [ tasks, setTasks ] = useState([])
    const { userState } = useUserState()
    const [ selectedTask, setSelectedTask ] = useState({})

    const fetchTasks = () => {
        ApiCall.get(`/tasks?userId=${userState.user._id}&done=false`)
        .then( res => {
            console.log(res.data)
            let tasks = res.data
            tasks.sort((task1, task2) => {
            
                if (task1.deadline && task2.deadline) {
                    return Date.parse(task1.deadline) - Date.parse(task2.deadline)
                } else if (task1.deadline) return -1
                return 1
                
            })
            setTasks(tasks)
        })
    }

    useEffect(() => {
        if (open) {
            fetchTasks()
        }
    }, [open])

    useEffect(() => {
        console.log(selectedTask)
    }, [selectedTask])

    return (
        <Popover open={open} anchorOrigin={anchorPopover(300, 300)} anchor={document.body}>
            <Button onClick={() => setOpen(false)}>Back</Button>
            <Autocomplete
                options={tasks}
                getOptionLabel={(option) => option.title}
                sx={{ width: 200 }}
                onInputChange={(event, newInputValue) => {
                    setSelectedTask(tasks.find(task => newInputValue === task.title));
                }}
                renderInput={(params) => <TextField {...params} label="Todo" />}
            />
            <Button onClick={() => onSelect(selectedTask)}>Set</Button>
        </Popover> 
    )
}

export default TimerSelectTask