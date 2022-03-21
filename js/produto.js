let botaoAdicionar = document.querySelector("#adicionar-produto");
let botoesDeletar = document.querySelector('button.deletar');
let botaoNovoProduto = document.getElementById("novoProduto");

botaoAdicionar.addEventListener("click", function(event) {
  event.preventDefault();
  let form = document.querySelector("#form-adiciona");
  let produto = obtemProdutoDoFormulario(form);
  let erros = validaProduto(produto);

  if (erros.length > 0) {
    exibeMensagensDeErro(erros);
    return;
  } else {
    console.log(JSON.stringify(produto));
    fetch("http://localhost:8000/product", {
      method: "POST",
      body: JSON.stringify(produto),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(async resposta => {
      adicionarNaTabela(await resposta.json());
      document.getElementsByTagName("dialog")[0].close();
    });
  }
})

botaoNovoProduto.addEventListener('click', function(e) {
  document.getElementsByTagName("dialog")[0].showModal();
});

  function adicionarNaTabela(dados) {
    let produtoTr = montaTr(dados.produto);
    let form = document.querySelector("#form-adiciona");
    let tabela = document.querySelector("#tabela-produtos");
    tabela.appendChild(produtoTr);
    form.reset();
  }

  function obtemProdutoDoFormulario(form) {

    let produto = {
      dataCompra: form.dataCompra.value,
      nome: form.nome.value,
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
    console.log(produto);
    let produtoTr = document.createElement("tr");
    produtoTr.classList.add("produto");
    produtoTr.appendChild(montaTd(formataData(produto.dataCompra), "info-data-compra"));
    produtoTr.appendChild(montaTd(produto.nome, "info-produto"));
    produtoTr.appendChild(montaTd(produto.valorCompra, "info-valor-compra"));
    produtoTr.appendChild(montaTd(formataData(produto.dataVenda), "info-data-venda"));
    produtoTr.appendChild(montaTd(produto.valorVenda, "info-valor-venda"));
    produtoTr.appendChild(montaTdBotao('X', 'deletar', produto._id));

    return produtoTr;
  }

  function formataData(data) {
    data = data.replace('Z', '');
    let dataParaFormatar = new Date(data);
    let dataFormatada = dataParaFormatar.toLocaleDateString();
    return dataFormatada;
  }

  function montaTd(dado, classe) {
    let td = document.createElement("td");
    td.textContent = dado;
    td.classList.add(classe);

    return td;
  }

  function montaTdBotao(texto, classeBotao, idProduto) {
    let botao = document.createElement('button');
    botao.textContent = texto;
    botao.value = idProduto;
    botao.onclick = function() {
      deletarProduto(botao.value)
    };
    botao.classList.add(classeBotao);

    let td = document.createElement('td');
    td.appendChild(botao);

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

  function deletarProduto(idProduto) {
    console.log('clicou deletar', idProduto);
    fetch(`http://localhost:8000/product/${idProduto}`, {
      method: "DELETE",
    }).then(async resposta => {  
      location.reload();
    });
  }

  function popularTabela() {
    fetch("http://localhost:8000/product", {
      method: "GET",
    }).then(async resposta => {
      produtos = await resposta.json();
      produtos.forEach( function(produto) {
        let produtoTr = montaTr(produto);
        let tabela = document.querySelector("#tabela-produtos");
        tabela.appendChild(produtoTr);
      });
    });
  }

  popularTabela();