import { Button, Card, Box, Autocomplete, TextField, IconButton, breadcrumbsClasses, accordionActionsClasses, Select, FormControl, MenuItem } from '@mui/material';
import { PlayCircleOutline, PauseCircleOutline, Remove, DragIndicator, Replay, ArrowOutward } from '@mui/icons-material'
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
import GreenButton from '../../../components/buttons/GreenButton';
import RedButton from '../../../components/buttons/RedButton';
import BlueButton from '../../../components/buttons/BlueButton';
const StudyTimer = (props) => {

    const navigate = useNavigate()
    const [ timerId, setTimerId ] = useState(0)
    const [ saveTimerId, setSaveTimerId ] = useState(0)
    const [ open, toggleOpen ] = useState(false)
    const [ sound, setSound ] = useState(null)
    const [ isSavingTime, setIsSavingTime ] = useState(false)
    const [ selectTask, toggleSelectTask ] = useState(false)
    const { userState } = useUserState()
    const [ studyMode, setStudyMode ] = useState('timer');

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
        }
    }, [studyTimer.time])

    useEffect(() => {
        console.log("Timer id " + saveTimerId)
    }, [saveTimerId])

    
    const handleChange = (event) => {
        setStudyMode(event.target.value);
    }

    const startStudy = () => {
        switch (studyMode) {
            case 'timer': case 'stopwatch': case 'pomodoro':
                dispatch({ type: 'mode', payload: studyMode});
                break;
            default:
                break;
        }
    }

    useEffect(startStudy, [studyMode]);

    const smoothBorder = '1px 1px 0 #000, -1px 1px 0 #000, 1px -1px 0 #000, -1px -1px 0 #000, 0px 1px 0 #000, 0px -1px 0 #000, -1px 0px 0 #000, 1px 0px 0 #000, 2px 2px 0 #000, -2px 2px 0 #000, 2px -2px 0 #000, -2px -2px 0 #000, 0px 2px 0 #000, 0px -2px 0 #000, -2px 0px 0 #000, 2px 0px 0 #000, 1px 2px 0 #000, -1px 2px 0 #000, 1px -2px 0 #000, -1px -2px 0 #000, 2px 1px 0 #000, -2px 1px 0 #000, 2px -1px 0 #000, -2px -1px 0 #000';

    return (
        <>
            { open &&
            <>
                <TimerSelectTask 
                    open={selectTask} 
                    setOpen={toggleSelectTask} 
                    onSelect={(task) => { 
                        dispatch({ type: 'todo', payload: task })
                        toggleSelectTask(false)                            
                    }}
                />
                <ToolBarDraggableWrapper handle='#studytimer-handle'>
                    <Card raised={true} className='StudyTimer'
                    sx={{
                        margin: '20px',
                        padding: '8px',
                        border: '2px solid #90b0c2',
                        borderRadius: '10px',
                        backgroundColor: '#eeeff9',
                        boxShadow: '0 10px 16px 0 rgba(4, 76, 107, 0.2),0 6px 20px 0 rgba(4, 76, 107, 0.19)'
                    }}
                    >
                    <Button id='studytimer-handle'>
                        <DragIndicator color=''/>
                    </Button>
                    <IconButton sx={{position: 'absolute', right: 10, top: 0}} onClick={() => toggleOpen(false)}><Remove/></IconButton>
                        <div>
                            <div >
                                {/* <header>Mode: {studyTimer.mode}</header> */}
                                <div style={{ padding: '20px 8px 8px 8px', fontWeight: 700, textAlign: 'center', backgroundColor: 'rgb(207, 221, 237)', borderRadius: '12px'}}> 
                                    <div className='StudyTimerTaskTitle' style={{ fontSize: '17px'}}>
                                        <header>{ studyTimer.mode === 'stopwatch' ? "You haven't struggled on" : "Currently not struggling with: "}</header>
                                        <strong><span style={{ fontSize: '1.7rem', color: '#F1B849', textShadow: smoothBorder.replaceAll('#000', '#2C5B73'), padding: '4px'}}>{studyTimer.todo ? studyTimer.todo.title : 'No task selected'}</span></strong> 
                                        {studyTimer.mode === 'stopwatch' && "\u00A0for"}
                                    </div>
                                    <div style={{ display: 'inline-flex', flexDirection: 'column', height: 60 + 'px', position: 'absolute', top: '56px', right: '16px'}}>
                                        <BlueButton sx={{ height: '30px', fontSize: '12px', marginLeft: '14px', padding: '0px 4px'}} onClick={(e) => { e.currentTarget.blur(); toggleSelectTask(!selectTask)}}>Select Task</BlueButton>
                                        <BlueButton sx={{ height: '30px', fontSize: '12px', marginLeft: '14px', padding: '0px 4px'}} onClick={(e) => { e.currentTarget.blur(); dispatch({ type: 'todo', payload: null })}}>Clear Task</BlueButton>
                                    </div>
                                    <div className='StudyTimerTaskTime' style={{ fontSize: '6rem', letterSpacing: '5px', fontWeight: '600'}}>{ studyTimer.mode === 'pomodoro' ? studyTimer.pomodoro.string : studyTimer.time.string}</div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '-16px'}}>
                                        { 
                                            !studyTimer.running 
                                            ? <GreenButton size='small' sx={{ fontSize: '16px', borderRadius: '10px'}} disabled={studyTimer.mode === 'none' || (studyTimer.time.seconds <= 0 && studyTimer.mode === 'timer')} onClick={startTime} startIcon={<PlayCircleOutline sx={{ width: '34px', height: '34px', fontSize: open ?  '2.5rem' : '1.3rem'}}/>}>START</GreenButton>
                                            : 
                                            <BlueButton size='small' sx={{ fontSize: '16px', borderRadius: '10px'}} onClick={stopTime} startIcon={<PauseCircleOutline sx={{ width: '34px', height: '34px', fontSize: open ?  '2.5rem' : '1.3rem'}}/>}>PAUSE</BlueButton>
                                        }
                                        { !open  ? ( studyTimer.time.seconds && <div><b>{studyTimer.time.string}</b></div>)
                                            : (  !studyTimer.running && <RedButton sx={{ fontSize: '16px'}} startIcon={<Replay sx={{ fontSize: open ? '2.5rem' : '1.3rem'}}/>} onClick={resetTime}>RESET</RedButton>)
                                        }
                                        {
                                            studyTimer.mode === 'pomodoro' && <span style={{ position: 'absolute', left: '170px'}}><b>{studyTimer.pomodoro.interval.toUpperCase()} TIME</b></span> 
                                        }  
                                    </div> 
                                </div>
                                { ! studyTimer.running ?
                                    <Box sx={{ height: '67px', display: 'flex', padding: '0.5rem', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'}}>
                                        <span style={{ fontSize: '18px', marginRight: '6px'}} >Study Mode: </span>
                                        <div className='choose-mode'>
                                            <TextField
                                            select
                                            value={ studyMode }
                                            onChange={ handleChange }
                                            autoWidth
                                            variant='outlined'
                                            margin='none'
                                            size='small'
                                            >
                                                <MenuItem variant={studyTimer.mode === 'timer' ? "contained": "outlined"} value='timer' sx={{ fontFamily: 'Bahnschrift', fontSize: '18px', padding: '0px 4px'}}>Timer</MenuItem> 
                                                <MenuItem variant={studyTimer.mode === 'stopwatch' ? "contained": "outlined"} value='stopwatch' sx={{ fontFamily: 'Bahnschrift', fontSize: '18px', padding: '8px 4px'}}>Stopwatch</MenuItem> 
                                                <MenuItem variant={studyTimer.mode === 'pomodoro' ? "contained": "outlined"} value='pomodoro' sx={{ fontFamily: 'Bahnschrift', fontSize: '18px', padding: '0px 4px'}}>Pomodoro</MenuItem>
                                            </TextField>
                                        </div>
                                    </Box>
                                    : <Box sx={{ height: '67px', display: 'flex', padding: '0.5rem', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'}}>
                                        <span style={{ fontSize: '18px', marginRight: '6px'}} >{'Study Mode: ' + studyMode.charAt(0).toUpperCase() + studyMode.substr(1).toLowerCase()}</span>
                                    </Box>
                                }
                                { studyTimer.mode === 'pomodoro' && <Box sx={{ height: '67px', display: 'flex', padding: '0.5rem', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', height: '30px'}}><span style={{ fontSize: '18px', marginRight: '6px'}} >Pomodoro Interval:</span><PomodoroTimer isRunning={studyTimer.running} currentTime={studyTimer.time.seconds} intervalMode={studyTimer.pomodoro.interval} currentTimeString={studyTimer.pomodoro.string} setIntervalTime={(time) => dispatch({ type: 'pomodoroStudyInterval', payload: time}) }/></Box> }</div>
                                <div style={{paddingLeft: '0.5rem'}}>
                                    { studyTimer.mode === 'stopwatch' && <Stopwatch/> }
                                    { studyTimer.mode === 'timer' && <Timer setTime={timerSetTime}/> }
                            </div>
                        </div>                
                        <BlueButton sx={{ position: 'absolute', left: '0px', bottom: '10px', height: '30px', fontSize: '22px', marginLeft: '14px', padding: '0px 4px'}} endIcon={<ArrowOutward />} onClick={(e) => { e.currentTarget.blur(); navigate("/todo")}}>Edit To-Do List</BlueButton>
                    </Card>
                </ToolBarDraggableWrapper>
            </>
            }
            <StudyTimerIcon iconVariant={props.iconVariant} open={open} onClick={() => toggleOpen(!open)} time={studyTimer.time.seconds > 0 ? studyTimer.time.string : ''}/>
        </>    
    )
}

export default StudyTimer