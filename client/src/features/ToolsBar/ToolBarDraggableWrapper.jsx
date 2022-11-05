import Draggable from 'react-draggable'

const ToolBarDraggableWrapper = ({children, handle}) => {
  return (
    <Draggable handle={handle} bounds={{ left: 0 }}>
        {children}
    </Draggable>
  )
}

export default ToolBarDraggableWrapper