import { Park } from "@mui/icons-material"
import ToolsBarButton from "../../components/buttons/ToolsBarButton"
import theme from '../../theme'

const FactorMultipleIcon = ({ onClick, open }) => {

  const handleClick = (e) => {
      e.currentTarget.blur();
      onClick();
  }

  return (
    <div className='FactorMultipleIcon'>
      <ToolsBarButton style={{
          position: 'relative',
          color: open ? theme.button_active : theme.button_inactive
      }}
      onClick={ (e) => handleClick(e) }
      startIcon={ <Park sx={{ width:'30px', height: '30px', color: open ? theme.button_active : theme.button_inactive }} /> }
      >Factor Multiple</ToolsBarButton>
    </div>
  )
}

export default FactorMultipleIcon