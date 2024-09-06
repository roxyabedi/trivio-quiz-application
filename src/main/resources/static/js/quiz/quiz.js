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

document.addEventListener("DOMContentLoaded", () => {
    console.log("connected")

    const startButton = document.getElementById("start");

   startButton.addEventListener("click", async (e) =>
   {
        const id = parseInt(e.currentTarget.value); //QuizId
        const questionsArray = await getQuestions(id); //Questions Array
        const questionCount = 1;
        const currentQuestion = questionsArray[0].questionId;
        const totalQuestions = questionsArray.length;

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

        buttonContainer.append(leftButton);
        buttonContainer.append(rightButton);

        parentContainer.append(questionCounter)
        parentContainer.append(questionContainer)
        parentContainer.append(buttonContainer)
   })
})