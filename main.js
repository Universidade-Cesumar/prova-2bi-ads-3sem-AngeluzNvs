
const API_URL = "https://6a315d2f7bc5e1c612659dfb.mockapi.io/materiais";
const inputNome = document.getElementById("input-nome");
const inputQuantidade = document.getElementById("input-quantidade");
const btnCadastrar = document.getElementById("btn-cadastrar");
const listaMateriais = document.getElementById("lista-materiais");
const mensagemStatus = document.getElementById("mensagem-status");
function mostrarMensagem(texto, tipo) {
  if (!mensagemStatus) return;
  mensagemStatus.textContent = texto;
  mensagemStatus.className = "mensagem " + (tipo || "");
}
async function carregarMateriais() {
  try {
    const resposta = await fetch(API_URL);

    if (!resposta.ok) {
      throw new Error("Falha ao buscar materiais: " + resposta.status);
    }

    const materiais = await resposta.json();

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
        '<span class="item-nome">' + material.nome + "</span>" +
        '<span class="item-quantidade">Qtd: ' + material.quantidade + "</span>";
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
btnCadastrar.addEventListener("click", cadastrarMaterial);
carregarMateriais();