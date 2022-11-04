import { useState } from 'react'
import ToolBarDraggableWrapper from '../ToolsBar/ToolBarDraggableWrapper';
import LinearAlgebraIcon from './LinearAlgebraIcon'
import TestUI from './TestUI';
import './LinearAlgebraCalculator.css'


const LinearAlgebraCalculator = () => {

    const [ open, toggleOpen ] = useState(false);

    return (
        <>
            {
                open &&
                <ToolBarDraggableWrapper>
                    <div className='LinearAlgebraBox'>
                        <TestUI />
                    </div>

                </ToolBarDraggableWrapper>
            }
            <LinearAlgebraIcon open={open} onClick={() => toggleOpen(!open)}/>
        </>
    )

}

export default LinearAlgebraCalculator