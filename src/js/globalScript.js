

// Função para exibir o popup
function displayPopup(message, buttons) {
    const popup = document.getElementById("popup");
    const popupMessage = document.getElementById("popupMessage");
    const loginButton = document.getElementById("loginButton");
    const recoverButton = document.getElementById("recoverButton");
    const reloadButton = document.getElementById("reloadButton");
    const registerButton = document.getElementById("registerButton");

    // Exibe o popup
    popup.style.display = "block";
    popupMessage.textContent = message;

    // Exibe os botões específicos
    if (loginButton) loginButton.style.display = buttons.includes('login') ? 'inline-block' : 'none';
    if (recoverButton) recoverButton.style.display = buttons.includes('recover') ? 'inline-block' : 'none';
    if (reloadButton) reloadButton.style.display = buttons.includes('reload') ? 'inline-block' : 'none';
    if (registerButton) registerButton.style.display = buttons.includes('register') ? 'inline-block' : 'none';

    // Adiciona os event listeners aos botões
    if (loginButton) loginButton.addEventListener("click", redirectToLogin);
    if (recoverButton) recoverButton.addEventListener("click", redirectToRecoverPassword);
    if (reloadButton) reloadButton.addEventListener("click", reloadPage);
    if (registerButton) registerButton.addEventListener("click", redirectToRegister);
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

// Função para redirecionar para a página de cadastro
function redirectToRegister() {
    window.location.href = "register.html";
}

// Função para recarregar a página
function reloadPage() {
    window.location.reload();
}



//animação d loading
// Função  de carregamento
function showLoadingAnimation() {
    const loginForms = document.querySelector('body');
    const loadingSpinner = document.createElement('div');
    loadingSpinner.classList.add('loading-spinner');
    loadingSpinner.innerHTML = `
        <div class="spinner"></div>
    `;
    loginForms.appendChild(loadingSpinner);
}

// Função para esconder a animação de carregamento
function hideLoadingAnimation() {
    const loadingSpinner = document.querySelector('.loading-spinner');
    if (loadingSpinner) {
        loadingSpinner.remove();
    }
}
