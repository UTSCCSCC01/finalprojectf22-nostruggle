import { useState } from 'react'
import Calculator from '../../components/calculator/Calculator';
import IntegralIcon from "./IntegralIcon"
import { useUserState } from '../SignUp/UserContext';
const IntegralCalculator = ({ iconVariant }) => {
    const [ open, toggleOpen ] = useState(false);
    const { userState } = useUserState();
    const integralButtons = [
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
                userState.integrate &&
                <Calculator calculatorType='integrate' buttons={ integralButtons }  closeCalculator={() => toggleOpen(false)} />
            }
        </>
    )
}

export default IntegralCalculator