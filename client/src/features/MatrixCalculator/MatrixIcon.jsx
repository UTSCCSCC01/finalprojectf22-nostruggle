import { IconButton } from '@mui/material'
import { ReactComponent as TableIcon } from '../../assets/icons/table.svg'
import ToolsBarButton from "../../components/buttons/ToolsBarButton"
import theme from "../../theme"
import { useUserState } from '../SignUp/UserContext';

const MatrixIcon = ({ iconVariant }) => {
    const { userState,
         setUserState } = useUserState()

    const handleClick = (e) => {
        e.currentTarget.blur();
        setUserState({...userState, matrix: !userState.matrix})
    }

    return (
        <div className='MatrixIcon'>
            {
                iconVariant === 'text' ?
                <ToolsBarButton style={{
                    position: 'relative',
                    color: userState.matrix ? theme.button_active : theme.button_inactive
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