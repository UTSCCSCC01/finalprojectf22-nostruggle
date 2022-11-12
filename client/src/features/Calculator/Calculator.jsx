import './Calculator.css';
import { Button } from '@mui/material';
import { useState, useRef, useEffect } from 'react'
import ButtonPad from './ButtonPad';
import { resizeInput } from './WrapContent';
import ToolBarDraggableWrapper from '../ToolsBar/ToolBarDraggableWrapper';
import CalculatorIcon from './CalculatorIcon';
import katex from 'katex';

const Calculator = () => {

    const [ open, toggleOpen ] = useState(true);
    const [ inputs, setInputs ] = useState([{
        inputType: 'default',
        inputValue: '',
        isEmpty: true,
        inputFields: [{ type: 'default-field', value: '' }]
    }]);
    const [ lastFocusIndex, setLastFocusIndex ] = useState(0);

    useEffect( () => {
        console.log(inputs)
    }, [inputs])

    const KaTeXComponent = (props) => {
        const containerRef = useRef();
    
        useEffect(() => {
            katex.render(props.tex, containerRef.current, {
                throwOnError: false
            });
        }, [props]);
    
        return <span className={ props.className } ref={ containerRef } />
    }

    const addInput = (action) => {
        var inputFields;

        switch (action) {
            case 'integrate':
                inputFields = [
                    { type: 'large-math-symbol', value: '\\int' },
                    { type: 'superscript-field', value: '' },
                    { type: 'subscript-field', value: '' },
                    { type: 'default-field', value: '' },
                    { type: 'medium-math-symbol', value: 'dx' }
                ];
                break;
            case 'exponent':
                inputFields = [
                    { type: 'default-field', value: '' },
                    { type: 'superscript-field', value: '' }
                ];
                break;
            default:
                inputFields = [
                    { type: 'default-field', value: '' }
                ];
                break;
        }

        const newInput = [{
            inputType: action,
            inputValue: '',
            isEmpty: true,
            inputFields: inputFields
        }];
        const index = lastFocusIndex > 0 && lastFocusIndex < inputs.length ? lastFocusIndex : 0;
        setInputs(inputs.slice(0,index).concat(newInput).concat(inputs.slice(index)));
    }

    const onInput = (event, inputIndex, fieldIndex) => {
        if (inputIndex < 0 || inputIndex >= inputs.length || fieldIndex < 0 || fieldIndex >= inputs[inputIndex].inputFields.length) {
            return;
        }

        setLastFocusIndex(inputIndex);
        const inputSelectionIndex = event.target.selectionStart;

        if (event.inputType === 'insertText') {
            const oldValue = inputs[inputIndex].inputFields[fieldIndex].value;
            const newValue = oldValue.slice(0, inputSelectionIndex - 1) + event.data + oldValue.slice(inputSelectionIndex);
            
            setInputs(inputs.map((input, i) => (
                i === inputIndex ?
                { ...input,
                    isEmpty: false,
                    inputFields: input.inputFields.map((field, j) => (
                        j === fieldIndex ?
                        { ...field, value: newValue }
                        : { ...field }
                    ))}
                : { ...input }
            )));
        } else if (event.inputType === 'deleteContentBackward' || event.inputType === 'deleteContentForward') {
            if (inputs[inputIndex].inputFields[fieldIndex].value !== null && inputs[inputIndex].inputFields[fieldIndex].value.length > 0) {
                const oldValue = inputs[inputIndex].inputFields[fieldIndex].value;
                const newValue = oldValue.slice(0, inputSelectionIndex) + oldValue.slice(inputSelectionIndex + 1);
                
                setInputs(inputs.map((input, i) => (
                    i === inputIndex ? 
                    { ...input,
                        inputFields: (input.inputFields.map((field, j) => (
                            j === fieldIndex ? 
                            { ...field, value: newValue }
                            : { ...field }
                        )))}
                    : { ...input }
                )));
            }
        }
    }

    const checkBackspace = (event, inputIndex) => {
        if (inputIndex < 0 || inputIndex >= inputs.length) {
            return;
        }
        
        if (event.key === 'Backspace') {
            if (inputs[inputIndex].isEmpty) {
                setInputs(inputs.filter((input, i) => i !== inputIndex));
                return;
            }
        } 

        setInputs(inputs.map((input, i) => (
            i === inputIndex ? 
            { ...input, 
                inputValue: inputToTex(inputIndex),
                isEmpty: checkForEmptyInput(inputIndex)
            }
            : { ...input }
        )));
    }
    
    const checkForEmptyInput = (inputIndex) => {
        if (inputIndex < 0 || inputIndex >= inputs.length) {
            return;
        }
        
        for (let i = 0; i < inputs[inputIndex].inputFields.length; i++) {
            const field = inputs[inputIndex].inputFields[i];

            if (!field.type.includes('math-symbol') && field.value.length > 0) {
                return false
            }
        }
        return true
    }

    const displayInput = (fields, i) => {
        const inputJsx = [];

        for (let j = 0; j < fields.length; j++) {
            const field = fields[j];

            if (field.type.includes('math-symbol')) {
                inputJsx.push(
                    <KaTeXComponent className={ field.type } tex={ field.value } />
                )
            } else if (field.type === 'default-field') {
                inputJsx.push(
                    <input
                    className={ field.type }
                    style={{ width: resizeInput(field.value, field.type)}}
                    value={ field.value }
                    onChange={(e) => onInput(e.nativeEvent, i, j)}
                    onKeyUp={(e) => checkBackspace(e, i)}
                    />
                );
            } else {
                const verticalInputsJsx = [];

                while (j < fields.length && fields[j].type !== 'default-field') {
                    const index = j;
                    verticalInputsJsx.push(
                        <input
                        className={ fields[index].type }
                        style={{ width: resizeInput(fields[index].value, fields[index].type)}}
                        value={ fields[index].value }
                        onChange={(e) => onInput(e.nativeEvent, i, index)}
                        onKeyUp={(e) => checkBackspace(e, i)}
                        />
                    )
                    j++;
                }
                j--;

                inputJsx.push(
                    <div 
                    className='vertical-align' 
                    style={{ width: Math.max( ...fields.map((field) => (
                        field.type !== 'default-field' && !field.type.includes('math-symbol') ? parseInt(resizeInput(field.value, field.type)) : 9
                    )), 0)}}>
                        { verticalInputsJsx }
                    </div>
                )
            }
        }

        return <>{ inputJsx }</>
    }

    const inputToTex = (inputIndex) => {
        switch (inputs[inputIndex].inputType) {
            case 'integrate':
                const fields = inputs[inputIndex].inputFields.map((field) => field.value);
                return `\\int^{${fields[1]}}_{${fields[2]}}{${fields[3]}}dx`;
            default:
                break;
        }
        const str = inputs[inputIndex].inputFields.map((field) => {
            if (field.type.includes('math-symbol')) {
                return field.value;
            } else if (field.type) {

            }
        }).join();
        
    }
    
    const renderTex = (id, tex) => {
        const element = document.getElementById(id);

        if (element !== null) {
            katex.render(tex, element, {
                throwOnError: false
            });
        }
    }

    const toTex = (str) => {
        //"\\", "^", "~", '&', '%', '$', '#', '_', '{', '}'
        const ascii = [ '*' ]
        const latex = [ 'cdot' ]

        for (let a of ascii) {
            if (str.includes(a)) {
                str = str.replace(a, latex[ascii.indexOf(a)]);
            }
        }
        return str
    }

    return (
        <>
            {
                open &&
                <ToolBarDraggableWrapper>

                    <div className='calculator-box'>
                        <div className='calculator-inputs' >
                            {
                                inputs.length > 0 ? inputs.map((input, i) => displayInput(input.inputFields, i))
                                : setInputs([{
                                        inputType: 'default',
                                        inputValue: '',
                                        isEmpty: true,
                                        inputFields: [{ type: 'default-field', value: '' }]
                                    }])
                            }
                        </div>
                        
                        <div className='calculator-buttons'>
                            <ButtonPad addInput={ addInput } />
                            {/* <h3>{inputs.map((input) => getFormattedInput(input)).join("")}</h3>
                            <p id='ReadThis'>{ inputs.map((input) => ' ' + input.affix[0] + input.inputValue + input.affix[1]).join("")}</p>
                        <p id='WriteToThis'></p> */}
                        </div>
                        <KaTeXComponent className={ 'always-display-input' } tex={ inputs.map((input) => '{' + input.inputValue + '}').join().replaceAll(',', '') } />
                        <span id='error-message' />
                    </div>
                 
                </ToolBarDraggableWrapper>
            }
            <CalculatorIcon open={open} onClick={() => toggleOpen(!open)}/>
        </>
    )
}

export default Calculator