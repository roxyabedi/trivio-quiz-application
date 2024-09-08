document.addEventListener("DOMContentLoaded", () => {
    const submitQuiz = document.getElementById("submit")
    const submitForm = document.getElementById("form")
    const titleInput = document.getElementById("quiz-name")
    const descInput = document.getElementById("quiz-desc")
    const modalMenu = document.getElementById("add-quiz")

    titleInput.addEventListener("input", (e) =>
    {
        submitForm.classList.remove("was-validated")
    })

    descInput.addEventListener("input", () =>
    {
        submitForm.classList.remove("was-validated")
    })

    submitForm.addEventListener("submit", () =>
    {
        if(!submitForm.checkValidity())
        {
            event.preventDefault()
            event.stopPropagation();
            submitForm.classList.add("was-validated")
            modalMenu.style.display = "none"

        }
    })


    submitQuiz.addEventListener("click", () =>
    {

        submitForm.submit();
        modalMenu.style.display = "block"

    })



});