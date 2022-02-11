let botaoAdicionar = document.querySelector("#adicionar-produto");

botaoAdicionar.addEventListener("click", function(event) {
  event.preventDefault();
  let form = document.querySelector("#form-adiciona");
  let produto = obtemProdutoDoFormulario(form);
 

  let erros = validaProduto(produto);

  if (erros.length > 0) {
    exibeMensagensDeErro(erros);
    return;
  }
  let produtoTr = montaTr(produto);

  let tabela = document.querySelector("#tabela-produtos");
  tabela.appendChild(produtoTr);
  form.reset();

  if (!validaProduto(produto)) {
    console.log("Produto inválido");
    return;
  }

  function obtemProdutoDoFormulario(form) {

    let produto = {
      nome: form.nome.value,
      dataCompra: form.dataCompra.value,
      valorCompra: form.valorCompra.value,
      dataVenda: form.dataVenda.value,
      valorVenda: form.valorVenda.value,
    }
    return produto;
  }

  function validaProduto(produto) {

    var erros = [];

    if (produto.nome.length == 0) {
        erros.push("O nome não pode ser em branco");
    }

    if (produto.dataCompra.length == 0) {
        erros.push("A data de compra não pode ser em branco");
    }

    if (produto.valorCompra.length == 0) {
        erros.push("O valor da compra não pode ser em branco");
    }

    if (produto.dataVenda.length == 0) {
        erros.push("A data da venda não pode ser em branco");
    }

    if (produto.valorVenda.length == 0) {
      erros.push("O valor da venda não pode ser em branco");
    }

    return erros;
  }

  function montaTr(produto) {
    let produtoTr = document.createElement("tr");
    produtoTr.classList.add("produto");
    produtoTr.appendChild(montaTd(produto.dataCompra, "info-data-compra"));
    produtoTr.appendChild(montaTd(produto.nome, "info-produto"));
    produtoTr.appendChild(montaTd(produto.valorCompra, "info-valor-compra"));
    produtoTr.appendChild(montaTd(produto.dataVenda, "info-data-venda"));
    produtoTr.appendChild(montaTd(produto.valorVenda, "info-valor-venda"));

    return produtoTr;
  }

  function montaTd(_dado){
    let td = document.createElement("td");
    td.textContent
  }

  function montaTd(dado, classe) {
    let td = document.createElement("td");
    td.textContent = dado;
    td.classList.add(classe);

    return td;
  }

  function exibeMensagensDeErro(erros) {
    let ul = document.querySelector("#mensagens-erro");
    ul.innerHTML = "";

    erros.forEach(function(erro) {
      var li = document.createElement("li");
      li.textContent = erro;
      ul.appendChild(li);
    });
  }
});