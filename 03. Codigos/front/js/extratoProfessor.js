async function carregarExtrato() {
  try {
    const resposta = await fetch(
      "http://localhost/Projeto-Lab-teste/back/listarExtrato.php?idProfessor=1"
    );

    const dados = await resposta.json();
    console.log("Extrato recebido:", dados);

    renderizarExtrato(dados);
  } catch (erro) {
    console.error("Erro ao carregar extrato:", erro);
  }
}

function renderizarExtrato(lista) {
  const container = document.getElementById("extratoContainer");
  container.innerHTML = "";

  lista.forEach(item => {
    const card = document.createElement("div");
    card.classList.add("extrato-card");

    card.innerHTML = `
      <h3>${item.nomeAluno}</h3>
      <p><strong>Curso:</strong> ${item.curso}</p>
      <p><strong>Instituição:</strong> ${item.instituicao}</p>
      <p><strong>Moedas distribuídas:</strong> ${item.quantidadeMoedas}</p>
      <p><strong>Motivo:</strong> ${item.motivo}</p>
      <p><strong>Data:</strong> ${item.data}</p>
    `;

    container.appendChild(card);
  });
}

document.addEventListener("DOMContentLoaded", carregarExtrato);
