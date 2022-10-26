import CalculatorInput from './CalculatorInput';
import './Calculator.css';
import { Button } from '@mui/material';
import { useEffect, useRef, useState } from 'react'


const Calculator = () => {

    const functions = [ 'default', 'exponent', 'integral', 'summation']; //tmp

    const [ inputType, setInputType ] = useState(['default']);

    const [ entry, setEntry ] = useState('');
    
    const getInput = () => {
        const collection = Array.from(document.querySelectorAll('div.CalculatorInputField input'));
        setEntry(collection.map((item) => item.value));
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