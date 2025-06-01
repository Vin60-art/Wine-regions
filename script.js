function pickQuestion(){
  current = QUESTIONS[Math.floor(Math.random()*QUESTIONS.length)];
  document.getElementById('question').textContent=current.statement;
  document.getElementById('feedback').textContent='';
  document.getElementById('feedback').className='feedback';
}
function handle(ans){
  const fb=document.getElementById('feedback');
  if(ans===current.answer){
    fb.textContent='Верно! 🍷';
    fb.className='feedback correct';
  }else{
    fb.textContent='Мимо! '+current.explanation;
    fb.className='feedback incorrect';
  }
  setTimeout(pickQuestion,1500);
}
let current;
document.getElementById('yesBtn').addEventListener('click',()=>handle(true));
document.getElementById('noBtn').addEventListener('click',()=>handle(false));
pickQuestion();