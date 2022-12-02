import { Button, Card, Box, Autocomplete, TextField, IconButton, breadcrumbsClasses, accordionActionsClasses } from '@mui/material';
import { PlayCircleOutline, PauseCircleOutline, Remove } from '@mui/icons-material'
import { useState, useReducer, useEffect, useCallback, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import ToolBarDraggableWrapper from '../../../components/navigation/ToolsBar/ToolBarDraggableWrapper'
import Timer from './Timer'
import Stopwatch from './Stopwatch'
import PomodoroTimer from './PomodoroTimer'
import './StudyTimer.css'
import studyTimerSound from '../../../assets/sfx/christmasbell.wav'
import { timerBreakInterval, defaultTimerBreakInterval, defaultTimerBreakTime } from './constants';
import Sound from '../../Sound'
import ApiCall from '../../../components/api/ApiCall';
import TimerSelectTask from './TimerSelectTask';
import { useUserState } from '../../SignUp/UserContext';
import { convertTimeStringToSeconds } from '../../utils/timeUtils';
import StudyTimerIcon from './StudyTimerIcon';
const StudyTimer = (props) => {

    const navigate = useNavigate()
    const [ timerId, setTimerId ] = useState(0)
    const [ saveTimerId, setSaveTimerId ] = useState(0)
    const [ open, toggleOpen ] = useState(false)
    const [ sound, setSound ] = useState(null)
    const [ isSavingTime, setIsSavingTime ] = useState(false)
    const [ selectTask, toggleSelectTask ] = useState(false)
    const { userState, setUserState } = useUserState()

    const convertSecondsToString = (seconds) => {
        let date = new Date(seconds * 1000)
        let time = date.toISOString()
        return seconds / 60 / 60 >= 1 ? time.slice(11, 19) : time.slice(14, 19)
    }

    const initialState = {
        todo: null,
        mode: 'none',
        time: {
            seconds: 0,
            string: '00:00',
            newSavedSeconds: 0
        },
        pomodoro: {
            studySeconds: convertTimeStringToSeconds(defaultTimerBreakInterval),
            breakSeconds: convertTimeStringToSeconds(defaultTimerBreakTime),
            interval: 'study',
            seconds: convertTimeStringToSeconds(defaultTimerBreakInterval),
            string: defaultTimerBreakInterval
        },
        running: false,
        totalStopwatchTime: 0,
        totalTimerTime: 0,
        totalCount: 0,
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
                    mode: action.payload,
                    time: action.payload === 'stopwatch' ? {
                        ...state.time,
                        seconds: 0,
                        string: convertSecondsToString(0),
                    } : state.time
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
        setTimerId(setInterval(() => {
            dispatch({
                type: 'countup',
            })
        }, 1000))
        dispatch({
            type: 'start',
        })
    }

    const startTimer = () => {

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

    const startPomodoro = () => {

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

    const startTime = () => {
        switch(studyTimer.mode){
            case 'timer': 
                return startTimer()
            case 'stopwatch':
                return startStopwatch()
            case 'pomodoro':
                return startPomodoro()
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
        ApiCall.patch('/tasks', data)
        .then(() => {
            console.log("success saving time")
            setIsSavingTime(false)
        })
        .catch( e => {
            console.log(e)
            setIsSavingTime(false)
        })

        dispatch({ type: 'save' }) 
        ApiCall.post(`/tasks/daily?userId=${userState.user._id}&taskId=${studyTimer.todo._id}&timespent=${secondsSinceLastSave}`)
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
        dispatch({type: 'pomodoroTime', payload: studyTimer.pomodoro.studySeconds })
    }

    useEffect(() => {
        setSound(new Sound(studyTimerSound))
    }, [])

    useEffect(() => {
        timerSetTime(0)
    }, [studyTimer.mode])

    useEffect(() => {
        if (studyTimer.running){
            if (studyTimer.time.seconds <= 0 && studyTimer.mode === 'timer') {
                stopTime()
                sound.play();
                saveTime()
                toggleOpen(true)
            }  else if (studyTimer.mode === 'pomodoro' && studyTimer.pomodoro.seconds <= 0){
                sound.play();
                dispatch({ type: 'pomodoroTime', payload: studyTimer.pomodoro.interval === 'break' ? studyTimer.pomodoro.studySeconds : studyTimer.pomodoro.breakSeconds})
                dispatch({ type: 'pomodoroMode', payload: studyTimer.pomodoro.interval === 'break' ? 'study' : 'break'})
                toggleOpen(true)
            } else if (!isSavingTime && studyTimer.time.seconds % 5 === 1 && studyTimer.todo){ // limit the number of requests
                saveTime()
                
            }
            setUserState({...userState, time: studyTimer.time.seconds > 0 ? studyTimer.time.string : ''})
        }
    }, [studyTimer.time])

    useEffect(() => {
        console.log("Timer id " + saveTimerId)
    }, [saveTimerId])

    return (
        <>
            { userState.timer &&
            <>
                <TimerSelectTask 
                    open={selectTask} 
                    setOpen={toggleSelectTask} 
                    onSelect={(task) => { 
                        dispatch({ type: 'todo', payload: task })
                        toggleSelectTask(false)                            
                    }}
                />
                <ToolBarDraggableWrapper>
                    <Card raised={true} className='StudyTimer'>
                        <div>
                            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                <Button onClick={() => navigate("/todo")}>Edit To-do List</Button>
                                <IconButton children={<Remove/>}  onClick={() => setUserState({...userState, timer: false})}/>
                            </div>
                            <div >
                                { ! studyTimer.running &&
                                        <>
                                            <Box sx={{ display: 'flex', padding: '0.5rem', justifyContent: 'space-between'}}>
                                                <Button variant={studyTimer.mode === 'timer' ? "contained": "outlined"} onClick={() => dispatch({ type: 'mode', payload: 'timer'})}>Timer</Button> 
                                                <Button variant={studyTimer.mode === 'stopwatch' ? "contained": "outlined"} onClick={() => dispatch({ type: 'mode', payload: 'stopwatch'})}>Stopwatch</Button> 
                                                <Button variant={studyTimer.mode === 'pomodoro' ? "contained": "outlined"} onClick={() => dispatch({ type: 'mode', payload: 'pomodoro'})}>Pomodoro</Button>
                                            </Box>
                                        </>
                                    }
                                <header>Mode: {studyTimer.mode}</header>
                                <div style={{ padding: '0.5rem', fontWeight: 700, textAlign: 'center'}}> 
                                    <header>{ studyTimer.mode === 'stopwatch' ? "You haven't struggled on:" : "Currently not struggling with: "}</header>
                                    <div className='StudyTimerTaskTitle' style={{ fontSize: '1.5rem'}}><strong>{studyTimer.todo ? studyTimer.todo.title : <span><i>No task selected</i></span>}</strong> {studyTimer.mode === 'stopwatch' && "for"}</div>
                                    <div className='StudyTimerTaskTime' style={{ fontSize: '2rem'}}>{studyTimer.time.string}</div>
                                </div>
                                <div>
                                    { studyTimer.mode === 'stopwatch' && <Stopwatch/> }
                                    { studyTimer.mode === 'timer' && <Timer setTime={timerSetTime}/> }
                                    { studyTimer.mode === 'pomodoro' && <PomodoroTimer isRunning={studyTimer.running} currentTime={studyTimer.time.seconds} intervalMode={studyTimer.pomodoro.interval} currentTimeString={studyTimer.pomodoro.string} setIntervalTime={(time) => dispatch({ type: 'pomodoroStudyInterval', payload: time}) }/> }
                                </div>
                                <div>
                                    <Button onClick={() => toggleSelectTask(!selectTask)}>Select Task</Button>
                                    <Button onClick={() => dispatch({ type: 'todo', payload: null })}>Clear Task</Button>
                                </div>
                            </div>
                        </div>                
                        <div style={{ display: 'flex', justifyContent: 'space-between'}}>
                            { 
                                !studyTimer.running 
                                ? <IconButton size='small' color='primary' disabled={studyTimer.mode === 'none' || (studyTimer.time.seconds <= 0 && studyTimer.mode === 'timer')} onClick={startTime} children={<PlayCircleOutline sx={{ fontSize: open ?  '2.5rem' : '1.3rem'}}/>}/>
                                : 
                                <IconButton size='small' color='primary' onClick={stopTime} children={<PauseCircleOutline sx={{ fontSize: open ? '2.5rem' : '1.3rem'}}/>}/>
                            }
                            { !open  ? ( studyTimer.time.seconds && <div><b>{studyTimer.time.string}</b></div>)
                                : (  !studyTimer.running && <Button onClick={resetTime}>Reset</Button>)
                            }     
                        </div> 
                    </Card>
                </ToolBarDraggableWrapper>
            </>
            }
        </>    
    )
}

export default StudyTimer