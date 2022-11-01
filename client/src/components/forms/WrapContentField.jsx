
const WrapContentField = (props) => {

    function getStringWidth(str, className) {
        var strElement = document.createElement('span');

        strElement.style.visibility = 'hidden';
        strElement.style.padding = '4px';
        strElement.className = className;
        strElement.innerHTML = str;

        document.body.appendChild(strElement);

        return strElement.offsetWidth;
    }

    function resizeInput() {
        const strlen = getStringWidth(props.value, props.type);
        console.log('got ' + props.value.length + ' characters, trying ' + strlen + 'px');
        return strlen !== 0 ? strlen + 'px' : 1;
    }


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