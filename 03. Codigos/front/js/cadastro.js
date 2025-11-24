// ========================
// FUNÇÃO TOGGLE SENHA
// ========================
function toggleSenha(id, iconId) {
  const input = document.getElementById(id);
  const icon = document.getElementById(iconId);

  if (input.type === "password") {
    input.type = "text";
    icon.src = "../img/olhoAberto.png";
  } else {
    input.type = "password";
    icon.src = "../img/olhoFechado.png";
  }
}

// ========================
// FUNÇÕES DE MÁSCARA
// ========================
function aplicarMascaraTelefone(valor) {
  return valor
    .replace(/\D/g, "")
    .replace(/^(\d{2})(\d)/, "($1) $2")
    .replace(/(\d{5})(\d)/, "$1-$2")
    .substring(0, 15);
}

function aplicarMascaraCNPJ(valor) {
  return valor
    .replace(/\D/g, "")
    .replace(/^(\d{2})(\d)/, "$1.$2")
    .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
    .replace(/\.(\d{3})(\d)/, ".$1/$2")
    .replace(/(\d{4})(\d)/, "$1-$2")
    .substring(0, 18);
}

function aplicarMascaraCPF(valor) {
  return valor
    .replace(/\D/g, "")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{2})$/, "$1-$2")
    .substring(0, 14);
}

