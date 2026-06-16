const API_URL = "https://6a315d2f7bc5e1c612659dfb.mockapi.io/materiais";

const inputNome = document.getElementById("input-nome");
const inputQuantidade = document.getElementById("input-quantidade");
const btnCadastrar = document.getElementById("btn-cadastrar");
const listaMateriais = document.getElementById("lista-materiais");
const mensagemStatus = document.getElementById("mensagem-status");
const inputRetirada = document.getElementById("input-retirada");

let materiaisCache = [];

function mostrarMensagem(texto, tipo) {
  if (!mensagemStatus) return;
  mensagemStatus.textContent = texto;
  mensagemStatus.className = "mensagem " + (tipo || "");
}

// Sprint 2: regra de negocio da retirada.
// So e valida se a quantidade for um numero positivo e nao maior que o estoque atual.
function validarRetirada(estoqueAtual, quantidadeRetirada) {
  if (typeof estoqueAtual !== "number" || typeof quantidadeRetirada !== "number") {
    return false;
  }

  if (isNaN(estoqueAtual) || isNaN(quantidadeRetirada)) {
    return false;
  }

  if (quantidadeRetirada <= 0) {
    return false;
  }

  if (quantidadeRetirada > estoqueAtual) {
    return false;
  }

  return true;
}

async function carregarMateriais() {
  try {
    const resposta = await fetch(API_URL);

    if (!resposta.ok) {
      throw new Error("Falha ao buscar materiais: " + resposta.status);
    }

    const materiais = await resposta.json();
    materiaisCache = materiais;

    listaMateriais.innerHTML = "";

    if (!materiais || materiais.length === 0) {
      listaMateriais.innerHTML =
        '<li class="lista-vazia">Nenhum material cadastrado ainda.</li>';
      return;
    }

    materiais.forEach((material) => {
      const item = document.createElement("li");
      item.className = "item-material";
      item.innerHTML =
        '<div class="item-info">' +
          '<span class="item-nome">' + material.nome + "</span>" +
          '<span class="item-quantidade">Qtd: ' + material.quantidade + "</span>" +
        "</div>" +
        '<div class="item-acoes">' +
          '<button type="button" class="btn-baixar" data-id="' + material.id + '">Baixar</button>' +
          '<button type="button" class="btn-excluir" data-id="' + material.id + '">Excluir</button>' +
        "</div>";
      listaMateriais.appendChild(item);
    });
  } catch (erro) {
    console.error(erro);
    listaMateriais.innerHTML =
      '<li class="lista-vazia">Erro ao carregar os materiais.</li>';
  }
}

async function cadastrarMaterial() {
  const nome = inputNome.value.trim();
  const quantidade = inputQuantidade.value;

  if (!nome || quantidade === "") {
    mostrarMensagem("Preencha o nome e a quantidade.", "erro");
    return;
  }

  const novoMaterial = {
    nome: nome,
    quantidade: Number(quantidade),
  };

  try {
    btnCadastrar.disabled = true;

    const resposta = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(novoMaterial),
    });

    if (!resposta.ok) {
      throw new Error("Falha ao cadastrar material: " + resposta.status);
    }

    mostrarMensagem("Material cadastrado com sucesso!", "sucesso");

    inputNome.value = "";
    inputQuantidade.value = "";

    await carregarMateriais();
  } catch (erro) {
    console.error(erro);
    mostrarMensagem("Erro ao cadastrar o material.", "erro");
  } finally {
    btnCadastrar.disabled = false;
  }
}

// Sprint 2: da baixa (PUT) na quantidade de um material especifico.
async function baixarEstoque(id) {
  const quantidadeRetirada = Number(inputRetirada.value);
  const material = materiaisCache.find((item) => String(item.id) === String(id));

  if (!material) {
    mostrarMensagem("Material nao encontrado.", "erro");
    return;
  }

  if (!validarRetirada(material.quantidade, quantidadeRetirada)) {
    mostrarMensagem("Quantidade de retirada invalida.", "erro");
    return;
  }

  const novaQuantidade = material.quantidade - quantidadeRetirada;

  try {
    const resposta = await fetch(API_URL + "/" + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nome: material.nome,
        quantidade: novaQuantidade,
      }),
    });

    if (!resposta.ok) {
      throw new Error("Falha ao atualizar estoque: " + resposta.status);
    }

    mostrarMensagem("Baixa realizada com sucesso!", "sucesso");
    inputRetirada.value = "";

    await carregarMateriais();
  } catch (erro) {
    console.error(erro);
    mostrarMensagem("Erro ao realizar a baixa no estoque.", "erro");
  }
}

// Sprint 2: exclui (DELETE) um material da lista e do MockAPI.
async function excluirMaterial(id) {
  try {
    const resposta = await fetch(API_URL + "/" + id, {
      method: "DELETE",
    });

    if (!resposta.ok) {
      throw new Error("Falha ao excluir material: " + resposta.status);
    }

    mostrarMensagem("Material excluido com sucesso!", "sucesso");

    await carregarMateriais();
  } catch (erro) {
    console.error(erro);
    mostrarMensagem("Erro ao excluir o material.", "erro");
  }
}

btnCadastrar.addEventListener("click", cadastrarMaterial);

listaMateriais.addEventListener("click", function (evento) {
  const botaoBaixar = evento.target.closest(".btn-baixar");
  const botaoExcluir = evento.target.closest(".btn-excluir");

  if (botaoBaixar) {
    baixarEstoque(botaoBaixar.dataset.id);
  }

  if (botaoExcluir) {
    excluirMaterial(botaoExcluir.dataset.id);
  }
});

carregarMateriais();