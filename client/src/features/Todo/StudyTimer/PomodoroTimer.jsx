import { Button, Container, Input, Card, Box, Autocomplete, TextField, FormControl } from '@mui/material';
import { useState, useEffect } from 'react'
import { timerBreakInterval } from './constants'
import { convertTimeStringToSeconds } from '../../utils/timeUtils';
const PomodoroTimer = ({ setIntervalTime, currentTimeString, intervalMode }) => {

    const [ intervalInputTime, setIntervalInputTime ] = useState('')

    return (
        <div>
            <div>
                <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'start' }}>
                    <Button onClick={() => intervalInputTime && setIntervalTime(convertTimeStringToSeconds(intervalInputTime))}>Set Time</Button>
                    <FormControl sx={{ width: 200 }}>
                        <Autocomplete options={timerBreakInterval} 
                            onInputChange={(event, newInputValue) => setIntervalInputTime(newInputValue)}
                            renderInput={(params) => <TextField {...params} size='small' label="Interval before break" />}
                        />
                    </FormControl>            

                </div>
            </div>                        
            <div style={{ textAlign: 'center', width: '100%' }}>
                <div style={{ border: '1px solid black'}}>
                    Countdown until { intervalMode }
                </div>
                <div>
                    { currentTimeString } remaining
                </div>
            </div>               
        </div>
    )
}

export default PomodoroTimer