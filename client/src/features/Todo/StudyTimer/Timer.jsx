import { Button, Container, Input, Card, Box, Autocomplete, TextField, FormControl } from '@mui/material';
import { useState, useEffect } from 'react'
import { timeFormat } from './constants'

const Timer = ({ dispatch, setTime }) => {

    const timeRegex = new RegExp(timeFormat)
    const [ timeInputProps, setTimeInputProps ] = useState({})
    const timeValidation = (e) => {
        const time = e.target.value
        if (timeRegex.test(time) || !time) {
            setTimeInputProps({...timeInputProps, inputTime: time, value: time, error: false, helperText: null})
        } else {
            setTimeInputProps({...timeInputProps, inputTime: time, value: time, error: true, helperText: "Invalid time format"})
        }
        return timeRegex.test(time)
    }

    const convertTimeToSeconds = (time) => {
        const args = time.split(":").reverse()
        const seconds = args.reduce(
            (total, current, index) => {
                return total + (parseInt(current) * (Math.pow(60, index)))
            }, 
            0
        )
        console.log(seconds)
        return seconds
    }

    const onStart = () => {
        if (!timeInputProps.error && timeInputProps.inputTime.trim()){
            setTime(convertTimeToSeconds(timeInputProps.inputTime))
        }
    }

    return (
        <div>
            <FormControl>
                <TextField {...timeInputProps} size='small' label="Time in hrs:mins:secs"
                    onChange={(e) => timeValidation(e)}
                />
            </FormControl>
            <Button onClick={onStart}>Set Time</Button>
            
        </div>
    )
}

export default Timer