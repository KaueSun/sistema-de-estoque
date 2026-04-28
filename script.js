const usuarios = [
    { id: 1, login: "admin", senha: "123", cargo: "admin", nome: "Administrador" },
    { id: 2, login: "user", senha: "123", cargo: "user", nome: "Usuário Comum" }
];

let produtos = [
    { id: 1, nome: "Teclado Mecânico", quantidade: 15, autor: "admin" },
    { id: 2, nome: "Mouse sem fio", quantidade: 30, autor: "admin" }
];

let usuarioLogado = null;
let proximoIdProduto = 3;

const telaLogin = document.getElementById("login-container");
const telaApp = document.getElementById("app-container");
const formLogin = document.getElementById("login-form");
const msgErro = document.getElementById("login-erro");
const displayUsuario = document.getElementById("user-display");
const avisoPermissao = document.getElementById("aviso-permissao");
const formProduto = document.getElementById("form-produto");
const tbodyProdutos = document.getElementById("lista-produtos");

formLogin.addEventListener("submit", function(event) {
    event.preventDefault();
    const userDigitado = document.getElementById("username").value;
    const senhaDigitada = document.getElementById("senha").value;

    const usuarioEncontrado = usuarios.find(u => u.login === userDigitado && u.senha === senhaDigitada);

    if (usuarioEncontrado) {
        usuarioLogado = usuarioEncontrado;
        iniciarApp();
    } else {
        msgErro.innerText = "Usuário ou senha incorretos!";
    }
});

document.getElementById("btn-logout").addEventListener("click", function() {
    usuarioLogado = null;
    document.getElementById("username").value = "";
    document.getElementById("senha").value = "";
    telaApp.classList.add("hidden");
    telaLogin.classList.remove("hidden");
});

function iniciarApp() {
    telaLogin.classList.add("hidden");
    telaApp.classList.remove("hidden");
    msgErro.innerText = "";
    displayUsuario.innerHTML = `Logado como: <strong>${usuarioLogado.nome}</strong> (${usuarioLogado.cargo})`;

    if (usuarioLogado.cargo === "user") {
        avisoPermissao.classList.remove("hidden");
    } else {
        avisoPermissao.classList.add("hidden");
    }

    renderizarTabela();
}

formProduto.addEventListener("submit", function(event) {
    event.preventDefault();
    
    const nome = document.getElementById("nome-produto").value;
    const quantidade = document.getElementById("qtd-produto").value;

    const novoProduto = {
        id: proximoIdProduto++,
        nome: nome,
        quantidade: parseInt(quantidade),
        autor: usuarioLogado.login 
    };

    produtos.push(novoProduto); 
    
    document.getElementById("nome-produto").value = "";
    document.getElementById("qtd-produto").value = "";
    
    renderizarTabela(); 
});

function renderizarTabela() {
    tbodyProdutos.innerHTML = "";

    produtos.forEach(produto => {
        const tr = document.createElement("tr");

        tr.innerHTML = `
            <td>${produto.id}</td>
            <td>${produto.nome}</td>
            <td>${produto.quantidade}</td>
            <td>${produto.autor}</td>
            <td id="acoes-${produto.id}"></td>
        `;

        tbodyProdutos.appendChild(tr);

        const tdAcoes = document.getElementById(`acoes-${produto.id}`);

        if (usuarioLogado.cargo === "admin" || usuarioLogado.login === produto.autor) {
            const btnEditar = document.createElement("button");
            btnEditar.innerText = "Editar";
            btnEditar.className = "btn-editar";
            btnEditar.onclick = () => editarProduto(produto.id);
            tdAcoes.appendChild(btnEditar);
        }

        if (usuarioLogado.cargo === "admin") {
            const btnExcluir = document.createElement("button");
            btnExcluir.innerText = "Excluir";
            btnExcluir.className = "btn-secundario";
            btnExcluir.onclick = () => excluirProduto(produto.id);
            tdAcoes.appendChild(btnExcluir);
        }
    });
}

function editarProduto(id) {
    const produto = produtos.find(p => p.id === id);
    
    const novoNome = prompt("Editar nome do produto:", produto.nome);
    if (novoNome === null || novoNome.trim() === "") return;

    const novaQtd = prompt("Editar quantidade:", produto.quantidade);
    if (novaQtd === null || novaQtd.trim() === "") return;

    produto.nome = novoNome;
    produto.quantidade = parseInt(novaQtd);

    renderizarTabela();
}

function excluirProduto(id) {
    if (confirm("Tem certeza que deseja excluir este produto?")) {
        produtos = produtos.filter(p => p.id !== id);
        renderizarTabela();
    }
}

function filtrarProdutos() {
    const termoBusca = document.getElementById("busca-produto").value.toLowerCase();
    
    const linhas = tbodyProdutos.getElementsByTagName("tr");

    for (let i = 0; i < linhas.length; i++) {
        const nomeProduto = linhas[i].getElementsByTagName("td")[1].innerText.toLowerCase();
        
        if (nomeProduto.includes(termoBusca)) {
            linhas[i].style.display = "";
        } else {
            linhas[i].style.display = "none";
        }
    }
}