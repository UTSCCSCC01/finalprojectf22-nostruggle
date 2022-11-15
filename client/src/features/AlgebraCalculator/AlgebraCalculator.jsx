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
                    <div>
                        <p> placeholder </p>
                    </div>
                </ToolBarDraggableWrapper>
            }
            <AlgebraIcon iconVariant={iconVariant} open={open} onClick={() => toggleOpen(!open)}/>
        </>
    )
}

export default AlgebraCalculator