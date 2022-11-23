import {styled} from '@mui/material/styles';
import Button from '@mui/material/Button';
import theme from '../../theme'

const BlueButton = styled(Button)({
    position: 'relative',
    boxShadow: '0 1px 4px 0 ' + theme.shadow_color + ',0 1px 4px 0 ' + theme.shadow_color +' !important',
    textTransform: 'none',
    fontSize: 22,
    border: '1px solid',
    lineHeight: 1.5,
    textAlign: 'left',
    margin: '4px',
    backgroundColor: theme.primary_bgcolor,
    borderColor: theme.border_color,
    fontFamily: theme.primary_fontfamily,
    '&:hover, &:focus': {
        color: theme.button_hoverfg + ' !important'
    },
    '&:active': {
        color: theme.button_active,
        boxShadow: 'none'
    }
});

export default BlueButton