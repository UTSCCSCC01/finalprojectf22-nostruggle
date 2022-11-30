import { IconButton } from '@mui/material'
import { ReactComponent as TableIcon } from '../../assets/icons/table.svg'
import ToolsBarButton from "../../components/buttons/ToolsBarButton"
import theme from "../../theme"

const MatrixIcon = ({ onClick, open, iconVariant }) => {

    const handleClick = (e) => {
        e.currentTarget.blur();
        onClick();
    }

    return (
        <div className='MatrixIcon'>
            {
                iconVariant === 'text' ?
                <ToolsBarButton style={{
                    position: 'relative',
                    color: open ? theme.button_active : theme.button_inactive
                }}
                onClick={ (e) => handleClick(e) }
                startIcon={ <TableIcon width='30px' height='30px' /> }
                >Matrix Calculator</ToolsBarButton>
                :
                <IconButton
                onClick={ (e) => handleClick(e) }
                children={ <TableIcon width='30px' height='30px' /> } />
            }
            </div>
    )
}

export default MatrixIcon