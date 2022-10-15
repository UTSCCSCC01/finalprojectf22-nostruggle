import { Button, Container, Paper } from '@mui/material';
import { useState } from 'react'

const TodoList = ({ tasks, scheduleRef, schedule, completeTask }) => {

    const [ incompleteOnly, toggleIncompleteOnly ] = useState(true)

    const dateFormat = {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }

    const formatTimeSpent = (seconds) => {
        return `${ seconds >= 60*60 
            ? `${Math.floor(seconds / 60 / 60)} hours, ${ Math.floor((seconds % (60 * 60)) / 60)} minutes, ${ seconds % (60*60) % 60 } seconds` 
            : `${ Math.floor(seconds / (60)) } minutes, ${ seconds % (60)} seconds`}`
    }

    return (
        <Container ref={scheduleRef}>
            <Button onClick={() => toggleIncompleteOnly(!incompleteOnly)}>{ incompleteOnly ? "SHOW COMPLETE TASKS" : "VIEW INCOMPLETE ONLY"}</Button>
            { !schedule.isLoading || schedule.userTasks.length > 0 ?
                <div>
                { tasks.map((task) => {
                        return ( !task.done || !incompleteOnly ? 
                        <Paper variant='outlined'>
                            <header><strong>{task.title}</strong></header>
                            <div>{task.done ? "COMPLETED" : <Button size='small' onClick={() => completeTask(task._id)}>Mark As Complete</Button>}</div>
                            { task.deadline ? <div>Deadline: {new Date(task.deadline).toLocaleDateString('en-us', dateFormat)}{ !task.done && Date.parse(task.deadline) < Date.now() ? ": OVERDUE" : null }</div> : null } 
                            <div>Timespent: {formatTimeSpent(task.timespent)}</div>
                        </Paper>
                        : null )
                    })
                }  
                { tasks.filter((task) => !task.done).length === 0 && "You have no incomplete tasks. Congrats!" }
                </div>
                : "Loading your  tasks"
            }
        </Container>
  )
}

export default TodoList