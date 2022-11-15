import { useState } from 'react'
import ToolBarDraggableWrapper from '../../components/navigation/ToolsBar/ToolBarDraggableWrapper'
import MatrixIcon from './MatrixIcon'
import MatrixCalculatorUI from './MatrixCalculatorUI';
import './MatrixCalculatorUI.css'

const LinearAlgebraCalculator = () => {

    const [ open, toggleOpen ] = useState(false);

    return (
        <>
            {
                open &&
                <ToolBarDraggableWrapper>
                    <div className='LinearAlgebraBox'>
                        <MatrixCalculatorUI />
                    </div>

                </ToolBarDraggableWrapper>
            }
            <MatrixIcon open={open} onClick={() => toggleOpen(!open)}/>
        </>
    )

}

export default LinearAlgebraCalculator
