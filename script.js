/* ---- CALCULATOR OPERATIONS ---- */
function add(a, b) {return a + b;}
function subtract(a, b) {return a - b;}
function multiply(a, b) {return a * b;}
function divide(a, b) {return a / b;}

function operate(n1, operator, n2) {
    switch (operator) {
        case '+': return add(n1, n2);
        case '-': return subtract(n1, n2);
        case '*': return multiply(n1, n2);
        case '/': return divide(n1, n2);
        default: return 'Invalid operator';
    }
}

/* ---- CALCULATOR STATE ---- */
let n1 = null;     // Stores first number
let n2 = null;     // Stores second number
let operator = null;   // Stores selected operator
let currentValue = '';   // Stores current string shown on the display


/* ---- DISPLAY FUNCTION & BUTTON HANDLING ---- */
function display() {
    const buttons = document.querySelectorAll('button')
    const display = document.querySelector('#display');

    buttons.forEach(button => {
        const buttonText = button.textContent;
        const buttonId = button.id;

        button.addEventListener('click', () => {
            const btnText = button.textContent;

            // Clear button
            if (buttonId === 'clear') {
                n1 = null;
                n2 = null;
                operator = null;
                currentValue = '';
                display.textContent = '';
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






