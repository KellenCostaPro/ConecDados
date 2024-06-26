

//cadastro.js


// Validação campo nome
function checkInputname() {
    const nameValue = name.value.trim();
    const formItem = name.parentElement;
    const errorMessage = formItem.querySelector(".error-message");

    if (nameValue === "") {
        errorMessage.innerText = "Preencha um nome!";
        formItem.classList.add("error");
        errorMessage.style.display = "block";
        return false;
    } else {
        errorMessage.innerText = "";
        formItem.classList.remove("error");
        errorMessage.style.display = "none";
        return true;
    }
}

 // Validação campo email
function checkInputEmail() {
    const emailValue = email.value.trim();
    const formItem = email.parentElement;
    const errorMessage = formItem.querySelector(".error-message");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (emailValue === "") {
        errorMessage.innerText = "O email é obrigatório.";
        formItem.classList.add("error");
        errorMessage.style.display = "block";
        return false;
    } else if (!emailRegex.test(emailValue)) {
        errorMessage.innerText = "O email inserido não é válido. Ex:seunome@email.com";
        formItem.classList.add("error");
        errorMessage.style.display = "block";
        return false;
    } else {
        errorMessage.innerText = "";
        formItem.classList.remove("error");
        errorMessage.style.display = "none";
        return true;
    }
}
// Validação campo senha
function checkInputPassword() {
    const passwordValue = password.value.trim();
    const formItem = password.parentElement;
    const errorMessage = formItem.querySelector(".error-message");

    const isPasswordValid = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(passwordValue);

    if (passwordValue === "") {
        errorMessage.innerText = "A senha é obrigatória.";
        formItem.classList.add("error");
        errorMessage.style.display = "block";
        return false;
    } else if (!isPasswordValid) {
        errorMessage.innerText = "A senha deve seguir os requisitos abaixo.";
        formItem.classList.add("error");
        errorMessage.style.display = "block";
        return false;
    } else {
        errorMessage.innerText = "";
        formItem.classList.remove("error");
        errorMessage.style.display = "none";
        return true;
    }
}


// validação de requesitos senha 
function checkPasswordRequirements() {
    const passwordValue = password.value;
    const requirementsList = document.querySelectorAll(".requirements__item");
    const progressBar = document.querySelector(".requirements__progress-bar");

    const uppercaseRegex = /[A-Z]/;
    const lowercaseRegex = /[a-z]/;
    const numberRegex = /[0-9]/;
    const specialCharRegex = /[!@#$%^&*(),.?"_:{}|<>]/;

    let requirementsMet = 0;

    requirementsList.forEach((item, index) => {
        switch (index) {
            case 0:
                if (uppercaseRegex.test(passwordValue) && lowercaseRegex.test(passwordValue)) {
                    item.classList.add("checked");
                    requirementsMet++;
                } else {
                    item.classList.remove("checked");
                }
                break;
            case 1:
                if (numberRegex.test(passwordValue)) {
                    item.classList.add("checked");
                    requirementsMet++;
                } else {
                    item.classList.remove("checked");
                }
                break;
            case 2:
                if (specialCharRegex.test(passwordValue)) {
                    item.classList.add("checked");
                    requirementsMet++;
                } else {
                    item.classList.remove("checked");
                }
                break;
            case 3:
                if (passwordValue.length >= 8) {
                    item.classList.add("checked");
                    requirementsMet++;
                } else {
                    item.classList.remove("checked");
                }
                break;
        }
    });

    const percentMet = (requirementsMet / requirementsList.length) * 100;

    progressBar.classList.remove("twenty-percent", "fifty-percent", "seventy-five-percent", "full-percent");

    if (percentMet < 25) {
        progressBar.classList.add("twenty-percent");
    } else if (percentMet < 50) {
        progressBar.classList.add("fifty-percent");
    } else if (percentMet < 75) {
        progressBar.classList.add("seventy-five-percent");
    } else {
        progressBar.classList.add("full-percent");
    }

    progressBar.style.width = percentMet + "%";
}


    // Validação campo confirmação senha
    function checkInputconfirmpassword() {
        const passwordValue = password.value.trim();
        const confirmationPasswordValue = confirmpassword.value.trim();
        const formItem = confirmpassword.parentElement;
        const errorMessage = formItem.querySelector(".error-message");

        if (confirmationPasswordValue === "") {
            errorMessage.innerText = "A confirmação de senha é obrigatória.";
            formItem.classList.add("error");
            errorMessage.style.display = "block";
            return false;
        } else if (confirmationPasswordValue !== passwordValue) {
            errorMessage.innerText = "As senhas não são iguais.";
            formItem.classList.add("error");
            errorMessage.style.display = "block";
            return false;
        } else {
            errorMessage.innerText = "";
            formItem.classList.remove("error");
            errorMessage.style.display = "none";
            return true;
        }
    }













