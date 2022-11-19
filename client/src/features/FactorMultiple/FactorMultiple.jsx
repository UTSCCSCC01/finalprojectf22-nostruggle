import { useState } from "react"
import { Card, CardHeader, TextField, InputLabel, Typography, Button, IconButton } from "@mui/material"
import ToolBarDraggableWrapper from '../../components/navigation/ToolsBar/ToolBarDraggableWrapper'
import FactorMultipleIcon from "./FactorMultipleIcon"
import { DragIndicator, Remove } from "@mui/icons-material"
import './FactorMultiple.css'
const FactorMultiple = ({ iconVariant }) => {
    const [ open, toggleOpen ] = useState(false)
    const [ numberToFactor, setNumberToFactor ] = useState(0)
    const [ factorMessage, setFactorMessage ] = useState({})

    const [ multipleOf, setMultipleOf ] = useState('')
    const [ factorOf, setFactorOf ] = useState('')
    const [ multipleMessage, setMultipleMessage ] = useState({})

    const computeFactors = async (number) => {
        let factors = []
        for (let i = 1; i <= number / 2; i++){
            if (number % i === 0){
                factors.push(i);
            }
        }
        factors.push(number);
        setFactorMessage({ message: `The factors of ${number} are ${factors.join(', ')}`, error: false})
        return factors
    }

    const handleComputeFactors = async () => {
        const number = parseInt(numberToFactor)
        console.log("computing")
        if (number > 0) {
            if (number > 100000000) {
                setFactorMessage({ message: `Number must be lower than 100000000`, error: true})
            } else {
                const result = await computeFactors(number)
                setFactorMessage({ message: `The factors of ${number} are ${result.join(', ')}`, error: false})
            }
        } else {
            setFactorMessage({ message: `Must be a positive integer`, error: true })
        }
        console.log("done computing")

    }

    const computeMultipleOf = () => {
        const multipleOfNum = parseInt(multipleOf)
        const factorOfNum = parseInt(factorOf)

        if (multipleOfNum && factorOfNum) {
            if (multipleOfNum % factorOfNum === 0 ) {
                setMultipleMessage({ message: `${multipleOfNum} is a multiple of ${factorOfNum}`, error: false})
            } else {
                setMultipleMessage({ message: `${multipleOfNum} is NOT a multiple of ${factorOfNum}`, error: false})
            }
        }  else {
            setMultipleMessage({ message: `Invalid input`, error: true })
        }

    }
    return (
        <>
            { open &&
                <ToolBarDraggableWrapper handle='#factorMultipleHandle'>
                    <Card className='FactorMultiple'>
                        <Button id='factorMultipleHandle'>
                            <DragIndicator color=''/>
                        </Button>
                        <IconButton sx={{position: 'absolute', right: 10, top: 0}} onClick={() => toggleOpen(false)}><Remove/></IconButton>
                        <CardHeader sx={{margin: 'auto', paddingTop: 0 }} title="Factor / Multiples"/>
                        <InputLabel>Find factors of: </InputLabel>
                        <TextField type='number' value={numberToFactor} onChange={(e) => setNumberToFactor(e.target.value)} /> 
                        <Typography variant='body1' color={factorMessage.error ? 'error' : 'primary'}>
                            { factorMessage.message }
                        </Typography>
                        <Button onClick={handleComputeFactors}>Compute</Button>  
                        <div className='multipleTitle' style={{ display: 'flex', alignItems: 'flex-end' }}>
                            <Typography variant='subtitle1'>Is </Typography>
                            <TextField variant='filled' sx={{width: 100}} size='small' type='number' value={multipleOf} onChange={(e) => setMultipleOf(e.target.value)} /> 
                            <Typography variant='subtitle1'>a multiple of </Typography>
                            <TextField variant='filled' sx={{width: 100}} size='small' type='number' value={factorOf} onChange={(e) => setFactorOf(e.target.value)} /> 
                        </div> 
                        <Typography color={multipleMessage.error ? 'error' : 'primary'}>
                            { multipleMessage.message }
                        </Typography>
                        <Button onClick={computeMultipleOf}>Compute</Button>   
                    </Card> 
                </ToolBarDraggableWrapper>
            }
            <FactorMultipleIcon iconVariant={iconVariant} open={open} onClick={() => toggleOpen(!open)}/>
        </>
    )
}

export default FactorMultiple