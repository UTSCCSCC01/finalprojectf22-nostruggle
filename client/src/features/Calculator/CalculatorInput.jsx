import WrapContentField from '../../components/forms/WrapContentField'

const CalculatorInput = (props) => {

    const getInputStyle = () => {
        switch( props.type ) {
            case 'exponent':
                return <WrapContentField value={ props.value } onChangedValue={ props.onChangedValue } onBackspace={ props.onBackspace } />
            default:
                return <WrapContentField value={ props.value } onChangedValue={ props.onChangedValue } onBackspace={ props.onBackspace } />
        }
    }

    return (
        <>
            { getInputStyle() }
        </>
    )
}

export default CalculatorInput