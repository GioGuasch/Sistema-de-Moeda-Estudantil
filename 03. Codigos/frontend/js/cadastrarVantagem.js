
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

function abrirModalVantagem() {
    const modal = criarModal(`
        <h2>Nova vantagem</h2>
        <input type="text" placeholder="Nome da vantagem:" />
        <input type="number" placeholder="Valor em moedas: $" />
        <div class="modal-buttons">
          <button class="btn-cancelar" id="cancelar">Cancelar</button>
          <button class="btn-enviar" id="salvar">Salvar</button>
        </div>
      `);

    modal.querySelector("#cancelar").onclick = () => modal.remove();

    modal.querySelector("#salvar").onclick = () => {
        modal.remove();
        const confirmModal = criarModal(`
          <h2>Tem certeza que deseja salvar?</h2>
          <div class="modal-buttons">
            <button class="btn-cancelar" id="cancelarConf">Cancelar</button>
            <button class="btn-confirmar" id="confirmar">Tenho certeza</button>
          </div>
        `);

        confirmModal.querySelector("#cancelarConf").onclick = () => confirmModal.remove();
        confirmModal.querySelector("#confirmar").onclick = () => {
            confirmModal.remove();
            const enviadoModal = criarModal(`<h2>✅ Cadastrado com sucesso!</h2>`);
            setTimeout(() => enviadoModal.remove(), 1500);
        };
    };
}

document.getElementById("novaVantagemBtn").addEventListener("click", abrirModalVantagem);

function ativarBotoesInativar() {
    document.querySelectorAll(".btn-inativar").forEach(botao => {
        botao.addEventListener("click", () => {
            if (botao.textContent.includes("INATIVAR")) {
                const modal = criarModal(`
              <h2>Certeza que deseja inativar?</h2>
              <div class="modal-buttons">
                <button class="btn-cancelar" id="cancelar">Cancelar</button>
                <button class="btn-confirmar" id="confirmar">Confirmar</button>
              </div>
            `);

                modal.querySelector("#cancelar").onclick = () => modal.remove();
                modal.querySelector("#confirmar").onclick = () => {
                    modal.remove();
                    const sucesso = criarModal(`<h2>✅ Vantagem inativada com sucesso!</h2>`);
                    botao.textContent = "REATIVAR";
                    botao.classList.add("btn-reativar");
                    setTimeout(() => sucesso.remove(), 1500);
                };
            } else {
                const sucesso = criarModal(`<h2>✅ Vantagem reativada!</h2>`);
                botao.textContent = "INATIVAR OFERTA";
                botao.classList.remove("btn-reativar");
                setTimeout(() => sucesso.remove(), 1500);
            }
        });
    });
}
ativarBotoesInativar();