import { taskActions, pageActions } from './types'
import axios from 'axios'

const createNewTask = async (state, newTask, onFinish) => {
    axios.post('http://localhost:5000/tasks', newTask)
    .then(() => {
        onFinish.success()
    }).catch (e => {
        console.log(e.message)
        onFinish.failure(e.message)
    })
}
export const taskReducer = (state, action) =>{
    switch(action.type){
        case taskActions.ADD_TASK:
            console.log("CREATING TASK")
            createNewTask(state, action.payload.task, action.payload.onFinish)
            return {
                ...state,
                isLoading: true
            }
        case taskActions.UPDATE_TASK: 
        case taskActions.DELETE_TASK:
        case taskActions.COMPLETE_TASK:   
        case taskActions.SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: {
                    error: false,
                    message: ''
                }
            }
        case taskActions.ERROR:
            return {
                ...state,
                isLoading: false,
                error: {
                    error: true,
                    ...action.payload
                }
            }
    }
}

const fetchUserTasks = async (state, onFinish) => {
    try {
        console.log("FETCHING TASKS")
        let tasks = await axios.get('http://localhost:5000/tasks').then( res => {
            console.log(res.data)
            return res.data
        })
        tasks.sort((task1, task2) => {
            
            if (task1.deadline && task2.deadline) {
                return Date.parse(task1.deadline) - Date.parse(task2.deadline)
            } else if (task1.deadline) return -1
            return 1
            
        })
        onFinish.success(tasks )
    } catch (e){
        onFinish.failure(e)
    }
}

export const pageReducer = (state, action) =>{
    switch(action.type){
        case pageActions.ADD_TASK:
            console.log("ADD TASK PAGE")
            return {
                ...state,
                page: pageActions.ADD_TASK
            }
        case pageActions.UPDATE_TASK:
        case pageActions.ALL_TASKS:
            console.log("ALL TASKS")
            if (action.payload && action.payload.allTasks) {
                return {
                    ...state,
                    userTasks: action.payload.allTasks,
                    isLoading: false
                }
            }
            if (action.payload) fetchUserTasks(state, action.payload.onFinish)
            return {
                ...state,
                page: pageActions.ALL_TASKS,
                isLoading: true
            }
        case pageActions.ERROR:
            return {
                ...state,
                error: {
                    error: true,
                    message: action.payload
                }
            }

    }
}