import LogoDevIcon from '@mui/icons-material/LogoDev';
import { IconButton } from "@mui/material"
import ToolsBarButton from "../../components/buttons/ToolsBarButton"
import theme from '../../theme'
import { useUserState } from '../SignUp/UserContext';
const DerivativeIcon = ({ open, iconVariant }) => {

  const { userState, setUserState } = useUserState();

  const handleClick = (e) => {
      e.currentTarget.blur();
      setUserState({...userState, derive: !userState.derive})
  }

  return (
    <div className='DerivativeIcon'>
      {
        iconVariant === 'text' ?
        <ToolsBarButton style={{
            position: 'relative',
            color:  userState.derive ? theme.button_active : theme.button_inactive
        }}
        onClick={ (e) => handleClick(e) }
        startIcon={ <LogoDevIcon sx={{ width:'30px', height: '30px', color:  userState.derive ? theme.button_active : theme.button_inactive }} /> }
        >Derivative Calculator</ToolsBarButton>
        :
        <IconButton
        onClick={ (e) => handleClick(e) }
        children={ <LogoDevIcon sx={{ width:'30px', height: '30px', color:  userState.derive ? theme.button_active : theme.button_inactive }} /> } />
      }
    </div>
  )
}

export default DerivativeIcon