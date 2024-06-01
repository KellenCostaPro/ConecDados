document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("form");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");

    form.addEventListener("submit", function(event) {
        event.preventDefault();

        resetErrorStyles();

        // Validar se o email está preenchido
        if (emailInput.value.trim() === "") {
            showError(emailInput, "Por favor, insira seu email.");
            return;
        }

        // Validar o email apenas se estiver preenchido
        if (!validateEmail(emailInput.value.trim())) {
            showError(emailInput, "Por favor, insira um email válido.");
            return;
        }

        // Validar se a senha está preenchida
        if (passwordInput.value.trim() === "") {
            showError(passwordInput, "Por favor, insira sua senha.");
            return;
        }

        // Preparar os dados do formulário para enviar à API
        const formData = {
            email: emailInput.value.trim(),
            password: passwordInput.value.trim()
        };

        // Enviar os dados para a API
        authenticateUser(formData);
    });

    function authenticateUser(data) {
        fetch('http://192.168.100.105:3000/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            if (response.ok) {
                // Se a resposta da API for bem-sucedida, redirecionar para a página principal
                window.location.href = 'index.html';
            } else {
                // Se a resposta da API indicar um erro de autenticação, mostrar mensagem de erro
                showError(passwordInput, "Email ou senha incorretos.");
            }
        })
        .catch(error => {
            console.error('Erro ao autenticar usuário:', error);
            // Se houver um erro ao enviar a solicitação para a API, mostrar mensagem de erro
            showError(passwordInput, "Ocorreu um erro ao tentar fazer login. Por favor, tente novamente mais tarde.");
        });
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
        errorInputs.forEach(function(input) {
            input.classList.remove("error");
            const errorMessage = input.querySelector(".form__error-message");
            errorMessage.textContent = '';
        });
    }

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
});

const hamburgerMenu = document.querySelector('.hamburger');
const menuList = document.querySelector('.menu__list');

hamburgerMenu.addEventListener('click', () => {
    menuList.classList.toggle('menu__list--show');
    hamburgerMenu.classList.toggle('hamburger--active');
});
