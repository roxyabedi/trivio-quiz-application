let questionCount = 1;
let globalId;
let globalTotalQuestions;
let globalQuestionsArray;
let userChoices = {};
let correctAnswers = {};
let score = 0;

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

async function getAnswers(quizId) {
    const url = `api/quiz/answers/${quizId}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        let count = 1;

        data.forEach(question => {
            question.forEach(answer => {
                if (answer.correct == true) {
                    correctAnswers[count] = answer.answerText;
                    count++
                }
            });
        });
    } catch (error) {
        console.error('Error fetching answers:', error);
    }
}

async function displayQuestion(quizId, currentQuestion, parent)
{
    const url = `/quiz/setup/${quizId}?currentQuestion=${currentQuestion}`;

    await fetch(url)
        .then(response => { return response.text() })
        .then( data => {
            parent.innerHTML = data;
        })
    .catch(error => {
        console.error("Something went wrong", error)
    })
}

function answerSelect(event)
{
    const rightButton = document.getElementById("right-button")
    const leftButton = document.getElementById("left-button")
    const answerButtons = document.querySelector("#question-answers")
    const answerButtonsChildren = answerButtons.querySelectorAll("button")
    const currentAnswerButton = event.currentTarget
    const choice = event.target.innerText
    const previousChoice = answerButtons.querySelector(".btn-primary")

    userChoices[questionCount] = choice;

    previousChoice == null ? null : (previousChoice.classList.remove("btn-primary"), previousChoice.classList.add("btn-outline-primary"))
    currentAnswerButton.classList.add("btn-primary")
    currentAnswerButton.classList.remove("btn-outline-primary")

    if(questionCount >= 1)
    {
        rightButton.disabled = false
    }

    if(questionCount > 1)
    {
        leftButton.disabled = false
    }
}

async function questionNavigation(event)
{
    const choice = event.target.innerText
    const parent = document.querySelector(".question-container")
    const counter = document.querySelector(".question-counter")
    const rightButton = document.getElementById("right-button")
    const buttonNavParent = document.getElementById("buttons")
    let leftButton = document.getElementById("left-button")

    if(choice == ">")
    {
        questionCount++
        rightButton.disabled = true

        if(leftButton == null)
        {
            leftButton = document.createElement("button")
            leftButton.classList.add("btn", "btn-primary")
            leftButton.id = "left-button"
            leftButton.textContent = "<"
            leftButton.addEventListener("click", questionNavigation)
            buttonNavParent.append(leftButton)
            buttonNavParent.append(rightButton)
        }

        if(questionCount == globalTotalQuestions)
        {
            rightButton.innerText = "Submit";
            rightButton.removeEventListener("click", questionNavigation)
            rightButton.addEventListener("click", submitQuiz)
        }
    }

    if(choice == "<")
    {
        questionCount--

        if(questionCount == 1)
        {
            leftButton.remove()
        }

        if(rightButton.innerText == "Submit")
        {
            rightButton.innerText = ">";
            rightButton.removeEventListener("click", submitQuiz)
            rightButton.addEventListener("click", questionNavigation)
        }

    }
    counter.innerHTML = `${questionCount} / ${globalTotalQuestions}`
    await displayQuestion(globalId, questionCount, parent)
    userAnswerSelected()
}

async function submitQuiz()
{
    const answersContainer = document.getElementById("question-answers");
    const questionBox = document.getElementById("question-content");
    const questionCounter = document.querySelector(".question-counter");
    const questionContainer = document.getElementById("question-container");
    const questionTitle = document.querySelector(".question-title")
    const leftButton = document.getElementById("left-button");
    const rightButton = document.getElementById("right-button");

    leftButton.remove();
    answersContainer.remove();
    questionCounter.remove();
    questionTitle.innerText = "Final Score"

    await getAnswers(globalId);
    for(key in userChoices)
     {
        if(Object.values(correctAnswers).includes(userChoices[key]))
        {
            score++;
        }
     }
    rightButton.innerText = "Home"
    questionBox.innerText = `${score} / ${globalTotalQuestions}`
    rightButton.addEventListener("click", () => {
        window.location.href = '/'
    })
}

function userAnswerSelected()
{
    const questionParent = document.getElementById("question-answers")
    const questionChildren = questionParent.querySelectorAll("button")
    const rightButton = document.querySelector("#right-button")

    for(let i = 0; i < questionChildren.length; i++)
    {
        const child = questionChildren[i]
        if(child.innerText == userChoices[questionCount])
        {
            child.classList.add("btn-primary")
            child.classList.remove("btn-outline-primary")
            rightButton.disabled = false
            break
        }
    }
}


document.addEventListener("DOMContentLoaded", () => {

    const startButton = document.getElementById("start")
    startButton.classList.add("btn", "btn-primary")

   startButton.addEventListener("click", async (e) =>
   {
        const id = parseInt(e.currentTarget.value)
        const questionsArray = await getQuestions(id)
        const currentQuestion = questionsArray[0].questionNumber
        const totalQuestions = questionsArray.length
        globalId = id
        globalTotalQuestions = totalQuestions
        globalQuestionsArray = questionsArray

        startButton.remove();

        const parentContainer = document.getElementById("container")
        const buttonContainer = document.getElementById("buttons")

        const questionTitle = document.createElement("div")
        const questionCounter = document.createElement("div")
        questionCounter.classList.add("question-counter")
        questionTitle.classList.add("question-title")
        questionTitle.textContent = "Question :"
        questionCounter.textContent = `${questionCount} / ${totalQuestions}`

        const questionContainer = document.createElement("div")
        questionContainer.classList.add("question-container")
        displayQuestion(id, currentQuestion, questionContainer)

        const rightButton = document.createElement("button")
        rightButton.classList.add("btn", "btn-primary")
        rightButton.id = "right-button"
        rightButton.disabled = true

        rightButton.textContent = ">"

        rightButton.addEventListener("click", questionNavigation)

        buttonContainer.append(rightButton)

        parentContainer.append(questionTitle)
        parentContainer.append(questionCounter)
        parentContainer.append(questionContainer)
        parentContainer.append(buttonContainer)
   })
})