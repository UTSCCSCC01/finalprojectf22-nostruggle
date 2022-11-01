import CalculatorInput from './CalculatorInput';
import './Calculator.css';
import { Button } from '@mui/material';
import { useState } from 'react';

const Calculator = () => {

    const functions = [ 'default', 'exponent', 'integral', 'summation']; //tmp

    const [ inputType, setInputType ] = useState('default');

    return (
        <div className='CalculatorBox'>
            <CalculatorInput inputType={ inputType }/>

            {functions.map((fun) => <Button onClick={ () => setInputType(fun) } >{fun}</Button> )}



        </div>
    )
}

export default Calculator