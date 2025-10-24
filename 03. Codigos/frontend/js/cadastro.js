function alterarCampos() {
    const tipo = document.getElementById("tipoUsuario").value;
    const campos = document.getElementById("camposDinamicos");

    if (tipo === "aluno") {
        campos.innerHTML = `
          <div class="coluna">
            <label>Nome:</label>
            <input type="text" required>

            <label>Email:</label>
            <input type="email" required>

            <label>CPF:</label>
            <input type="text" required>

            <label>RG:</label>
            <input type="text" required>

            <label>Instituição de ensino:</label>
            <select required>
              <option value="">Selecione</option>
              <option>UFMG</option>
              <option>PUC</option>
              <option>UFOP</option>
            </select>
          </div>

          <div class="coluna">
            <label>Curso:</label>
            <input type="text" required>

            <label>Rua:</label>
            <input type="text" required>

            <label>Bairro:</label>
            <input type="text" required>

            <label>Nº:</label>
            <input type="text" required>

            <div class="senha-row">
              <label>Senha:</label>
              <input type="password" required>

              <label>Confirmar senha:</label>
              <input type="password" required>
            </div>
          </div>
        `;
    }
    else if (tipo === "professor") {
        campos.innerHTML = `
          <div class="coluna">
            <label>Nome:</label>
            <input type="text" required>

            <label>Email:</label>
            <input type="email" required>

            <label>CPF:</label>
            <input type="text" required>

            <label>RG:</label>
            <input type="text" required>
          </div>

          <div class="coluna">
            <label>Instituição de ensino:</label>
            <select required>
              <option value="">Selecione</option>
              <option>UFMG</option>
              <option>PUC</option>
              <option>UFOP</option>
            </select>

            <label>Rua:</label>
            <input type="text" required>

            <label>Bairro:</label>
            <input type="text" required>

            <label>Nº:</label>
            <input type="text" required>

            <div class="senha-row">
              <label>Senha:</label>
              <input type="password" required>

              <label>Confirmar senha:</label>
              <input type="password" required>
            </div>
          </div>
        `;
    }
    else if (tipo === "empresa") {
        campos.innerHTML = `
          <div class="coluna">
            <label>Nome da Empresa:</label>
            <input type="text" required>

            <label>CNPJ:</label>
            <input type="text" required>

            <label>Email:</label>
            <input type="email" required>

            <label>Telefone:</label>
            <input type="text" required>

            <label>Área de Atuação:</label>
            <input type="text" required>
          </div>

          <div class="coluna">
            <label>Rua:</label>
            <input type="text" required>

            <label>Bairro:</label>
            <input type="text" required>

            <label>Nº:</label>
            <input type="text" required>

            <div class="senha-row">
              <label>Senha:</label>
              <input type="password" required>

              <label>Confirmar senha:</label>
              <input type="password" required>
            </div>
          </div>
        `;
    }
}

function cadastrar(event) {
    event.preventDefault();
    alert("Cadastro realizado com sucesso!");
    window.location.href = "login.html";
}

window.onload = alterarCampos;