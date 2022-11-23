import { useState } from 'react'
import Calculator from '../../components/calculator/Calculator';
import AlgebraIcon from "./AlgebraIcon"

const AlgebraCalculator = ({ iconVariant }) => {

    const [ open, toggleOpen ] = useState(false);

    const algebraButtons = [
        { action: 'ln',         tex: '\\ln' },
        { action: 'log',        tex: '\\log' },
        { action: 'cos',        tex: '\\cos' },
        { action: 'sin',        tex: '\\sin' },
        { action: 'tan',        tex: '\\tan' },
        { action: 'brackets',   tex: '(\\square)' },
        { action: 'abs',        tex: '\\lvert\\square\\rvert' },
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
                <Calculator calculatorType='algebra' buttons={ algebraButtons }  closeCalculator={() => toggleOpen(false)} />
            }
            <AlgebraIcon iconVariant={iconVariant} open={open} onClick={() => toggleOpen(!open)}/>
        </>
    )
}

export default AlgebraCalculator