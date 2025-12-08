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
        const dados = await resposta.json();
        renderizarVantagens(dados);
    } catch (erro) {
        console.error("Erro ao carregar vantagens:", erro);
        mostrarModal("Erro ao carregar vantagens!");
    }
}

function renderizarVantagens(vantagens) {
    const container = document.getElementById("vantagensContainer");
    container.innerHTML = "";

    const vantagensAtivas = vantagens.filter(v => v.status === "ativo");

    vantagensAtivas.forEach(v => {
        const card = document.createElement("div");
        card.classList.add("card");

        card.dataset.id = v.id;
        card.dataset.moedas = v.valor;

        card.innerHTML = `
            <h3>${v.nome}</h3>
            <img src="../../back/${v.img}" class="img-vantagem">
            <p>Valor: ${v.valor} moedas</p>
            <button class="btn-resgatar">Resgatar</button>
        `;

        container.appendChild(card);
    });

    ativarResgates();
}


function mostrarModal(msg, duracao = 1000) {
    const modal = document.getElementById("modalSucesso");
    if (!modal) return;
    modal.querySelector("p").innerHTML = msg;
    modal.style.opacity = 1;
    modal.style.display = "flex";

    setTimeout(() => {
        modal.style.opacity = 0;
        setTimeout(() => modal.style.display = "none", 300); // fade out suave
    }, duracao);
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
                    mostrarModal("Digite seu código!");
                    return;
                }

                modal.remove();

                try {
                    const resposta = await fetch("../../back/resgatarVantagem.php", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ idVantagem, codigoAluno, moedasUsadas })
                    });

                    const textoResposta = await resposta.text();
                    let retorno;

                    try {
                        retorno = JSON.parse(textoResposta);
                    } catch {
                        console.error("Resposta do PHP não é JSON válido:", textoResposta);
                        return mostrarModal("Erro inesperado ao resgatar.");
                    }

                    if (retorno.status !== "sucesso") {
                        return mostrarModal(retorno.mensagem);
                    }

                    const dadosAlunoResp = await fetch("../../back/buscarAlunoPorCodigo.php", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ codigoAluno })
                    });

                    const textoAluno = await dadosAlunoResp.text();
                    let dadosAluno = {};

                    try {
                        dadosAluno = JSON.parse(textoAluno);
                    } catch {
                        console.error("Erro ao converter JSON do aluno:", textoAluno);
                        return mostrarModal("Erro ao buscar dados do aluno.");
                    }

                    if (dadosAluno.status !== "sucesso") {
                        return mostrarModal("Erro ao recuperar dados do aluno.");
                    }

                    const nomeAluno = dadosAluno.nomeAluno;
                    const emailAluno = dadosAluno.emailAluno;

                    const nomeVantagem = card.querySelector("h3").textContent;
                    const custoMoedas = card.dataset.moedas;
                    const urlImagem = card.querySelector("img").src;

                    enviarEmailResgateVantagem({
                        nomeAluno,
                        emailAluno,
                        nomeVantagem,
                        custoMoedas,
                        urlImagem
                    })
                    .then(() => console.log("Email enviado!"))
                    .catch(err => console.error("Erro ao enviar email:", err));

                    const sucesso = criarModal(
                        "Vantagem resgatada com sucesso! 🥳",
                        `<button id='fechar'>Fechar</button>`
                    );

                    sucesso.querySelector("#fechar").onclick = () => sucesso.remove();

                } catch (erro) {
                    console.error("Erro ao enviar resgate:", erro);
                    mostrarModal("Erro ao enviar resgate!");
                }
            };
        });
    });
}

carregarVantagens();

const userIcon = document.getElementById("userIcon");
const userDropdown = document.getElementById("userDropdown");

userIcon.addEventListener("click", () => {
    userDropdown.style.display = 
        userDropdown.style.display === "block" ? "none" : "block";
});

document.addEventListener("click", (e) => {
    if (!userIcon.contains(e.target) && !userDropdown.contains(e.target)) {
        userDropdown.style.display = "none";
    }
});
