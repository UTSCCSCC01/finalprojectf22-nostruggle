import { IconButton } from "@mui/material"
import  { CalculateOutlined } from "@mui/icons-material"

const CalculatorIcon = ({ onClick, open }) => {
    return (
        <div className='Calculate'>
            <IconButton size='large' onClick={onClick} children={<CalculateOutlined color={open ? 'primary' : ''} sx={{ fontSize: '40px'}} />}/>
        </div>
    )
}

export default CalculatorIcon