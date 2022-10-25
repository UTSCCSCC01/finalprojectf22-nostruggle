import { Button, Container, Input, Card, Box, Autocomplete, TextField, FormControl } from '@mui/material';
import { useState, useEffect } from 'react'
import { timeFormat } from './constants'
import { convertTimeStringToSeconds } from '../../utils/timeUtils';

const Timer = ({ setTime }) => {

    const timeRegex = new RegExp(timeFormat)
    const [ timeInputProps, setTimeInputProps ] = useState({})

    const timeValidation = (e) => {
        const time = e.target.value
        if (timeRegex.test(time) || !time) {
            setTimeInputProps({...timeInputProps, inputtime: time, value: time, error: false, helperText: null})
        } else {
            setTimeInputProps({...timeInputProps, inputtime: time, value: time, error: true, helperText: "Invalid time format"})
        }
        return timeRegex.test(time)
    }

    const onSetTime = () => {
        if (!timeInputProps.inputtime) return
        if (!timeInputProps.error && timeInputProps.inputtime.trim()){
            setTime(convertTimeStringToSeconds(timeInputProps.inputtime))
        }
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'start' }}>
            <Button onClick={onSetTime}>Set Time</Button>
            <FormControl sx={{ width: 150 }}>
                <TextField {...timeInputProps} size='small' label="Time"
                    onChange={(e) => timeValidation(e)}
                    onKeyUp={(e) =>  {
                        if (e.key === 'Enter') onSetTime() 
                    }}
                    
                />
            </FormControl>            
        </div>
    )
}

export default Timer