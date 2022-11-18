import {styled} from '@mui/material/styles';
import Button from '@mui/material/Button';
import theme from '../../theme'

const NavBarButton = styled(Button)({
    position: 'relative',
    boxShadow: 'none',
    textTransform: 'none',
    fontSize: 18,
    padding: '6px 12px',
    border: '1px solid',
    lineHeight: 1.5,
    textAlign: 'left',
    margin: '4px',
    backgroundColor: theme.primary_bgcolor,
    borderColor: theme.primary_bgcolor,
    fontFamily: theme.primary_fontfamily,
    '&:hover, &:focus': {
        color: theme.button_hoverfg + ' !important'
    },
    '&:active, &:focus': {
        color: theme.button_active,
        boxShadow: 'none'
    }
});

export default NavBarButton