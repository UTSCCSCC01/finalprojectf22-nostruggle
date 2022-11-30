import ToolsBarButton from "../../components/buttons/ToolsBarButton"
import  { CalculateOutlined } from "@mui/icons-material"
import theme from "../../theme"
import { IconButton } from "@mui/material"

const StandardCalculatorIcon = ({ onClick, open, iconVariant }) => {

    const handleClick = (e) => {
        e.currentTarget.blur();
        onClick();
    }

    return (
        <div className='AlgebraIcon'>
            {
                iconVariant === 'text' ? 
                <ToolsBarButton style={{
                    position: 'relative',
                    color: open ? theme.button_active : theme.button_inactive
                }}
                onClick={ (e) => handleClick(e) }
                startIcon={ <CalculateOutlined sx={{ width:'30px', height: '30px', color: open ? theme.button_active : theme.button_inactive }} /> }
                >Standard Calculator</ToolsBarButton>
                :
                <IconButton
                onClick={ (e) => handleClick(e) } 
                children={ <CalculateOutlined sx={{ width:'30px', height: '30px', color: open ? theme.button_active : theme.button_inactive }} /> }/>
            }
        </div>
    )
}

export default StandardCalculatorIcon