// ========================
// FUNÇÃO MODAL DE MENSAGEM
// ========================
function mostrarModal(msg, duracao = 1000) {
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
// ALTERAÇÃO DE CAMPOS DINÂMICOS
// ========================
function alterarCampos() {
  const tipo = document.getElementById("tipoUsuario").value;
  const campos = document.getElementById("camposDinamicos");
  let html = "";

  if (tipo === "aluno") {
    html = `
      <div class="form-row"><label>Nome:</label><input type="text" name="nomeAluno" required></div>
      <div class="form-row"><label>Email:</label><input type="email" name="email" required></div>
      <div class="form-row"><label>Rua:</label><input type="text" name="rua" required></div>
      <div class="form-row"><label>Bairro:</label><input type="text" name="bairro" required></div>
      <div class="form-row"><label>Número:</label><input type="number" name="numero" required></div>
      <div class="form-row senha-row"><label>Senha:</label><div class="senha-wrapper"><input type="password" name="senha" id="senha" required><img src="../img/olhoFechado.png" id="iconSenha" onclick="toggleSenha('senha','iconSenha')" class="icone-olho"></div></div>
      <div class="form-row senha-row"><label>Confirmar Senha:</label><div class="senha-wrapper"><input type="password" name="confirmarSenha" id="confirmarSenha" required><img src="../img/olhoFechado.png" id="iconConfirmarSenha" onclick="toggleSenha('confirmarSenha','iconConfirmarSenha')" class="icone-olho"></div></div>
      <div class="form-row"><label>Curso:</label><input type="text" name="curso" required></div>
      <div class="form-row"><label>CPF:</label><input type="text" name="cpf" oninput="this.value = aplicarMascaraCPF(this.value)" required></div>
      <div class="form-row"><label>RG:</label><input type="text" name="rg" required></div>
      <div class="form-row"><label>Instituição de Ensino:</label><input type="text" name="instituicaoEnsino" required></div>
    `;
  } else if (tipo === "professor") {
    html = `
      <div class="form-row"><label>Nome:</label><input type="text" name="nomeProfessor" required></div>
      <div class="form-row"><label>Email:</label><input type="email" name="email" required></div>
      <div class="form-row"><label>Rua:</label><input type="text" name="rua" required></div>
      <div class="form-row"><label>Bairro:</label><input type="text" name="bairro" required></div>
      <div class="form-row"><label>Número:</label><input type="number" name="numero" required></div>
      <div class="form-row senha-row"><label>Senha:</label><div class="senha-wrapper"><input type="password" name="senha" id="senha" required><img src="../img/olhoFechado.png" id="iconSenha" onclick="toggleSenha('senha','iconSenha')" class="icone-olho"></div></div>
      <div class="form-row senha-row"><label>Confirmar Senha:</label><div class="senha-wrapper"><input type="password" name="confirmarSenha" id="confirmarSenha" required><img src="../img/olhoFechado.png" id="iconConfirmarSenha" onclick="toggleSenha('confirmarSenha','iconConfirmarSenha')" class="icone-olho"></div></div>
      <div class="form-row"><label>CPF:</label><input type="text" name="cpf" oninput="this.value = aplicarMascaraCPF(this.value)" required></div>
      <div class="form-row"><label>RG:</label><input type="text" name="rg" required></div>
      <div class="form-row"><label>Instituição de Ensino:</label><input type="text" name="instituicaoEnsino" required></div>
    `;
  } else if (tipo === "empresa") {
    html = `
      <div class="form-row"><label>Nome da Empresa:</label><input type="text" name="nomeEmpresa" required></div>
      <div class="form-row"><label>Email:</label><input type="email" name="email" required></div>
      <div class="form-row"><label>Rua:</label><input type="text" name="rua" required></div>
      <div class="form-row"><label>Bairro:</label><input type="text" name="bairro" required></div>
      <div class="form-row"><label>Número:</label><input type="number" name="numero" required></div>
      <div class="form-row senha-row"><label>Senha:</label><div class="senha-wrapper"><input type="password" name="senha" id="senha" required><img src="../img/olhoFechado.png" id="iconSenha" onclick="toggleSenha('senha','iconSenha')" class="icone-olho"></div></div>
      <div class="form-row senha-row"><label>Confirmar Senha:</label><div class="senha-wrapper"><input type="password" name="confirmarSenha" id="confirmarSenha" required><img src="../img/olhoFechado.png" id="iconConfirmarSenha" onclick="toggleSenha('confirmarSenha','iconConfirmarSenha')" class="icone-olho"></div></div>
      <div class="form-row"><label>CNPJ:</label><input type="text" name="cnpj" oninput="this.value = aplicarMascaraCNPJ(this.value)" required></div>
      <div class="form-row"><label>Telefone:</label><input type="text" name="telefone" oninput="this.value = aplicarMascaraTelefone(this.value)" required></div>
      <div class="form-row"><label>Área de Atuação:</label><input type="text" name="areaAtuacao" required></div>
    `;
  }

  campos.innerHTML = html;
}

// ========================
// FUNÇÃO DE CADASTRO
// ========================
async function cadastrar(event) {
  event.preventDefault();
  const form = document.getElementById("formCadastro");
  if (!form) return mostrarModal("Formulário não encontrado!");

  const data = new FormData(form);
  const tipo = document.getElementById("tipoUsuario").value;
  data.append("tipoUsuario", tipo);

  try {
    const resposta = await fetch("http://localhost/Sistema-de-Moeda-Estudantil/Codigos/back/cadastro.php", { method: "POST", body: data });
    const texto = await resposta.text();
    let json;
    try { json = JSON.parse(texto); } catch(e) { return mostrarModal("Erro inesperado no servidor."); }

    if (json.sucesso) {
      mostrarModal("Cadastro realizado com sucesso!");
      form.reset();
      document.getElementById("camposDinamicos").innerHTML = "";
    } else {
      mostrarModal(json.mensagem || "Erro ao cadastrar.");
    }
  } catch (erro) {
    console.error("Erro:", erro);
    mostrarModal("Erro ao conectar com o servidor.");
  }
}

// ========================
// EVENT LISTENER
// ========================
document.addEventListener("DOMContentLoaded", () => {
  const tipo = document.getElementById("tipoUsuario");
  if (tipo) tipo.addEventListener("change", alterarCampos);

  const form = document.getElementById("formCadastro");
  if (form) form.addEventListener("submit", cadastrar);
});
