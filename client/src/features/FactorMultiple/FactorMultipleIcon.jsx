import { Park } from "@mui/icons-material"
import { IconButton } from "@mui/material"
import ToolsBarButton from "../../components/buttons/ToolsBarButton"
import theme from '../../theme'

const FactorMultipleIcon = ({ onClick, open, iconVariant }) => {

  const handleClick = (e) => {
      e.currentTarget.blur();
      onClick();
  }

  return (
    <div className='FactorMultipleIcon'>
      {
        iconVariant === 'text' ?
        <ToolsBarButton style={{
            position: 'relative',
            color: open ? theme.button_active : theme.button_inactive
        }}
        onClick={ (e) => handleClick(e) }
        startIcon={ <Park sx={{ width:'30px', height: '30px', color: open ? theme.button_active : theme.button_inactive }} /> }
        >Factor Multiple</ToolsBarButton>
        :
        <IconButton
        onClick={ (e) => handleClick(e) }
        children={ <Park sx={{ width:'30px', height: '30px', color: open ? theme.button_active : theme.button_inactive }} /> } />
      }
    </div>
  )
}

export default FactorMultipleIcon