function validacao() {
    const emailValido = isEmailValid();
    document.getElementById("botao-recuperar").disabled = !emailValido;

    const senhaValida = isPasswordValid();
    document.getElementById("botao-entrar").disabled = !emailValido || !senhaValida;
}

function isEmailValid() {
    const email = document.getElementById("email").value;
    if (!email) {
        return false;
    }
    return /\S+@\S+\.\S+/.test(email);
}

function isPasswordValid() {
    const senha = document.getElementById("senha").value;
    return !!senha; 
}

