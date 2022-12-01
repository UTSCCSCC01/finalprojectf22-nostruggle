import { useState } from "react"
import { Card, CardHeader, TextField, InputLabel, Typography, Button, IconButton, Divider } from "@mui/material"
import ToolBarDraggableWrapper from '../../components/navigation/ToolsBar/ToolBarDraggableWrapper'
import FactorMultipleIcon from "./FactorMultipleIcon"
import { DragIndicator, Remove } from "@mui/icons-material"
import GreenButton from '../../components/buttons/GreenButton'
import './FactorMultiple.css'
import { useEffect } from "react"
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
            setMultipleMessage({ onLeft: !multipleOfNum, onRight: !factorOfNum, message: `Invalid input`, error: true })
        }
    }

    useEffect(() => {
        console.log(multipleMessage);
    }, [multipleMessage])

    return (
        <>
            { open &&
                <ToolBarDraggableWrapper handle='#factorMultipleHandle'>
                    <Card className='FactorMultiple'
                    sx={{
                        margin: '20px',
                        padding: '8px',
                        border: '2px solid #90b0c2',
                        borderRadius: '10px',
                        backgroundColor: '#eeeff9',
                        boxShadow: '0 10px 16px 0 rgba(4, 76, 107, 0.2),0 6px 20px 0 rgba(4, 76, 107, 0.19)'
                    }}>
                        <Button id='factorMultipleHandle'>
                            <DragIndicator color=''/>
                        </Button>
                        <IconButton sx={{position: 'absolute', right: 10, top: 0}} onClick={() => toggleOpen(false)}><Remove/></IconButton>
                        {/* <CardHeader sx={{padding: 0 }} title="Factor / Multiples"/> */}
                        <div className='factor-multiple-body'>
                            <div className='multipleTitle' style={{ display: 'flex', alignItems: 'center' }}>
                                <Typography variant='subtitle1' sx={{ color: '#2C5B73', fontSize: '20px'}}>Find factors of </Typography>
                                <div className='factor-input'>
                                    <TextField 
                                    type='number' 
                                    value={numberToFactor} 
                                    onChange={(e) => setNumberToFactor(e.target.value)} 
                                    helperText={ factorMessage.error ? factorMessage.message : '' }
                                    error={ factorMessage.error } 
                                    inputProps={{style: { margin: '4px', fontSize: '20px ', padding: '9px 4px', width: '177px'}}}
                                    FormHelperTextProps={{style: { position: 'absolute', bottom: '-25px', left: '-14px', fontSize: '14px', width: 'max-content' }}}
                                    /> 
                                    <GreenButton onClick={handleComputeFactors} sx={{ height: '56px', width: '56px', marginTop: '0px'}}>GO</GreenButton>  
                                </div>
                            </div>
                            {
                                !factorMessage.error && 
                                <Typography variant='body1' color={factorMessage.error ? 'error' : 'primary'} sx={{ position: 'fixed', top: '160px', fontSize: '20px'}} >
                                    { factorMessage.message }
                                </Typography>
                            }
                            <Divider style={{width:'80%', margin: '90px 0px 20px 20px' }} />
                            <div className='multipleTitle' style={{ display: 'flex', alignItems: 'flex-end' }}>
                                <Typography variant='subtitle1' sx={{ color: '#2C5B73', fontSize: '20px'}}>Is </Typography>
                                <TextField 
                                variant='filled' 
                                sx={{width: 100}} 
                                size='small' 
                                type='number' 
                                value={multipleOf} 
                                onChange={(e) => setMultipleOf(e.target.value)} 
                                helperText={ multipleMessage.error && multipleMessage.onLeft ? multipleMessage.message : ''} 
                                error={ multipleMessage.error && multipleMessage.onLeft } 
                                FormHelperTextProps={{style: { position: 'absolute', bottom: '-25px', left: '-10px', fontSize: '14px', width: 'max-content' }}}
                                /> 
                                <Typography variant='subtitle1' sx={{ color: '#2C5B73', fontSize: '20px'}}>a multiple of </Typography>
                                <TextField 
                                variant='filled' 
                                sx={{width: 100}} 
                                size='small' 
                                type='number' 
                                value={factorOf} 
                                onChange={(e) => setFactorOf(e.target.value)} 
                                helperText={ multipleMessage.error && multipleMessage.onRight ? multipleMessage.message : '' } 
                                error={ multipleMessage.error && multipleMessage.onRight } 
                                FormHelperTextProps={{style: { position: 'absolute', bottom: '-25px', left: '-10px', fontSize: '14px', width: 'max-content' }}}
                                /> 
                                <Typography variant='subtitle1' sx={{ color: '#2C5B73', fontSize: '20px'}}> ?</Typography>
                                <GreenButton onClick={computeMultipleOf} sx={{ height: '56px', width: '56px', marginBottom: '0px'}}>GO</GreenButton>  
                            </div> 
                            {
                                !multipleMessage.error && 
                                <Typography variant='body1' color={multipleMessage.error ? 'error' : 'primary'} sx={{ position: 'fixed', top: '340px', fontSize: '20px'}} >
                                    { multipleMessage.message }
                                </Typography>
                            }
                        </div>
                    </Card> 
                </ToolBarDraggableWrapper>
            }
            <FactorMultipleIcon iconVariant={iconVariant} open={open} onClick={() => toggleOpen(!open)}/>
        </>
    )
}

export default FactorMultiple