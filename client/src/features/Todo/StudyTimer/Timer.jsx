import { Button, Container, Input, Card, Box, Autocomplete, TextField, FormControl } from '@mui/material';
import { useState, useEffect } from 'react'
import { timeFormat } from './constants'
import { convertTimeStringToSeconds } from '../../utils/timeUtils';
import GreenButton from '../../../components/buttons/GreenButton';

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
        <div style={{ display: 'flex', justifyContent: 'start', flexDirection: 'row', alignItems: 'center' }}>
            <span style={{ fontSize: '18px', marginRight: '6px'}} >Study Time: </span>
            <FormControl sx={{ width: 150 }}>
                <TextField {...timeInputProps} size='small' label="Enter Time"
                    onChange={(e) => timeValidation(e)}
                    onKeyUp={(e) =>  {
                        if (e.key === 'Enter') onSetTime() 
                    }}
                    
                />
            </FormControl>            
            <GreenButton onClick={onSetTime} sx={{ fontSize: '18px', marginRight: '6px'}} >Set Time</GreenButton>
        </div>
    )
}

export default Timer