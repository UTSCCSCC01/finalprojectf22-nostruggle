import './Calculator.css'
import ButtonPad from './ButtonPad'
import ToolBarDraggableWrapper from '../../components/navigation/ToolsBar/ToolBarDraggableWrapper'
import { useEffect, useState } from 'react'
import { resizeInput } from './WrapContent'
import KaTeXClearButton from '../buttons/KaTeXClearButton'
import KaTeXComponent from './KaTeXComponent'
import BlueButton from '../buttons/BlueButton'
import { Divider, IconButton } from '@mui/material'
import { Remove } from '@mui/icons-material';


const Calculator = ({ calculatorType, buttons, closeCalculator }) => {

    const defaultField = {
        id: -1,
        inputType: 'default',
        inputValue: '\\square',
        isEmpty: true,
        inputFields: [{ type: 'default-field', value: '' }]
    };

    const [ inputs, setInputs ] = useState([]);
    const [ activeButton, setActiveButton ] = useState('');
    const [ userInput, setUserInput ] = useState(defaultField);
    const [ userError, setUserError ] = useState(false);
    const operators = [ 'plus', 'minus', 'multiply', 'divide'];


    const addUserInput = () => {
        var validInput = true;
        for (let i = 0; i < userInput.inputFields.length; i++) {
            const field = userInput.inputFields[i];
            if (!field.type.includes('math-symbol') && !field.value.match('^\\d+$')) {
                validInput = false;
            }
        }

        if (validInput) {

            if (userInput.id === -1 && activeButton === '') {
                setInputs([
                    ...inputs,
                    {
                        inputType: 'default',
                        isEmpty: userInput.isEmpty,
                        inputValue: userInput.inputValue,
                        inputFields: userInput.inputFields
                    }
                ]);
            } else {
                const index = userInput.id === -1 ? activeButton : userInput.id;

                setInputs(inputs.map((input, i) => (
                    i === index ?
                    {
                        ...input,
                        isEmpty: userInput.isEmpty,
                        inputValue: userInput.inputValue,
                        inputFields: userInput.inputFields
                    }
                    : { ...input }
                )));
            }
            
            if (activeButton !== '') {
                var inactive = document.getElementById(calculatorType + activeButton);
                inactive.classList.remove('active');
                setActiveButton('');
            }
            setUserInput(defaultField);
            
        } else {
            setUserError(true);
        }
    }

    const removeUserInput = () => {
        var inactive = document.getElementById(calculatorType + activeButton);
        inactive.classList.remove('active');
        setActiveButton('');
        setUserInput(defaultField);
        setInputs(inputs.filter((input, i) => i !== userInput.id));
    }

    const handleClick = (id) => {

        if (id === activeButton) {
            var inactive = document.getElementById(calculatorType + activeButton);
            inactive.classList.remove('active');
            setActiveButton('');
            setUserInput({...defaultField, id: id });

        } else {
            var active = document.getElementById(calculatorType + id);
            active.classList.add('active');
    
            if (activeButton !== '') {
                var inactive = document.getElementById(calculatorType + activeButton);
                inactive.classList.remove('active');
            }
            setActiveButton(id);

            setUserInput({
                id: id,
                inputType: inputs[id].inputType,
                inputValue: '',
                isEmpty: inputs[id].isEmpty,
                inputFields: inputs[id].inputFields
            });
        }
    }

    useEffect(() => {
        if (activeButton !== '' && activeButton >= 0 && activeButton < inputs.length) {
            var active = document.getElementById(calculatorType + activeButton);
            active.classList.add('active');
            setUserInput({ ...inputs[activeButton], id: activeButton });
        }

    }, [activeButton]);

    const addInput = (action) => {

        console.log(action);
        var inputValue;
        var inputFields;       
                    
        switch (action) {
            case 'CLEAR':
                setInputs([]);
                setActiveButton('');
                setUserInput(defaultField);
                setUserError(false);
                return;
            case 'exponent':
                inputValue = '\\square^{\\square}';
                inputFields = [
                    { type: 'default-field', value: '' },
                    { type: 'superscript-field', value: '' }
                ];
                break;
            case 'cos': case 'sin': case 'tan': case 'log': case 'ln':
                inputValue = '\\' + action + '(\\square)';
                inputFields = [
                    { type: 'large-math-symbol', value: '\\' + action + '('},
                    { type: 'default-field', value: '' },
                    { type: 'large-math-symbol', value: ')'},
                ];
                break;
            case 'brackets':
                inputValue = '(\\square)';
                inputFields = [
                    { type: 'medium-math-symbol', value: '('},
                    { type: 'default-field', value: '' },
                    { type: 'medium-math-symbol', value: ')'}
                ];
                break;
            case 'abs':
                inputValue = '\\lvert\\square\\rvert';
                inputFields = [
                    { type: 'medium-math-symbol', value: '\\Big\\lvert'},
                    { type: 'default-field', value: '' },
                    { type: 'medium-math-symbol', value: '\\Big\\rvert'}
                ];
                break;
            case 'fraction':
                inputValue = '\\frac{\\square}{\\square}';
                inputFields = [
                    { type: 'numerator-field', value: '' },
                    { type: 'divider-math-symbol', value: '' },
                    { type: 'denominator-field', value: '' }
                ];
                break;
            case 'root':
                inputValue = '\\sqrt[\\square]{\\square}';
                inputFields = [
                    { type: 'superscript-field', value: '' },
                    { type: 'default-field', value: ''}
                ]
                break;
            case 'plus': 
                inputValue = '+';
                inputFields = [
                    { type: 'medium-math-symbol', value: '+'}
                ];
                break;
            case 'minus': 
                inputValue = '-';
                inputFields = [
                    { type: 'medium-math-symbol', value: '-' }
                ];
                break;
            case 'multiply': 
                inputValue = '\\times';
                inputFields = [
                    { type: 'medium-math-symbol', value: '\\times' }
                ]
                break;
            case 'divide':
                inputValue = '\\div';
                inputFields = [
                    { type: 'medium-math-symbol', value: '\\div'}
                ]
                break;
            default:
                break;
        }

        const newInput = [{
            inputType: action,
            inputValue: inputValue,
            isEmpty: true,
            inputFields: inputFields
        }];
        
        const index = activeButton === '' ? inputs.length === 0 ? 0 : inputs.length - 1 : activeButton + 1;
        setInputs(inputs.slice(0,index).concat(newInput).concat(inputs.slice(index)));
        if (activeButton !== '') {
            var inactive = document.getElementById(calculatorType + activeButton);
            inactive.classList.remove('active');
        }
        setActiveButton(index);
    }

    const onInput = (event, fieldIndex) => {
        setUserError(false);
        if (fieldIndex < 0 || fieldIndex >= userInput.inputFields.length) {
            return;
        }
        const inputSelectionIndex = event.target.selectionStart;

        if (event.inputType === 'insertText') {
            const oldValue = userInput.inputFields[fieldIndex].value;
            const newValue = oldValue.slice(0, inputSelectionIndex - 1) + event.data.replaceAll(/\s+/g, '') + oldValue.slice(inputSelectionIndex - 1);

            setUserInput({
                ...userInput,
                isEmpty: false,
                inputFields: userInput.inputFields.map((field, i) => (
                    i === fieldIndex ?
                    { ...field, value: newValue }
                    : { ...field }
                ))
            })

        } else if (event.inputType === 'deleteContentBackward' || event.inputType === 'deleteContentForward') {
            const oldValue = userInput.inputFields[fieldIndex].value;
            const newValue = oldValue.slice(0, inputSelectionIndex) + oldValue.slice(inputSelectionIndex + 1);
            
            setUserInput({
                ...userInput,
                inputFields: userInput.inputFields.map((field, i) => (
                    i === fieldIndex ?
                    { ...field, value: newValue }
                    : { ...field }
                ))
            })
        }
    }

    const checkBackspace = (event) => {
        if (event.key === 'Backspace') {
            if (userInput.isEmpty) {
                var inactive = document.getElementById(calculatorType + activeButton);
                inactive.classList.remove('active');
                setActiveButton('');

                setInputs(inputs.filter((input, i) => i !== userInput.id));
                if (inputs.length === 1) {
                    setInputs([]);
                };

                setUserInput(defaultField);
                return;
            }
        } if(event.key === 'Enter') {
            console.log(userInput)
            addUserInput();
            return;
        }

        setUserInput({
            ...userInput,
            inputValue: inputToTex(),
            isEmpty: checkForEmptyInput()
        });
    }

    const inputToTex = () => {
        const fields = userInput.inputFields.map((field) => field.value);
        switch (userInput.inputType) {
            case 'integrate':
                return `\\int^{${fields[1]}}_{${fields[2]}}{${fields[3]}}dx`;
            case 'cos': case 'sin': case 'tan': case 'log': case 'ln':
                return `\\${userInput.inputType}(${fields[1]})`;
            case 'exponent':
                return `${fields[0]}^{${fields[1]}}`;
            case 'brackets':
                return `(${fields[1]})`;
            case 'abs':
                return `\\lvert${fields[1]}\\rvert`;
            case 'fraction':
                return `\\frac{${fields[0]}}{${fields[2]}}`
            case 'root':
                return `\\sqrt[${fields[0]}]{${fields[1]}}`
            default:
                return fields[0];
        }
    }


    const inputToStr = () => {
        const str = inputs.map((input, i) => {
            return input.inputFields.map((field, j) => {
                switch (field.type) {
                    case 'superscript-field':
                        return '^' + field.value;
                    default:
                        return field.value;
                }
            }).join();
        }).join();

        return <span id='find-this'>{ str }</span>
    }
    
    const checkForEmptyInput = () => {       
        for (let i = 0; i < userInput.inputFields.length; i++) {
            const field = userInput.inputFields[i];

            if (!field.type.includes('math-symbol') && field.value.length > 0) {
                return false
            }
        }
        return true
    }

    const displayInput = (fields) => {
        const inputJsx = [];

        for (let i = 0; i < fields.length; i++) {
            const field = fields[i];

            if (field.type.includes('math-symbol')) {
                inputJsx.push(
                    <KaTeXComponent className={ field.type } tex={ field.value } />
                )
            } else if (field.type === 'default-field') {
                inputJsx.push(
                    <input
                    className={ field.type }
                    style={{ width: resizeInput(field.value, field.type), border: userError ? '1px solid red' : '1px solid lightskyblue'}}
                    value={ field.value }
                    onChange={(e) => onInput(e.nativeEvent, i)}
                    onKeyUp={(e) => checkBackspace(e, i)}
                    />
                );
            } else {
                const verticalInputsJsx = [];

                while (i < fields.length && fields[i].type !== 'default-field') {
                    if (fields[i].type.includes('math-symbol')) {
                        verticalInputsJsx.push(
                            <KaTeXComponent className={ fields[i].type } tex={ fields[i].value } />
                        )
                    } else if(fields[i].type === 'divider') {
                        verticalInputsJsx.push(
                            <Divider sx={{ backgroundColor: 'black', marginTop: '4px', marginBottom: '4px'}} />
                        )
                    } else {
                        const index = i;
                        verticalInputsJsx.push(
                            <input
                            className={ fields[index].type }
                            style={{ width: resizeInput(fields[index].value, fields[index].type), border: userError ? '1px solid red' : '1px solid lightskyblue'}}
                            value={ fields[index].value }
                            onChange={(e) => onInput(e.nativeEvent, index)}
                            onKeyUp={(e) => checkBackspace(e, index)}
                            />
                        )
                    }
                    i++;
                }
                i--;

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

        return <div className='user-input-container'>{ inputJsx }</div>
    }

    return (
        <ToolBarDraggableWrapper>
            <div className='calculator-box' >
            <IconButton sx={{position: "absolute", right: 10, top: -1 }} children={<Remove/>}  onClick={ closeCalculator }/>
            <span id='error-message' />
            {/* { inputToStr() } */}
                <div className='calculator-inputs' >
                    <div className='problem'>
                        {
                            calculatorType === 'integrate' && 
                            <KaTeXComponent className='large-math-symbol' tex={`\\displaystyle\\int`} />
                        }
                        {
                            calculatorType === 'derive' &&
                            <KaTeXComponent className='medium-math-symbol' tex={`\\frac{d}{dx}`} />
                        }
                        {
                            inputs.map((input, i) => (
                                <KaTeXClearButton 
                                setId={ calculatorType + i } 
                                tex={`${input.inputValue}`} 
                                handleClick={() => handleClick(i)}
                                />
                            ))
                        }
                        {
                            calculatorType === 'integrate' &&
                            <KaTeXComponent className='medium-math-symbol' tex='dx' />
                        }
                    </div>
                    <div className='user-input'>
                        {
                            userInput !== '' && 
                            <>
                            { !operators.includes(userInput.inputType) && displayInput(userInput.inputFields) }
                            <div className='user-buttons'>
                                <BlueButton 
                                onClick={ addUserInput }
                                disabled={ operators.includes(userInput.inputType) }
                                sx={{ height: '30px', width: '20px', fontSize: '14px', marginLeft: '14px', padding: '0px'}}
                                >ADD</BlueButton>
                                <BlueButton
                                onClick={ removeUserInput }
                                disabled={ activeButton === '' }
                                sx={{ height: '30px', width: '20px', fontSize: '14px', marginLeft: '14px', padding: '0px'}}
                                >REMOVE</BlueButton>
                            </div>
                            </>
                        }
                    </div>
                </div>
                
                <div className='calculator-buttons'>
                    <ButtonPad handleClick={ (action) => addInput(action) } buttons={ buttons } />
                </div>
            </div>
        </ToolBarDraggableWrapper>
    )
}

export default Calculator