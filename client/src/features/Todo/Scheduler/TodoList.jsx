import { Button, Container, Paper, Checkbox, CardHeader, IconButton } from '@mui/material';
import { Delete } from '@mui/icons-material';
import { useState } from 'react'
import { dateFormat } from './constants';
const TodoList = ({ tasks, scheduleRef, schedule, toggleCompletion, deleteTask }) => {

    const [ incompleteOnly, toggleIncompleteOnly ] = useState(true)


    const formatTimeSpent = (seconds) => {
        return `${ seconds >= 60*60 
            ? `${Math.floor(seconds / 60 / 60)} hours, ${ Math.floor((seconds % (60 * 60)) / 60)} minutes, ${ seconds % (60*60) % 60 } seconds` 
            : `${ Math.floor(seconds / (60)) } minutes, ${ seconds % (60)} seconds`}`
    }

    const isOverdue = (date) => {
        const now = new Date(Date.now()).toLocaleDateString('en-us', dateFormat)
        const utcNow = new Date(now)
        const dateToCompare = new Date(new Date(date).toLocaleDateString('en-us', { timeZone: 'UTC', ...dateFormat }))
        return dateToCompare < utcNow
    } 

    return (
        <div className='TodoList'  ref={scheduleRef}>
            <Button onClick={() => toggleIncompleteOnly(!incompleteOnly)}>{ incompleteOnly ? "SHOW COMPLETE TASKS" : "VIEW INCOMPLETE ONLY"}</Button>
            { !schedule.isLoading || schedule.userTasks.length > 0 ?
                <div>
                { tasks.map((task) => {
                        return ( !task.done || !incompleteOnly ? 
                        <Paper className='TodoListItem' variant='outlined'>
                            <div className='markComplete'>
                                <Checkbox 
                                    size='large' 
                                    onChange={() => toggleCompletion(task)} 
                                    checked={task.done}
                                ></Checkbox>
                            </div>
                            <div>
                                <CardHeader title={task.title}/>
                                <div>
                                    <span>{formatTimeSpent(task.timespent)} { task.deadline ? <span>Deadline: {new Date(task.deadline).toLocaleString('en-us', { timeZone: 'UTC', ...dateFormat })}{ !task.done && isOverdue(task.deadline) ? ": OVERDUE" : null }</span> : null }</span>
                                </div>
                            </div>
                            <div>
                                <IconButton children={<Delete/>} onClick={() => deleteTask(task)}/>
                            </div>
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