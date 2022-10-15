import { Button, Card, Box, Autocomplete, TextField } from '@mui/material';
import { useState, useReducer, useEffect, useCallback } from 'react'
import Timer from './Timer'
import Stopwatch from './Stopwatch'
import './StudyTimer.css'
import studyTimerSound from '../../../assets/sfx/christmasbell.wav'
import { timerBreakInterval } from './constants';
import Sound from '../../Sound'
import ApiCall from '../../../components/api/ApiCall';

const StudyTimer = (props) => {

    const [ timerId, setTimerId ] = useState(0)
    const [ saveTimerId, setSaveTimerId ] = useState(0)
    const [ open, toggleOpen ] = useState(true)
    const [ sound, setSound ] = useState(null)
    const [ isSavingTime, setIsSavingTime ] = useState(false)

    const initialState = {
        todo: {
            title: "This is an example task",
            taskId: 0,
            timespent: 10
        },
        mode: 'none',
        time: {
            seconds: 0,
            string: '00:00'
        },
        running: false,
        totalStopwatchTime: 0,
        totalTimerTime: 0,
        totalCount: 0
    }

    const convertSecondsToString = (seconds) => {
        let date = new Date(seconds * 1000)
        let time = date.toISOString()
        return seconds / 60 / 60 >= 1 ? time.slice(11, 19) : time.slice(14, 19)
    }

    const reducer = (state, action) => {
        switch(action.type){
            case 'countup':
                return {
                    ...state,
                    time: {
                        ...state,
                        seconds: state.time.seconds + 1,
                        string: convertSecondsToString(state.time.seconds + 1)
                    },
                    todo: {
                        ...state.todo,
                        timespent: state.todo.timespent + 1
                    }
                }
            case 'countdown':
                return {
                    ...state,
                    time: {
                        ...state,
                        seconds: state.time.seconds - 1,
                        string: convertSecondsToString(state.time.seconds - 1)
                    },
                    todo: {
                        ...state.todo,
                        timespent: state.todo.timespent + 1
                    }
                }
            case 'timespent':
                return {
                    ...state,
                    todo: {
                        ...state.todo,
                        timespent: action.paylaod
                    }
                }
            case 'stop':
                return {
                    ...state,
                    running: false
                }
            case 'start':
                return {
                    ...state,
                    running: true
                }
            case 'time':
                return {
                    ...state,
                    time: {
                        seconds: action.payload,
                        string: convertSecondsToString(action.payload)
                    }
                }
            case 'mode':
                return {
                    ...state,
                    mode: action.payload
                }
            case 'todo':
                return {
                    ...state,
                    todo: action.payload
                }
        }
    }

    const [ studyTimer, dispatch ] = useReducer(reducer, initialState)

    // TODO: choose actual task
    const setUpTask = async () => {
        const res = await ApiCall.get(process.env.REACT_APP_SERVER_URL + '/tasks')
        console.log(res)
        const task = res.data.filter((t) => !t.done)[0]
        console.log(task)
        if (!task) return;
        const taskInfo = {
            taskId: task._id,
            title: task.title,
            timespent: task.timespent
        }
        dispatch({ type: 'todo', payload: taskInfo})
    }

    const startStopwatch = () => {
        if (studyTimer.mode !== 'stopwatch'){
            dispatch({
                type: 'time',
                payload: 0
            })
            dispatch({
                type: 'mode',
                payload: 'stopwatch'
            })
        } else {
            setTimerId(setInterval(() => {
                dispatch({
                    type: 'countup',
                })
            }, 1000))
            dispatch({
                type: 'start',
            })
        }
    }

    const startTimer = () => {
        if (studyTimer.mode !== 'timer'){
            dispatch({
                type: 'mode',
                payload: 'timer'
            })
            timerSetTime(0)
        } else {
            if (studyTimer.time.seconds > 0){
                console.log("Starting time")
                setTimerId(setInterval(() => {
                    dispatch({
                        type: 'countdown',
                    })
                }, 1000))
                dispatch({
                    type: 'start',
                })        
            }
        }
    }

    const timerSetTime = (time) => {
        stopTime()
        dispatch({
            type: 'time',
            payload: time
        })
    }

    const saveTime = async () => {
        console.log("save time")
        setIsSavingTime(true)
        const data = {
            filters: { _id: studyTimer.todo.taskId, title: studyTimer.todo.title },
            update: {
                timespent: studyTimer.todo.timespent
            }
        }
        ApiCall.patch(process.env.REACT_APP_SERVER_URL + '/tasks', data)
        .then(() => {
            console.log("success saving time") 
            setIsSavingTime(false)
        })
        .catch( e => {
            console.log(e)
            setIsSavingTime(false)
        })
    }

    const stopTime = () => {
        clearTimeout(saveTimerId)
        clearInterval(timerId)
        dispatch({
            type: 'stop'
        })
        saveTime()
    }

    useEffect(() => {
        setSound(new Sound(studyTimerSound))
        setUpTask()
        console.log(sound)
    }, [])

    useEffect(() => {
        if (studyTimer.running){
            if (studyTimer.time.seconds <= 0 && studyTimer.mode !== 'stopwatch'){
                stopTime()
                sound.play();
                toggleOpen(true)
            } else if (!isSavingTime && studyTimer.time.seconds % 5 === 1){ // limit the number of requests
                saveTime()
                
            }
        }
    }, [studyTimer.time])

    useEffect(() => {
        console.log("Timer id " + saveTimerId)
    }, [saveTimerId])

    return (
        <Card raised={true} className='StudyTimer'>
            <Button onClick={() => toggleOpen(!open)}>Toggle Timer</Button>
            { open ? 
                <div>
                    <Button >Edit To-do List</Button>
                    <div>
                        <header>Mode: {studyTimer.mode}</header>
                        <header>{ studyTimer.mode === 'stopwatch' ? "You haven't struggled on:" : "Currently not struggling with: "}</header>
                        <header><strong>{studyTimer.todo.title}</strong> {studyTimer.mode === 'stopwatch' && "for"}</header>
                        <h1>{studyTimer.time.string}</h1>
                        { studyTimer.mode === 'pomodoro' &&
                        <div>
                            <div>Countdown until break</div>
                            <div>
                                <div>Set Time: </div>
                                <Autocomplete options={timerBreakInterval} 
                                    renderInput={(params) => <TextField {...params} size='small' label="Interval before break" />}
                                />
                            </div>
                        </div>                        
                        }
                    </div>
                    <div>
                        { studyTimer.mode === 'stopwatch' && <Stopwatch/> }
                        { studyTimer.mode === 'timer' && <Timer dispatch={dispatch} setTime={timerSetTime}/> }
                        
                    </div>
                    { ! studyTimer.running ?
                        <Box>
                            <Button onClick={startTimer}>{ studyTimer.time.seconds > 0 && studyTimer.mode === 'timer' ? "Start Timer" : "Timer"}</Button>
                            <Button onClick={startStopwatch}>
                                {studyTimer.mode === 'stopwatch' 
                                ? (studyTimer.time.seconds === 0 ? "Start Stopwatch" : "Resume Stopwatch") 
                                : "Stopwatch"}
                            </Button>
                            <Button onClick={() => dispatch({type: 'time', payload: 0 })}>Reset Time</Button>
                        </Box>
                        : <Button onClick={stopTime}>Stop Time</Button>

                    }
                </div>
                :
                    studyTimer.running && <div><b>{studyTimer.time.string}</b></div>
            }
        </Card>
    
    )
}

export default StudyTimer