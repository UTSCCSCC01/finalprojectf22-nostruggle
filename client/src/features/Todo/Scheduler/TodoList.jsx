import { Button, Container, Paper, Checkbox, CardHeader, IconButton, Chip } from '@mui/material';
import { Delete, CheckOutlined, SquareTwoTone } from '@mui/icons-material';
import { useReducer, useState } from 'react'
import { dateFormat, taskSorting, taskFilter, taskDefaultOptions } from './constants';

const TodoList = ({ tasks, scheduleRef, schedule, toggleCompletion, deleteTask }) => {

    const [ optionsFilter, setOptionsFilter ] = useState(taskFilter.map(option => taskDefaultOptions.includes(option.title) ? {...option, on: true } : option))
    const [ optionsSorting, setOptionsSorting ] = useState(taskSorting.map(option => taskDefaultOptions.includes(option.title) ? {...option, on: true } : option))

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
            <div style={{ display: 'flex', justifyContent: 'space-between'}}>
                <div>
                    {
                        optionsFilter.map((option) => <Chip  color={option.on ? "primary": "default" } clickable onClick={() => setOptionsFilter(optionsFilter.map(o => o === option ? { ...o, on: !option.on } : o ))} label={option.title}/>)
                    }
                </div>
                <div>
                    {
                        optionsSorting.map((option) => <Chip  color={option.on ? "primary": "default" } clickable onClick={() => setOptionsSorting(optionsSorting.map(o => ({ ...o, on: o === option ? !option.on : false })))} label={option.title}/>)
                    }
                </div>
            </div>
            { !schedule.isLoading || schedule.userTasks.length > 0 ?
                <div>
                { optionsFilter.concat(optionsSorting).reduce((prev, current) => current.on ? current.fn(prev) : prev , [...schedule.userTasks]).map((task) => (
                        <Paper className='TodoListItem' variant='outlined'>
                            <div className='markComplete'>
                                <IconButton 
                                    size='large' 
                                    onClick={() => toggleCompletion(task)} 
                                    checked={task.done}
                                    children={task.done ? <><SquareTwoTone/><CheckOutlined/></> : <SquareTwoTone/>}
                                ></IconButton>
                            </div>
                            <div className='TodoListItemTaskInfo'>
                                <CardHeader title={task.title}/>
                                <div className='TodoListItemSubHeading' nos-hasdeadline={task.deadline ? 'true' : 'false' }>
                                    { task.deadline && <div>Deadline: {new Date(task.deadline).toLocaleString('en-us', { timeZone: 'UTC', ...dateFormat })}{ !task.done && isOverdue(task.deadline) ? ": OVERDUE" : null }</div> }
                                    { task.timespent > 0 && <div>{formatTimeSpent(task.timespent)} </div>}
                                </div>
                            </div>
                            <div>
                                <IconButton children={<Delete/>} onClick={() => deleteTask(task)}/>
                            </div>
                        </Paper>
                        //: null )
                ))
                }
                { tasks.filter((task) => !task.done).length === 0 && "You have no incomplete tasks. Congrats!" }
                </div>
                : "Loading your  tasks"
            }
        </div>
  )
}

export default TodoList