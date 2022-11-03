import ToolBarDraggableWrapper from '../ToolsBar/ToolBarDraggableWrapper';
import CalculatorInput from './CalculatorInput';
import './Calculator.css';
import { Button } from '@mui/material';
import { useState } from 'react';
import CalculatorIcon from './CalculatorIcon';
const Calculator = () => {

    const [ open, toggleOpen ] = useState(false)
    const functions = [ 'default', 'exponent', 'integral', 'summation']; //tmp

    const [ inputType, setInputType ] = useState('default');

    return (
        <>
            {
                  open &&
                  <ToolBarDraggableWrapper>

                  <div className='CalculatorBox'>
                      <CalculatorInput inputType={ inputType }/>
          
                      {functions.map((fun) => <Button onClick={ () => setInputType(fun) } >{fun}</Button> )}
          
          
          
                  </div>
                  </ToolBarDraggableWrapper>
            }
            <CalculatorIcon open={open} onClick={() => toggleOpen(!open)}/>
        </>
        
    )
}

export default Calculator