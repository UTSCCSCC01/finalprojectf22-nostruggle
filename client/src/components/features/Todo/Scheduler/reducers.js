import { taskActions, pageActions } from './types'

export const taskReducer = (state, action) =>{
    switch(action.type){
        case taskActions.ADD_TASK:
            console.log("CREATING TASK")
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
            return {
                ...state,
                page: pageActions.ALL_TASKS,
                isLoading: false,
                userTasks: action.payload,
                error: {}
            }
        case pageActions.ERROR:
            return {
                ...state,
                error: {
                    error: true,
                    message: action.payload
                }
            }
        case pageActions.LOADING:
            return {
                ...state,
                isLoading: true
            }

    }
}