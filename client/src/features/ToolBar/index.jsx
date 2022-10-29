import { useState } from "react"
import StudyTimer from "../Todo/StudyTimer/StudyTimer"
import Calculator from "../Calculator/Calculator"
import { Drawer } from "@mui/material"
import './ToolBar.css'
import { IconButton } from "@mui/material"
import { ReactComponent as FunctionIcon } from '../../assets/icons/functions.svg'
import { ReactComponent as TableIcon } from '../../assets/icons/table.svg'

const ToolBar = () => {

    return (
        <Drawer variant='persistent' anchor='left' open={ true } className='ToolBar'>
            <StudyTimer/>
            <Calculator/>
            <IconButton size='small' children={<FunctionIcon width='50px' height='50px' style={{fill: 'grey'}}/>}/>
            <IconButton size='small' children={<TableIcon width='50px' height='50px' style={{fill: 'grey'}}/>}/>

        </Drawer>
    )
}

export default ToolBar