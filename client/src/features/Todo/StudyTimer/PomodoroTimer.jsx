import { Button, IconButton, Container, Input, Card, Box, Autocomplete, TextField, FormControl, Typography } from '@mui/material';
import { Settings, ArrowDropUp, ArrowDropDown } from '@mui/icons-material'
import { useState, useEffect } from 'react'
import { timerBreakInterval } from './constants'
import { convertTimeStringToSeconds } from '../../utils/timeUtils';
const PomodoroTimer = ({ setIntervalTime, currentTime, currentTimeString, intervalMode, isRunning }) => {

    const [ intervalInputTime, setIntervalInputTime ] = useState('')
    const [ hasSetIntervalInputTime, toggleSetIntervalInputTime ] = useState(false)

    return (
        <Autocomplete options={timerBreakInterval} size='small' sx={{ width: '190px', fontFamily: 'Bahnschrift'}}
        onInputChange={(event, newInputValue) => setIntervalInputTime(newInputValue)}
        renderInput={(params) => <TextField {...params} sx={{ fontFamily: 'Bahnschrift'}} size='small' label={<Typography variant="headline" sx={{ fontFamily: 'Bahnschrift', fontSize: '18px'}} >Time until break</Typography>} />}
    />
        // <div>
        //         <div style={{ textAlign: 'center', width: '100%' }}>
        //                 <div>               
        //                     <b>{intervalMode.toUpperCase()} TIME</b>
        //                 </div>
        //             <div style={{position: 'relative', padding: '0.5rem', border: '1px solid black'}}>

        //                 <span>Countdown until { intervalMode === 'study' ? 'break' : 'study'}</span>
        //                 <IconButton sx={{position: 'absolute', bottom: hasSetIntervalInputTime ? '60%' : '0', top: '0', right: '0'}} onClick={() => toggleSetIntervalInputTime(!hasSetIntervalInputTime)}
        //                     children={ !hasSetIntervalInputTime ? <ArrowDropDown/> : <ArrowDropUp/> }
        //                  />
        //                 <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'start' }}>
        //                     {
        //                         hasSetIntervalInputTime &&
        //                         <>
        //                             <Button onClick={() => intervalInputTime && setIntervalTime(convertTimeStringToSeconds(intervalInputTime))}>Set</Button>
        //                             <FormControl sx={{ width: 200, paddingTop: '0.2rem' }}>
        //                                 <Autocomplete options={timerBreakInterval} size='small'
        //                                     onInputChange={(event, newInputValue) => setIntervalInputTime(newInputValue)}
        //                                     renderInput={(params) => <TextField {...params} size='small' label="Interval before break" />}
        //                                 />
        //                             </FormControl> 
        //                         </> 
        //                     }          
        //                 </div>
        //             </div>
        //             {
                        
        //                 <div>
        //                     { currentTime !== 0 && !isRunning && "PAUSED - " }{ currentTimeString && `${currentTimeString} remaining`} 
        //                 </div>

        //             }  
     
        //         </div>  
                                                
        // </div>
    )
}

export default PomodoroTimer