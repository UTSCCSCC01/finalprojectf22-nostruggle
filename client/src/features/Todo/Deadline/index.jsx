import { FormLabel, TextField, InputLabel, Button, Container, Box, Input, Grid , Paper, IconButton} from '@mui/material';
import { AddBox } from '@mui/icons-material';
import { useRef, useState, useEffect, useReducer } from 'react'
import { pageActions } from './types'
import { pageReducer, taskReducer } from './reducers'
import AddNewTask from './AddNewTask';
import TodoList from './TodoList'
import ApiCall from '../../../components/api/ApiCall';
import { useUserState } from '../../SignUp/UserContext';
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
    const  { userState } = useUserState()
    const [ addTask, toggleAddTask ] = useState(false)
    const scheduleRef = useRef()

    const toggleCompletion = async (task) => {
        console.log("Completing task")
        ApiCall.patch('/tasks',
        {
            filters: {_id: task._id },
            update: { done: !task.done }
        } )  
        .then((res) => fetchTasks())
        .catch(e => pageDispatch({type: pageActions.ERROR, payload: "There was a problem updating the database"}))
        console.log("Fetching") 
    }

    const archiveTask = async (task) => {
        if(window.confirm(`Are you sure you would like to archive the task '${task.title}' and remove it from the todolist? Study timer history will not be deleted.`)){
            ApiCall.patch('/tasks',
            {
                filters: {_id: task._id },
                update: { archived: true }
            } ).then(() => fetchTasks())
            .catch(e => pageDispatch({type: pageActions.ERROR, payload: "There was a problem updating the database"}))
        }
    }

    const closeAddTask = (reload) => {
        toggleAddTask(false)

        if (reload){
            fetchTasks()
        }
    }

    const isTaskTitleTaken = (title) => {
        return schedule.userTasks.filter((task) => task.title === title).length !== 0
    }
    
    const getPage = () =>{
        console.log(schedule)
        return (
            <div className='Scheduler'>
                <h1>Upcoming Deadlines</h1> 
                <TodoList 
                    scheduleRef={scheduleRef} 
                    schedule={schedule} tasks={schedule.userTasks}                     
                    deleteTask={archiveTask}
                    toggleCompletion={toggleCompletion}/>

            </div>
        )
        
        
    }
    
    const fetchTasks = async () => {
        pageDispatch({ type: pageActions.LOADING })
        console.log("fetching tasks")
        await ApiCall.get(`/tasks?userId=${userState.user._id}`)
        .then( res => {
            console.log(res.data)
            const tasks = res.data.filter(task => !task.archived)
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
        </div>
    )
}

export default Scheduler