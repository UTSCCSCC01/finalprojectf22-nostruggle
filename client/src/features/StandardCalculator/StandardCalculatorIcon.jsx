import ToolsBarButton from "../../components/buttons/ToolsBarButton"
import  { CalculateOutlined } from "@mui/icons-material"
import theme from "../../theme"
import { IconButton } from "@mui/material"
import { useUserState } from "../SignUp/UserContext"
const StandardCalculatorIcon = ({ onClick, open, iconVariant }) => {
    const { userState, setUserState } = useUserState();
    const handleClick = (e) => {
        e.currentTarget.blur();
        setUserState({...userState, standard: !userState.standard})
    }

    return (
        <div className='AlgebraIcon'>
            {
                iconVariant === 'text' ? 
                <ToolsBarButton style={{
                    position: 'relative',
                    color:  userState.standard ? theme.button_active : theme.button_inactive
                }}
                onClick={ (e) => handleClick(e) }
                startIcon={ <CalculateOutlined sx={{ width:'30px', height: '30px', color:  userState.standard ? theme.button_active : theme.button_inactive }} /> }
                >Standard Calculator</ToolsBarButton>
                :
                <IconButton
                onClick={ (e) => handleClick(e) } 
                children={ <CalculateOutlined sx={{ width:'30px', height: '30px', color:  userState.standard ? theme.button_active : theme.button_inactive }} /> }/>
            }
        </div>
    )
}

export default StandardCalculatorIcon