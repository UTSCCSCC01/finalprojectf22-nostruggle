import { useEffect, useRef, useState } from 'react'
import ExponentField from '../../components/forms/ExponentField'
import WrapContentField from '../../components/forms/WrapContentField'

const CalculatorInput = (props) => {

    const getInputStyle = () => {
        switch( props.inputType ) {
            case 'exponent':
                return <ExponentField />
            default:
                return <div className='CalculatorContentField'><WrapContentField className='DefaultField' /></div>
        }
    }

    const [ entry, setEntry ] = useState('');
    const str = useRef('');

    useEffect(() => {
        str.current = entry;
    }, [entry]);

    
    const getInput = () => {
        const collection = Array.from(document.querySelectorAll('div.CalculatorContentField > input'));
        setEntry(collection.map((item) => item.value));
    }


    return (
        <>
            <h4>The current value is: { props.inputType }</h4>

            <div className='CalculatorInputField'
                onChange={ getInput }>
                { getInputStyle() }
            </div>
            <p>{ str.current }</p>
        </>
    )
}

export default CalculatorInput