// script.js

document.addEventListener('DOMContentLoaded', function() {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('.btn');
    
    let currentInput = '';
    let previousInput = '';
    let operator = '';
    let result = '';

    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const value = this.getAttribute('data-value');

            if (value === 'C') {
                clearDisplay();
            } else if (value === '=') {
                if (previousInput && operator && currentInput) {
                    result = calculate(previousInput, currentInput, operator);
                    display.textContent = result;
                    previousInput = result;
                    currentInput = '';
                    operator = '';
                }
            } else if (['+', '-', '*', '/'].includes(value)) {
                if (currentInput) {
                    if (previousInput && operator) {
                        result = calculate(previousInput, currentInput, operator);
                        display.textContent = result + ' ' + value;
                        previousInput = result;
                    } else {
                        previousInput = currentInput;
                        display.textContent = currentInput + ' ' + value;
                    }
                    currentInput = '';
                    operator = value;
                }
            } else {
                currentInput += value;
                if (operator) {
                    display.textContent = previousInput + ' ' + operator + ' ' + currentInput;
                } else {
                    display.textContent = currentInput;
                }
            }
        });
    });

    function clearDisplay() {
        currentInput = '';
        previousInput = '';
        operator = '';
        result = '';
        display.textContent = '0';
    }

    function calculate(first, second, operator) {
        first = parseFloat(first);
        second = parseFloat(second);

        switch (operator) {
            case '+':
                return first + second;
            case '-':
                return first - second;
            case '*':
                return first * second;
            case '/':
                return first / second;
            default:
                return second;
        }
    }
});
