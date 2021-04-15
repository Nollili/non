/* START TASK 1: Your code goes here */
const button1 = document.getElementById('task_first');
button1.addEventListener('click', color);
const div1 = document.querySelector('#task1');
const template1 = document.getElementById('task-1').content;
const template1Copy = document.importNode(template1, true);
const removeBtn = document.getElementById('removeBtn');
removeBtn.addEventListener('click', removeTemplate);

function color() {
    div1.style.display = 'block';
    div1.appendChild(template1Copy);
    const special = document.querySelector('.special-cell');
    const cells = document.querySelectorAll('.cell');
    const table = document.querySelector('#table');
    table.addEventListener('click', (e) => {
        let target = e.target;
        if (target.classList.contains('first-cell')) {
            let firstSibiling = target.nextElementSibling;
            let secondSibiling = target.nextElementSibling.nextElementSibling;
            if (firstSibiling.classList.contains('green') || secondSibiling.classList.contains('yellow')) {
                if (firstSibiling.classList.contains('yellow') || secondSibiling.classList.contains('green')) {
                    return;
                }
            } else {
                target.classList.add('blue');
                target.nextElementSibling.classList.add('blue');
                target.nextElementSibling.nextElementSibling.classList.add('blue');
            }
        }
        if (target === special) {
            for (let i = 0; i < cells.length; i++) {
                if (!cells[i].classList.contains('blue') || cells[i].classList.contains('yellow')) {
                    cells[i].classList.add('green');
                }
            }
            if (!special.classList.contains('yellow') || !special.classList.contains('blue')) {
                special.classList.add('green');
            }
        }
        if (target.classList.contains('green') || target.classList.contains('blue')) {
            return;
        } else if (!target.classList.contains('green') || !target.classList.contains('blue')) {
            target.classList.add('yellow');
        }
    });
}
/* END TASK 1 */

/* START TASK 2: Your code goes here */
const button2 = document.getElementById('task_two');
button2.addEventListener('click', validator);
const div2 = document.querySelector('#task2');
const template2 = document.getElementById('task-2').content;
const template2Copy = document.importNode(template2, true);

function validator() {
    div2.style.display = 'block';
    div2.appendChild(template2Copy);
    const alertInvalid = document.querySelector('.message-invalid');
    const alertValid = document.querySelector('.message-valid');
    const input = document.querySelector('.phone');
    const sendBtn = document.querySelector('.submit');
    const telRegex = /^(\+380){1}[0-9]{9}/;
    sendBtn.addEventListener('click', submit);
    input.addEventListener('input', function validate() {
        if (input.value.match(telRegex)) {
            input.style.border = 'thick solid green';
            alertInvalid.classList.add('hidden');
            sendBtn.disabled = false;
        } else {
            input.style.border = 'thick solid red';
            sendBtn.disabled = true;
            alertInvalid.classList.remove('hidden');
            alertValid.classList.add('hidden');
        }
    });

    function submit(e) {
        e.preventDefault();
        alertValid.classList.remove('hidden');
    }
}
/* END TASK 2 */

/* START TASK 3: Your code goes here */
const button3 = document.getElementById('task_three');
button3.addEventListener('click', basketBall);
const div3 = document.querySelector('#task3');
const template3 = document.getElementById('task-3').content;
const template3Copy = document.importNode(template3, true);

function basketBall() {
    div3.style.display = 'block';
    div3.appendChild(template3Copy);
    const notifTable = document.querySelector('.notification');
    const basketballCourt = document.querySelector('.basketball-court');
    const ball = document.querySelector('.ball');
    const teamAScore = document.querySelector('.teamA');
    const teamBScore = document.querySelector('.teamB');
    let scoreB = 0;
    teamBScore.innerText = scoreB;
    let scoreA = 0;
    teamAScore.innerText = scoreA;
    basketballCourt.addEventListener('click', getClickPosition, false);

    function getClickPosition(e) {
        let xPos = e.clientX;
        let yPos = e.clientY;
        let xMinus = 30;
        let yMinus = 80;
        let translateValue = `translate3d(${xPos-xMinus}px, ${yPos-yMinus}px, 0)`;
        ball.style.transform = translateValue;
    }
    let threeSec = 3000;
    setInterval(reStart, threeSec);

    function reStart() {
        notifTable.innerText = '';
        notifTable.innerText = '';
    }
    document.querySelector('.leftRing').addEventListener('click',
        function bScore() {
            scoreB += 1;
            teamBScore.innerText = scoreB;
            notifTable.innerText = 'Team B score!';
            notifTable.style.color = 'blue';
        });
    document.querySelector('.rightRing').addEventListener('click',
        function aScore() {
            scoreA += 1;
            teamAScore.innerText = scoreA;
            notifTable.innerText = 'Team A score!';
            notifTable.style.color = 'red';
        });
}
/* END TASK 3 */
function removeTemplate() {
    if (div1.childNodes.length > 0) {
        div1.style.display = 'none';
    }
    if (div2.childNodes.length > 0) {
        div2.style.display = 'none';
    }
    if (div3.childNodes.length > 0) {
        div3.style.display = 'none';
    }
}