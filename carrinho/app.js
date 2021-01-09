// Variaveis
const carrinho = document.getElementById('carrinho');
const produtos = document.getElementById('lista-produtos');
const listaProdutos = document.querySelector('#lista-carrinho tbody');
const esvaziarCarrinhoBtn = document.getElementById('esvaziar-carrinho');


// Listeners
carregarEventListeners();
function carregarEventListeners() {
  // Presionar "Adicionar ao Carrinho"
  produtos.addEventListener('click', comprar);
  // Excluir produto do carrinho
  carrinho.addEventListener('click', excluirProduto);
  // Esvaziar carrinho
  esvaziarCarrinhoBtn.addEventListener('click', esvaziarCarrinho);
  //  Ao carregar o documento, mostrar LocalStorage
  document.addEventListener('DOMContentLoaded', leerLocalStorage);
}

// Funcoes
//Função que adiciona o produto ao carrinho
function comprar(e) {
  e.preventDefault();
  if(e.target.classList.contains('adicionar-carrinho')) {
    const produto = e.target.parentElement.parentElement;
    leInfoProduto(produto);
  }
}

// Leitura das informações sobre o produto
function leInfoProduto(produto) {
  const infoProduto = {
    imagen: produto.querySelector('img').src,
    nome: produto.querySelector('h4').textContent,
    valor: produto.querySelector('.desconto').textContent,
    id: produto.querySelector('a').getAttribute('data-id')
  }
  inserirCarrinho(infoProduto);
}

// Mostra o produto selecionado no carrinho
function inserirCarrinho(produto) {
  const row = document.createElement('tr');
  row.innerHTML = `
  <td>
  <img src="${produto.imagen}" width=100>
  </td>
  <td>${produto.nome}</td>
  <td>${produto.valor}</td>
  <td>
  <a href="#" class="borrar-produto" data-id="${produto.id}">X</a>
  </td>
  `;
  listaProdutos.appendChild(row);
  guardarProdutoLocalStorage(produto);
}

// Excluir o produto em DOM
function excluirProduto(e) {
  e.preventDefault();
  let produto,
      produtoId;
  if(e.target.classList.contains('borrar-produto') ) {
    e.target.parentElement.parentElement.remove();
    produto = e.target.parentElement.parentElement;
    produtoId = produto.querySelector('a').getAttribute('data-id');
  }
  eliminarProdutoLocalStorage(produtoId);
}

// Exclui os produtos do carrinho no DOM
function esvaziarCarrinho() {
  while(listaProdutos.firstChild) {
    listaProdutos.removeChild(listaProdutos.firstChild);
  }

  // limpar Local Storage
  limparLocalStorage();
  return false;
}

// Armazena os produtos do carrinho em Local Storage
function guardarProdutoLocalStorage(produto) {
  let produtos;
  produtos= obterProdutoLocalStorage();
  produtos.push(produto);
  localStorage.setItem('produtos', JSON.stringify(produtos) );
}

// verifica se há elementos em Local Storage
function obterProdutoLocalStorage() {
  let produtosLS;
  if(localStorage.getItem('produtos') === null) {
    produtosLS = [];
  } else {
    produtosLS = JSON.parse( localStorage.getItem('produtos') );
  }
  return produtosLS;
}

// Imprime os produtos de Local Storage no carrinho
function leerLocalStorage() {
  let produtosLS;
  produtosLS = obterProdutoLocalStorage();
  produtosLS.forEach(function(produto){
  const row = document.createElement('tr');
  row.innerHTML = `
  <td>
  <img src="${produto.imagen}" width=100>
  </td>
  <td>${produto.nome}</td>
  <td>${produto.valor}</td>
  <td>
  <a href="#" class="excluir-produto" data-id="${produto.id}">X</a>
  </td>
  `;
  listaProdutos.appendChild(row);
  });
}

// Excluir produto pelo  ID em Local Storage
function eliminarProdutoLocalStorage(produto) {
  let produtosLS;
  // Obter produtos
  produtosLS = obterProdutoLocalStorage();
  // Faz a iteração comparando o ID do produto excluído com os do LS
  produtosLS.forEach(function(produtoLS, index) {
    if(produtosLS.id === produto) {
      produtosLS.splice(index, 1);
    }
  });
  // Adicionar o produto storage
  localStorage.setItem('produtos', JSON.stringify(produtosLS) );
}

// limpar os produtos de Local Storage
function limparLocalStorage() {
  localStorage.clear();
}
