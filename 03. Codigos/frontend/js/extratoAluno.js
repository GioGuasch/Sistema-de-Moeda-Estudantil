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
            "Coxinha de frango": {
                data: "07/10/2025",
                tipo: "Recebimento",
                empresa: "Boca do forno",
                motivo: "-",
                valor: "$15"
            },
            "Suco 500ml": {
                data: "10/10/2025",
                tipo: "Recebimento",
                empresa: "Empresa A",
                motivo: "-",
                valor: "$10"
            },
            "Açaí 300ml": {
                data: "15/10/2025",
                tipo: "Recebimento",
                empresa: "Fruto de Goiás",
                motivo: "-",
                valor: "$25"
            }
        };

        const info = dados[titulo] || {
            data: "—",
            tipo: "—",
            empresa: "—",
            motivo: "—",
            valor: "—"
        };

        const modal = document.createElement("div");
        modal.classList.add("modal-extrato");
        modal.innerHTML = `
                <div class="modal-conteudo">
                    <img src="${imagemSrc}" alt="${titulo}">
                    <h3>${titulo}</h3>
                    <p><strong>Data:</strong> ${info.data}</p>
                    <p><strong>Tipo:</strong> ${info.tipo}</p>
                    <p><strong>Prof./Emp.:</strong> ${info.empresa}</p>
                    <p><strong>Motivo:</strong> ${info.motivo}</p>
                    <p><strong>${info.valor}</strong></p>
                    <button class="fechar-modal">FECHAR EXTRATO</button>
                </div>
            `;
        document.body.appendChild(modal);
        modal.querySelector(".fechar-modal").addEventListener("click", () => {
            modal.remove();
        });
    });
});
