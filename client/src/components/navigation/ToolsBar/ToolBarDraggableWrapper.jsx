import Draggable from 'react-draggable'
import { useUserState } from '../../../features/SignUp/UserContext';


const ToolBarDraggableWrapper = ({children, handle}) => {
  const { userState } = useUserState();

  return (
    <Draggable 
    handle={handle} 
    bounds={{ left: userState.shift ? 170 : 10, top: -120}} 
    defaultPosition={{x: userState.shift ? 300 : 100, y: 0}} >
        {children}
    </Draggable>
  )
}

export default ToolBarDraggableWrapper