import Draggable from 'react-draggable'

const ToolBarDraggableWrapper = ({children}) => {
  return (
    <Draggable bounds={{ left: 0 }}>
        {children}
    </Draggable>
  )
}

export default ToolBarDraggableWrapper