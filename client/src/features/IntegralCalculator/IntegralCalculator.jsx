import { useState } from 'react'
import ToolBarDraggableWrapper from '../../components/navigation/ToolsBar/ToolBarDraggableWrapper'
import IntegralIcon from "./IntegralIcon"

const IntegralCalculator = () => {
    const [ open, toggleOpen ] = useState(false);

    return (
        <>
            {
                open &&
                <ToolBarDraggableWrapper>
                 
                </ToolBarDraggableWrapper>
            }
            <IntegralIcon open={open} onClick={() => toggleOpen(!open)}/>
        </>
    )
}

export default IntegralCalculator