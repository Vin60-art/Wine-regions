import { QUESTIONS } from './questions.js';

const qEl = document.getElementById('question');
const fb  = document.getElementById('feedback');
const yes = document.getElementById('yesBtn');
const no  = document.getElementById('noBtn');

let deck   = [];
let cursor = 0;
let current = null;          // ← объявили

function shuffle(arr) {
  return arr.sort(() => Math.random() - 0.5);
}

function fillDeck() {
  deck = shuffle([...QUESTIONS]);
  cursor = 0;
}

function pickQuestion() {
  if (cursor >= deck.length) fillDeck();   // если кончилась колода
  current = deck[cursor++];
  qEl.textContent = current.statement;
  fb.textContent  = '';                    // очищаем фидбек
}

function handle(answer) {
  const right = answer === current.answer;
  fb.textContent = right
    ? 'Верно! 🍷'
    : 'Неверно! ' + current.explanation;
  fb.className  = 'feedback ' + (right ? 'correct' : 'incorrect');
  setTimeout(pickQuestion, 1500);
}

yes.onclick = () => handle(true);
no .onclick = () => handle(false);

fillDeck();       // инициализируем колоду
pickQuestion();   // показываем первый вопрос
