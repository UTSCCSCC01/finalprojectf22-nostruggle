import  { Timer } from "@mui/icons-material"
import ToolsBarButton from "../../../components/buttons/ToolsBarButton"
import theme from "../../../theme"

const StudyTimerIcon = ({ onClick, time, open }) => {

    const handleClick = (e) => {
        e.currentTarget.blur();
        onClick();
    }

    return (
        <div className='StudyTimerIcon'>
            <ToolsBarButton style={{
                position: 'relative',
                top: time ? '10px' : '',
                color: open ? theme.button_active : theme.button_inactive
            }}
            onClick={ (e) => handleClick(e) }
            startIcon={ <Timer sx={{ fontSize: '40px', color: open ? theme.button_active : theme.button_inactive }}/> }
            >Study Timer</ToolsBarButton>
            <span style={{ fontWeight: 700, position: 'relative', top: '-10px'}}>{time}</span>
        </div>
    )
}

export default StudyTimerIcon