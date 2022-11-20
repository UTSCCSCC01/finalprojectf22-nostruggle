import { useState } from 'react'
import Calculator from '../../components/calculator/Calculator';
import { IntegralButtons } from './IntegralButtons';
import IntegralIcon from "./IntegralIcon"

const IntegralCalculator = ({ iconVariant }) => {
    const [ open, toggleOpen ] = useState(false);

    return (
        <>
            {
                open &&
                <Calculator calculatorType='integrate' buttons={ IntegralButtons } />
            }
            <IntegralIcon iconVariant={iconVariant} open={open} onClick={() => toggleOpen(!open)}/>
        </>
    )
}

export default IntegralCalculator