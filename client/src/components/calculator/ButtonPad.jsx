import { Grid , IconButton } from '@mui/material';
import GreenButton from '../buttons/GreenButton';
import KaTeXButton from '../buttons/KaTeXButton';
import RedButton from '../buttons/RedButton';

const ButtonPad = ({ handleClick, buttons }) => {
    
    const buttonsJsx = [];

    buttonsJsx.push(<div style={{ display: 'flex', justifyContent: 'center'}}>
        <RedButton onClick={ (e) => {
            e.currentTarget.blur();
            handleClick('CLEAR');
        }}> CLEAR</RedButton>
        <GreenButton onClick={ (e) => {
            e.currentTarget.blur();
            handleClick('GO');
        }}>GO</GreenButton>
    </div>)

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
                    buttonColour='blue'
                    />
                ))}
            </Grid>
        )
    }

    return <>{ buttonsJsx }</>
}

export default ButtonPad
