import { Icon } from '@iconify/react';
import { Grid , IconButton } from '@mui/material';

const ButtonPad = (props) => {
    
    const buttonSx = 'calculator-button-icon'

    const buttons = [
        { action: 'cos',        icon: <Icon icon="mdi:math-cos" className={ buttonSx } /> },
        { action: 'integrate',  icon: <Icon icon="mdi:math-integral" className={ buttonSx } /> },
        { action: 'log',        icon: <Icon icon="mdi:math-log" className={ buttonSx } /> },
        { action: 'sin',        icon: <Icon icon="mdi:math-sin" className={ buttonSx } /> },
        { action: 'tan',        icon: <Icon icon="mdi:math-tan" className={ buttonSx } /> },
        { action: 'brackets',   icon: <Icon icon="mdi:code-parentheses" className={ buttonSx } /> },
        { action: 'fraction',   icon: <Icon icon="mdi:fraction-one-half" className={ buttonSx } /> },
        { action: 'exponent',   icon: <Icon icon="mdi:exponent" className={ buttonSx } /> },
        { action: '0',          icon: <Icon icon="mdi:numeric-0" className={ buttonSx } /> },
        { action: '1',          icon: <Icon icon="mdi:numeric-1" className={ buttonSx } /> },
        { action: '2',          icon: <Icon icon="mdi:numeric-2" className={ buttonSx } /> },
        { action: '3',          icon: <Icon icon="mdi:numeric-3" className={ buttonSx } /> },
        { action: '4',          icon: <Icon icon="mdi:numeric-4" className={ buttonSx } /> },
        { action: '5',          icon: <Icon icon="mdi:numeric-5" className={ buttonSx } /> },
        { action: '6',          icon: <Icon icon="mdi:numeric-6" className={ buttonSx } /> },
        { action: '7',          icon: <Icon icon="mdi:numeric-7" className={ buttonSx } /> },
        { action: '8',          icon: <Icon icon="mdi:numeric-8" className={ buttonSx } /> },
        { action: '9',          icon: <Icon icon="mdi:numeric-9" className={ buttonSx } /> },
        { action: '+',          icon: <Icon icon="mdi:plus" className={ buttonSx } /> },
        { action: '-',          icon: <Icon icon="mdi:minus" className={ buttonSx } /> },
        { action: '/',          icon: <Icon icon="mdi:division" className={ buttonSx } /> },
        { action: '=',          icon: <Icon icon="mdi:equal" className={ buttonSx } /> }
    ];

    const buttonsJsx = [];
        
    for (let i = 0; i < buttons.length; i += 7) {
        buttonsJsx.push(
            <Grid container
            justifyContent="center"
            key={ i }>
                { buttons.filter((value, index) => index > i && index <= i + 7).map((button, index) => (
                    <IconButton 
                    key={ index }
                    sx={{ boxShadow: 1, borderRadius: 2 }}
                    onClick={ () => props.addInput(button.action) }>
                        { button.icon }
                    </IconButton>
                ))}
            </Grid>
        )
    }

    return <>{ buttonsJsx }</>
}

export default ButtonPad
