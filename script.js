import { QUESTIONS } from './questions.js';

const qEl = document.getElementById('question');
const fb  = document.getElementById('feedback');
const yes = document.getElementById('yesBtn');
const no  = document.getElementById('noBtn');

let deck   = shuffle([...QUESTIONS]); // копия и сразу перемешали
let cursor = 0;

function shuffle(arr) {
  return arr.sort(() => Math.random() - 0.5);
}

function pickQuestion() {
  if (cursor >= deck.length) {          // колода кончилась
    deck = shuffle([...QUESTIONS]);     // тасуем заново
    cursor = 0;
  }
  current = deck[cursor++];
  qEl.textContent = current.statement;
  fb.textContent  = '';
}

function handle(answer) {
  const right = answer === current.answer;
  fb.textContent = right ? 'Верно! 🍷' : 'Неверно! ' + current.explanation;
  fb.className   = 'feedback ' + (right ? 'correct' : 'incorrect');
  setTimeout(pickQuestion, 1500);
}

yes.onclick = () => handle(true);
no .onclick = () => handle(false);

pickQuestion();
