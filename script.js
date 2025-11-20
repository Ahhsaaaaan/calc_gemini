const display = document.querySelector('.result');
const historyDisplay = document.querySelector('.history');
const buttons = document.querySelectorAll('.button');
const themeSwitch = document.querySelector('#theme-switch');

let currentInput = '0';
let operator = null;
let previousInput = null;
let shouldResetDisplay = false;

const updateDisplay = () => {
    display.textContent = currentInput;
    historyDisplay.textContent = previousInput ? `${previousInput} ${operator || ''}` : '';
};

const handleNumber = (value) => {
    if (shouldResetDisplay) {
        currentInput = '0';
        shouldResetDisplay = false;
    }
    if (currentInput === '0' && value !== '.') {
        currentInput = value;
    } else if (value === '.' && currentInput.includes('.')) {
        return;
    } else {
        currentInput += value;
    }
};

const handleOperator = (value) => {
    if (operator && !shouldResetDisplay) {
        calculate();
    }
    operator = value;
    previousInput = currentInput;
    shouldResetDisplay = true;
};

const calculate = () => {
    if (!operator || previousInput === null) return;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);
    if (isNaN(prev) || isNaN(current)) return;

    let result;
    switch (operator) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;

        case '*':
            result = prev * current;
            break;
        case '/':
            if (current === 0) {
                currentInput = 'Error';
                updateDisplay();
                return;
            }
            result = prev / current;
            break;
        case '%':
            result = prev % current;
            break;
        default:
            return;
    }
    currentInput = result.toString();
    operator = null;
    previousInput = null;
    shouldResetDisplay = true;
};

const handleSpecial = (value) => {
    switch (value) {
        case 'C':
            currentInput = '0';
            operator = null;
            previousInput = null;
            break;
        case 'CE':
            currentInput = '0';
            break;
    }
};

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.dataset.value;
        if (!isNaN(value) || value === '.') {
            handleNumber(value);
        } else if (['+', '-', '*', '/', '%'].includes(value)) {
            handleOperator(value);
        } else if (value === '=') {
            calculate();
        } else if (['C', 'CE'].includes(value)) {
            handleSpecial(value);
        }
        updateDisplay();
    });
});

themeSwitch.addEventListener('change', () => {
    if (themeSwitch.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
    } else {
        document.documentElement.removeAttribute('data-theme');
    }
});

updateDisplay();
