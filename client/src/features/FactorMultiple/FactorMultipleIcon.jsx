import { Park } from "@mui/icons-material"
import { IconButton } from "@mui/material"
const FactorMultipleIcon = ({ onClick }) => {
  return (
    <IconButton size='large' onClick={onClick}>
        <Park fontSize='large' />
    </IconButton>
  )
}

export default FactorMultipleIcon