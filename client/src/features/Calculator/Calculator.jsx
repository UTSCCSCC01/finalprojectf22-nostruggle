import CalculatorInput from './CalculatorInput';
import './Calculator.css';
import { Button } from '@mui/material';
import { useEffect, useRef, useState } from 'react'


const Calculator = () => {

    const functions = [ 'default', 'exponent', 'integral', 'summation']; //tmp

    const [ inputType, setInputType ] = useState(['default']);

    const [ entry, setEntry ] = useState('');

    const getFormattedInput = (item) => {
        console.log(item.classList.value);
        switch (item.classList.value) {
            case 'ExponentPower':
                return item.value.length === 0 ? item.value : '^' + item.value;
            default:
                return item.value
        }
    }
    
    const getInput = () => {
        const collection = Array.from(document.querySelectorAll('div.CalculatorInputField input'));
        console.log(collection);
        setEntry( collection.map((item) => getFormattedInput(item)));
    }


    return (
        <div className='CalculatorBox'>

            <div className='CalculatorInputField' 
                onKeyUp={ getInput }>
                {inputType.map((type) => <CalculatorInput inputType={ type }/>)}
            </div>
            
            <p>{ entry }</p>

            {functions.map((fun) => <Button onClick={ () => setInputType([...inputType, fun]) } >{fun}</Button> )}

        </div>
    )
}

export default Calculator