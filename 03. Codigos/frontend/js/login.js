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
