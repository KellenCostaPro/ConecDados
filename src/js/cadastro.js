document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("form");
    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const confirmpassword = document.getElementById("confirmpassword");
    const privacyCheckbox = document.getElementById('privacy-checkbox');

    const apiUrl = "http://192.168.100.105:3000/auth/register";

    // Validação aos campos
    name.addEventListener("blur", checkInputname);
    email.addEventListener("blur", checkInputEmail);
    password.addEventListener("input", checkInputPassword);
    password.addEventListener("input", checkPasswordRequirements);
    confirmpassword.addEventListener("input", checkInputconfirmpassword);

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        // Validando todos os campos antes de enviar o formulário
        const isNameValid = checkInputname();
        const isEmailValid = checkInputEmail();
        const isPasswordValid = checkInputPassword();
        const isConfirmPasswordValid = checkInputconfirmpassword();

        // Se todas as validações passarem, enviar o formulário
        if (isNameValid && isEmailValid && isPasswordValid && isConfirmPasswordValid) {
            sendData(); // Envia os dados se todas as validações passarem
        }
    });

    // Função para exibir o popup com a mensagem e botões específicos
    function displayPopup(message, buttons) {
        const popup = document.getElementById("popup");
        const popupMessage = document.getElementById("popupMessage");
        const loginButton = document.getElementById("loginButton");
        const recoverButton = document.getElementById("recoverButton");
        const reloadButton = document.getElementById("reloadButton");

        // Exibe o popup
        popup.style.display = "block";
        popupMessage.textContent = message;

        // Exibe os botões específicos
        loginButton.style.display = buttons.includes('login') ? 'inline-block' : 'none';
        recoverButton.style.display = buttons.includes('recover') ? 'inline-block' : 'none';
        reloadButton.style.display = buttons.includes('reload') ? 'inline-block' : 'none';

        // Adiciona os event listeners aos botões
        loginButton.addEventListener("click", redirectToLogin);
        recoverButton.addEventListener("click", redirectToRecoverPassword);
        reloadButton.addEventListener("click", reloadPage);
          //fechar o popup
        popup.addEventListener("click", closePopup);

    }

    // Função para fechar o popup
    function closePopup() {
        document.getElementById("popup").style.display = "none";
    }

    // Função para redirecionar para a página de login
    function redirectToLogin() {
        window.location.href = "login.html";
    }

    // Função para redirecionar para a página de recuperação de senha
    function redirectToRecoverPassword() {
        window.location.href = "recover-password.html";
    }

    // Função para recarregar a página
    function reloadPage() {
        window.location.reload();
    }

    // Função para enviar dados para a API
    function sendData() {
        const formData = {
            name: name.value.trim(),
            email: email.value.trim(),
            password: password.value.trim(),
            confirmpassword: confirmpassword.value.trim()
        };

        fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        })
        .then(response => {
            if (response.status === 201) {
                displayPopup("Cadastro realizado com sucesso.", ['login']);
            } else if (response.status === 426) {
                displayPopup("Email em uso.", ['login', 'recover']);
            } else {
                displayPopup("Erro ao cadastrar. Tente novamente.", ['reload']);
            }
        })
        .catch(error => {
            displayPopup("Erro ao cadastrar. Tente novamente.", ['reload']);
        });
    }

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
});
