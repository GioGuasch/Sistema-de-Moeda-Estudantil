document.getElementById("entrar").addEventListener("click", function () {
    const tipo = document.getElementById("tipo").value;

    if (tipo === "aluno") {
        window.location.href = "inicioAluno.html";
    } else if (tipo === "professor") {
        window.location.href = "inicioProfessor.html";
    } else if (tipo === "empresa") {
        window.location.href = "inicioEmpresa.html";
    }
    
});

document.getElementById("formLogin").addEventListener("submit", function (event) {
  const emailCpf = document.getElementById("email").value.trim();
  const senha = document.getElementById("senha").value.trim();

  if (emailCpf === "" || senha === "") {
    alert("Por favor, preencha todos os campos!");
    event.preventDefault();
    return false;
  }

  return true; 
});

