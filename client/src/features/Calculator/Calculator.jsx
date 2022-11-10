import './Calculator.css';
import { Grid, Button } from '@mui/material';
import { useEffect, useState } from 'react'
import ButtonPad from './ButtonPad';
import WrapContentField from '../../components/forms/WrapContentField';
import { resizeInput } from './WrapContent';
import ToolBarDraggableWrapper from '../ToolsBar/ToolBarDraggableWrapper';
import CalculatorIcon from './CalculatorIcon';
import katex from 'katex';

const Calculator = () => {

    const [ open, toggleOpen ] = useState(true);
    const [ inputs, setInputs ] = useState([{
        inputType: 'default',
        inputValue: '',
        isEmpty: true,
        nestedInputs: []
    }]);

    const renderTex = (id, tex) => {
        const element = document.getElementById(id);

        if (element !== null) {
            katex.render(tex, element, {
                throwOnError: false
            });
        }
    }

    const toTex = (str) => {
        //"\\", "^", "~", '&', '%', '$', '#', '_', '{', '}'
        const ascii = [ '*', '\\' ]
        const latex = [ 'cdot', '\\backslash' ]

        for (let a of ascii) {
            if (str.includes(a)) {
                console.log(a + ' is included');
                str = str.replace(a, latex[ascii.indexOf(a)]);
            }
        }
        console.log(str);
        return str
    }

    const addInput = (action) => {
        switch (action) {
            case 'exponent':
                
                break;
        
            default:
                break;
        }
    }

    return (
        <>
            {
                open &&
                <ToolBarDraggableWrapper>

                    <div className='CalculatorBox'>

                        <div className='CalculatorInput' >
                            <span id='test'/>
                            <input onInput={(e) => renderTex('test', toTex(e.target.value))} ></input>
                        </div>
                        
                        <div className='CalculatorButtonPad'>
                            <Grid container>
                                <ButtonPad addInput={ addInput } />
                            </Grid>
                            {/* <h3>{inputs.map((input) => getFormattedInput(input)).join("")}</h3>
                            <p id='ReadThis'>{ inputs.map((input) => ' ' + input.affix[0] + input.inputValue + input.affix[1]).join("")}</p>
                            <p id='WriteToThis'></p> */}
                        </div>
                    </div>
                 
                </ToolBarDraggableWrapper>
            }
            <CalculatorIcon open={open} onClick={() => toggleOpen(!open)}/>
        </>
    )
}

export default Calculator