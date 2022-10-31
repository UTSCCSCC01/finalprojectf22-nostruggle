import CalculatorInput from './CalculatorInput';
import './Calculator.css';
import { Button } from '@mui/material';
import { useEffect, useRef, useState } from 'react'
import { ButtonPad } from './ButtonPad';

const Calculator = () => {

    const functions = [ 'default', 'exponent', "fraction" ]; //tmp

    const [ inputType, setInputType ] = useState([{type:'default', value:''}]);

    const [ entry, setEntry ] = useState('');

    const getFormattedInput = (item) => {
        switch (item.classList.value) {
            case 'SuperScript':
                return item.value.length === 0 ? item.value : '^' + item.value;
            case 'SubScript':
                return item.value.length === 0 ? item.value : '_' + item.value;
            default:
                return item.value;
        }
    }
    
    const getInput = () => {
        const collection = Array.from(document.querySelectorAll('div.CalculatorInputField input'));
        console.log(collection);
        setEntry( collection.map((item) => getFormattedInput(item)));
    }
    
    return (
        <div className='CalculatorBox'>

            <div className='CalculatorInputField' >
                {inputType.map((type, index) => <CalculatorInput inputType={ type } index={ index } onBackspace={ () => setInputType(inputType.filter((value, i) => i !== index))} />)}
            </div>

            <Button onClick={() => getInput}>click to submit string</Button>

            <p>{ entry }</p>

            {functions.map((fun) => <Button onClick={ () => setInputType([...inputType, fun]) } >{fun}</Button> )}

        </div>
    )
}

export default Calculator