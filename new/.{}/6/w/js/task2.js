'use strict';
const two = 2;
let inputString;
let inputValid = false;
do {
    inputString = prompt('Enter a word');
    if (inputString.trim() === '') {
        alert('Invalid value. Please enter a word!');
    } else {
        inputValid = true;
    }
} while (!inputValid);

let result;
if (inputString.length === 1) {
    result = inputString;
    alert(`Middle character ${inputString}.`);  
} else if (inputString.length % two === 0) {
    result = inputString.slice(inputString.length / two - 1, inputString.length / two + 1);
    result.split('');
    if (result.split('')[0] === result.split('')[1]) {
        result = result.split('')[0];
        alert(`Middle characters are the same: ${result}`);                
    } else {
        alert(`The middle character is ${result}`);
    }
} else {
    result = inputString.slice(inputString.length / two, inputString.length / two + 1);
    alert(`The middle character is ${result}`);
}