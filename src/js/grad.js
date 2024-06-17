document.addEventListener("DOMContentLoaded", function() {
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
        window.location.href = 'login.html'; 
        return;
    }

    fetch('http://192.168.100.105:3000/user/id', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${authToken}`
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao obter o ID do usuário');
        }
        return response.json();
    })
    .then(data => {
        if (!data.userId) {
            throw new Error('ID do usuário não encontrado');
        }
        
        window.location.href = 'grad.html'; 
    })
    .catch(error => {
        console.error('Erro ao carregar a sessão:', error);
        localStorage.removeItem('authToken');
        window.location.href = 'login.html'; 
    });















    document.getElementById('mapFile').addEventListener('change', function(event) {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = function(e) {
            const img = document.createElement('img');
            img.src = e.target.result;
            img.style.width = '100%';
            img.style.height = '100%';
            img.style.position = 'absolute';
            img.style.top = '0';
            img.style.left = '0';
            const imageArea = document.getElementById('imageArea');
            imageArea.innerHTML = '';
            imageArea.appendChild(img);
            saveSession();
        };
        reader.readAsDataURL(file);
    });

    document.getElementById('characterForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const charName = document.getElementById('charName').value;
        const charClass = document.getElementById('charClass').value;
        const charTokenFile = document.getElementById('charToken').files[0];

        if (charTokenFile) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const tokenUrl = e.target.result;
                const tokenTop = '10px'; // Defina a posição inicial do token
                const tokenLeft = '10px'; // Defina a posição inicial do token
                addCharacterToList({ name: charName, class: charClass, tokenUrl: tokenUrl });
                addToken(tokenUrl, tokenTop, tokenLeft); // Adiciona o token com suas coordenadas
                saveSession();
            };
            reader.readAsDataURL(charTokenFile);
        }
    });

    function addToken(tokenUrl, top, left) {
        const img = document.createElement('img');
        img.src = tokenUrl;
        img.style.position = 'absolute';
        img.style.top = top; // Define a posição top do token
        img.style.left = left; // Define a posição left do token
        img.style.width = '50px';
        img.style.cursor = 'pointer';
        img.draggable = true;

        img.addEventListener('dragstart', function(event) {
            event.dataTransfer.setData('text/plain', null);
            img.classList.add('dragging');
        });

        img.addEventListener('dragend', function(event) {
            img.style.top = event.clientY - img.offsetHeight / 2 + 'px';
            img.style.left = event.clientX - img.offsetWidth / 2 + 'px';
            img.classList.remove('dragging');
            saveSession();
        });

        document.getElementById('imageArea').appendChild(img);
    }

    function loadSession(userId) {
        // Lógica para carregar a sessão com base no ID do usuário
    }

    function saveSession() {
        // Lógica para salvar a sessão
    }
});
