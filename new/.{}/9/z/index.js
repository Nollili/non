function isEquals(a, b) {
    return a === b;
}

function numberToString(num) {
    return num.toString();
}

function storeNames(...strings) {
    let storedNames = [];
    let length = [...strings].length;
    for (let i = 0; i < length; i++) {
        storedNames.push(strings[i]);
    }
    return storedNames;
}

function getDivision(a, b) {
    let outcome = 0;
    if (a > b) {
        outcome = a / b;
    } else if (b > a) {
        outcome = b / a;
    } else if (a === b) {
        outcome = a / b;
    }

    if (outcome >= 0) {
        return outcome;
    }
}

function negativeCount(arr) {
    let negCount = 0;
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] < 0) {
            negCount++;
        }
    }
    return negCount;
}

function letterCount(word, letter) {
    let charCount = 0;
    for (let i = 0; i < word.length; i++) {
        if (word[i] === letter) {
            charCount++;
        }
    }
    return charCount;
}

function countPoints(arr) {
    const three = 3;
    let ourPoints = 0;
    for (let i = 0; i < arr.length; i++) {
        let colon = arr[i].indexOf(':');
        let x = parseInt(arr[i].substring(0, colon)); //our team
        let y = parseInt(arr[i].substring(colon + 1)); //other team

        if (x > y) {
            ourPoints += three;
        } else if (x === y) {
            ourPoints += 1;
        }
    }
    return ourPoints;
}