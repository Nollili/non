'use strict';
let amountOfBatteries;
let defectivePerc;
let amountOfDefectiveBatteries;
let amountOfWorkingBatteries;
let workingPercentage;

const hundred = 100;
const two = 2;

let amountInputValidation = false;
do {
    amountOfBatteries = window.prompt('Amount of batteries: (numbers)');
    if (isNaN(amountOfBatteries) || amountOfBatteries < 0 || amountOfBatteries.trim() === '') {
        alert('Invalid number of batteries!');
    } else {
        amountInputValidation = true;
    }
} while (!amountInputValidation);

let percInputValidation = false;
do {
    defectivePerc = window.prompt('Amount of defective batteries ( %)');
    if (isNaN(defectivePerc) || defectivePerc < 0 || defectivePerc > hundred || defectivePerc.trim() === '') {
        alert('Invalid percentage!');
    } else {
        percInputValidation = true;
    }
} while (!percInputValidation);

amountOfBatteries = parseFloat(amountOfBatteries).toFixed(two);
defectivePerc = parseFloat(defectivePerc).toFixed(two);

workingPercentage = hundred - defectivePerc;
amountOfWorkingBatteries = (amountOfBatteries * workingPercentage / hundred).toFixed(two);
amountOfDefectiveBatteries = (amountOfBatteries - amountOfWorkingBatteries).toFixed(two);

const okBattery = `Amount of batteries: ${amountOfBatteries}`;
const defPerc = `Defective rate: ${defectivePerc}%`;
const defB = `Amount of defective batteries: ${amountOfDefectiveBatteries}`;
const workB = `Amount of working batteries: ${amountOfWorkingBatteries}`;

alert(okBattery + '\n' + defPerc + '\n' + defB + '\n' + workB);