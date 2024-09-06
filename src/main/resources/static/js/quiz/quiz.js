//function loadPage(quizId){
//
//    const url = `/quiz/setup/${quizId}`;
//
//    fetch(url)
//        .then(response => { return response.text() })
//        .catch(error => {
//            console.error("Something went wrong", error)
//        })
//
//
//}

function getQuestions(quizId)
{
const url = `api/quiz/questions/{quizId}`
fetch(url)
.then(response -> {return response.json()})
}

function getAnswers(quizId)
{
const url = `api/quiz/answers/{quizId}`;
fetch(url)
.then(response -> {return response.json()})
}

function displayQuestion(currentQuestion, question, answers)
{
    const url = `/quiz/setup/{quizId}`;
    const parentContainer = document.getElementById("container");
    fetch(url)
    .then(response => { return response.text() }).then( data => {
    parentContainer.innerHTML = data;})
    .catch(error => {
        console.error("Something went wrong", error)
    })
}


document.addEventListener("DOMContentLoaded", () => {
    console.log("connected")

    const startButton = document.getElementById("start");
    const currentQuestion = 1;

   startButton.addEventListener("click", (e) =>
   {
        const id = e.currentTarget.value;

//        const info = loadPage(id);

        startButton.remove();

        const parentContainer = document.getElementById("container");
        const buttonContainer = document.getElementById("buttons");


        const questionCounter = document.createElement("div");
        questionCounter.classList.add("question-counter");


        const questionContainer = document.createElement("div");
        questionContainer.classList.add("question-container")
//        questionContainer.innerHTML = "<h1>Question</h1>";




        const leftButton = document.createElement("button");
        const rightButton = document.createElement("button");

        buttonContainer.append(leftButton);
        buttonContainer.append(rightButton);

        parentContainer.append(questionCounter)
        parentContainer.append(questionContainer)
        parentContainer.append(buttonContainer)
   })
})