import { QUESTIONS } from './questions.js';

const qEl  = document.getElementById('question');
const fb   = document.getElementById('feedback');
const yesB = document.getElementById('yesBtn');
const noB  = document.getElementById('noBtn');

let deck = [];
let idx  = 0;
let current = null;
let awaitingNext = false; // false -> ждём ответ; true -> ждём переход

function shuffle(a){return a.sort(()=>Math.random()-0.5);}
function refill(){
  deck = shuffle([...QUESTIONS]);
  idx  = 0;
}
function showQuestion(){
  if(idx>=deck.length) refill();
  current = deck[idx++];
  qEl.textContent = current.statement;
  fb.textContent  = '';
  fb.className = 'feedback';
  yesB.disabled = noB.disabled = false;
  awaitingNext = false;
}
function showResult(correct){
  fb.textContent = correct ? 'Верно! 🍷' : 'Неверно! ' + current.explanation;
  fb.className = 'feedback ' + (correct ? 'correct':'incorrect');
  awaitingNext = true;
}
function handle(choice){
  if(!awaitingNext){
     const correct = (choice === current.answer);
     showResult(correct);
  }else{
     showQuestion();
  }
}
yesB.addEventListener('click',()=>handle(true));
noB .addEventListener('click',()=>handle(false));

refill();
showQuestion();