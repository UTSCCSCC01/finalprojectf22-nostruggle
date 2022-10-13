import { Button, Container, Paper } from '@mui/material';
import { useState } from 'react'
import { dateFormat } from './constants';
const TodoList = ({ tasks, scheduleRef, schedule, completeTask }) => {

    const [ incompleteOnly, toggleIncompleteOnly ] = useState(true)


    const isOverdue = (date) => {
        const now = new Date(Date.now()).toLocaleDateString('en-us', dateFormat)
        const utcNow = new Date(now)
        const dateToCompare = new Date(new Date(date).toLocaleDateString('en-us', { timeZone: 'UTC', ...dateFormat }))
        return dateToCompare < utcNow
    } 
    return (
        <div ref={scheduleRef}>
            <Button onClick={() => toggleIncompleteOnly(!incompleteOnly)}>{ incompleteOnly ? "SHOW COMPLETE TASKS" : "VIEW INCOMPLETE ONLY"}</Button>
            { !schedule.isLoading || schedule.userTasks.length > 0 ?
                <div>
                { tasks.map((task) => {
                        return ( !task.done || !incompleteOnly ? 
                        <Paper variant='outlined'>
                            <header><strong>{task.title}</strong></header>
                            <div>{task.done ? "COMPLETED" : <Button size='small' onClick={() => completeTask(task._id)}>Mark As Complete</Button>}</div>
                            { task.deadline ? <div>Deadline: {new Date(task.deadline).toLocaleString('en-us', { timeZone: 'UTC', ...dateFormat })}{ !task.done && isOverdue(task.deadline) ? ": OVERDUE" : null }</div> : null } 
                        </Paper>
                        : null )
                    })
                }  
                { tasks.filter((task) => !task.done).length === 0 && "You have no incomplete tasks. Congrats!" }
                </div>
                : "Loading your  tasks"
            }
        </div>
  )
}

export default TodoList