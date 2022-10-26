import ExponentField from '../forms/ExponentField'
import WrapContentField from '../forms/WrapContentField'

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