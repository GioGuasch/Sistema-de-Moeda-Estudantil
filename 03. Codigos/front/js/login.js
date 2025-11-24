// ====================
// Modal de aviso rápido
// ====================
function mostrarModal(msg, duracao = 1500) { // duração em ms
  const modal = document.getElementById("modalSucesso");
  if (!modal) return;

  modal.querySelector("p").innerHTML = msg;
  modal.style.display = "flex";
  modal.style.opacity = 0;
  
  // animação suave
  let opacity = 0;
  const fadeIn = setInterval(() => {
    if (opacity >= 1) clearInterval(fadeIn);
    modal.style.opacity = opacity;
    opacity += 0.1;
  }, 30);

  setTimeout(() => {
    let fadeOutOpacity = 1;
    const fadeOut = setInterval(() => {
      if (fadeOutOpacity <= 0) {
        clearInterval(fadeOut);
        modal.style.display = "none";
      }
      modal.style.opacity = fadeOutOpacity;
      fadeOutOpacity -= 0.1;
    }, 30);
  }, duracao);
}

// ====================
// Login
// ====================
document.getElementById("entrar").addEventListener("click", async () => {
  const tipo = document.getElementById("tipo").value;
  const email = document.getElementById("email").value.trim();
  const senha = document.getElementById("senha").value.trim();

  if (!tipo) {
    mostrarModal("Selecione o tipo de usuário!");
    return;
  }

  if (!email || !senha) {
    mostrarModal("Preencha todos os campos!");
    return;
  }

  const dados = { tipo, email, senha };

  try {
    const resposta = await fetch("http://localhost/Sistema-de-Moeda-Estudantil/Codigos/back/login.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dados)
    });

    let resultado;
    try {
      resultado = await resposta.json();
    } catch (e) {
      console.error("Resposta não é JSON:", e);
      mostrarModal("Erro no servidor: resposta inválida.");
      return;
    }

    if (resultado.status === "ok") {
      mostrarModal(resultado.mensagem);

      setTimeout(() => {
        if (tipo === "aluno") {
          sessionStorage.setItem("nomeAluno", resultado.nome || "Aluno");
          sessionStorage.setItem("emailAluno", resultado.email || email);
          window.location.href = "inicioAluno.html";
        } else if (tipo === "professor") {
          sessionStorage.setItem("nomeProfessor", resultado.nome || "Professor");
          sessionStorage.setItem("emailProfessor", resultado.email || email);
          window.location.href = "inicioProfessor.html";
        } else if (tipo === "empresa") {
          sessionStorage.setItem("nomeEmpresa", resultado.nome || "Empresa");
          sessionStorage.setItem("emailEmpresa", resultado.email || email);
          window.location.href = "inicioEmpresa.html";
        }
      }, 1600); // espera a animação do modal terminar
    } else {
      mostrarModal(resultado.mensagem);
    }

  } catch (erro) {
    console.error("Erro ao logar:", erro);
    mostrarModal("Erro ao conectar com o servidor.");
  }
});

// ====================
// Toggle senha
// ====================
const senhaInput = document.getElementById("senha");
const toggleSenhaBtn = document.getElementById("toggleSenha");

toggleSenhaBtn.addEventListener("click", () => {
  if (senhaInput.type === "password") {
    senhaInput.type = "text";
    toggleSenhaBtn.src = "../img/olhoAberto.png";
  } else {
    senhaInput.type = "password";
    toggleSenhaBtn.src = "../img/olhoFechado.png";
  }
});
