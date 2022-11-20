import { useState } from 'react'
import Calculator from '../../components/calculator/Calculator';
import { AlgebraButtons } from './AlgebraButtons';
import AlgebraIcon from "./AlgebraIcon"

const AlgebraCalculator = ({ iconVariant }) => {
    const [ open, toggleOpen ] = useState(false);

    return (
        <>
            {
                open &&
                <Calculator buttons={ AlgebraButtons } />
            }
            <AlgebraIcon iconVariant={iconVariant} open={open} onClick={() => toggleOpen(!open)}/>
        </>
    )
}

export default AlgebraCalculator