import  { Timer } from "@mui/icons-material"
import { IconButton } from "@mui/material"
import ToolsBarButton from "../../../components/buttons/ToolsBarButton"
import theme from "../../../theme"
import { useUserState } from "../../SignUp/UserContext"
const StudyTimerIcon = ({ onClick, time, open, iconVariant }) => {

    const { userState, setUserState } = useUserState();
    const handleClick = (e) => {
        e.currentTarget.blur();
        setUserState({...userState, timer: !userState.timer})
    }

    return (
        <div className='StudyTimerIcon' style={{ display: 'flex', flexDirection: 'column'}}>
            {
                iconVariant === 'text' ?
                <ToolsBarButton style={{
                    position: 'relative',
                    top:  userState.time ? '10px' : '',
                    color:  userState.timer ? theme.button_active : theme.button_inactive
                }}
                onClick={ (e) => handleClick(e) }
                startIcon={ <Timer sx={{ fontSize: '40px', color:  userState.timer ? theme.button_active : theme.button_inactive }}/> }
                >Study Timer</ToolsBarButton>
                :
                <IconButton
                onClick={ (e) => handleClick(e) }
                children={ <Timer sx={{ width: '20px', height: '20px' , color:  userState.matrix.timer ? theme.button_active : theme.button_inactive }}/> } />
            }
            <span style={{ fontWeight: 700, position: 'relative', marginBottom: '-10px'}}>{userState.time ? userState.time : ''}</span>
        </div>
    )
}

export default StudyTimerIcon