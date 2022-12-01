import { useState } from 'react'
import Calculator from '../../components/calculator/Calculator';
import DerivativeIcon from "./DerivativeIcon"
import { useUserState } from '../SignUp/UserContext';
const DerivativeCalculator = ({ iconVariant }) => {
    const { userState } = useUserState();
    const [ open, toggleOpen ] = useState(false);

    const derivativeButtons = [
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
                userState.derive &&
                <Calculator calculatorType='derive' buttons={ derivativeButtons } closeCalculator={() => toggleOpen(false)} />
            }
        </>
    )
}

export default DerivativeCalculator