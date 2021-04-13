function getAge(date) {
    const epoch = 1970;
    const diff = Date.now() - date;
    const age = new Date(diff);
    return Math.abs(age.getUTCFullYear() - epoch);
}

function getWeekDay(date) {
    const dt = new Date(date).toLocaleString('en-us', {
        weekday: 'long'
    });
    return dt;
}

function getProgrammersDay(year) {
    let inputYear = `January 1, ${year} 00:00:00`;
    let startDate = new Date(inputYear);
    let diff = 256;
    const oneDay = 86400000;
    let programmersDay = new Date(startDate.getTime() + diff * oneDay);
    const y = programmersDay.getUTCFullYear();
    const d = programmersDay.getUTCDate();
    const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let dayName = weekDays[programmersDay.getUTCDay()];
    const formatted = ` ${d} Sep, ${y} (${dayName})`;
    return formatted;
}

function howFarIs(specifiedWeekday) {
    const day = specifiedWeekday.toLowerCase();
    let today = new Date();
    const weekDays = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    let dayName = weekDays[today.getUTCDay()];
    let specDayIndex = weekDays.indexOf(day);
    let thisDayIndex = weekDays.indexOf(dayName);
    let answer = '';
    if (specDayIndex === thisDayIndex) {
        answer = `Hey, today is ${ specifiedWeekday } =)`;
    }
    if (specDayIndex !== thisDayIndex) {
        let number = 0;
        if (specDayIndex > thisDayIndex) {
            number = specDayIndex - thisDayIndex;
        } else {
            number = thisDayIndex - specDayIndex;
        }
        answer = `It's ${ number } day(s) left till ${ specifiedWeekday }`;
    }
    return answer;
}

function isValidIdentifier(varName) {
    const regEx = /^[a-z]+\w*[^!@#%^&*]$/i;
    let result = regEx.test(varName);
    return result;
}

function capitalize(string) {
    return string.toLowerCase().replace(/(^|\s)\S/g, char => char.toUpperCase());
}

function isValidAudioFile(fileName) {
    const regEx = /^([a-z]+\.(mp3|flac|alac|aac))$/ig;
    return regEx.test(fileName);
}

function getHexadecimalColors(hex) {
    const regEx = /#\b([a-f0-9]{3}|[a-f0-9]{6})\b/gi;
    let result = hex.match(regEx);
    return hex.match(regEx) ? result : [];
}

function isValidPassword(pass) {
    const regEx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    return regEx.test(pass);
}

function addThousandsSeparators(number) {
    number = number.toString();
    return number.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}