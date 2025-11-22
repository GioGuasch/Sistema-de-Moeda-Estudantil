document.getElementById("entrar").addEventListener("click", async function () {
  const tipo = document.getElementById("tipo").value;
  const email = document.getElementById("email").value.trim();
  const senha = document.getElementById("senha").value.trim();

  if (!tipo) {
    alert("Selecione o tipo de usuário!");
    return;
  }

  if (!email || !senha) {
    alert("Preencha todos os campos!");
    return;
  }

  const dados = { tipo, email, senha };

  try {
    const resposta = await fetch("http://localhost/Projeto-Lab-teste/back/login.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dados)
    });

    let resultado;
    try {
      resultado = await resposta.json();
    } catch (e) {
      console.error("Resposta não é JSON:", e);
      alert("Erro no servidor: resposta inválida.");
      return;
    }

    if (resultado.status === "ok") {
      alert(resultado.mensagem);

      // SALVAR DADOS NO SESSIONSTORAGE

      if (tipo === "aluno") {
        sessionStorage.setItem("nomeAluno", resultado.nome || "Aluno");
        sessionStorage.setItem("emailAluno", resultado.email || email);
        window.location.href = "inicioAluno.html";
      }

      if (tipo === "professor") {
        sessionStorage.setItem("nomeProfessor", resultado.nome || "Professor");
        sessionStorage.setItem("emailProfessor", resultado.email || email);
        window.location.href = "inicioProfessor.html";
      }

      if (tipo === "empresa") {
        sessionStorage.setItem("nomeEmpresa", resultado.nome || "Empresa");
        sessionStorage.setItem("emailEmpresa", resultado.email || email);
        window.location.href = "inicioEmpresa.html";
      }

    } else {
      alert(resultado.mensagem);
    }

  } catch (erro) {
    console.error("Erro ao logar:", erro);
    alert("Erro ao conectar com o servidor.");
  }
});


const senhaInput = document.getElementById("senha");
const toggleSenha = document.getElementById("toggleSenha");

toggleSenha.addEventListener("click", () => {
  const tipoAtual = senhaInput.getAttribute("type");

  if (tipoAtual === "password") {
    senhaInput.setAttribute("type", "text");
    toggleSenha.src = "../img/olhoAberto.png";
  } else {
    senhaInput.setAttribute("type", "password");
    toggleSenha.src = "../img/olhoFechado.png";
  }
});
