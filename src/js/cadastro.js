//add tamanho de pasta 



document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("form");
    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const confirmpassword = document.getElementById("confirmpassword");
    const privacyCheckbox = document.getElementById('privacy-checkbox');
    /* const storage = document.getElementById ("storage") */
    const apiUrl = `${host}/auth/register`;


    name.addEventListener("blur", checkInputname);
    email.addEventListener("blur", checkInputEmail);
    password.addEventListener("input", checkInputPassword);
    password.addEventListener("input", checkPasswordRequirements);
    confirmpassword.addEventListener("input", checkInputconfirmpassword);

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const isNameValid = checkInputname();
        const isEmailValid = checkInputEmail();
        const isPasswordValid = checkInputPassword();
        const isConfirmPasswordValid = checkInputconfirmpassword();

        if (isNameValid && isEmailValid && isPasswordValid && isConfirmPasswordValid) {
            showLoadingAnimation();
            sendData(); 
        }
    });
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
            hideLoadingAnimation();
            if (response.status === 201) {
                displayPopup("Cadastro realizado com sucesso.", ['login']);
            } else if (response.status === 426) {
                displayPopup("Email em uso.", ['login', 'recover']);
            } else {
                displayPopup("Erro ao cadastrar. Tente novamente.", ['reload']);
            }
        })
        .catch(error => {
            hideLoadingAnimation();
            displayPopup("Erro ao cadastrar. Tente novamente.", ['reload']);
        });
    }
});
