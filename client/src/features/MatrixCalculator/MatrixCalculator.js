import { useEffect, useState } from 'react'
import { IconButton, Button, TextField, MenuItem, Select, InputLabel, FormControl, FormHelperText } from '@mui/material'
import { DragIndicator, Remove } from '@mui/icons-material';
import ToolBarDraggableWrapper from '../../components/navigation/ToolsBar/ToolBarDraggableWrapper'
import MatrixIcon from './MatrixIcon'
import MatrixCalculatorLogic from './MatrixCalculatorLogic';

import './MatrixCalculator.css'
import KaTeXComponent from '../../components/calculator/KaTeXComponent';
import GreenButton from '../../components/buttons/GreenButton';

const MatrixCalculator = ({ iconVariant }) => {
    var mc = new MatrixCalculatorLogic();

    const [ open, toggleOpen ] = useState(false);
    const [ operation, setOperation ] = useState('');
    const [ invalidMatrix1, setInvalidMatrix1 ] = useState(false);
    const [ invalidMatrix2, setInvalidMatrix2 ] = useState(false);
    const [ missingOperationError, setMissingOperationError ] = useState(false);

    const operationOptions = [
        { key: 'determinant',   tex: `\\det(A)` },
        { key: 'transpose',     tex: `A^{T}` },
        { key: 'inverse',       tex: `A^{-1}` },
        // { key: 'rank',          tex: `\\newcommand{\\rank}{\\operatorname{rank}} \\rank(A)` },
        { key: 'multiply',      tex: `AB` },
        { key: 'addition',      tex: `A + B` },
        { key: 'subtraction',   tex: `A - B` }
    ];

    useEffect(() => {
        if (operation !== '') {
            console.log('calculating ' + operation);
            setMissingOperationError(false);
        }
    }, [operation]);

    function getItemOfType(item) {
        return <KaTeXComponent className='operation' tex={ item.tex } />
    }
    
    const handleChange = (event) => {
        setOperation(event.target.value);
    }

    useEffect(() => {
        const m1 = document.querySelectorAll('#matrix1 input');
        if (invalidMatrix1) {
            for (let i = 0; i < m1.length; i++) {
                const element = m1[i];
                element.classList.add('error-matrix')
            }
        } else {
            for (let i = 0; i < m1.length; i++) {
                const element = m1[i];
                element.classList.remove('error-matrix')
            }
        }
        console.log(m1);
    }, [invalidMatrix1]);

    useEffect(() => {
        const m2 = document.querySelectorAll('#matrix2 input');
        if (invalidMatrix2) {
            for (let i = 0; i < m2.length; i++) {
                const element = m2[i];
                element.classList.add('error-matrix')
            }
        } else {
            for (let i = 0; i < m2.length; i++) {
                const element = m2[i];
                element.classList.remove('error-matrix')
            }
        }
        console.log(m2);
    }, [invalidMatrix2]);

    const calculateSolution = () => {
        if (operation === '') {
            setMissingOperationError(true);
            return;
        }

        const m1 = document.querySelectorAll('#matrix1 input');
        for (let i = 0; i < m1.length; i++) {
            const element = m1[i];
            if (!element.value.match('^(-\\.?\\d)?\\d*(\\.\\d+)?$')) {
                console.log('invalid m1')
                setInvalidMatrix1(true);
                return;
            }
        }

        if (['multiply', 'addition', 'subtraction'].includes(operation)) {
            const m2 = document.querySelectorAll('#matrix2 input');
            for (let i = 0; i < m2.length; i++) {
                const element = m2[i];
                if (!element.value.match('^(-\\.?\\d)?\\d*(\\.\\d+)?$')) {
                    console.log('invalid m2')
                    setInvalidMatrix2(true);
                    return;
                }
            }
        }

        setInvalidMatrix1(false);
        setInvalidMatrix2(false);
        setMissingOperationError(false);

        switch (operation) {
            case 'determinant':
                mc.calculateDeterminant();
                break;
            case 'transpose':
                mc.transposeMatrix();
                break;
            case 'inverse':
                mc.invertMatrix();
                break;
            // case 'rank':
            //     mc.calculateRank();
            //     break;
            case 'multiply':
                mc.multiplyMatrix();
                break;
            case 'addition':
                mc.addMatrix();
                break;
            case 'subtraction':
                mc.subtractMatrix();
            default:
                break;
        }
    }

    return (
        <>
            {
                open &&
                <ToolBarDraggableWrapper handle='#matrix-calculator-handle'>
                    <div className='matrix-calculator-box'>
                        <Button id='matrix-calculator-handle'>
                            <DragIndicator color=''/>
                        </Button>
                        <IconButton sx={{position: "absolute", right: 10, top: 1 }} children={<Remove/>}  onClick={() => toggleOpen(false)}/>
                        <div className='matrix-options'>
                            <span style={{ fontSize: '22px', marginRight: '6px'}} >Solve for </span>
                            <FormControl error={ missingOperationError }>
                                <Select
                                value={ operation }
                                onChange={ handleChange }
                                autoWidth
                                variant='outlined'
                                sx={{ backgroundColor: 'white'}}
                                >
                                    { operationOptions.map((item) => <MenuItem sx={{ fontFamily: 'MathFont'}} value={ item.key }>{ getItemOfType(item) }</MenuItem>)}
                                </Select>
                            </FormControl>
                            <GreenButton className='go-button' onClick={ calculateSolution }>GO</GreenButton>
                        </div>
                        <div className='matrix-parent'>
                            <KaTeXComponent className='matrix-tex' tex={`A=`} />
                            <div id="matrix1" className='matrix'>
                                { [ ...Array(9).keys()].map((i) => <input className={ 'm1r' + i%3} type='text' defaultValue={0} onFocus={() => setInvalidMatrix1(false)} />)}
                            </div>
                            <KaTeXComponent className='matrix-tex' tex={`B=`} />
                            <div id="matrix2" className="matrix">
                                { [ ...Array(9).keys()].map((i) => <input className={ 'm2r' + i%3} type='text' defaultValue={0} onFocus={() => setInvalidMatrix2(false)} disabled={['determinant', 'transpose', 'inverse', 'rank'].includes(operation)} />)}	
                            </div>
                        </div>
                        <div className='matrix-solution'>
                            <span id='console'/>
                            <span id='solution'/>
                        </div>
                        { (invalidMatrix1 || invalidMatrix2) && <span className='matrix-errmsg'>Unexpected Input</span> }
                        { missingOperationError && <span className='matrix-errmsg'>Missing Operation</span> }
                    </div>
                </ToolBarDraggableWrapper>
            }
            <MatrixIcon iconVariant={ iconVariant }open={open} onClick={() => toggleOpen(!open)}/>
        </>
    )

}

export default MatrixCalculator
