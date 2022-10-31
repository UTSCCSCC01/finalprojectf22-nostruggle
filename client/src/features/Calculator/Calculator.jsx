import CalculatorInput from './CalculatorInput';
import './Calculator.css';
import { Button, Grid , IconButton } from '@mui/material';
import { useEffect, useRef, useState } from 'react'
import { ButtonPad } from './ButtonPad';
import WrapContentField from '../../components/forms/WrapContentField';

const Calculator = () => {
    
    const [ inputs, setInputs ] = useState([{ type: 'DefaultField', inputValue: 'a'}]);
    
    const checkBackspace = (e, i) => {
        if (e.key === 'Backspace'){
            console.log(inputs[i])
            if (inputs[i].isEmpty) { // if input has no text, remove the input from the inputs array
                console.log("Removing " + i)
                setInputs(inputs.filter((input, j) => i != j ))
                return
            } 
        }
        checkForEmptyInput(i)
    }

    const onInput = (event, i) => {
        const inputSelectionIndex = event.target.selectionStart // checks where in the input the user typed at
        console.log(inputSelectionIndex)
        // check if the event is typing text
        if (event.inputType === 'insertText'){
            setInputs(inputs.map((input, index) => index != i ? input : {...input, inputValue: input.inputValue.slice(0, inputSelectionIndex - 1) + event.data + input.inputValue.slice(inputSelectionIndex - 1)})) // append event.data (the char inputted) to inputValue
        } else if (event.inputType === 'deleteContentBackward' || event.inputType === 'deleteContentForward'){
            if (inputs[i].inputValue.length > 0){ // if the input has text, remove the char at the selected index
                let newValue = inputs[i].inputValue.slice(0, inputSelectionIndex) + inputs[i].inputValue.slice(inputSelectionIndex + 1)
                setInputs(inputs.map((input, index) => index != i ? input : {...input, inputValue: newValue}))
            }
        }
    }

    const checkForEmptyInput = (i) => {
        console.log(`Checking empty at ${i}`)
        setInputs(inputs.map((input, index) => ({...input, isEmpty: input.inputValue.length === 0}))) 
    }

    const addOrange = () => {
        setInputs(inputs.slice(0, 1).concat([{ type: 'orange', inputValue: '', isEmpty: true}]).concat(inputs.slice(1)))
    }
    
    const ButtonPadJsx = [];
    
    for (let i = 0; i < ButtonPad.length; i += 7) {
        ButtonPadJsx.push(
            <Grid container
            justifyContent="center">
                {ButtonPad.filter((value, index) => index > i && index <= i + 7).map((button) => (
                    <IconButton 
                    sx={{ boxShadow: 1, borderRadius: 2 }}
                    onClick={() => {
                        setInputs([...inputs, { type: button.action, inputValue: '' }])
                    }}>
                        { button.icon }
                    </IconButton>
                ))}
            </Grid>
        )
    }

    const getFormattedInput = (item) => {
        switch (item.type) {
            case 'exponent':
                return item.inputValue.length === 0 ? item.inputValue : '^' + item.inputValue;
            default:
                return item.inputValue;
        }
    }

    return (
        <div className='CalculatorBox'>

            <div className='CalculatorInputField' >
                { inputs.map((input, i) => (
                    <WrapContentField
                    type={ input.type }
                    value={ input.inputValue }
                    onChangedInput={(e) => onInput(e.nativeEvent, i)}
                    onBackspace={ (e) => checkBackspace(e, i) }
                    />
                ))}
            </div>

            <Grid container>
                { ButtonPadJsx }
            </Grid>

            <h1>{inputs.map((input) => getFormattedInput(input)).join("")}</h1>
            <button onClick={addOrange}>Add orange input at index 1</button>

        </div>
    )
}

export default Calculator