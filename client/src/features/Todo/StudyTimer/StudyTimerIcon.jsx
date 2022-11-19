import  { Timer } from "@mui/icons-material"
import { IconButton } from "@mui/material"
import ToolsBarButton from "../../../components/buttons/ToolsBarButton"
import theme from "../../../theme"

const StudyTimerIcon = ({ onClick, time, open, iconVariant }) => {

    const handleClick = (e) => {
        e.currentTarget.blur();
        onClick();
    }

    return (
        <div className='StudyTimerIcon' style={{ display: 'flex', flexDirection: 'column'}}>
            {
                iconVariant === 'text' ?
                <ToolsBarButton style={{
                    position: 'relative',
                    top: time ? '10px' : '',
                    color: open ? theme.button_active : theme.button_inactive
                }}
                onClick={ (e) => handleClick(e) }
                startIcon={ <Timer sx={{ fontSize: '40px', color: open ? theme.button_active : theme.button_inactive }}/> }
                >Study Timer</ToolsBarButton>
                :
                <IconButton
                onClick={ (e) => handleClick(e) }
                children={ <Timer sx={{ width: '20px', height: '20px' , color: open ? theme.button_active : theme.button_inactive }}/> } />
            }
            <span style={{ fontWeight: 700, position: 'relative', marginBottom: '-10px'}}>{time}</span>
        </div>
    )
}

export default StudyTimerIcon