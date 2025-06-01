// scriptMAIN.js - Versão corrigida
document.addEventListener('DOMContentLoaded', function() {
    // Controle do popup interno
    const loginButton = document.getElementById('loginButton');
    const closePopup = document.getElementById('closePopup');
    const loginPopup = document.getElementById('loginPopup');
    
    if(loginButton && loginPopup) {
        loginButton.addEventListener('click', function(e) {
            e.preventDefault();
            loginPopup.style.display = 'flex';
        });
    }
    
    if(closePopup) {
        closePopup.addEventListener('click', function() {
            loginPopup.style.display = 'none';
        });
    }
    
    // Fechar ao clicar fora do popup
    window.addEventListener('click', function(e) {
        if(e.target === loginPopup) {
            loginPopup.style.display = 'none';
        }
    });
});






