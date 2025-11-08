function alterarCampos() {
  const tipo = document.getElementById("tipoUsuario").value;
  const campos = document.getElementById("camposDinamicos");

  if (tipo === "aluno") {
    campos.innerHTML = `
      <div class="coluna">
        <label>Nome:</label>
        <input type="text" name="nome" required>

        <label>Email:</label>
        <input type="email" name="email" required>

        <label>CPF:</label>
        <input type="text" name="cpf" required>

        <label>RG:</label>
        <input type="text" name="rg" required>

        <label>Instituição de ensino:</label>
        <select name="idInstituicao" required>
          <option value="">Selecione</option>
          <option value="1">UFMG</option>
          <option value="2">PUC</option>
          <option value="3">UFOP</option>
        </select>
      </div>

      <div class="coluna">
        <label>Curso:</label>
        <input type="text" name="curso" required>

        <label>Rua:</label>
        <input type="text" name="rua" required>

        <label>Bairro:</label>
        <input type="text" name="bairro" required>

        <label>Nº:</label>
        <input type="text" name="numero" required>

        <div class="senha-row">
          <label>Senha:</label>
          <input type="password" name="senha" required>

          <label>Confirmar senha:</label>
          <input type="password" name="confirmarSenha" required>
        </div>
      </div>
    `;
  } 
  else if (tipo === "professor") {
    campos.innerHTML = `
      <div class="coluna">
        <label>Nome:</label>
        <input type="text" name="nome" required>

        <label>Email:</label>
        <input type="email" name="email" required>

        <label>CPF:</label>
        <input type="text" name="cpf" required>

        <label>RG:</label>
        <input type="text" name="rg" required>
      </div>

      <div class="coluna">
        <label>Instituição de ensino:</label>
        <select name="idInstituicao" required>
          <option value="">Selecione</option>
          <option value="1">UFMG</option>
          <option value="2">PUC</option>
          <option value="3">UFOP</option>
        </select>

        <label>Rua:</label>
        <input type="text" name="rua" required>

        <label>Bairro:</label>
        <input type="text" name="bairro" required>

        <label>Nº:</label>
        <input type="text" name="numero" required>

        <div class="senha-row">
          <label>Senha:</label>
          <input type="password" name="senha" required>

          <label>Confirmar senha:</label>
          <input type="password" name="confirmarSenha" required>
        </div>
      </div>
    `;
  } 
  else if (tipo === "empresa") {
    campos.innerHTML = `
      <div class="coluna">
        <label>Nome da Empresa:</label>
        <input type="text" name="nome" required>

        <label>CNPJ:</label>
        <input type="text" name="cnpj" required>

        <label>Email:</label>
        <input type="email" name="email" required>

        <label>Telefone:</label>
        <input type="text" name="telefone" required>

        <label>Área de Atuação:</label>
        <input type="text" name="areaAtuacao" required>
      </div>

      <div class="coluna">
        <label>Rua:</label>
        <input type="text" name="rua" required>

        <label>Bairro:</label>
        <input type="text" name="bairro" required>

        <label>Nº:</label>
        <input type="text" name="numero" required>

        <div class="senha-row">
          <label>Senha:</label>
          <input type="password" name="senha" required>

          <label>Confirmar senha:</label>
          <input type="password" name="confirmarSenha" required>
        </div>
      </div>
    `;
  }
}


function cadastrar(event) {
  const inputs = document.querySelectorAll("#camposDinamicos input[required]");
  for (let input of inputs) {
    if (!input.value.trim()) {
      alert("Preencha todos os campos!");
      event.preventDefault();
      return false;
    }
  }

  alert("Cadastro realizado com sucesso!");
  (action)
  return true;
}

window.onload = alterarCampos;
