document.addEventListener("DOMContentLoaded", () => {
    const submitQuiz = document.getElementById("submit")
    const submitForm = document.getElementById("form")
    const titleInput = document.getElementById("quiz-name")
    const descInput = document.getElementById("quiz-desc")
    const modalMenu = document.getElementById("add-quiz")
    const modalButton = document.getElementById("modal-trigger");

    submitQuiz.addEventListener("click", () =>
    {
        submitForm.requestSubmit();
    })

    titleInput.addEventListener("input", (e) =>
    {
        submitForm.classList.remove("was-validated")
    })

    descInput.addEventListener("input", () =>
    {
        submitForm.classList.remove("was-validated")
    })


    submitForm.addEventListener("submit", (event) =>
    {
        //Form is good
        if(!submitForm.checkValidity())
        {
            event.preventDefault()
            event.stopPropagation()
            submitForm.classList.add("was-validated")
        }
    })
});