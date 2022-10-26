import ExponentField from '../../components/forms/ExponentField'
import WrapContentField from '../../components/forms/WrapContentField'

const CalculatorInput = (props) => {

    const getInputStyle = () => {
        switch( props.inputType ) {
            case 'exponent':
                return <ExponentField />
            default:
                return <WrapContentField className='DefaultField' />
        }
    }

    return (
        <>
            { getInputStyle() }
        </>
    )
}

export default CalculatorInput