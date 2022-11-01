import { resizeInput } from '../../features/Calculator/WrapContent'

const WrapContentField = (props) => {

    return (
        <input
        className={ props.type }
        style={{ width: resizeInput() }}
        value={ props.value }
        onChange={(e) => props.onChangedInput(e)}
        onKeyUp={ (e) => props.onBackspace(e) }
        />
    )
}

export default WrapContentField