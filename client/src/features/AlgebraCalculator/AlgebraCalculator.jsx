import { useState } from 'react'
import ToolBarDraggableWrapper from '../../components/navigation/ToolsBar/ToolBarDraggableWrapper'
import AlgebraIcon from "./AlgebraIcon"

const AlgebraCalculator = ({ iconVariant }) => {
    const [ open, toggleOpen ] = useState(false);

    return (
        <>
            {
                open &&
                <ToolBarDraggableWrapper>
                    <span></span>
                </ToolBarDraggableWrapper>
            }
            <AlgebraIcon iconVariant={iconVariant} open={open} onClick={() => toggleOpen(!open)}/>
        </>
    )
}

export default AlgebraCalculator