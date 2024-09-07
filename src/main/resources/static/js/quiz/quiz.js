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

function answerSelect(event)
{
    const rightButton = document.getElementById("right-button")
    const leftButton = document.getElementById("left-button")
    const answerButtons = document.querySelector("#question-answers")
    const answerButtonsChildren = answerButtons.querySelectorAll("button")

    const currentAnswerButton = event.currentTarget
    const choice = event.target.innerText

    userChoices[questionCount] = choice;

    const previousChoice = answerButtons.querySelector(".btn-primary")
    previousChoice == null && currentAnswerButton ? null : previousChoice.classList.remove("btn-primary")
    currentAnswerButton.classList.add("btn-primary")

    if(questionCount >= 1)
    {
        rightButton.disabled = false
    }

    if(questionCount > 1)
    {
        leftButton.disabled = false
    }

    if(questionCount == 1)
    {
        leftButton.disabled = true
    }
}

function questionNavigation(event)
{
    const choice = event.target.innerText
    const parent = document.querySelector(".question-container")
    const counter = document.querySelector(".question-counter")
    const rightButton = document.getElementById("right-button")
    const leftButton = document.getElementById("left-button")
    let answerButtons;

    //NEXT && 1-4
    if(choice == ">" && questionCount < globalTotalQuestions)
    {
        questionCount++
        counter.innerHTML = `${questionCount}/${globalTotalQuestions}`
        displayQuestion(globalId, questionCount, parent)
        rightButton.disabled = true

        if(questionCount > 1)
        {
            leftButton.disabled = false
        }

        //CHECK IF AT END OF TEST
        if(questionCount == globalTotalQuestions)
        {
            rightButton.innerText = "Submit";
            rightButton.removeEventListener("click", questionNavigation)
            rightButton.addEventListener("click", submitQuiz)
        }
        else
        {
            rightButton.innerText = ">";
            rightButton.removeEventListener("click", submitQuiz)
            rightButton.addEventListener("click", questionNavigation)
        }
    }
    //NEXT && 2-5
    if(choice == "<" && questionCount > 1 )
    {
        questionCount--
        counter.innerHTML = `${questionCount}/${globalTotalQuestions}`
        displayQuestion(globalId, questionCount, parent)

        if(questionCount == 1)
        {
            leftButton.disabled = true
        }
        if(rightButton.innerText == "Submit")
        {
            rightButton.innerText = ">"
        }
    }

}

async function submitQuiz()
{
    const answersContainer = document.getElementById("question-answers");
    const questionBox = document.getElementById("question-content");
    const questionCounter = document.querySelector(".question-counter");

    const leftButton = document.getElementById("left-button");
    const rightButton = document.getElementById("right-button");

    leftButton.remove();
    answersContainer.remove();
    questionCounter.remove();

    await getAnswers(globalId);

    for(key in userChoices)
     {
        console.log(userChoices[key], "current Search")
        if(Object.values(correctAnswers).includes(userChoices[key]))
        {
            score++;
        }
     }

    rightButton.innerText = "Home"
    questionBox.innerText = `${score}/${globalTotalQuestions}`

    rightButton.addEventListener("click", () => {
        window.location.href = '/'
    })
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


        //Counter
        const questionCounter = document.createElement("div")
        questionCounter.classList.add("question-counter")
        questionCounter.textContent = `${questionCount}/${totalQuestions}`


        //Container
        const questionContainer = document.createElement("div")
        questionContainer.classList.add("question-container")
        displayQuestion(id, currentQuestion, questionContainer)

        //Navigation Buttons < >
        const leftButton = document.createElement("button")
        const rightButton = document.createElement("button")
        rightButton.classList.add("btn", "btn-primary")
        leftButton.classList.add("btn", "btn-primary")
        leftButton.id = "left-button"
        rightButton.id = "right-button"
        leftButton.disabled = true
        rightButton.disabled = true

        leftButton.textContent = "<"
        rightButton.textContent = ">"

        leftButton.addEventListener("click", questionNavigation)
        rightButton.addEventListener("click", questionNavigation)

        //Appends
        buttonContainer.append(leftButton)
        buttonContainer.append(rightButton)

        parentContainer.append(questionCounter)
        parentContainer.append(questionContainer)
        parentContainer.append(buttonContainer)
   })
})