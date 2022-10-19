import DefaultField from '../../components/forms/DefaultField'
import ExponentField from '../../components/forms/ExponentField'

const CalculatorInput = (props) => {

    
    const getInputStyle = () => {
        switch( props.inputType ) {
            case 'exponent':
                return <ExponentField />
            default:
                return <DefaultField />
        }
    }

    return (
        <>
            <h4>The current value is: { props.inputType }</h4>

            <div className='CalculatorInputField'>
                { getInputStyle() }
            </div>
        </>
    )
}

export default CalculatorInput