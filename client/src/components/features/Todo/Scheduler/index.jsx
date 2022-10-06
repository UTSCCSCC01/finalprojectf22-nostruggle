import { FormLabel, TextField, InputLabel, Button, Container, Box, Input, Grid , Paper} from '@mui/material';
import { useRef, useState, useEffect, useReducer } from 'react'
import { pageActions } from './types'
import { pageReducer, taskReducer } from './reducers'
import AddNewTask from './AddNewTask';
import axios from 'axios';
const Scheduler = () => {

    const initialState = {
        userId: '4',
        userTasks: [],
        page: pageActions.ALL_TASKS,
        error: {
            error: false,
            message: ''
        },
        isLoading: true,
    }

    const [ schedule, pageDispatch ] = useReducer(pageReducer, initialState)
    const [ incompleteOnly, toggleIncompleteOnly ] = useState(true)
    const [ addTask, toggleAddTask ] = useState(false)
    const scheduleRef = useRef()

    const dateFormat = {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }

    const completeTask = async (taskId) => {
        console.log("Completing task")
        axios.patch(process.env.REACT_APP_SERVER_URL + '/tasks',
        {
            filters: {_id: taskId },
            update: { done: true }
        } )  
        .then((res) => fetchTasks())
        .catch(e => pageDispatch({type: pageActions.ERROR, payload: "There was a problem updating the database"}))
        console.log("Fetching") 
        fetchTasks()    
       
        
    }

    const closeAddTask = (reload) => {
        toggleAddTask(false)

        if (reload){
            fetchTasks()
        }
    }
    const getPage = () =>{
        console.log(schedule)
        switch (schedule.page) {
            case pageActions.ALL_TASKS:
                console.log("this is all tasks page")
                return (
                    <div>
                        Schedule for Catherine 
                        <Button onClick={() => toggleAddTask(true)}>Add new task</Button>
                        <Container  ref={scheduleRef}>
                            <Button onClick={() => toggleIncompleteOnly(!incompleteOnly)}>{ incompleteOnly ? "SHOW COMPLETE TASKS" : "VIEW INCOMPLETE ONLY"}</Button>
                            { !schedule.isLoading || schedule.userTasks.length > 0 ?
                                <div>
                                { schedule.userTasks.map((task) => {
                                        return ( !task.done || !incompleteOnly ? 
                                        <Paper variant='outlined'>
                                            <header><strong>{task.title}</strong></header>
                                            <div>{task.done ? "COMPLETED" : <Button size='small' onClick={() => completeTask(task._id)}>Mark As Complete</Button>}</div>
                                            { task.deadline ? <div>Deadline: {new Date(task.deadline).toLocaleDateString('en-us', dateFormat)}{ !task.done && Date.parse(task.deadline) < Date.now() ? ": OVERDUE" : null }</div> : null } 
                                        </Paper>
                                        : null )
                                    })
                                }  
                                </div>
                                : "Loading your  tasks"
                            }
                        </Container>
                        <AddNewTask 
                            open={addTask} 
                            close={closeAddTask}
                            anchor={scheduleRef}
                            pageDispatch={pageDispatch}
                        />

                    </div>
                )
            case pageActions.ADD_TASK:
                console.log("Add task page")
                return 
        }
        
    }
    
    const fetchTasks = async (state, onFinish) => {
        pageDispatch({ type: pageActions.LOADING })
        console.log("fetching tasks")
        await axios.get(process.env.REACT_APP_SERVER_URL + '/tasks')
        .then( res => {
            console.log(res.data)
            let tasks = res.data
            tasks.sort((task1, task2) => {
            
                if (task1.deadline && task2.deadline) {
                    return Date.parse(task1.deadline) - Date.parse(task2.deadline)
                } else if (task1.deadline) return -1
                return 1
                
            })
            pageDispatch({ type: pageActions.ALL_TASKS, payload: tasks })
        })
        .catch(e => pageDispatch({ type: pageActions.ERROR, payload: { message: "There was a problem fetching your tasks..." }}))
    }

    useEffect(() => {
        console.log("Fetching tasks")
        fetchTasks()
    }, [schedule.page] )

    useEffect(() => {

    }, [])

    useEffect(() => {
        fetchTasks()
    }, [] )

    return (
        <div>
            {
                getPage()
            }
            { schedule.page }
        </div>
    )
}

export default Scheduler