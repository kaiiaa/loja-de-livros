document.addEventListener('DOMContentLoaded', function() {
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
    const userAvatar = document.getElementById('userAvatar');

    // Mostrar popup de login INTERNO (modificado)
    if (loginButton) {
        loginButton.addEventListener('click', function(e) {
            e.preventDefault();
            loginPopup.style.display = 'flex';
        });
    }

    // Fechar popup
    if (closePopup) {
        closePopup.addEventListener('click', () => {
            loginPopup.style.display = 'none';
        });
    }

    // Fechar popup ao clicar fora
    window.addEventListener('click', (e) => {
        if (e.target === loginPopup) {
            loginPopup.style.display = 'none';
        }
    });

    // Login com email e senha
    if (loginForm) {
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
    }

    // Registro de nova conta
    if (registerButton) {
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
    }

    // Recuperação de senha
    if (recoverPasswordButton) {
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
    }

    // Logout
    if (logoutButton) {
        logoutButton.addEventListener('click', () => {
            auth.signOut();
        });
    }

    // Monitorar estado de autenticação
    auth.onAuthStateChanged((user) => {
        if (user) {
            // Usuário logado
            if (loginButton) loginButton.style.display = 'none';
            if (logoutButton) logoutButton.style.display = 'block';
            if (userGreeting) userGreeting.style.display = 'block';

            const username = user.email.split('@')[0];
            if (userGreeting) userGreeting.textContent = `Olá, ${username}`;

            // Atualiza o avatar
            if (userAvatar) {
                userAvatar.textContent = username.charAt(0).toUpperCase();
                userAvatar.style.backgroundColor = '#488bc2'; // Cor roxa do seu tema
                userAvatar.style.color = 'white';
            }
        } else {
            // Usuário não logado
            if (loginButton) loginButton.style.display = 'block';
            if (logoutButton) logoutButton.style.display = 'none';
            if (userGreeting) userGreeting.style.display = 'none';

            // Volta para o ícone padrão
            if (userAvatar) {
                userAvatar.textContent = '';
                userAvatar.innerHTML = '<img src="img/contato.webp" alt="">'; // Ou seu ícone padrão
            }
        }
    });
});