import ToolsBarButton from "../../components/buttons/ToolsBarButton"
import  { CalculateOutlined } from "@mui/icons-material"
import theme from "../../theme"

const AlgebraIcon = ({ onClick, open }) => {

    const handleClick = (e) => {
        e.currentTarget.blur();
        onClick();
    }

    return (
        <div className='AlgebraIcon'>
            <ToolsBarButton style={{
                position: 'relative',
                color: open ? theme.button_active : theme.button_inactive
            }}
            onClick={ (e) => handleClick(e) }
            startIcon={ <CalculateOutlined sx={{ width:'30px', height: '30px', color: open ? theme.button_active : theme.button_inactive }} /> }
            >Algebra Calculator</ToolsBarButton>
        </div>
    )
}

export default AlgebraIcon