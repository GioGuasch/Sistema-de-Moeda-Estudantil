const input = document.getElementById("searchInput");
input.addEventListener("keyup", () => {
    const filtro = input.value.toLowerCase();
    const cards = document.querySelectorAll(".card");

    cards.forEach(card => {
        const titulo = card.querySelector("h3").textContent.toLowerCase();
        card.style.display = titulo.includes(filtro) ? "" : "none";
    });
});

function criarModal(mensagem, botoesHTML = "") {
    const modal = document.createElement("div");
    modal.classList.add("modal");
    modal.innerHTML = `
        <div class="modal-content">
          <h3>${mensagem}</h3>
          ${botoesHTML}
        </div>
      `;
    document.body.appendChild(modal);
    return modal;
}

const botoes = document.querySelectorAll(".card button");

botoes.forEach(botao => {
    botao.addEventListener("click", () => {
        if (botao.disabled) {
            const aviso = criarModal("Você só pode resgatar outro deste item quando utilizar o que foi resgatado.", `<button>Fechar</button>`);
            aviso.querySelector("button").addEventListener("click", () => aviso.remove());
            return;
        }

        const modal = criarModal(
            "Tem certeza que deseja resgatar este item?",
            `<button id='confirmar'>Confirmar</button><button id='cancelar'>Cancelar</button>`
        );

        modal.querySelector("#cancelar").addEventListener("click", () => modal.remove());

        modal.querySelector("#confirmar").addEventListener("click", () => {
            modal.remove();

            const sucesso = criarModal("Vantagem resgatada com sucesso!🥳🥳", `<button id='fechar'>Fechar</button>`);
            sucesso.querySelector("#fechar").addEventListener("click", () => sucesso.remove());

            botao.disabled = true;

            let msg = botao.parentElement.querySelector(".mensagem-bloqueio");
            if (!msg) {
                msg = document.createElement("p");
                msg.classList.add("mensagem-bloqueio");
                msg.textContent = "Você só pode resgatar outro deste item quando utilizar o que foi resgatado.";
                botao.parentElement.appendChild(msg);
            }
        });
    });
});