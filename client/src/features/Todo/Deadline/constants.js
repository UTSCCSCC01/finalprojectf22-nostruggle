import { ActionTypes } from "@mui/base"

export const dateFormat = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
}

export const taskSorting = [
    {
        title: 'Sort by deadline',
        fn: (tasks) => {
            tasks.sort((task1, task2) =>  new Date(task1.deadline) - new Date(task2.deadline))
            return tasks;
        }
    },
    {
        title: 'Sort by title',
        fn: (tasks) => {
            tasks.sort((task1, task2) =>  task1.title.localeCompare(task2.title[0]))
            return tasks;
        }
    },
    {
        title: 'Sort by time spent',
        fn: (tasks) => {
            tasks.sort((task1, task2) =>  task2.timespent - task1.timespent)
            return tasks;
        }
    }    
]

export const taskFilter = [
    {
        title: 'Incomplete only',
        fn: (tasks) => {
            const filtered = tasks.filter(task => !task.done)
            console.log(filtered)
            return filtered;
        }
    },
    {
 
    }
]
export const taskDefaultOptions = [
    'Incomplete only'
]

export const dateInputFormat = {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric'
}

export const formatDateInput = (date) => {
    return `${date.getFullYear()}-${date.getMonth() + 1 >= 10 ? date.getMonth() + 1: `0${date.getMonth() + 1}`}-${date.getDate() >= 10 ? date.getDate() : `0${date.getDate()}`}`
}


export const formatLocaleDateInput = (date) => {
    return new Date(date).toLocaleDateString('en-us', {...dateFormat, timeZone: "UTC"})
}