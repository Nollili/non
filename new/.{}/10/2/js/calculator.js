let mathExpression = '';
let inputValidation = false;
do {
    mathExpression = window.prompt('Type in a mathematical expression: ');
    if (mathExpression.length === 0 || mathExpression.trim() === '') {
        alert('Invalid mathematical expression!');
        mathExpression = window.prompt('Type in a mathematical expression: ');
    }
    try {
        let result = new Function('return ' + mathExpression)();
        if (!isFinite(result) || isNaN(result)) {
            alert('Invalid mathematical expression!');
        } else {
            alert(`The result of ${mathExpression} is: ${result}`);
            inputValidation = true;
        }
    } catch (error) {
        alert('Invalid mathematical expression!');
    }
} while (!inputValidation);