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


document.addEventListener("DOMContentLoaded", () => {
    console.log("connected")

    const startButton = document.getElementById("start");

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

        const url = `/quiz/setup/${id}?questionId=1`;


            fetch(url)
                .then(response => { return response.text() }).then( data => {
                questionContainer.innerHTML = data;})
                .catch(error => {
                    console.error("Something went wrong", error)
                })

        const leftButton = document.createElement("button");
        const rightButton = document.createElement("button");

        buttonContainer.append(leftButton);
        buttonContainer.append(rightButton);

        parentContainer.append(questionCounter)
        parentContainer.append(questionContainer)
        parentContainer.append(buttonContainer)
   })
})