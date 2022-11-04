import { useState } from "react"
import StudyTimer from "../Todo/StudyTimer/StudyTimer"
import Calculator from "../Calculator/Calculator"
import { Drawer } from "@mui/material"
import './ToolBar.css'
import { IconButton } from "@mui/material"
import { ReactComponent as FunctionIcon } from '../../assets/icons/functions.svg'
import LinearAlgebraCalculator from "../LinearAlgebraCalculator/LinearAlgebraCalculator"

const ToolsBar = () => {

    return (
        <div className='ToolBar'>
            <StudyTimer/>
            <Calculator/>
            <IconButton size='small' children={<FunctionIcon width='50px' height='50px' style={{fill: 'grey'}}/>}/>
            <LinearAlgebraCalculator/>

        </div>
    )
}

export default ToolsBar