document.addEventListener('DOMContentLoaded', function() {
    function abrirPopup() {
        const largura = 500;
        const altura = 400;
        const esquerda = (window.screen.width - largura) / 2;
        const topo = (window.screen.height - altura) / 2;

        try {
            const popup = window.open(
                "login.html",
                "Login",
                `width=${largura},height=${altura},left=${esquerda},top=${topo}`
            );
            
            if (!popup || popup.closed || typeof popup.closed === 'undefined') {
                alert("Por favor, permita popups para este site.");
            }
        } catch (e) {
            console.error("Erro ao abrir popup:", e);
            alert("Não foi possível abrir a janela de login.");
        }
}

    
    
    
    
    const userAvatar = document.getElementById('userAvatar');
    // Configuração do Firebase
    const firebaseConfig = {
            apiKey: "AIzaSyAWHB5QGKRgXKYqSHcpFWWwWVzJhbcaTYw",
            authDomain: "projeto-loja-13108.firebaseapp.com",
            projectId: "projeto-loja-13108",
            storageBucket: "projeto-loja-13108.appspot.com",
            messagingSenderId: "131938664632",
            appId: "1:131938664632:web:03e6bc30262aaa193a344d",
            measurementId: "G-J53SQK7M0E"
        };

    // Inicializa o Firebase
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }
    const auth = firebase.auth();

    // Elementos da interface
    const loginButton = document.getElementById('loginButton');
    const logoutButton = document.getElementById('logoutButton');
    const userGreeting = document.getElementById('userGreeting');
    const loginPopup = document.getElementById('loginPopup');
    const closePopup = document.getElementById('closePopup');
    const loginForm = document.getElementById('loginForm');
    const registerButton = document.getElementById('register-button');
    const recoverPasswordButton = document.getElementById('recover-password-button');

    // Mostrar popup de login
loginButton.addEventListener('click', abrirPopup);
    // Fechar popup
    closePopup.addEventListener('click', () => {
        loginPopup.style.display = 'none';
    });

    // Fechar popup ao clicar fora
    window.addEventListener('click', (e) => {
        if (e.target === loginPopup) {
            loginPopup.style.display = 'none';
        }
    });

    // Login com email e senha
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        
        auth.signInWithEmailAndPassword(email, password)
            .then(() => {
                loginPopup.style.display = 'none';
                loginForm.reset();
            })
            .catch((error) => {
                alert(error.message);
            });
    });

    // Registro de nova conta
    registerButton.addEventListener('click', () => {
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        
        if (!email || !password) {
            alert('Por favor, preencha todos os campos para se registrar.');
            return;
        }
        
        auth.createUserWithEmailAndPassword(email, password)
            .then(() => {
                alert('Conta criada com sucesso!');
                loginPopup.style.display = 'none';
                loginForm.reset();
            })
            .catch((error) => {
                alert(error.message);
            });
    });

    // Recuperação de senha
    recoverPasswordButton.addEventListener('click', () => {
        const email = document.getElementById('email').value;
        
        if (!email) {
            alert('Por favor, insira seu e-mail para recuperar a senha.');
            return;
        }
        
        auth.sendPasswordResetEmail(email)
            .then(() => {
                alert('E-mail de recuperação enviado! Verifique sua caixa de entrada.');
            })
            .catch((error) => {
                alert(error.message);
            });
    });

    // Logout
    logoutButton.addEventListener('click', () => {
        auth.signOut();
    });

    // Monitorar estado de autenticação
    auth.onAuthStateChanged((user) => {
    if (user) {
        // Usuário logado
        loginButton.style.display = 'none';
        logoutButton.style.display = 'block';
        userGreeting.style.display = 'block';

        const username = user.email.split('@')[0];
        userGreeting.textContent = `Olá, ${username}`;

        // Atualiza o avatar com a primeira letra do nome de usuário
        userAvatar.textContent = username.charAt(0).toUpperCase();
    } else {
        // Usuário não logado
        loginButton.style.display = 'block';
        logoutButton.style.display = 'none';
        userGreeting.style.display = 'none';

        // Volta para "A" de Anônimo
        userAvatar.textContent = '';
    }
});
});