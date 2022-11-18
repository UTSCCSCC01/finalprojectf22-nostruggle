import { useState } from 'react'
import ToolBarDraggableWrapper from '../../components/navigation/ToolsBar/ToolBarDraggableWrapper'
import IntegralIcon from "./IntegralIcon"

const IntegralCalculator = ({ iconVariant }) => {
    const [ open, toggleOpen ] = useState(false);

    return (
        <>
            {
                open &&
                <ToolBarDraggableWrapper>
                    <span></span>
                </ToolBarDraggableWrapper>
            }
            <IntegralIcon iconVariant={iconVariant} open={open} onClick={() => toggleOpen(!open)}/>
        </>
    )
}

export default IntegralCalculator