// ========================
// FUNÇÃO MODAL DE MENSAGEM
// ========================
function mostrarMensagem(msg, duracao = 1000) {
  const modal = document.getElementById("modalSucesso");
  if (!modal) return;

  modal.innerHTML = `<p>${msg}</p>`;
  modal.style.display = "flex";
  modal.style.opacity = 1;

  setTimeout(() => {
    modal.style.opacity = 0;
    setTimeout(() => modal.style.display = "none", 300);
  }, duracao);
}

// ========================
// SALVAR VANTAGEM
// ========================
async function salvarVantagem() {
  const nome = document.getElementById("nomeVantagem").value.trim();
  const valor = document.getElementById("valorVantagem").value.trim();
  const status = document.getElementById("statusVantagem").value;
  const img = document.getElementById("imgVantagem").files[0];

  if (!nome || !valor || !status) {
    mostrarMensagem("Preencha todos os campos!");
    return;
  }

  const formData = new FormData();
  formData.append("nome", nome);
  formData.append("valor", valor);
  formData.append("status", status);

  let url = "";

  if (window.idEditando) {
    formData.append("id", window.idEditando);
    formData.append("imgAtual", window.imgAtual);
    if (img) formData.append("img", img);
    url = "../../back/editarVantagem.php";
  } else {
    if (!img) {
      mostrarMensagem("Selecione uma imagem!");
      return;
    }
    formData.append("img", img);
    url = "../../back/cadastrarVantagem.php";
  }

  try {
    const resposta = await fetch(url, { method: "POST", body: formData });
    const resultado = await resposta.json();

    if (resultado.status === "sucesso") {
      mostrarMensagem(resultado.mensagem);
      fecharModal();
      carregarVantagens();
    } else {
      mostrarMensagem("Erro: " + resultado.mensagem);
    }
  } catch (erro) {
    console.error("Erro ao enviar:", erro);
    mostrarMensagem("Erro ao conectar com o servidor.");
  }
}

// ========================
// ALTERAR STATUS
// ========================
async function alterarStatus(id, statusAtual) {
  const novoStatus = statusAtual === "ativo" ? "inativo" : "ativo";

  try {
    const resposta = await fetch("../../back/atualizarStatus.php", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `id=${id}&status=${novoStatus}`
    });

    const resultado = await resposta.json();

    if (resultado.status === "sucesso") {
      carregarVantagens();
      mostrarMensagem("Status atualizado com sucesso!");
    } else {
      mostrarMensagem("Erro ao atualizar: " + resultado.mensagem);
    }
  } catch (erro) {
    console.error("Erro:", erro);
    mostrarMensagem("Erro ao conectar com o servidor.");
  }
}

// ========================
// ABRIR E FECHAR MODAL
// ========================
const modalVantagem = document.getElementById("modalCadastro");
const btnAdicionar = document.getElementById("btnAbrirModal");

// Abrir modal
btnAdicionar.addEventListener("click", () => {
  window.idEditando = null; // limpa id caso esteja editando
  limparCampos();
  modalVantagem.style.display = "flex";
});

// Função para fechar modal
function fecharModal() {
  modalVantagem.style.display = "none";
  limparCampos();
}

// Limpar campos do modal
function limparCampos() {
  document.getElementById("nomeVantagem").value = "";
  document.getElementById("valorVantagem").value = "";
  document.getElementById("imgVantagem").value = "";
  document.getElementById("statusVantagem").value = "ativo";
}

// ========================
// DROPDOWN DO USUÁRIO
// ========================
const userIcon = document.getElementById("userIcon");
const userDropdown = document.getElementById("userDropdown");

userIcon.addEventListener("click", () => {
  userDropdown.style.display = userDropdown.style.display === "block" ? "none" : "block";
});

// Fechar dropdown ao clicar fora
window.addEventListener("click", (e) => {
  if (!userIcon.contains(e.target) && !userDropdown.contains(e.target)) {
    userDropdown.style.display = "none";
  }
});

async function carregarVantagens() {
  try {
    const resposta = await fetch("../../back/listarVantagens.php");
    const vantagens = await resposta.json();

    const container = document.getElementById("vantagensContainer");
    container.innerHTML = ""; // limpa os cards

    vantagens.forEach(v => {
      const card = document.createElement("div");
      card.classList.add("card");
      card.innerHTML = `
        <div class="card-header">
          <h3>${v.nome}</h3>
          <i class="fa-solid fa-pen icon-editar" onclick="editarVantagem(${v.id}, '${v.nome}', ${v.valor}, '${v.status}', '${v.img}')"></i>
        </div>
        <img src="../../back/${v.img}" alt="${v.nome}">
        <p>Valor: $${v.valor}</p>
        <button onclick="alterarStatus(${v.id}, '${v.status}')">
          ${v.status === "ativo" ? "Desativar" : "Ativar"}
        </button>
      `;
      container.appendChild(card);
    });
  } catch (erro) {
    console.error("Erro ao carregar vantagens:", erro);
  }
}
