import {styled} from '@mui/material/styles';
import Button from '@mui/material/Button';
import theme from '../../theme'

const GreenButton = styled(Button)({
    position: 'relative',
    boxShadow: '0 1px 4px 0 ' + theme.shadow_color + ',0 1px 4px 0 ' + theme.shadow_color +' !important',
    textTransform: 'none',
    fontSize: 22,
    border: '1px solid',
    lineHeight: 1.5,
    margin: '4px',
    color: '#386b25',
    backgroundColor: '#aec993',
    borderColor: '#6e9c76',
    fontFamily: theme.primary_fontfamily,
    '&:hover, &:focus': {
        color: '#386b25 !important',
        backgroundColor: '#cce0b8 !important'
    }
});

export default GreenButton