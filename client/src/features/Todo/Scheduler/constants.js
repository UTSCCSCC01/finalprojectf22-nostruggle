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
        title: 'Has deadline',
        fn: (tasks) => {
            const filtered = tasks.filter(task => task.deadline)
            console.log(filtered)
            return filtered;
        }
    }
]
export const taskDefaultOptions = [
    'Incomplete only'
]