const input = document.getElementById("searchInput");

input.addEventListener("keyup", () => {
    const filtro = input.value.toLowerCase();
    const cards = document.querySelectorAll(".card");

    cards.forEach(card => {
        const titulo = card.querySelector("h3").textContent.toLowerCase();
        if (titulo.includes(filtro)) {
            card.style.display = "";
        } else {
            card.style.display = "none";
        }
    });
});

const botoes = document.querySelectorAll(".card button");

botoes.forEach(botao => {
    botao.addEventListener("click", () => {
        const card = botao.parentElement;
        const titulo = card.querySelector("h3").textContent;
        const imagemSrc = card.querySelector("img").src;

        const dados = {
            "Resgatado: Coxinha": {
                pessoa: "Lucas silva",
                data: "07/10/2025",
                valor: "$10"
            }
        };

        const info = dados[titulo] || {
            pessoa: "-",
            data: "-",
            valor: "-"
        };

        const modal = document.createElement("div");
        modal.classList.add("modal-extrato");
        modal.innerHTML = `
                <div class="modal-conteudo">
                    <img src="${imagemSrc}" alt="${titulo}">
                    <h3>${titulo}</h3>
                    <p><strong>Pessoa:</strong> ${info.pessoa}</p>
                    <p><strong>Data:</strong> ${info.data}</p>
                    <p><strong>Moedinhas:</strong>${info.valor}</p>
                    <button class="fechar-modal">FECHAR EXTRATO</button>
                </div>
            `;
        document.body.appendChild(modal);
        modal.querySelector(".fechar-modal").addEventListener("click", () => {
            modal.remove();
        });
    });
});
