document.addEventListener("DOMContentLoaded", () => {
    const submitQuiz = document.getElementById("submit");
    const submitForm = document.getElementById("form");
    const titleInput = document.getElementById("quiz-name");
    const descInput = document.getElementById("quiz-desc");
    let timeout;

    function isInvalid(value) {
        return value.trim() === '';
    }

    function userFeedback(input) {
        if (isInvalid(input.value)) {
            input.classList.remove('is-valid');
            input.classList.add('is-invalid');

            clearTimeout(timeout);

            timeout = setTimeout(() => {
                input.classList.remove('is-invalid');
            }, 800);
        } else {
            input.classList.remove('is-invalid');
            input.classList.add('is-valid');

            clearTimeout(timeout);
        }
    }

    function formValidation(event) {
        let formValid = true;

        if (isInvalid(titleInput.value)) {
            titleInput.setCustomValidity('Title cannot be empty or whitespace.');
            titleInput.classList.add('is-invalid');
            formValid = false;
        } else {
            titleInput.setCustomValidity('');
            titleInput.classList.remove('is-invalid');
            titleInput.classList.add('is-valid');
        }

        if (isInvalid(descInput.value)) {
            descInput.setCustomValidity('Description cannot be empty or whitespace.');
            descInput.classList.add('is-invalid');
            formValid = false;
        } else {
            descInput.setCustomValidity('');
            descInput.classList.remove('is-invalid');
            descInput.classList.add('is-valid');
        }

        if (!formValid) {
            event.preventDefault();
            submitForm.classList.add("was-validated");
            timeout = setTimeout(() => {
                submitForm.classList.remove('was-validated');
            }, 800);
        } else {
            submitForm.classList.remove("was-validated");
        }
    }

    titleInput.addEventListener('input', () => userFeedback(titleInput));
    descInput.addEventListener('input', () => userFeedback(descInput));
    submitForm.addEventListener("submit", formValidation);
    submitQuiz.addEventListener("click", () => {
        submitForm.requestSubmit();
    });
});