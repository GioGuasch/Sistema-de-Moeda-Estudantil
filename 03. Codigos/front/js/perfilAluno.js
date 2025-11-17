document.addEventListener("DOMContentLoaded", () => {
    // Pega o email do aluno que está logado
    const emailAluno = localStorage.getItem("emailAluno");

    if (!emailAluno) {
        alert("Aluno não identificado. Faça login novamente.");
        return;
    }

    fetch(`../php/consultarPerfil.php?email=${encodeURIComponent(emailAluno)}`)
        .then(res => res.json())
        .then(data => {
            if (data.status !== "sucesso") {
                alert(data.mensagem);
                return;
            }

            const aluno = data.aluno;

            // Preenche campos do perfil
            document.getElementById("nomeAluno").textContent = aluno.nome;
            document.getElementById("inputNome").value = aluno.nome;
            document.getElementById("inputCurso").value = aluno.curso;
            document.getElementById("inputEmail").value = aluno.email;
            document.getElementById("inputCPF").value = aluno.cpf;
            document.getElementById("inputRG").value = aluno.rg;
            document.getElementById("inputRua").value = aluno.rua;
            document.getElementById("inputNumero").value = aluno.numero;
            document.getElementById("inputBairro").value = aluno.bairro;
            document.getElementById("instituicao").value = aluno.instituicao;
            document.getElementById("tipoUsuario").value = aluno.tipoUsuario;
        })
        .catch(err => {
            console.error(err);
            alert("Erro ao carregar dados do perfil.");
        });
});
