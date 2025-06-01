import { QUESTIONS } from './questions.js';

const qEl  = document.getElementById('question');
const fb   = document.getElementById('feedback');
const yesB = document.getElementById('yesBtn');
const noB  = document.getElementById('noBtn');

// Split вопросы по истинности
const TRUE_POOL  = QUESTIONS.filter(q => q.answer === true);
const FALSE_POOL = QUESTIONS.filter(q => q.answer === false);

function shuffle(arr){ return arr.sort(() => Math.random() - 0.5); }

let trueBag  = shuffle([...TRUE_POOL]);   // текущие «неиспользованные»
let falseBag = shuffle([...FALSE_POOL]);

let askedTrue  = 0;   // счётчик заданных «верно»
let askedFalse = 0;   // счётчик заданных «неверно»

let current    = null;
let awaitingNext = false;

function drawQuestion(){
  // если мешок пуст — перетасовываем заново
  if(trueBag.length === 0)  trueBag  = shuffle([...TRUE_POOL]);
  if(falseBag.length === 0) falseBag = shuffle([...FALSE_POOL]);

  let pickTrue;
  if(askedTrue < askedFalse) {
      pickTrue = true;               // чтобы выровнять
  } else if(askedFalse < askedTrue) {
      pickTrue = false;
  } else {
      pickTrue = Math.random() < 0.5; // 50/50
  }

  current = pickTrue ? trueBag.pop() : falseBag.pop();
  pickTrue ? askedTrue++ : askedFalse++;

  qEl.textContent = current.statement;
  fb.textContent  = '';
  fb.className    = 'feedback';
  awaitingNext    = false;
}

function showResult(correct){
  fb.textContent = correct ? 'Верно! 🍷' : 'Неверно! ' + current.explanation;
  fb.className   = 'feedback ' + (correct ? 'correct':'incorrect');
  awaitingNext   = true;
}

function handle(choice){
  if(!awaitingNext){
     const correct = (choice === current.answer);
     showResult(correct);
  } else {
     drawQuestion();
  }
}

yesB.addEventListener('click', ()=>handle(true));
noB .addEventListener('click', ()=>handle(false));

drawQuestion();