import { IconButton, Table } from "@mui/material"
import { ReactComponent as TableIcon } from '../../assets/icons/table.svg'

const LinearAlgebraIcon = ({ onClick, open }) => {
    return (
        <div className='LinearAlgebraIcon'>
            <IconButton size='large' onClick={onClick} children={<TableIcon width='50px' height='50px' style={{fill: 'grey'}} />}/>
        </div>
    )
}

export default LinearAlgebraIcon