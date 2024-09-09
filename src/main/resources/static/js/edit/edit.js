document.addEventListener("DOMContentLoaded", () => {
    const submitQuiz = document.getElementById("submit");
    const submitForm = document.getElementById("form");
    const titleInput = document.getElementById("quiz-name");
    const descInput = document.getElementById("quiz-desc");

    let timeout;

    // Check for invalid input empty spaces
    function isInvalid(value) {
        return value.trim() === '';
    }

    // Function to handle feedback for both inputs
    function userFeedback(input) {
        if (isInvalid(input.value)) {
            input.classList.remove('is-valid');
            input.classList.add('is-invalid');

            // Clear previous timeout if exists
            clearTimeout(timeout);

            // Set timeout to reset field to neutral state
            timeout = setTimeout(() => {
                input.classList.remove('is-invalid');
            }, 800);
        } else {
            input.classList.remove('is-invalid');
            input.classList.add('is-valid');

            // Clear previous timeout if exists
            clearTimeout(timeout);
        }
    }

    // Function to handle validation and feedback on form submission
    function formValidation(event) {
        let formValid = true;

        // Validate title
        if (isInvalid(titleInput.value)) {
            titleInput.setCustomValidity('Title cannot be empty or whitespace.');
            titleInput.classList.add('is-invalid');
            formValid = false;
        } else {
            titleInput.setCustomValidity('');
            titleInput.classList.remove('is-invalid');
            titleInput.classList.add('is-valid');
        }

        // Validate description
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
            event.preventDefault(); // Prevent form submission
            submitForm.classList.add("was-validated");
            timeout = setTimeout(() => {
                submitForm.classList.remove('was-validated');
            }, 800);
        } else {
            submitForm.classList.remove("was-validated");
        }
    }

    // Handle input events for real-time feedback
    titleInput.addEventListener('input', () => userFeedback(titleInput));
    descInput.addEventListener('input', () => userFeedback(descInput));

    // Handle form submission
    submitForm.addEventListener("submit", formValidation);

    // Handle click event for the submit button
    submitQuiz.addEventListener("click", () => {
        submitForm.requestSubmit();
    });
});