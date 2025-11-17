const input = document.getElementById("searchInput");

input.addEventListener("keyup", () => {
    const filtro = input.value.toLowerCase();
    const cards = document.querySelectorAll(".card");

    cards.forEach(card => {
        const titulo = card.querySelector("h3").textContent.toLowerCase();
        card.style.display = titulo.includes(filtro) ? "" : "none";
    });
});

async function carregarVantagens() {
    try {
        const resposta = await fetch("../../back/listarVantagens.php");
        const texto = await resposta.text();

        console.log("Resposta PHP:", texto);
        const vantagens = JSON.parse(texto);

        renderizarVantagens(vantagens);
    } catch (erro) {
        console.error("Erro ao carregar vantagens:", erro);
    }
}

function renderizarVantagens(lista) {
    const container = document.getElementById("vantagensContainer");
    container.innerHTML = "";

    lista.forEach(v => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.dataset.id = v.id;
        card.dataset.moedas = v.valor;

        card.innerHTML = `
            <img src="../../back/${v.img}" alt="${v.nome}">
            <h3>${v.nome}</h3>
            <h4>${v.valor} moedas</h4>
            <button class="btn-resgatar">Resgatar</button>
        `;

        container.appendChild(card);
    });

    ativarResgates();
}

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

function ativarResgates() {
    const botoes = document.querySelectorAll(".btn-resgatar");

    botoes.forEach(botao => {
        botao.addEventListener("click", () => {
            const card = botao.closest(".card");
            const idVantagem = card.dataset.id;
            const moedasUsadas = card.dataset.moedas;

            const modal = criarModal(
                "Confirme a vantagem e digite seu código de matrícula:",
                `<input type='text' id='codigoAluno' placeholder='Digite seu código'>
                 <button id='confirmar'>Confirmar</button>
                 <button id='cancelar'>Cancelar</button>`
            );

            modal.querySelector("#cancelar").onclick = () => modal.remove();

            modal.querySelector("#confirmar").onclick = async () => {
                const codigoAluno = modal.querySelector("#codigoAluno").value.trim();
                if (!codigoAluno) {
                    alert("Digite seu código!");
                    return;
                }

                modal.remove();

                try {
                    const resposta = await fetch("../../back/resgatarVantagem.php", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            idVantagem: idVantagem,
                            codigoAluno: codigoAluno,
                            moedasUsadas: moedasUsadas
                        })
                    });

                    const textoResposta = await resposta.text();
                    let retorno;
                    try {
                        retorno = JSON.parse(textoResposta);
                    } catch {
                        console.error("Resposta do PHP não é JSON válido:", textoResposta);
                        alert("Erro inesperado ao resgatar vantagem.");
                        return;
                    }

                    console.log("Retorno do PHP:", retorno);

                    if (retorno.status === "sucesso") {
                        const sucesso = criarModal(
                            "Vantagem resgatada com sucesso! 🥳",
                            `<button id='fechar'>Fechar</button>`
                        );

                        sucesso.querySelector("#fechar").onclick = () => sucesso.remove();
                    } else {
                        alert(retorno.mensagem);
                    }

                } catch (erro) {
                    console.error("Erro ao enviar resgate:", erro);
                }
            };
        });
    });
}

carregarVantagens();
