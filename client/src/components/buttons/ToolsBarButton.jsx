import {styled} from '@mui/material/styles';
import Button from '@mui/material/Button';
import theme from '../../theme'

const ToolsBarButton = styled(Button)({
    position: 'relative',
    boxShadow: 'none',
    textTransform: 'none',
    fontSize: 18,
    padding: '6px 12px',
    border: '1px solid',
    lineHeight: 1.5,
    textAlign: 'left',
    backgroundColor: theme.primary_bgcolor,
    borderColor: theme.primary_bgcolor,
    fontFamily: theme.primary_fontfamily,
    '&:hover, &:focus': {
        backgroundColor: theme.button_hoverbg + ' !important',
        borderColor: theme.button_hoverbg + ' !important',
        color: theme.button_hoverfg + ' !important',
        boxShadow: '0px 5px 10px ' +  theme.button_shadow + ' !important',
        transform: 'translateY(-3px) !important'
    },
    '&:active, &:focus': {
        backgroundColor: theme.primary_bgcolor,
        borderColor: theme.primary_bgcolor,
        color: theme.button_active,
        boxShadow: 'none'
    }
});

export default ToolsBarButton