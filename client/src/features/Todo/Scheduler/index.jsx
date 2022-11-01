import { FormLabel, TextField, InputLabel, Button, Container, Box, Input, Grid , Paper, IconButton} from '@mui/material';
import { AddBox } from '@mui/icons-material';
import { useRef, useState, useEffect, useReducer } from 'react'
import { pageActions } from './types'
import { pageReducer, taskReducer } from './reducers'
import AddNewTask from './AddNewTask';
import TodoList from './TodoList'
import ApiCall from '../../../components/api/ApiCall';

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

    const deleteTask = (task) => {
        alert("Coming soon")
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
                <h1>NoStruggle Focusing</h1> 
                <IconButton id='AddTaskButton' onClick={() => toggleAddTask(true)} sx={{ width: '60px', height: '60px' }} children={<AddBox sx={{fontSize: '60px'}}/>}></IconButton>
                <TodoList 
                    scheduleRef={scheduleRef} 
                    schedule={schedule} tasks={schedule.userTasks}                     
                    deleteTask={deleteTask}
                    toggleCompletion={toggleCompletion}/>
                <AddNewTask 
                    open={addTask} 
                    close={closeAddTask}
                    anchor={scheduleRef}
                    pageDispatch={pageDispatch}
                    isTaskTitleTaken={isTaskTitleTaken}
                />
            </div>
        )
        
        
    }
    
    const fetchTasks = async () => {
        pageDispatch({ type: pageActions.LOADING })
        console.log("fetching tasks")
        await ApiCall.get('/tasks')
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