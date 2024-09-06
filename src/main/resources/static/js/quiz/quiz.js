let questionCount = 1;
let globalId;
let globalTotalQuestions;
let globalQuestionsArray;

async function getQuestions(quizId)
{
    const url = `api/quiz/questions/${quizId}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        return 0;
    }

}
function getAnswers(quizId)
{
    const url = `api/quiz/answers/${quizId}`;
    fetch(url)
    .then(response => {return response.json()})
}

function displayQuestion(quizId, currentQuestion, parent)
{
    const url = `/quiz/setup/${quizId}?currentQuestion=${currentQuestion}`;

    fetch(url)
        .then(response => { return response.text() })
        .then( data => {
            parent.innerHTML = data;
        })
    .catch(error => {
        console.error("Something went wrong", error)
    })
}

function questionNavigation(event)
{
    console.log("pressed button")
    console.log(event.target.innerText);
    const choice = event.target.innerText;
    const parent = document.querySelector(".question-container")
    const counter = document.querySelector(".question-counter")

    if(choice == ">" && questionCount < globalTotalQuestions)
    {
        questionCount++
        counter.innerHTML = `${questionCount}/${globalTotalQuestions}`
        console.log(questionCount)
        displayQuestion(globalId, questionCount, parent)
        console.log("right")
    }

     if(choice == "<" && questionCount > 1 )
    {
        questionCount--
        counter.innerHTML = `${questionCount}/${globalTotalQuestions}`
        console.log(questionCount)
        displayQuestion(globalId, questionCount, parent)
        console.log("left")
    }

}

document.addEventListener("DOMContentLoaded", () => {
    console.log("connected")

    const startButton = document.getElementById("start");

   startButton.addEventListener("click", async (e) =>
   {
        const id = parseInt(e.currentTarget.value); //QuizId
        const questionsArray = await getQuestions(id); //Questions Array
        const currentQuestion = questionsArray[0].questionNumber;
        const totalQuestions = questionsArray.length;

        globalId = id;
        globalTotalQuestions = totalQuestions;
        globalQuestionsArray = questionsArray;

        startButton.remove();

        const parentContainer = document.getElementById("container");
        const buttonContainer = document.getElementById("buttons");


        //Counter
        const questionCounter = document.createElement("div");
        questionCounter.classList.add("question-counter");
        questionCounter.textContent = `${questionCount}/${totalQuestions}`;


        //Container
        const questionContainer = document.createElement("div");
        questionContainer.classList.add("question-container");
        displayQuestion(id, currentQuestion, questionContainer);


        const leftButton = document.createElement("button");
        const rightButton = document.createElement("button");

        leftButton.textContent = "<";
        rightButton.textContent = ">";

        leftButton.addEventListener("click", questionNavigation);
        rightButton.addEventListener("click", questionNavigation);

        buttonContainer.append(leftButton);
        buttonContainer.append(rightButton);

        parentContainer.append(questionCounter)
        parentContainer.append(questionContainer)
        parentContainer.append(buttonContainer)
   })
})