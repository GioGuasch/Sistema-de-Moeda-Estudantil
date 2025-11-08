const input = document.getElementById("searchInput");
input.addEventListener("keyup", () => {
    const filtro = input.value.toLowerCase();
    const cards = document.querySelectorAll(".card");

    cards.forEach(card => {
        const titulo = card.querySelector("h3").textContent.toLowerCase();
        card.style.display = titulo.includes(filtro) ? "" : "none";
    });
});

const botoes = document.querySelectorAll(".card button");
botoes.forEach(botao => {
    botao.addEventListener("click", () => {
        const card = botao.parentElement;
        const titulo = card.querySelector("h3").textContent;
        const imagemSrc = card.querySelector("img").src;

        const dados = {
            "Lucas": { data: "07/10/2025", valor: "$10", motivo: "Melhor nota da turma" }
        };

        const info = dados[titulo] || { data: "-", valor: "-", motivo: "-" };

        const modal = document.createElement("div");
        modal.classList.add("modal-extrato");
        modal.innerHTML = `
          <div class="modal-conteudo">
            <img src="${imagemSrc}" alt="${titulo}">
            <h3>${titulo}</h3>
            <p><strong>Data:</strong> ${info.data}</p>
            <p><strong>Moedinhas:</strong> ${info.valor}</p>
            <p><strong>Motivo:</strong> ${info.motivo}</p>
            <button class="fechar-modal">FECHAR EXTRATO</button>
          </div>
        `;
        document.body.appendChild(modal);
        modal.querySelector(".fechar-modal").addEventListener("click", () => modal.remove());
    });
});

const relatorioBtn = document.getElementById("gerarRelatorio");
relatorioBtn.addEventListener("click", () => {
    const modal = document.createElement("div");
    modal.classList.add("modal-extrato");
    modal.innerHTML = `
        <div class="modal-conteudo">
          <h2>📄 Relatório Gerado com Sucesso!</h2>
          <p>O arquivo foi enviado para o seu e-mail institucional.</p>
          <button class="fechar-modal">Fechar</button>
        </div>
      `;
    document.body.appendChild(modal);
    modal.querySelector(".fechar-modal").addEventListener("click", () => modal.remove());
});
