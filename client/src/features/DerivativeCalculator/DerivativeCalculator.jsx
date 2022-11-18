import { useState } from 'react'
import ToolBarDraggableWrapper from '../../components/navigation/ToolsBar/ToolBarDraggableWrapper'
import DerivativeIcon from "./DerivativeIcon"

const DerivativeCalculator = ({ iconVariant }) => {
    const [ open, toggleOpen ] = useState(false);

    return (
        <>
            {
                open &&
                <ToolBarDraggableWrapper>
                    <div>
                        <p> placeholder </p>
                    </div>
                </ToolBarDraggableWrapper>
            }
            <DerivativeIcon iconVariant={iconVariant} open={open} onClick={() => toggleOpen(!open)}/>
        </>
    )
}

export default DerivativeCalculator