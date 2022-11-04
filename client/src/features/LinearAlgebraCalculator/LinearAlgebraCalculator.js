import { useState } from 'react'
import ToolBarDraggableWrapper from '../ToolsBar/ToolBarDraggableWrapper';
import LinearAlgebraIcon from './LinearAlgebraIcon'
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
            <LinearAlgebraIcon open={open} onClick={() => toggleOpen(!open)}/>
        </>
    )

}

export default LinearAlgebraCalculator
