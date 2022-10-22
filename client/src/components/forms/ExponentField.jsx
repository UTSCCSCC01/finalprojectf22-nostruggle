import WrapContentField from './WrapContentField';

const ExponentField = () => {

    return (
        <div className='CalculatorContentField'>
            <WrapContentField className='ExponentBase' />
            <WrapContentField className='ExponentPower' />
        </div>
    )
}

export default ExponentField