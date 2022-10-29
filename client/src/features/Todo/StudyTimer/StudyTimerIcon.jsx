import { IconButton } from "@mui/material"
import  { Timer } from "@mui/icons-material"

const StudyTimerIcon = ({ onClick, time, open }) => {
    return (
        <div className='StudyTimerIcon'>
            <IconButton style={{ position: 'relative', top: time ? '10px' : ''}} size='small' onClick={onClick} children={
                <Timer sx={{ fontSize: '40px' }}
                    color={open ? 'primary' : ''}
                 />
                }
            />
            <span style={{ fontWeight: 700, position: 'relative', top: '-10px'}}>{time}</span>
        </div>
    )
}

export default StudyTimerIcon