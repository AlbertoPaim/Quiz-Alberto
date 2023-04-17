
// global variables 
let currentQuestions = 0
let correctAnswer = 0
let points = 0
let totalQuestions = 0
let time = 40
let timerInterval

//functions 
showQuestion()
theme()
function showQuestion(){
    if (questions[currentQuestions]) {
        let q = questions[currentQuestions]
        let pct = Math.floor((currentQuestions / questions.length) * 100)
        document.querySelector('.progress--bar').style.width = `${pct}%`

    document.querySelector('.scoreArea').style.display ='none'
    document.querySelector ('.questionArea').style.display = 'block'
    document.querySelector ('.question').innerHTML = q.question
    document.querySelector('.placar').innerHTML = `Você acertou: ${points}`
    document.querySelector('.time').innerHTML = time
    document.querySelector('.next').style.display = 'none'
    document.querySelector('.why').innerHTML = ''
        //loop to show the options 
    let options = ''
    for(let i in q.options){
    options += `<div class='option' data-op='${i}'><span>${parseFloat(i)+1}</span>${q.options[i]}</div><br>`
    }
    document.querySelector('.options').innerHTML = options

    //Events to the options

    document.querySelectorAll('.options .option').forEach((item)=>{
        item.addEventListener('click', optionClick)
    })
    countTime()
    } 
    
    else {
        finishQuiz()
    }
    
}

 function optionClick(e){
    
let currentAnswer = parseInt(e.target.getAttribute('data-op'))

if (questions[currentQuestions].answer === currentAnswer) {
    correctAnswer++
    points++
    click()
    
}  else {
    errou()
}
document.querySelector('.next').style.display = 'block'
document.querySelector('.questionArea').style.display = 'none'
document.querySelector('.why').innerHTML = questions[currentQuestions].why
totalQuestions++


 }


 function  finishQuiz() {
    document.querySelector('.next').style.display = 'none'
    let finalPct = Math.floor((correctAnswer / questions.length) * 100)

    clearInterval(timerInterval) // stop the timer

    document.querySelector('.scoreArea').style.display ='block'
    document.querySelector ('.questionArea').style.display = 'none'
    document.querySelector('.progress--bar').style.width = `100%`
    document.querySelector('.scorePct').innerHTML = `Acertou: ${finalPct}%`
    document.querySelector ('.scoreText2').innerHTML = `Você respondeu ${totalQuestions} questões e acertou ${correctAnswer}.`

    let phrase = document.querySelector('.scoreText1')
    if (finalPct <=25) {
        audio1()
        phrase.innerHTML = 'Nossa, como tu é burro(a)'
        document.querySelector('.prizeImage').src="prize1.png"
    } else if (finalPct >25 && finalPct <=50){
        audio2()
        phrase.innerHTML = 'Tá ruim em?'
        document.querySelector('.prizeImage').src="prize.png"
    } else if( finalPct >50 && finalPct <=80) {
        audio3()
        phrase.innerHTML = 'Tu não ganhou nem perdeu'
        document.querySelector('.prizeImage').src="prize3.png"
    } else if ( finalPct >80 ) {
        audio4()
        phrase.innerHTML = 'Ser supremo, além da conciência'
        document.querySelector('.prizeImage').src="prize2.png"
    }
    points++
 }

function next() {
    currentQuestions++
    showQuestion()
    updateTimer()
    
}
 function reset() {
    currentQuestions = 0
    correctAnswer = 0
    points = 0
    showQuestion()
    theme()
 }

 function countTime() {
    clearInterval(timerInterval);
    time = 40;
    timerInterval = setInterval(() => {
      time--;

      updateTimer();
    }, 1000);
  }
 function updateTimer() {
    document.querySelector('.time').innerHTML = time
    if (time === 0) {
        document.querySelector('.questionArea').style.display = 'none'
        document.querySelector('.why').innerHTML = questions[currentQuestions].why
        document.querySelector('.next').style.display = 'block'
          clearInterval(timerInterval)
    }}

    //audios
function theme() {
    ambient = document.querySelector('#ambient')
    ambient.play()
}
function click() {
    document.querySelector('#click').play()
}
function errou() {
    document.querySelector('#error').play()
}
function audio1() {
    burro = document.querySelector('#burro')
    burro.play()
}
function audio2() {
    homer = document.querySelector('#homer')
    homer.play()
}
function audio3() {
    dilma = document.querySelector('#dilma')
    dilma.play()
}
function audio4() {
    alien = document.querySelector('#alien')
    alien.play()
}