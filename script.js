/* ---- CALCULATOR OPERATIONS ---- */
function add(a, b) {
    return a + b;
}
function subtract(a, b) {
    return a - b;
}
function multiply(a, b) {
    return a * b;
}
function divide(a, b) {
    return a / b;
}


let n1;
let operator;
let n2;

function operate(n1, operator, n2) {
    switch (operator) {
        case '+': return add(n1, n2);
        case '-': return subtract(n1, n2);
        case '*': return multiply(n1, n2);
        case '/': return divide(n1, n2);
        default: return 'Invalid operator';
    }
}

function display() {
    let buttons = document.querySelectorAll('button')
    let display = document.querySelector('#display');

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            display.textContent += button.textContent; // Append text to display
            currentValue = display.textContent;
        });
    });
}
display();

