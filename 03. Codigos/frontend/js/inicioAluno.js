window.onload = () => {
  fetch("../php/inicioAluno.php")
    .then(res => res.json())
    .then(data => {
      if (data.status === "sucesso") {
        document.getElementById("saldo").value = data.saldo;
        document.getElementById("instituicao").textContent = data.instituicao;
      } else {
        alert("Erro: " + data.mensagem);
      }
    })
    .catch(() => alert("Erro ao buscar informações do aluno."));
};
