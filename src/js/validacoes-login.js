// login.js


function validateInputs() {
    if (email.value.trim() === "") {
        showError(email, "Por favor, insira seu email.");
        return false;
    }

    if (!validateEmail(email.value.trim())) {
        showError(email, "Por favor, insira um email válido.");
        return false;
    }

    if (password.value.trim() === "") {
        showError(password, "Por favor, insira sua senha.");
        return false;
    }

    return true;
}

function showError(input, message) {
    const parentElement = input.parentElement;
    const errorMessage = parentElement.querySelector(".form__error-message");
    errorMessage.textContent = message;
    parentElement.classList.add("error");
    errorMessage.style.display = "block";
}

function resetErrorStyles() {
    const errorInputs = document.querySelectorAll(".form__content.error");
    errorInputs.forEach(input => {
        input.classList.remove("error");
        const errorMessage = input.querySelector(".form__error-message");
        errorMessage.textContent = '';
    });
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}