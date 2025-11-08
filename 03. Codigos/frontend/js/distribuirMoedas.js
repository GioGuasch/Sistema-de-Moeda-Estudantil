function abrirModalDistribuicao(nomePrePreenchido = "") {
  const modal = criarModal(`
      <h2>Nova distribuição</h2>
      <input type="text" id="nomeAluno" placeholder="Nome e sobrenome do aluno" value="${nomePrePreenchido}">
      <input type="number" id="quantidade" placeholder="Quantidade de moedas">
      <input type="date" id="data">
      <textarea id="motivo" rows="3" placeholder="Motivo"></textarea>
      <div class="modal-buttons">
        <button class="btn-cancelar" id="cancelar">Cancelar</button>
        <button class="btn-enviar" id="enviar">Enviar</button>
      </div>
    `);

  modal.querySelector("#cancelar").onclick = () => modal.remove();

  modal.querySelector("#enviar").onclick = () => {
    const nomeAluno = document.getElementById("nomeAluno").value.trim();
    const quantidade = document.getElementById("quantidade").value.trim();
    const data = document.getElementById("data").value;
    const motivo = document.getElementById("motivo").value.trim();

    if (!nomeAluno || !quantidade || !motivo) {
      alert("Por favor, preencha todos os campos obrigatórios!");
      return;
    }

    fetch("../php/distribuirMoedas.php", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        nomeAluno,
        quantidade,
        data,
        motivo
      }),
    })
      .then(res => res.json())
      .then(data => {
        modal.remove();
        const confirmModal = criarModal(`<h2>${data.mensagem}</h2>`);
        setTimeout(() => confirmModal.remove(), 2000);
      })
      .catch(() => {
        alert("Erro ao enviar dados!");
      });
  };
}
