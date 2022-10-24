import { Button, Card, Box, Autocomplete, TextField } from '@mui/material';
import { useState, useReducer, useEffect, useCallback, useContext } from 'react'
import Timer from './Timer'
import Stopwatch from './Stopwatch'
import PomodoroTimer from './PomodoroTimer'
import './StudyTimer.css'
import studyTimerSound from '../../../assets/sfx/christmasbell.wav'
import { timerBreakInterval } from './constants';
import Sound from '../../Sound'
import ApiCall from '../../../components/api/ApiCall';
import TimerSelectTask from './TimerSelectTask';
import { useUserState } from '../../SignUp/UserContext';
const StudyTimer = (props) => {

    const [ timerId, setTimerId ] = useState(0)
    const [ saveTimerId, setSaveTimerId ] = useState(0)
    const [ open, toggleOpen ] = useState(true)
    const [ sound, setSound ] = useState(null)
    const [ isSavingTime, setIsSavingTime ] = useState(false)
    const [ selectTask, toggleSelectTask ] = useState(false)
    const { userState } = useUserState()
    
    const initialState = {
        todo: null,
        mode: 'none',
        time: {
            seconds: 0,
            string: '00:00',
            newSavedSeconds: 0
        },
        pomodoro: {
            studySeconds: 10,
            breakSeconds: 5,
            interval: 'study',
            seconds: 10
        },
        running: false,
        totalStopwatchTime: 0,
        totalTimerTime: 0,
        totalCount: 0,
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
                        ...state.time,
                        seconds: state.time.seconds + 1,
                        string: convertSecondsToString(state.time.seconds + 1),
                        newSavedSeconds: state.time.newSavedSeconds + 1
                    },
                    todo: state.todo ? {
                        ...state.todo,
                        timespent: state.todo.timespent + 1
                    } : null
                }
            case 'countdown':
                return {
                    ...state,
                    time: {
                        ...state.time,
                        seconds: state.time.seconds - 1,
                        string: convertSecondsToString(state.time.seconds - 1),
                        newSavedSeconds: state.time.newSavedSeconds + 1
                    },
                    todo: state.todo ? {
                        ...state.todo,
                        timespent: state.todo.timespent + 1
                    } : null
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
                        ...state.time,
                        seconds: action.payload,
                        string: convertSecondsToString(action.payload),
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
                    time: {
                        ...state.time,
                        newSavedSeconds: 0
                    },
                    todo: action.payload
                }
            case 'save':
                return {
                    ...state,
                    time: {
                        ...state.time,
                        newSavedSeconds: 0
                    }
                }

            case 'pomodoroStudyInterval':
                console.log(action.payload)
                return {
                    ...state,
                    pomodoro: {
                        ...state.pomodoro,
                        studySeconds: action.payload,
                        seconds: state.running ? state.pomodoro.seconds : action.payload,
                        string: state.running ? state.pomodoro.string : convertSecondsToString(action.payload),

                    }
                }
            case 'pomodoroMode':
                return {
                    ...state,
                    pomodoro: {
                        ...state.pomodoro,
                        interval: action.payload
                    }
                }
            case 'pomodoroCountdown':
                return {
                    ...state,
                    pomodoro: {
                        ...state.pomodoro,
                        seconds: state.pomodoro.seconds - 1,
                        string: convertSecondsToString(state.pomodoro.seconds - 1),
                    }
                }
            case 'pomodoroTime':
                return {
                    ...state,
                    pomodoro: {
                        ...state.pomodoro,
                        seconds: action.payload,
                        string: convertSecondsToString(action.payload),

                    }
                }
        }
    }

    const [ studyTimer, dispatch ] = useReducer(reducer, initialState)

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

    const startPomodoro = () => {
        if (studyTimer.mode !== 'pomodoro'){
            dispatch({
                type: 'mode',
                payload: 'pomodoro'
            })
            timerSetTime(0)
        } else {
            if (studyTimer.pomodoro.seconds > 0){
                console.log("Starting time")
                setTimerId(setInterval(() => {
                    dispatch({
                        type: 'countup',
                    })
                    dispatch({
                        type: 'pomodoroCountdown',
                    })
                }, 1000))
                dispatch({
                    type: 'mode',
                    payload: 'pomodoro'
                })
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
        console.log(studyTimer.time)
        const secondsSinceLastSave = studyTimer.time.newSavedSeconds
        ApiCall.patch(process.env.REACT_APP_SERVER_URL + '/tasks', data)
        .then(() => {
            console.log("success saving time")
            setIsSavingTime(false)
        })
        .catch( e => {
            console.log(e)
            setIsSavingTime(false)
        })

        dispatch({ type: 'save' }) 
        ApiCall.post(`${process.env.REACT_APP_SERVER_URL}/tasks/daily?userId=${userState.user._id}&taskId=${studyTimer.todo._id}&timespent=${secondsSinceLastSave}`)
        .then(() => {
            console.log("success saving daily time")
            setIsSavingTime(false)
        })
        .catch( e => {
            console.log(e)
            console.log('fail daily save')
            setIsSavingTime(false)
        })
    
    }

    const stopTime = () => {
        clearTimeout(saveTimerId)
        clearInterval(timerId)
        dispatch({
            type: 'stop'
        })
        if (studyTimer.todo){
            saveTime()           
        }
    }

    const resetTime = () => {
        dispatch({type: 'time', payload: 0 })
        dispatch({type: 'pomodoroTime', payload: 0 })
    }

    useEffect(() => {
        setSound(new Sound(studyTimerSound))
    }, [])

    useEffect(() => {
        if (studyTimer.running){
            if (studyTimer.time.seconds <= 0 && studyTimer.mode === 'timer') {
                stopTime()
                sound.play();
                saveTime()
                toggleOpen(true)
            }  else if (studyTimer.mode === 'pomodoro' && studyTimer.pomodoro.seconds <= 0){
                sound.play();
                dispatch({ type: 'pomodoroMode', payload: studyTimer.pomodoro.interval === 'break' ? 'study' : 'break'})
                dispatch({ type: 'pomodoroTime', payload: studyTimer.pomodoro.interval === 'break' ? studyTimer.pomodoro.breakSeconds : studyTimer.pomodoro.studySeconds})
                toggleOpen(true)
            } else if (!isSavingTime && studyTimer.time.seconds % 5 === 1 && studyTimer.todo){ // limit the number of requests
                saveTime()
                
            }
        }
    }, [studyTimer.time])

    useEffect(() => {
        console.log("Timer id " + saveTimerId)
    }, [saveTimerId])

    return (
        <Card raised={true} className='StudyTimer'>
            <Button sx={{ width: '100%' }} onClick={() => toggleOpen(!open)}>Toggle Timer</Button>
            { open ? 
                <div >
                    <Button >Edit To-do List</Button>
                    <Button onClick={() => toggleSelectTask(!selectTask)}>Select Task</Button>
                    <Button onClick={() => dispatch({ type: 'todo', payload: null })}>Clear Task</Button>
                    <TimerSelectTask 
                        open={selectTask} 
                        setOpen={toggleSelectTask} 
                        onSelect={(task) => { 
                            dispatch({ type: 'todo', payload: task })
                            toggleSelectTask(false)                            
                        }}
                    />
                    <header>Mode: {studyTimer.mode}</header>
                    <div style={{ padding: '0.5rem', fontWeight: 700, textAlign: 'center'}}> 
                        <header>{ studyTimer.mode === 'stopwatch' ? "You haven't struggled on:" : "Currently not struggling with: "}</header>
                        <div className='StudyTimerTaskTitle' style={{ fontSize: '1.5rem'}}><strong>{studyTimer.todo ? studyTimer.todo.title : <span><i>No task selected</i></span>}</strong> {studyTimer.mode === 'stopwatch' && "for"}</div>
                        <div className='StudyTimerTaskTime' style={{ fontSize: '2rem'}}>{studyTimer.time.string}</div>
                    </div>
                    <div>
                        { studyTimer.mode === 'stopwatch' && <Stopwatch/> }
                        { studyTimer.mode === 'timer' && <Timer setTime={timerSetTime}/> }
                        { studyTimer.mode === 'pomodoro' && <PomodoroTimer intervalMode={studyTimer.pomodoro.interval} currentTimeString={studyTimer.pomodoro.string} setIntervalTime={(time) => dispatch({ type: 'pomodoroStudyInterval', payload: time}) }/> }
                    </div>
                    { ! studyTimer.running ?
                        <Box>
                            <Button onClick={startTimer}>{ studyTimer.time.seconds > 0 && studyTimer.mode === 'timer' ? "Start Timer" : "Timer"}</Button>
                            <Button onClick={startStopwatch}>
                                {studyTimer.mode === 'stopwatch' 
                                ? (studyTimer.time.seconds === 0 ? "Start Stopwatch" : "Resume Stopwatch") 
                                : "Stopwatch"}
                            </Button>
                            <Button onClick={startPomodoro}>Pomodoro</Button>
                            <Button onClick={resetTime}>Reset Time</Button>
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