import { IconButton } from '@mui/material'
import { ReactComponent as FunctionIcon } from '../../assets/icons/functions.svg'
import ToolsBarButton from "../../components/buttons/ToolsBarButton"
import theme from "../../theme"
import { useUserState } from '../SignUp/UserContext'
const IntegralIcon = ({ iconVariant }) => {

    const { userState, setUserState } = useUserState();
    const handleClick = (e) => {
        e.currentTarget.blur();
        setUserState({ ...userState, integrate: !userState.integrate})
    }

    return (
        <div className='IntegralIcon'>
            {
                iconVariant === 'text' ?
                <ToolsBarButton style={{
                    position: 'relative',
                    color:  userState.integrate ? theme.button_active : theme.button_inactive
                }}
                onClick={ (e) => handleClick(e) }
                startIcon={ <FunctionIcon width='30px' height='30px' /> }
                >Integral Calculator</ToolsBarButton>
                :
                <IconButton
                onClick={ (e) => handleClick(e) }
                children={ <FunctionIcon width='30px' height='30px' /> } />
            }
        </div>
    )
}

export default IntegralIcon