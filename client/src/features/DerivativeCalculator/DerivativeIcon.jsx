import LogoDevIcon from '@mui/icons-material/LogoDev';
import { IconButton } from "@mui/material"
import ToolsBarButton from "../../components/buttons/ToolsBarButton"
import theme from '../../theme'

const DerivativeIcon = ({ onClick, open, iconVariant }) => {

  const handleClick = (e) => {
      e.currentTarget.blur();
      onClick();
  }

  return (
    <div className='DerivativeIcon'>
      {
        iconVariant === 'text' ?
        <ToolsBarButton style={{
            position: 'relative',
            color: open ? theme.button_active : theme.button_inactive
        }}
        onClick={ (e) => handleClick(e) }
        startIcon={ <LogoDevIcon sx={{ width:'30px', height: '30px', color: open ? theme.button_active : theme.button_inactive }} /> }
        >Derivative Calculator</ToolsBarButton>
        :
        <IconButton
        onClick={ (e) => handleClick(e) }
        children={ <LogoDevIcon sx={{ width:'30px', height: '30px', color: open ? theme.button_active : theme.button_inactive }} /> } />
      }
    </div>
  )
}

export default DerivativeIcon