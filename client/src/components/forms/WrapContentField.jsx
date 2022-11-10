import { resizeInput } from '../../features/Calculator/WrapContent'

const WrapContentField = (props) => {

    return (
        <input
        id={ props.uniqueId }
        className={ props.type }
        style={{ width: resizeInput(props.value, props.type) }}
        value={ props.value }
        onChange={(e) => props.onChangedInput(e)}
        onKeyUp={ (e) => props.onBackspace(e) }
        />
    )
}

export default WrapContentField