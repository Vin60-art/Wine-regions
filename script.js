import { QUESTIONS } from './questions.js';

const qElement = document.getElementById('question');
const feedback = document.getElementById('feedback');
const yesBtn = document.getElementById('yesBtn');
const noBtn  = document.getElementById('noBtn');

let current;

function pickQuestion(){
  current = QUESTIONS[Math.floor(Math.random()*QUESTIONS.length)];
  qElement.textContent = current.statement;
  feedback.textContent = '';
}

function handle(answer){
  const isCorrect = (answer === current.answer);
  if(isCorrect){
    feedback.textContent = "Верно! 🍷";
    feedback.className = 'feedback correct';
  } else {
    feedback.textContent = "Неверно! " + current.explanation;
    feedback.className = 'feedback incorrect';
  }
  setTimeout(pickQuestion, 1500);
}

yesBtn.addEventListener('click', () => handle(true));
noBtn.addEventListener('click', () => handle(false));

pickQuestion();