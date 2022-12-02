import {styled} from '@mui/material/styles';
import Button from '@mui/material/Button';
import theme from '../../theme'

const RedButton = styled(Button)({
    position: 'relative',
    boxShadow: '0 1px 4px 0 ' + theme.shadow_color + ',0 1px 4px 0 ' + theme.shadow_color +' !important',
    textTransform: 'none',
    fontSize: 22,
    border: '1px solid',
    lineHeight: 1.5,
    margin: '4px',
    color: '#b14040',
    backgroundColor: '#fab6bc',
    borderColor: '#c6949b',
    fontFamily: theme.primary_fontfamily,
    '&:hover, &:focus': {
        color: '#980707 !important',
        backgroundColor: '#fab6bc !important'
    }
});

export default RedButton