import { FormLabel, TextField, InputLabel, Button, Container, Box, Input, Grid , Paper} from '@mui/material';
import { useRef, useState, useEffect, useReducer } from 'react'
import { pageActions } from './types'
import { pageReducer, taskReducer } from './reducers'
import AddNewTask from './AddNewTask';
import TodoList from './TodoList'
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
        return (
            <div>
                <h1>My Todolist</h1> 
                <Button onClick={() => toggleAddTask(true)}>Add new task</Button>
                <TodoList scheduleRef={scheduleRef} schedule={schedule} tasks={schedule.userTasks} completeTask={completeTask}/>
                <AddNewTask 
                    open={addTask} 
                    close={closeAddTask}
                    anchor={scheduleRef}
                    pageDispatch={pageDispatch}
                />
            </div>
        )
        
        
    }
    
    const fetchTasks = async () => {
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