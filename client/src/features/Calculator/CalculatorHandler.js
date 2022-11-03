export function getCalculatorInput() {
    const element = document.getElementById('ReadThis');
    return element == null ? '' : element.innerText;
}

export function setCalculatorOutput(answer) {
    const element = document.getElementById('WriteToThis');
    if (element != null && answer != null) {
        element.innerHTML = answer;
    }
}