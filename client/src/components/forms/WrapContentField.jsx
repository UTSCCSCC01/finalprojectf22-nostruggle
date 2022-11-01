import { useState } from 'react';

const WrapContentField = (props) => {

    const [ entry, setEntry ] = useState('');

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
        const strlen = getStringWidth(entry, props.className);
        console.log('got ' + entry.length + ' characters, trying ' + strlen + 'px');
        return strlen !== 0 ? strlen + 'px' : 1;
    }

    return (
        <input className={ props.className } 
            style={{ width: resizeInput() }}
            onChange={ (e) => setEntry(e.target.value) }/>
    )
}

export default WrapContentField