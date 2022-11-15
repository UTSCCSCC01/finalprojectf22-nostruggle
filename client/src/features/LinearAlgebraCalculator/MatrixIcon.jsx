import { ReactComponent as TableIcon } from '../../assets/icons/table.svg'
import ToolsBarButton from "../../components/buttons/ToolsBarButton"
import theme from "../../theme"

const MatrixIcon = ({ onClick, open }) => {

    const handleClick = (e) => {
        e.currentTarget.blur();
        onClick();
    }

    return (
        <div className='MatrixIcon'>
            <ToolsBarButton style={{
                position: 'relative',
                color: open ? theme.button_active : theme.button_inactive
            }}
            onClick={ (e) => handleClick(e) }
            startIcon={ <TableIcon width='30px' height='30px' /> }
            >Matrix Calculator</ToolsBarButton>
        </div>
    )
}

export default MatrixIcon