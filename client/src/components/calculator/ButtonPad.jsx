import { Grid , IconButton } from '@mui/material';

const ButtonPad = ({ addInput, buttons }) => {
    
    const buttonsJsx = [];

    const numCol = buttons.length <= 7 ? buttons.length : buttons.length % 2 === 0 ? buttons.length/2 : (buttons.length + 1)/2;
        
    for (let i = 0; i < buttons.length; i += numCol) {
        buttonsJsx.push(
            <Grid container
            justifyContent="center"
            key={ i }>
                { buttons.filter((value, index) => index > i && index <= i + numCol).map((button, index) => (
                    <IconButton 
                    key={ index }
                    sx={{ boxShadow: 1, borderRadius: 2 }}
                    onClick={ () => addInput(button.action) }>
                        { button.icon }
                    </IconButton>
                ))}
            </Grid>
        )
    }

    return <>{ buttonsJsx }</>
}

export default ButtonPad
