let convertedArray = [];
function convert(...numbers) {
    for (let i = 0; i < numbers.length; i++) {
        if (typeof numbers[i] === 'number') {
            convertedArray.push(`${numbers[i]}`);
        } else if (typeof numbers[i] === 'string') {
            convertedArray.push(parseInt(numbers[i]));
        }
    }
    return convertedArray;
}

const executeforEach = (arr, func) => {
    for (let i = 0; i < arr.length; i++) {
        func(arr[i]);
    }
}

let mappedArray = [];
const mapArray = (arr, func) => {
    for (let i = 0; i < arr.length; i++) {
        mappedArray.push(func(parseInt(arr[i])));
    }
    return mappedArray;
}

let filteredArray = [];
const filterArray = (arr, func) => {
    for (let i = 0; i < arr.length; i++) {
        if (func(arr[i]) === true) {
            filteredArray.push(arr[i]);
        }
    }
    return filteredArray;
}

function getValuePosition(arr, value) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === value) {
            return i + 1;
        }
    }
    return false;
}

function flipOver(word) {
    let reversed = '';
    for (let i = word.length - 1; i >= 0; i--) {
        reversed += word[i];
    }
    return reversed;
}

let listFromRange = [];
function makeListFromRange([a, b]) {
    for (let i = a; i <= b; i++) {
        listFromRange.push(i);
    }
    return listFromRange;
}

const getArrayOfKeys = (arr, k) => {
    let keyArray = [];
    for (let i = 0; i < arr.length; i++) {
        keyArray.push(arr[i][k]);
    }
    return keyArray;
}

const getTotalWeight = (arr) => {
    let totalWeight = [];
    let totalSum = 0;
    for (let i = 0; i < arr.length; i++) {
        totalWeight.push(arr[i].weight);
    }
    for (let j = 0; j < totalWeight.length; j++) {
        totalSum += totalWeight[j];
    }
    return totalSum;
}

function getPastDay(date, num) {
    date = new Date(date);
    const diff = date.setDate(date.getDate() - num);
    const dateBefore = new Date(diff);
    const d = dateBefore.getDate();
    return d;
}

function formatDate(formatThisDate) {
    const ten = 10;
    const dt = new Date(formatThisDate);
    const y = dt.getFullYear();
    const m = dt.getMonth()+1 >= ten ? dt.getMonth()+1 : '0' + (dt.getMonth()+1);
    const d = dt.getDate() >= ten ? dt.getDate() : '0' + dt.getDate();
    const formatted = `${y}/${m}/${d}`;
    return formatted;
}