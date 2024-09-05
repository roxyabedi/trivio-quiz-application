function loadPage(quizId){

    const url = `/quiz/setup/${quizId}`;

    fetch(url)
        .then(response => { return response.text() })
        .then(data => {
            console.log(data)
        })
        .catch(error => {
            console.error("Something went wrong", error)
        })


}


document.addEventListener("DOMContentLoaded", () => {
    console.log("connected")
    loadPage();
})