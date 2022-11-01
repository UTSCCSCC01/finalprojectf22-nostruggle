import WrapContentField from '../../components/forms/WrapContentField'
import { useState } from 'react';

const CalculatorInput = (props) => {

    const [ fields, setFields ] = useState([ 'DefaultField' ]);

    switch( props.type ) {
        case 'exponent':
            setFields([ 'DefaultField', 'SuperScript' ]);
            break;
        case 'integrate':
            setFields([ 'DefaultField', 'SuperScript', 'SubScript' ]);
            break;
        default:
    }

    return (
        <>
            { fields.map((field) => <WrapContentField
            className={ field }
            type={ props.type }
            value={ props.value }
            onChangedInput={ (e) => props.onChangedInput(e) }
            onBackspace={ (e) => props.onBackspace(e) } />
            )}
        </>
    )
}

export default CalculatorInput