document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("form");
    const email = document.getElementById("email");
    const password = document.getElementById("password");



    form.addEventListener("submit", handleFormSubmit);

    function handleFormSubmit(event) {
        event.preventDefault();
        resetErrorStyles();

        if (!validateInputs()) return;

        const formData = {
            email: email.value.trim(),
            password: password.value.trim()
        };

        showLoadingAnimation();
        authenticateUser(formData);
    }

    function authenticateUser(formData) {
        fetch('http://192.168.100.105:3000/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
            .then(response => response.json().then(formData => ({ status: response.status, body: formData })))
            .then(handleAuthenticationResponse)
            .catch(() => {
                hideLoadingAnimation();
                displayPopup("Erro ao fazer login. Tente novamente.", ['reload']);
            });
    }

    function handleAuthenticationResponse(response) {
        hideLoadingAnimation();
        console.log(response)
        if (response.status === 201) {
            const token = response.body.token;
            const user = response.body.user.id;
            /* console.log("Token:", token); // Verificar o token extraído
            console.log("User ID:", user); // Verificar o ID extraído */
            localStorage.setItem('jwtToken', token);
            localStorage.setItem('teste', user);
            window.location = "home.html";
        } else if (response.status === 427) {
            displayPopup("Email não cadastrado.", ['cadastro', 'reload']);
        } else if (response.status === 428) {
            displayPopup("Email ou senha incorreto.", ['recover', 'reload']);
        } else {
            displayPopup("Erro ao fazer login. Tente novamente.", ['reload']);
        }
    }
});