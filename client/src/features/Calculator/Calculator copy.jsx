import './Calculator.css';
import { Grid , IconButton, Button } from '@mui/material';
import { useEffect, useState } from 'react'
import { ButtonPad } from './ButtonPad';
import WrapContentField from '../../components/forms/WrapContentField';
import { resizeInput } from './WrapContent';
import ToolBarDraggableWrapper from '../ToolsBar/ToolBarDraggableWrapper';
import CalculatorIcon from './CalculatorIcon';
import katex from 'katex';

const Calculator = () => {
    
    const MIN_SIZE = 18;
    
    const [ open, toggleOpen ] = useState(false)
    const [ inputs, setInputs ] = useState([]);
    const [ remainingSize, setRemainingSize ] = useState(384);
    
    const checkBackspace = (e, i) => {
        if (e.key === 'Backspace'){
            console.log(inputs[i])
            if (inputs[i].isEmpty) { // if input has no text, remove the input from the inputs array
                console.log("Removing " + i)
                setInputs(inputs.filter((input, j) => i !== j ))
                return
            } 
        }
        checkForEmptyInput(i)
    }

    useEffect(() => {
        let remaining = 376;
        const collection = document.querySelectorAll('div.CalculatorInputField > input:not(.FixedField)');
        for (let index = 0; index < collection.length; index++) {
            console.log("FOUND AN INPUT WITH WIDTH " + collection[index].offsetWidth);
            remaining -= collection[index].offsetWidth;
        }
        const element = document.querySelector('div.CalculatorInputField > input.FixedField');
        const min = element == null || remainingSize <= MIN_SIZE ? remainingSize : resizeInput(element.value, 'FixedField');
        setRemainingSize(remaining < min ? min : remaining );
        console.log("new remaining size is " + remainingSize);
    }, [inputs, remainingSize]);


    const onInput = (event, i) => {
        const inputSelectionIndex = event.target.selectionStart // checks where in the input the user typed at
        console.log(inputSelectionIndex)
        // check if the event is typing text
        if ( remainingSize > MIN_SIZE && event.inputType === 'insertText'){
            setInputs(inputs.map((input, index) => index !== i ? input : {...input, inputValue: input.inputValue.slice(0, inputSelectionIndex - 1) + event.data + input.inputValue.slice(inputSelectionIndex - 1)})) // append event.data (the char inputted) to inputValue
        } else if (event.inputType === 'deleteContentBackward' || event.inputType === 'deleteContentForward'){
            if (inputs[i].inputValue.length > 0){ // if the input has text, remove the char at the selected index
                let newValue = inputs[i].inputValue.slice(0, inputSelectionIndex) + inputs[i].inputValue.slice(inputSelectionIndex + 1)
                setInputs(inputs.map((input, index) => index !== i ? input : {...input, inputValue: newValue}))
            }
        }
    }

    const checkForEmptyInput = (i) => {
        console.log(`Checking empty at ${i}`)
        setInputs(inputs.map((input, index) => ({...input, isEmpty: input.inputValue.length === 0}))) 
    }
    
    const addInputField = (type, index) => {
        let inputFields = [];
        switch (type) {
            case 'cos': case 'log': case 'sin': case 'tan':
                inputFields = [{ type: 'DefaultField', inputValue: '', affix: [type + '(', ')'], isEmpty: true }];
                break;
            case 'integrate':
                inputFields = [{ type: 'DefaultField', inputValue: '', affix: ['integrate(', ''], isEmpty: true }, { type: 'SubScript', inputValue: '', affix: [',', ''], isEmpty: true }, { type: 'SuperScript', affix: [',', ')'], inputValue: '' }];
                break;
            case 'exponent':
                inputFields = [{ type: 'DefaultField', inputValue: '', affix: ['exponent(', ''], isEmpty: true }, { type: 'SuperScript', inputValue: '', affix: [',', ')'], isEmpty: true }];
                break;
            default:
                inputFields = [{ type: 'DefaultField', inputValue: '', affix: ['', ''], isEmpty: true }];
                break;
        }
        setInputs(inputs.slice(0,index).concat(inputFields).concat(inputs.slice(index)));
    }

    const getEndOfInput = () => {
        for (let index = 0; index < inputs.length; index++) {
            const element = inputs[index].inputValue;
            if (element === '') {
                return index;
            }
        }
        return inputs.length;
    }

    const getFormattedInput = (item) => {
        switch (item.type) {
            case 'SuperScript':
                return item.inputValue.length === 0 ? item.inputValue : '^' + item.inputValue;
            case 'SubScript':
                return item.inputValue.length === 0 ? item.inputValue : '_' + item.inputValue;
            default:
                return item.inputValue;
        }
    }

    const ButtonPadJsx = [];
    
    for (let i = 0; i < ButtonPad.length; i += 7) {
        ButtonPadJsx.push(
            <Grid container
            justifyContent="center">
                {ButtonPad.filter((value, index) => index > i && index <= i + 7).map((button) => (
                    <IconButton 
                    sx={{ boxShadow: 1, borderRadius: 2 }}
                    onClick={ () => {
                        if (remainingSize > MIN_SIZE)
                            addInputField( button.type, getEndOfInput() );
                    }}>
                        { button.icon }
                    </IconButton>
                ))}
            </Grid>
        )
    }

    const renderTex = (id, tex) => {
        const element = document.getElementById(id);
    
        katex.render(tex, element, {
            throwOnError: false
        });
    }

    return (
        <>
        <p id="test" >something</p>
        <Button onClick={ () => renderTex("test", "\\frac{a}{b}") }>click this</Button>
            {
                open &&
                <ToolBarDraggableWrapper>

                    <div className='CalculatorBox'>

                        <div className='CalculatorInputField' >
                            {
                                inputs.map((input, i) => ( <WrapContentField
                                uniqueId={ i }
                                type={ input.type }
                                value={ input.inputValue }
                                onChangedInput={ (e) => onInput(e.nativeEvent, i) }
                                onBackspace={ (e) => checkBackspace(e, i) }
                                />
                            ))}
                            {
                                remainingSize > MIN_SIZE && <input className='FixedField' style={{ width: remainingSize }}/> 
                            }
                            </div>
                            
                            <div className='CalculatorButtonPad'>
                            <Grid container>
                                { ButtonPadJsx }
                            </Grid>
                            <h3>{inputs.map((input) => getFormattedInput(input)).join("")}</h3>
                            <p id='ReadThis'>{ inputs.map((input) => ' ' + input.affix[0] + input.inputValue + input.affix[1]).join("")}</p>
                            <p id='WriteToThis'></p>
                        </div>
                    </div>
                 
                </ToolBarDraggableWrapper>
            }
            <CalculatorIcon open={open} onClick={() => toggleOpen(!open)}/>
        </>
    )
}

export default Calculator