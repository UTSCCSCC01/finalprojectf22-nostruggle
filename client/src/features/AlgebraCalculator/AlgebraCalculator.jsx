import { useState } from 'react'
import ToolBarDraggableWrapper from '../../components/navigation/ToolsBar/ToolBarDraggableWrapper'
import AlgebraIcon from "./AlgebraIcon"

const AlgebraCalculator = () => {
    const [ open, toggleOpen ] = useState(false);

    return (
        <>
            {
                open &&
                <ToolBarDraggableWrapper>
                 
                </ToolBarDraggableWrapper>
            }
            <AlgebraIcon open={open} onClick={() => toggleOpen(!open)}/>
        </>
    )
}

export default AlgebraCalculator