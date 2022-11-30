import { Grid , IconButton } from '@mui/material';
import GreenButton from '../buttons/GreenButton';
import KaTeXButton from '../buttons/KaTeXButton';
import RedButton from '../buttons/RedButton';

const ButtonPad = ({ handleClick, buttons }) => {
    
    const buttonsJsx = [];

    buttonsJsx.push(<RedButton onClick={ (e) => {
        e.currentTarget.blur();
        handleClick('CLEAR');
    }}> CLEAR</RedButton>)

    buttonsJsx.push(<GreenButton onClick={ (e) => {
        e.currentTarget.blur();
        handleClick('GO');
    }}>GO</GreenButton>)

    const numCol = 4;
        
    for (let i = 0; i < buttons.length; i += numCol) {
        buttonsJsx.push(
            <Grid container
            justifyContent='center'
            key={ i }>
                { buttons.filter((value, index) => index >= i && index < i + numCol).map((button, index) => (
                    <KaTeXButton 
                    key={ index }
                    handleClick={ (e) => {
                        e.currentTarget.blur();
                        handleClick(button.action)
                    }}
                    tex={`${ button.tex }`}
                    />
                ))}
            </Grid>
        )
    }

    return <>{ buttonsJsx }</>
}

export default ButtonPad
