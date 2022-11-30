import { useState } from 'react'
import Calculator from '../../components/calculator/Calculator';
import IntegralIcon from "./IntegralIcon"

const IntegralCalculator = ({ iconVariant }) => {
    const [ open, toggleOpen ] = useState(false);

    const integralButtons = [
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
                <Calculator calculatorType='integrate' buttons={ integralButtons }  closeCalculator={() => toggleOpen(false)} />
            }
            <IntegralIcon iconVariant={iconVariant} open={open} onClick={() => toggleOpen(!open)}/>
        </>
    )
}

export default IntegralCalculator