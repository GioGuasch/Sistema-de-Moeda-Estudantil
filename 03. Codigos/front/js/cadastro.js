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

function alterarCampos() {
  const tipo = document.getElementById("tipoUsuario").value;
  const campos = document.getElementById("camposDinamicos");

  let html = "";

  const camposComuns = `
    <div class="form-row">
      <label>Nome:</label>
      <input type="text" id="nome" required>
    </div>

    <div class="form-row">
      <label>Email:</label>
      <input type="email" id="email" required>
    </div>

    <div class="form-row">
      <label>Rua:</label>
      <input type="text" id="rua" required>
    </div>

    <div class="form-row">
      <label>Bairro:</label>
      <input type="text" id="bairro" required>
    </div>

    <div class="form-row">
      <label>Número:</label>
      <input type="number" id="numero" required>
    </div>

    <div class="form-row senha-row">
      <label>Senha:</label>
      <div class="senha-wrapper">
        <input type="password" id="senha" required>
        <img src="../img/olhoFechado.png" id="iconSenha" onclick="toggleSenha('senha','iconSenha')" class="icone-olho">
      </div>
    </div>

    <div class="form-row senha-row">
      <label>Confirmar Senha:</label>
      <div class="senha-wrapper">
        <input type="password" id="confirmarSenha" required>
        <img src="../img/olhoFechado.png" id="iconConfirmarSenha" onclick="toggleSenha('confirmarSenha','iconConfirmarSenha')" class="icone-olho">
      </div>
    </div>
  `;

  if (tipo === "aluno") {
    html = `
      ${camposComuns}
      <div class="form-row">
        <label>Curso:</label>
        <input type="text" id="curso" required>
      </div>

      <div class="form-row">
        <label>CPF:</label>
        <input type="text" id="cpf" required oninput="this.value = aplicarMascaraCPF(this.value)">
      </div>

      <div class="form-row">
        <label>RG:</label>
        <input type="text" id="rg" required>
      </div>

      <div class="form-row">
        <label>Instituição de Ensino:</label>
        <input type="text" id="instituicaoEnsino" required>
      </div>
    `;
  }

  if (tipo === "professor") {
    html = `
      ${camposComuns}
      <div class="form-row">
        <label>CPF:</label>
        <input type="text" id="cpf" required oninput="this.value = aplicarMascaraCPF(this.value)">
      </div>

      <div class="form-row">
        <label>RG:</label>
        <input type="text" id="rg" required>
      </div>

      <div class="form-row">
        <label>Instituição de Ensino:</label>
        <input type="text" id="instituicaoEnsino" required>
      </div>
    `;
  }

  if (tipo === "empresa") {
    html = `
      ${camposComuns.replace("Nome:", "Nome da Empresa:")}
      <div class="form-row">
        <label>CNPJ:</label>
        <input type="text" id="cnpj" required oninput="this.value = aplicarMascaraCNPJ(this.value)">
      </div>

      <div class="form-row">
        <label>Telefone:</label>
        <input type="text" id="telefone" required oninput="this.value = aplicarMascaraTelefone(this.value)">
      </div>

      <div class="form-row">
        <label>Área de Atuação:</label>
        <input type="text" id="areaAtuacao" required>
      </div>
    `;
  }

  campos.innerHTML = html;
}

async function cadastrar(event) {
  event.preventDefault();

  const tipo = document.getElementById("tipoUsuario").value;

  const data = new FormData();
  data.append("tipoUsuario", tipo);

  document.querySelectorAll("#camposDinamicos input").forEach(input => {
    data.append(input.id, input.value);
  });

  try {
    const resposta = await fetch("../php/cadastrar.php", {
      method: "POST",
      body: data
    });

    const texto = await resposta.text();

    let json;
    try {
      json = JSON.parse(texto);
    } catch (e) {
      console.error("ERRO NO RETORNO DO PHP:", texto);
      alert("Erro inesperado no servidor. Veja o console.");
      return;
    }

    if (json.status === "ok") {
      mostrarModal("Cadastro realizado com sucesso!");
    } else {
      alert(json.mensagem || "Erro ao cadastrar.");
    }

  } catch (error) {
    console.error("Erro na requisição:", error);
    alert("Erro ao conectar com o servidor.");
  }
}

function mostrarModal(msg) {
  const modal = document.getElementById("modalSucesso");
  modal.querySelector("p").innerText = msg;
  modal.style.display = "flex";

  setTimeout(() => {
    modal.style.display = "none";
  }, 2000);
}
