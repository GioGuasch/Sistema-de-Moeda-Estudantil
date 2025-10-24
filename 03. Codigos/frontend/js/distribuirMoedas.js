const input = document.getElementById("searchInput");
input.addEventListener("keyup", () => {
    const filtro = input.value.toLowerCase();
    const cards = document.querySelectorAll(".card");
    cards.forEach(card => {
        const titulo = card.querySelector("h3").textContent.toLowerCase();
        card.style.display = titulo.includes(filtro) ? "" : "none";
    });
});

function criarModal(html) {
    const modal = document.createElement("div");
    modal.classList.add("modal");
    modal.innerHTML = `<div class="modal-content">${html}</div>`;
    document.body.appendChild(modal);
    return modal;
}

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
        modal.remove();
        const confirmModal = criarModal(`
          <h2>Tem certeza que deseja enviar?</h2>
          <div class="modal-buttons">
            <button class="btn-cancelar" id="cancelarConf">Cancelar</button>
            <button class="btn-confirmar" id="confirmar">Tenho certeza</button>
          </div>
        `);

        confirmModal.querySelector("#cancelarConf").onclick = () => confirmModal.remove();

        confirmModal.querySelector("#confirmar").onclick = () => {
            confirmModal.remove();
            const enviadoModal = criarModal(`<h2>✅ Enviado!</h2>`);
            setTimeout(() => enviadoModal.remove(), 1500);
        };
    };
}

document.getElementById("novaDistBtn").addEventListener("click", () => abrirModalDistribuicao());

document.querySelectorAll(".btnDistribuir").forEach(botao => {
    botao.addEventListener("click", e => {
        const nome = e.target.closest(".card").querySelector("h3").textContent;
        abrirModalDistribuicao(nome);
    });
});
