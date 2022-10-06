import { Button, Container, Input, Card, Box, Autocomplete, TextField } from '@mui/material';
import { useState, useReducer, useEffect } from 'react'
import Timer from './Timer'
import Stopwatch from './Stopwatch'
import css from './StudyTimer.css'
import studyTimerSound from '../../../resources/christmasbell.wav'
import { timerBreakInterval } from './constants';
import Sound from '../Sound'

const StudyTimer = (props) => {

    const [ timerId, setTimerId ] = useState(0)
    const [ saveTimerId, setSaveTimerId ] = useState(0)
    const [ open, toggleOpen ] = useState(true)
    const [ sound, setSound ] = useState(null)

    const initialState = {
        todo: {
            title: "This is an example task",
            taskId: 0
        },
        mode: 'none',
        time: {
            seconds: 0,
            string: '00:00'
        },
        running: false,
        totalStopwatchTime: 0,
        totalTimerTime: 0

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
                    }
                }
            case 'countdown':
                return {
                    ...state,
                    time: {
                        ...state,
                        seconds: state.time.seconds - 1,
                        string: convertSecondsToString(state.time.seconds - 1)
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
        if (studyTimer.mode !== 'stopwatch'){
            dispatch({
                type: 'time',
                payload: 0
            })
            dispatch({
                type: 'mode',
                payload: 'stopwatch'
            })
        }
    }

    const startTimer = () => {
        setTimerId(setInterval(() => {
            dispatch({
                type: 'countdown',
            })
        }, 1000))
        dispatch({
            type: 'start',
        })
        if (studyTimer.mode !== 'timer' || studyTimer.time.seconds <= 0){
            dispatch({
                type: 'time',
                payload: 10
            })
            dispatch({
                type: 'mode',
                payload: 'timer'
            })
        }
    }

    const saveTime = () => {
        
    }
    const stopTime = () => {
        clearInterval(timerId)
        dispatch({
            type: 'stop'
        })
        saveTime()
        clearInterval(saveTimerId)
    }

    useEffect(() => {
        setSound(new Sound(studyTimerSound))
        console.log(sound)
    }, [])

    useEffect(() => {
        if (studyTimer.running && studyTimer.time.seconds <= 0 ){
            if (studyTimer.mode !== 'stopwatch'){
                sound.play();
                stopTime()
            }
        }
    }, [studyTimer.time])

    return (
        <Card raised={true} className='StudyTimer'>
            <Button onClick={() => toggleOpen(!open)}>Toggle Timer</Button>
            { open ? 
                <div>
                    <Button >Edit To-do List</Button>
                    <div>
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
                    { ! studyTimer.running ?
                        <Box>
                            <Button onClick={startTimer}>{ studyTimer.time.seconds > 0 && studyTimer.mode === 'timer' ? "Resume Timer" : "Start Timer"}</Button>
                            <Button onClick={startStopwatch}>{ studyTimer.time.seconds > 0 && studyTimer.mode === 'stopwatch' ? "Resume Stopwatch" : "Start Stopwatch"}</Button>
                            <Button onClick={() => dispatch({type: 'time', payload: 0 })}>Reset Time</Button>
                        </Box>
                        : (
                        <div>
                            { studyTimer.mode === 'stopwatch'
                            ? <Stopwatch/>
                            : <Timer/>
                            }
                            <Button onClick={stopTime}>Stop Time</Button>
                        </div>
                        )
                    }
                </div>
                :
                    studyTimer.running && <div><b>{studyTimer.time.string}</b></div>
            }
        </Card>
    
    )
}

export default StudyTimer
