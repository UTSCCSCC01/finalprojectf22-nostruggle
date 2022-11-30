import { useState } from 'react'
import Calculator from '../../components/calculator/Calculator';
import StandardCalculatorIcon from "./StandardCalculatorIcon"

const StandardCalculator = ({ iconVariant }) => {

    const [ open, toggleOpen ] = useState(false);

    const standardButtons = [
        { action: 'log',        tex: '\\log' },
        { action: 'cos',        tex: '\\cos' },
        { action: 'sin',        tex: '\\sin' },
        { action: 'tan',        tex: '\\tan' },
        { action: 'brackets',   tex: '(\\square)' },
        { action: 'fraction',   tex: '\\frac{\\square}{\\square}' },
        { action: 'exponent',   tex: '\\square^{\\square}' },
        { action: 'root',       tex: '\\sqrt[\\square]{\\square}' },
        { action: 'plus',        tex: '+' },
        { action: 'minus',      tex: '-' },
        { action: 'multiply',   tex: '\\times' },
        { action: 'divide',     tex: '\\div' }
    ];

    return (
        <>
            {
                open &&
                <Calculator calculatorType='standard' buttons={ standardButtons }  closeCalculator={() => toggleOpen(false)} />
            }
            <StandardCalculatorIcon iconVariant={iconVariant} open={open} onClick={() => toggleOpen(!open)}/>
        </>
    )
}

export default StandardCalculator