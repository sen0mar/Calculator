/* ---- CALCULATOR OPERATIONS ---- */
function add(a, b) {return a + b;}
function subtract(a, b) {return a - b;}
function multiply(a, b) {return a * b;}
function divide(a, b) {
    if (b === 0) {
        return;
    }
    return a / b;
}

function operate(n1, operator, n2) {
    let result;
    if (operator === '+') result = add(n1, n2);
    if (operator === '-') result = subtract(n1, n2);
    if (operator === '*') result = multiply(n1, n2);
    if (operator === '/') result = divide(n1, n2);

    if (typeof result === "number") {
        result = Math.round(result * 1000000) / 1000000;
    }

    return result;
}

/* ---- CALCULATOR STATE ---- */
let n1 = null;     // Stores first number
let n2 = null;     // Stores second number
let operator = null;   // Stores selected operator
let currentValue = '';   // Stores current string shown on the display
let resultDisplayed = false;  // Track if result is displayed

/* ---- DISPLAY FUNCTION & BUTTON HANDLING ---- */
function display() {
    const buttons = document.querySelectorAll('button')
    const display = document.querySelector('#display');

    buttons.forEach(button => {
        const buttonText = button.textContent;
        const buttonId = button.id;

        button.addEventListener('click', () => {
            if (resultDisplayed && buttonId !== 'clear' && buttonId !== 'delete' &&
                buttonText !== '=' && buttonText !== '+' && buttonText !== '-' && buttonText !== 'x' && buttonText !== '/') {
                currentValue = '';
                resultDisplayed = false;
            }

            // Clear button
            if (buttonId === 'clear') {
                n1 = null;
                n2 = null;
                operator = null;
                currentValue = '';
                display.textContent = '';
                resultDisplayed = false;
                return;
            }
            // DEL button
            if (buttonId === 'delete') {
                currentValue = currentValue.slice(0, -1);
                display.textContent = currentValue;
                return;
            }
            // Operator buttons (+, -, x, /)
            if (buttonText === '+' || buttonText === '-' || buttonText === 'x' || buttonText === '/') {
                if (n1 === null) {
                    n1 = Number(currentValue);     // convert string to number
                } else if (operator !== null && currentValue !== '') {
                    n2 = Number(currentValue);  
                    n1 = operate(n1, operator, n2);
                    display.textContent = n1;
                    n2 = null;
                }
                operator = (buttonText === 'x') ? '*' : buttonText; // convert x to *
                currentValue = '';
                return;
            }
            // Equal button
            if (buttonText === '=') {
                if (n1 !== null && operator !== null) {
                    n2 = Number(currentValue);                    
                    const result = operate(n1, operator, n2);
                    display.textContent = result;
                    n1 = result;       // store result for chaining
                    n2 = null;
                    operator = null;
                    currentValue = result.toString();
                    resultDisplayed = true;
                }
                return;
            }

            // Numbers / comma
            currentValue += buttonText;
            display.textContent = currentValue;

        });
    });
}

display();






