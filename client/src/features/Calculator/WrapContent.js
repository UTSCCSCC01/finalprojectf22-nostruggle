function getStringWidth(str, className) {
    var strElement = document.createElement('span');

    strElement.style.visibility = 'hidden';
    strElement.style.padding = '4px';
    strElement.className = className;
    strElement.innerHTML = str;

    document.body.appendChild(strElement);

    return strElement.offsetWidth;
}

export function resizeInput(value, type) {
    const strlen = getStringWidth(value, type);
    console.log('got ' + value.length + ' characters, trying ' + strlen + 'px');
    return strlen !== 0 ? strlen + 'px' : 1;
}