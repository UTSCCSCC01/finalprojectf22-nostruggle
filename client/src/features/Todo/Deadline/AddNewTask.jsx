import { FormLabel, Popper, Popover, Input, TextField, FormControl, FormControlLabel, FormGroup, Switch, Button, Container, Box } from '@mui/material';
import { useRef, useState, useReducer, useEffect, useContext } from 'react'
import { pageActions, taskActions } from './types'
import { pageReducer, taskReducer } from './reducers'
import ApiCall from '../../../components/api/ApiCall';
import css from './style.css'
import { anchorPopover } from '../../utils/styleUtils';
import { useUserState } from '../../SignUp/UserContext';

const AddNewTask = ({ pageDispatch, open, close, anchor, isTaskTitleTaken }) => {
    
    const { userState } = useUserState()

    const titleRef = useRef(), dateRef = useRef()
    
    const [ hasDeadline, toggleHasDeadline ] = useState(false)
    const [ taskState, taskDispatch ] = useReducer(taskReducer, {
        isAddingTask: false,
        isLoading: false,
        added: false,
        error: {
            error: false,
            message: ''
        }
    } )

    const createTask = async () =>{
        let title = titleRef.current.value.trim();
        if (!title) 
            return taskDispatch( { type: taskActions.ERROR, payload: { message: 'Title required', target: titleRef } })
        
        if (hasDeadline && !dateRef.current.value)
            return taskDispatch( { type: taskActions.ERROR, payload: { message: 'No deadline set', target: dateRef } })

        if (isTaskTitleTaken(title))
            return taskDispatch( { type: taskActions.ERROR, payload: { message: 'Task with the same title already exists', target: titleRef } })
 
        console.log(dateRef.current.value)
        let dateEntered = new Date(dateRef.current.value)

        console.log(dateEntered)

        let newTask = {
            title: title,
            deadline: dateEntered,
            timespent: 0,
            done: false,
            userId: userState.user._id
        }
        console.log(newTask)
        taskDispatch({ type: taskActions.ADD_TASK })

        ApiCall.post('/tasks', newTask)
        .then(() => {
            taskDispatch({ type: taskActions.SUCCESS })
            close(true);
        })
        .catch( () =>  taskDispatch({ type: taskActions.ERROR, payload: { message: 'There was a problem creating the new task...' }}))
        titleRef.current.value = ''
        dateRef.current.value = ''
    }

    useEffect(() => {
        if (taskState.added) {
            close(false)
        } else if (taskState.isLoading && taskState.error) {
            pageDispatch({ type: pageActions.ERROR, payload: { message:  "There was a problem fetching your tasks..." }})
        }
    }, [taskState])

    useEffect(() => {
        taskDispatch({ type:  taskActions.CLEAR })
    }, [open])

    return (
        <Popover open={open} anchorOrigin={anchorPopover(300, 400)} anchorEl={anchor}>
            <Button onClick={close}>Back to schedule</Button>
            <Container>
                <FormControl>
                    <h1>Add New Task</h1>
                    <TextField error={taskState.error.error && taskState.error.target === titleRef} helperText={taskState.error.error && taskState.error.target === titleRef ? taskState.error.message : ""}
                        margin="normal" disabled={taskState.isLoading} size="small" inputRef={titleRef} required label="Title" variant="outlined" placeholder="Enter here"></TextField>
                    <FormGroup>
                        <FormControlLabel size="small" label="Deadline" value={hasDeadline} checked={hasDeadline} control={<Switch onChange={(e) => toggleHasDeadline(!hasDeadline)}/>}></FormControlLabel>
                        <TextField error={taskState.error.error && taskState.error.target === dateRef} helperText={taskState.error.error && taskState.error.target === dateRef ? taskState.error.message : ""}  disabled={!hasDeadline} size="small" inputRef={dateRef} type="date" variant="outlined" ></TextField>
                    </FormGroup>
                    <Button margin="normal" type="submit" disabled={taskState.isLoading} onClick={createTask} variant="contained">Create</Button>
                </FormControl>
            </Container>
        </Popover>
    )
}

export default AddNewTask