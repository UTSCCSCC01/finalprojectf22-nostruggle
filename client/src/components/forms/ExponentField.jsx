import WrapContentField from './WrapContentField';

const ExponentField = () => {

    return (
        <span className='ExponentField'>
            <WrapContentField className='ExponentBase' />
            <WrapContentField className='ExponentPower' />
        </span>
    )
}

export default ExponentField