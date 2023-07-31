console.log("hello");
const questions=[
    {
        question:"which is the largest animal in the world?",
        answers:[
            {text:"shark",correct:false },
            {text:"blue whale",correct:true },
            {text:"Elephant",correct:false },
            {text:"giraffe",correct:false }
        ]
    },
    {
        question:"which is the largest desert in the world?",
        answers:[
            {text:"kalahari",correct:false },
            {text:"Gobi",correct:false },
            {text:"sahara",correct:false },
            {text:"antracctica",correct:true}
        ]
    },
    {
        question:"which is the largest continent in the world?",
        answers:[
            {text:"asia",correct:true },
            {text:"australia",correct:false },
            {text:"europe",correct:false },
            {text:"africa",correct:false }
        ]
    },
    {
        question:"which is the smallest continent in the world?",
        answers:[
            {text:"asia",correct:false },
            {text:"australia",correct:true },
            {text:"europe",correct:false },
            {text:"africa",correct:false }
        ]
    }
];
const questionElement=document.getElementById("question");
const answerButton=document.getElementById("answer-btn");
const nextButton=document.getElementById("next-btn");
let currentQuestionIndex=0;
let score=0;
function startQuiz(){
    currentQuestionIndex=0;
    score=0;
    nextButton.innerHTML="Next";
    showQuestion();
}
function showQuestion(){
    resetState();
    let currentquestion=questions[currentQuestionIndex];
    let questionNo=currentQuestionIndex+1;
    questionElement.innerHTML=questionNo+". "+currentquestion.question;
    currentquestion.answers.forEach(answer=>{
        const button=document.createElement('button');
        button.innerHTML=answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if(answer.correct){
            button.dataset.correct=answer.correct;
        }
        button.addEventListener('click',selectAnswer);
    })
}
function resetState(){
    nextButton.style.display="none"; 
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild);
    }   
}
function selectAnswer(e){
    const selectBtn=e.target;
    const isCorrect=selectBtn.dataset.correct==="true";
    if(isCorrect){
        selectBtn.classList.add("correct");
        score+=1;
    }
    else{
        selectBtn.classList.add("incorrect");
    }
    Array.from(answerButton.children).forEach(button =>{
        if(button.dataset.correct==="true"){
            button.classList.add("correct");
        }
        button.disabled=true;
    });
    nextButton.style.display="block";
}
function showScore(){
    resetState();
    questionElement.innerHTML=`you have scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML="restart quiz";
    nextButton.style.display="block";
}
function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex<questions.length){
        showQuestion();
    }
    else{
        showScore();
    }
}
nextButton.addEventListener('click',()=>{
    if(currentQuestionIndex<questions.length){
        handleNextButton();
    }
    else{
        startQuiz();
    }
})
startQuiz();