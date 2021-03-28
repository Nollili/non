/*global questions*/
'use strict';
const two = 2;
const three = 3;
const hundred = 100;
const aMillion = 1000000;
const questionArray = Array.from(new Set(questions.map(q => q.question))).map(question => {
    return questions.find(q => q.question === question)
})
const startBtn = document.querySelector('.start-button');
const gameContainer = document.querySelector('.ongoing-game');
const finishGame = document.querySelector('.finished-game');
const currentQuestion = document.getElementById('question');
const answerBar = document.querySelector('.answer-bar');
const answer = document.querySelector('.answer');
const startNewGame = document.querySelector('.start-new-game');
const skipQuestion = document.querySelector('.skip');
const restart = document.querySelector('.restart-game-button');
let totalPrize = document.querySelector('.total-prize');
let currentRoundPrize = document.querySelector('.current-prize');
const gameEndText = document.querySelector('.game-ends-text');
const answer0 = document.getElementById('0');
const answer1 = document.getElementById('1');
const answer2 = document.getElementById('2');
const answer3 = document.getElementById('3');
let randomQuestion;
let currentCorrectAnswer;
let askedQuestions = [];
let tPrize = 0;
let cRPrize = 100;
totalPrize.innerText = tPrize;
currentRoundPrize.innerText = cRPrize;

function generateQuestion() {
    randomQuestion = questions[Math.floor(Math.random() * questions.length)];
    let similar = askedQuestions.findIndex(q => q.question.includes(randomQuestion.question));
    if (similar >= 0) {
        generateQuestion();
    } else {
        currentQuestion.innerText = randomQuestion.question;
        answer0.innerText = randomQuestion.content[0];
        answer1.innerText = randomQuestion.content[1];
        answer2.innerText = randomQuestion.content[two];
        answer3.innerText = randomQuestion.content[three];
        currentCorrectAnswer = String(randomQuestion.correct);
        askedQuestions.push(randomQuestion);
    }
}

function startGame() {
    resetAll();
    startBtn.classList.add('hidden');
    gameContainer.classList.remove('hidden');
    generateQuestion();
}

function NewGame() {
    gameContainer.classList.remove('hidden');
    skipQuestion.classList.remove('hidden');
    finishGame.classList.add('hidden');
    resetAll();
    generateQuestion();
}

function skipQ() {
    skipQuestion.classList.add('hidden');
    generateQuestion();
}

function correctAnswer() {
    tPrize = tPrize + cRPrize;
    cRPrize *= two;
    totalPrize.innerText = tPrize;
    currentRoundPrize.innerText = cRPrize;
    checkTotalPrize(tPrize);
}

function incorrectAnswer() {
    gameContainer.classList.add('hidden');
    finishGame.classList.remove('hidden');
    askedQuestions = [];
    gameEndText.innerText = `GAME OVER! Your prize is ${tPrize}`;
}

function checkTotalPrize(tPrize) {
    if (tPrize >= aMillion) {
        gameEnd();
    } else {
        generateQuestion();
    }
}

function gameEnd() {
    gameContainer.classList.add('hidden');
    finishGame.classList.remove('hidden');
    askedQuestions = [];
    gameEndText.innerText = `Congratulations! Your prize is ${tPrize}`;
}

function resetAll() {
    tPrize = 0;
    cRPrize = hundred;
    totalPrize.innerText = tPrize;
    currentRoundPrize.innerText = cRPrize;
    askedQuestions = [];
}

startBtn.addEventListener('click', startGame);
startNewGame.addEventListener('click', NewGame);
skipQuestion.addEventListener('click', skipQ)
restart.addEventListener('click', NewGame);

answerBar.addEventListener('click', e => {
    if (e.target.id === currentCorrectAnswer) {
        correctAnswer();
    } else {
        incorrectAnswer();
    }
});