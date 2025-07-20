import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import { getDatabase, ref, set, get, update, remove } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-database.js";

// Use SUAS configurações originais do Firebase
  const firebaseConfig = {
    apiKey: "AIzaSyAOb0fi4skGdmcGA68D2TFwiYuDlxGCaXM",
    authDomain: "loja-de-livros-8b465.firebaseapp.com",
    projectId: "loja-de-livros-8b465",
    storageBucket: "loja-de-livros-8b465.firebasestorage.app",
    messagingSenderId: "556264075539",
    appId: "1:556264075539:web:491c9995df97543be3eae6",
    measurementId: "G-Z96DPZ4H1J"
  };

const app = initializeApp(firebaseConfig);
const db = getDatabase();

// Elementos do formulário (agora com IDs corretos)
const codigoProduto = document.getElementById('codigoProduto');
const nomeProduto = document.getElementById('nomeProduto');
const categoriaProduto = document.getElementById('categoriaProduto');
const quantidadeProduto = document.getElementById('quantidadeProduto');
const valorProduto = document.getElementById('valorProduto');
const btnCadastrarProduto = document.getElementById('btnCadastrarProduto');

// Elementos de busca/atualização
const buscaCodigoProduto = document.getElementById('buscaCodigoProduto');
const editarNomeProduto = document.getElementById('editarNomeProduto');
const editarCategoriaProduto = document.getElementById('editarCategoriaProduto');
const editarQuantidadeProduto = document.getElementById('editarQuantidadeProduto');
const editarValorProduto = document.getElementById('editarValorProduto');
const btnBuscarProduto = document.getElementById('btnBuscarProduto');
const btnAtualizarProduto = document.getElementById('btnAtualizarProduto');
const btnExcluirProduto = document.getElementById('btnExcluirProduto');



// Função para cadastrar produto
function cadastrarProduto() {
    if (!codigoProduto.value || !nomeProduto.value) {
        alert('Código e Nome do Produto são obrigatórios!');
        return;
    }

    get(ref(db, 'Produtos/' + codigoProduto.value))
        .then((snapshot) => {
            if (snapshot.exists()) {
                alert('Já existe um produto com este código!');
            } else {
                set(ref(db, 'Produtos/' + codigoProduto.value), {
                    codigo: codigoProduto.value,
                    nome: nomeProduto.value,
                    categoria: categoriaProduto.value,
                    quantidade: quantidadeProduto.value,
                    valor: valorProduto.value
                }).then(() => {
                    alert('Produto cadastrado com sucesso!');
                    limparFormulario();
                }).catch((error) => {
                    console.error('Erro ao cadastrar:', error);
                    alert('Erro ao cadastrar produto');
                });
            }
        });
}

// Função para limpar formulário de cadastro
function limparFormulario() {
    codigoProduto.value = '';
    nomeProduto.value = '';
    categoriaProduto.value = '';
    quantidadeProduto.value = '';
    valorProduto.value = '';
}

// Função para buscar produto
function buscarProduto() {
    const codigo = buscaCodigoProduto.value;
    
    if (!codigo) {
        alert('Digite um código para buscar');
        return;
    }

    get(ref(db, 'Produtos/' + codigo))
        .then((snapshot) => {
            if (snapshot.exists()) {
                const produto = snapshot.val();
                editarNomeProduto.value = produto.nome;
                editarCategoriaProduto.value = produto.categoria || '';
                editarQuantidadeProduto.value = produto.quantidade || '';
                editarValorProduto.value = produto.valor || '';
            } else {
                alert('Produto não encontrado!');
            }
        })
        .catch((error) => {
            console.error('Erro ao buscar:', error);
            alert('Erro ao buscar produto');
        });
}

// Função para atualizar produto
function atualizarProduto() {
    const codigo = buscaCodigoProduto.value;
    
    if (!codigo) {
        alert('Nenhum produto selecionado para atualização');
        return;
    }

    update(ref(db, 'Produtos/' + codigo), {
        nome: editarNomeProduto.value,
        categoria: editarCategoriaProduto.value,
        quantidade: editarQuantidadeProduto.value,
        valor: editarValorProduto.value
    }).then(() => {
        alert('Produto atualizado com sucesso!');
    }).catch((error) => {
        console.error('Erro ao atualizar:', error);
        alert('Erro ao atualizar produto');
    });
}

// Função para excluir produto
function excluirProduto() {
    const codigo = buscaCodigoProduto.value;
    
    if (!codigo) {
        alert('Nenhum produto selecionado para exclusão');
        return;
    }

    if (confirm('Tem certeza que deseja excluir este produto?')) {
        remove(ref(db, 'Produtos/' + codigo))
            .then(() => {
                alert('Produto excluído com sucesso!');
                limparBusca();
            })
            .catch((error) => {
                console.error('Erro ao excluir:', error);
                alert('Erro ao excluir produto');
            });
    }
}

// Função para limpar busca
function limparBusca() {
    buscaCodigoProduto.value = '';
    editarNomeProduto.value = '';
    editarCategoriaProduto.value = '';
    editarQuantidadeProduto.value = '';
    editarValorProduto.value = '';
}

// Event listeners
btnCadastrarProduto.addEventListener('click', cadastrarProduto);
btnBuscarProduto.addEventListener('click', buscarProduto);
btnAtualizarProduto.addEventListener('click', atualizarProduto);
btnExcluirProduto.addEventListener('click', excluirProduto);