import AccountTreeIcon from '@mui/icons-material/AccountTree';
import { IconButton } from "@mui/material"
import ToolsBarButton from "../../components/buttons/ToolsBarButton"
import theme from '../../theme'
import { useUserState } from "../SignUp/UserContext"

const FactorMultipleIcon = ({ onClick, open, iconVariant }) => {
  const { userState, setUserState } = useUserState()

  const handleClick = (e) => {
      e.currentTarget.blur();
      setUserState({...userState, factor: !userState.factor})
  }

  return (
    <div className='FactorMultipleIcon'>
      {
        iconVariant === 'text' ?
        <ToolsBarButton style={{
            position: 'relative',
            color:  userState.factor ? theme.button_active : theme.button_inactive
        }}
        onClick={ (e) => handleClick(e) }
        startIcon={ <AccountTreeIcon sx={{ width:'30px', height: '30px', color:  userState.factor ? theme.button_active : theme.button_inactive }} /> }
        >Factor Multiple</ToolsBarButton>
        :
        <IconButton
        onClick={ (e) => handleClick(e) }
        children={ <AccountTreeIcon sx={{ width:'30px', height: '30px', color:  userState.factor ? theme.button_active : theme.button_inactive }} /> } />
      }
    </div>
  )
}

export default FactorMultipleIcon