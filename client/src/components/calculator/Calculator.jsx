import './Calculator.css'
import ButtonPad from './ButtonPad'
import ToolBarDraggableWrapper from '../../components/navigation/ToolsBar/ToolBarDraggableWrapper'
import { useEffect, useState, useRef } from 'react'
import { resizeInput } from './WrapContent'
import KaTeXClearButton from '../buttons/KaTeXClearButton'
import KaTeXComponent from './KaTeXComponent'
import BlueButton from '../buttons/BlueButton'
import { Divider, IconButton, Button } from '@mui/material'
import { DragIndicator, Remove } from '@mui/icons-material';
import { simplify } from '../../features/StandardCalculator/standardCalculatorLogic';
import { derivativeType } from '../../features/DerivativeCalculator/derivativeCalculatorLogic';
import { findIntegral } from '../../features/IntegralCalculator/integralCalculatorLogic'
import { useUserState } from '../../features/SignUp/UserContext'

const Calculator = ({ calculatorType, buttons, closeCalculator }) => {
    const { userState, setUserState } = useUserState()
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
    const [ showSolution, setShowSolution ] = useState(false);
    const solution = useRef('');
    const operators = [ 'plus', 'minus', 'multiply', 'divide'];


    const addUserInput = () => {
        for (let i = 0; i < userInput.inputFields.length; i++) {
            const field = userInput.inputFields[i];
            if (field.value.match('\\d{16,}') || !field.type.includes('math-symbol') && !field.value.match('^[a-zA-Z0-9+-/*()|^]*$')) {
                setUserError(true);
                return;
            }
        }

        setInputs([
            ...inputs,
            {
                inputType: userInput.inputType,
                isEmpty: userInput.isEmpty,
                inputValue: userInput.inputValue,
                inputFields: userInput.inputFields
            }
        ]);

        if (activeButton !== '') {
            var inactive = document.getElementById(calculatorType + activeButton);
            inactive.classList.remove('active');
        }
        setActiveButton(inputs.length);
        setUserError(false);
    }

    const updateUserInput = () => {
        for (let i = 0; i < userInput.inputFields.length; i++) {
            const field = userInput.inputFields[i];
            if (field.value.match('\\d{16,}') || !field.type.includes('math-symbol') && !field.value.match('^[a-zA-Z0-9+-/*()|^]*$')) {
                setUserError(true);
                return;
            }
        }

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
        setUserError(false);
    }

    const removeUserInput = () => {
        setUserError(false);
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

    useEffect(() => {
        if (showSolution) {
            setInputs([]);
            setUserError(false);
            setActiveButton('');
            setUserInput(defaultField);
        }
    }, [showSolution])

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
                setShowSolution(false);
                return;
            case 'GO':
                const prefix = calculatorType === 'integrate' ? '\\displaystyle\\int' : calculatorType === 'derive' ? '\\frac{d}{dx}' : '';
                const affix = calculatorType === 'integrate' ? 'dx' : '';
                solution.current = <>
                <KaTeXComponent className='solution' tex={ prefix + inputs.map((input) => inputToTex(input)).join('') + affix} />       
                { calculateSolution() }
                </>
                setShowSolution(true);
                return;
            case 'exponent':
                inputValue = '\\square^{\\square}';
                inputFields = [
                    { type: 'default-field', value: '' },
                    { type: 'superscript-field', value: '' }
                ];
                break;
            case 'cos': case 'sin': case 'tan': case 'log':
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
        
        var newInput = [{
            inputType: action,
            inputValue: inputValue,
            isEmpty: true,
            inputFields: inputFields
        }];
        const index = activeButton === '' ? inputs.length === 0 ? 0 : inputs.length - 1 : activeButton + 1;
        if (activeButton !== '') {
            var inactive = document.getElementById(calculatorType + activeButton);
            inactive.classList.remove('active');
        }

        if (operators.includes(action)) {
            if (index === 0 || (index > 0 && operators.includes(inputs[index - 1].inputType))) {
                newInput = [
                    {
                        inputType: defaultField.inputType,
                        inputValue: defaultField.inputValue,
                        isEmpty: defaultField.isEmpty,
                        inputFields: defaultField.inputFields
                    },
                    ...newInput
                ];
            }
            if (index === inputs.length || (index < inputs.length && operators.includes(inputs[index].inputType))) {
                newInput.push({
                    inputType: defaultField.inputType,
                    inputValue: defaultField.inputValue,
                    isEmpty: defaultField.isEmpty,
                    inputFields: defaultField.inputFields
                });
            }
        }
        setActiveButton(index);
        setInputs(inputs.slice(0,index).concat(newInput).concat(inputs.slice(index)));
        setShowSolution(false);
    }

    const onInput = (event, fieldIndex) => {
        setUserError(false);
        setShowSolution(false);
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
            inputValue: inputToTex(userInput),
            isEmpty: checkForEmptyInput()
        });
    }

    const inputToTex = (inputArr) => {
        const fields = inputArr.inputFields.map((field) => field.value === '' ? '\\square' : convertStringToLatex(field.value));
        switch (inputArr.inputType) {
            case 'cos': case 'sin': case 'tan': case 'log':
                return `\\${userInput.inputType}(${fields[1]})`;
            case 'exponent':
                return `${fields[0]}^{${fields[1]}}`;
            case 'brackets':
                return `(${fields[1]})`;
            case 'fraction':
                return `\\frac{${fields[0]}}{${fields[2]}}`;
            case 'root':
                return `\\sqrt[${fields[0]}]{${fields[1]}}`;
            case 'multiply':
                return `\\times`;
            case 'divide':
                return `\\div`;
            default:
                return fields[0];
        }
    }

    function convertStringToLatex(str){
    
        const around = ["^", "/"]
        const side = ["-", "+", "*"]
        const fns = ["cos", "log", "sin", "tan", "(", ")"]
        const separators = around.concat(side).concat(fns)
        const addLatex = (symbol, prev, next) => {
            switch(symbol){
                case "^":
                    return `${prev}^{${next}}`
                case "/":
                    return `\\frac{${prev}}{${next}}`      
                case "*":
                    return '\\times '          
            }
            return symbol;
        }
    
        const terms = str.split("").reduce((prev, current, index) => {
            if (separators.includes(current)){
                //console.log("separator " + current)
    
                return [...prev, current, ""]
            } else {
                //console.log("no separator " + current)
                if (index > 0){
                    const latest = prev[prev.length - 1];
                    prev[prev.length - 1] = latest + current;
                } else {
                    prev.push(current);
                }
                return prev
            }
        }, []).filter(term => term.trim() != '')
        console.log(terms)
    
        const toLatex = (terms) => {
            let latexString = terms.map((term, index) => {
                let prev, next;
                prev = terms[index - 1];
                next = terms[index + 1]
                if (around.includes(next) || around.includes(prev)){
                    return ""
                } 
                return addLatex(term, prev, next)
            }).join("")
        
            return latexString;
        }
    
        let stack = []
        let result = []
        let numBrackets = 0
        terms.forEach(term => {
            if (term === ')'){
                numBrackets--
                stack.push(term)
                let lastIndex = stack.lastIndexOf('(')
                const part = stack.slice(lastIndex,)
                if (numBrackets === 0){
                    result.push(toLatex(stack))
                    stack = []
                } else {
                    stack = stack.slice(0, lastIndex).concat([toLatex(part)])
                }
            } else if (term === '(') {
                numBrackets++
                stack.push(term)
            } else if (stack.length > 0){
                stack.push(term)
            } else {
                result.push(term)
            }
            console.log(stack)
            console.log(result)
        });
    
        return toLatex(result)
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

    const calculateSolution = () => {
        const str = inputs.map((input, i) => {
            switch (input.inputType) {
                case 'cos': case 'sin': case 'tan': case 'log':
                    return input.inputType + '(' + input.inputFields[1].value + ')';
                case 'exponent':
                    return input.inputFields[0].value + '^(' + input.inputFields[1].value + ')';
                case 'brackets':
                    return '(' + input.inputFields[1].value + ')';
                case 'fraction':
                    return '(' + input.inputFields[0].value + ')/(' + input.inputFields[2].value + ')';
                case 'root':
                    return input.inputFields[1].value + '^(1/' + input.inputFields[0].value + ')';
                case 'plus':
                    return '+';
                case 'minus':
                    return '-';
                case 'multiply':
                    return '*';
                case 'divide':
                    return '/';
                default:
                    return input.inputFields[0].value;
            }
        }).join('');

        switch (calculatorType) {
            case 'standard':
                return <KaTeXComponent className='solution' tex={ '=' + convertStringToLatex(simplify(str)) } />    
            case 'derive':
                return <KaTeXComponent className='solution' tex={ '=' + convertStringToLatex(derivativeType(str)) } />
            case 'integrate':
                return <KaTeXComponent className='solution' tex={ '=' + convertStringToLatex(findIntegral(str)) } />  
            case 'default':
                console.log('nothing yet');
                return <span></span>;
        }
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
                    style={{ width: resizeInput(field.value, field.type), border: userError ? '1px solid #EA5932' : '1px solid lightskyblue'}}
                    value={ field.value }
                    onChange={(e) => onInput(e.nativeEvent, i)}
                    onKeyUp={(e) => checkBackspace(e, i)}
                    />
                );
            } else {
                const verticalInputsJsx = [];
                var isFraction = false;

                while (i < fields.length && fields[i].type !== 'default-field') {
                    if(fields[i].type === 'divider-math-symbol') {
                        isFraction = true;
                        verticalInputsJsx.push(
                            <Divider sx={{ width: '100%', backgroundColor: 'black', marginTop: '4px', marginBottom: '4px'}} />
                        )
                    } else if (fields[i].type.includes('math-symbol')) {
                        verticalInputsJsx.push(
                            <KaTeXComponent className={ fields[i].type } tex={ fields[i].value } />
                        )
                    } else {
                        const index = i;
                        verticalInputsJsx.push(
                            <input
                            className={ fields[index].type }
                            style={{ width: resizeInput(fields[index].value, fields[index].type), border: userError ? '1px solid #EA5932' : '1px solid lightskyblue'}}
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
                    style={{ alignItems: isFraction ? 'center' : '' }}>
                        { verticalInputsJsx }
                    </div>
                )
            }
        }

        return <div className='user-input-container'>{ inputJsx }</div>
    }

    const displayOptions = () => {
        const optionsJsx = [];

        if (activeButton === '') {
            optionsJsx.push(
                <BlueButton 
                onClick={(e) => {
                    e.currentTarget.blur();
                    addUserInput();
                }}
                disabled={ operators.includes(userInput.inputType) }
                sx={{ height: '30px', width: '20px', fontSize: '14px', marginLeft: '14px', padding: '0px'}}
                >ADD</BlueButton>
            );            
        } else {
            optionsJsx.push(
                <BlueButton 
                onClick={(e) => {
                    e.currentTarget.blur();
                    updateUserInput();
                }}
                disabled={ activeButton === '' || operators.includes(userInput.inputType) }
                sx={{ height: '30px', width: '20px', fontSize: '14px', marginLeft: '14px', padding: '0px'}}
                >UPDATE</BlueButton>
            );
            
        }

        optionsJsx.push(
            <BlueButton
            onClick={(e) => {
                e.currentTarget.blur();
                removeUserInput();
            }}
            disabled={ activeButton === '' }
            sx={{ height: '30px', width: '20px', fontSize: '14px', marginLeft: '14px', padding: '0px'}}
            >REMOVE</BlueButton>
        )

        return <div className='user-options' style={{ height: optionsJsx.length * 30 + 'px'}}>{ optionsJsx }</div>
    }

    return (
        <ToolBarDraggableWrapper handle='#calculator-handle'>
            <div className='calculator-box' >
                <Button id='calculator-handle'>
                    <DragIndicator color=''/>
                </Button>
                <IconButton sx={{position: "absolute", right: 10, top: 1 }} children={<Remove/>}  onClick={() => setUserState({...userState, [calculatorType]: false}) }/>
                <span id='error-message' />
                <div className='calculator-inputs' >
                    <div className='problem'>
                        {
                            showSolution ?
                            solution.current
                            : <>
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
                            </>
                        }
                    </div>
                    <div className='user-input'>
                        {
                            userInput !== '' && 
                            <>
                            { !operators.includes(userInput.inputType) && displayInput(userInput.inputFields) }
                            { displayOptions() }
                            </>
                        }
                    </div>
                </div>
                <span className='error-message'>{ userError ? 'The current expression is unsupported' : '\u00A0' }</span>
                <div className='calculator-buttons'>
                    <ButtonPad handleClick={ (action) => addInput(action) } buttons={ buttons } />
                </div>
            </div>
        </ToolBarDraggableWrapper>
    )
}

export default Calculator