// ===============================
// FILTRO DE PESQUISA
// ===============================
const input = document.getElementById("searchInput");

if (input) {
    input.addEventListener("keyup", () => {
        const filtro = input.value.toLowerCase();
        const cards = document.querySelectorAll(".card");

        cards.forEach(card => {
            const titulo = card.querySelector("h3")?.textContent.toLowerCase() || "";
            card.style.display = titulo.includes(filtro) ? "" : "none";
        });
    });
}

// ===============================
// MODAL - ABRIR E FECHAR
// ===============================
const modal = document.getElementById("modalCadastro");

function abrirModal() {
    modal.style.display = "flex";
}

function fecharModal() {
    modal.style.display = "none";

    // limpa o formulário ao fechar
    document.getElementById("nomeVantagem").value = "";
    document.getElementById("valorVantagem").value = "";
    document.getElementById("statusVantagem").value = "ativo";
    document.getElementById("imgVantagem").value = "";

    // remove modo edição
    window.idEditando = null;
}

// abrir modal
document.getElementById("btnAbrirModal")?.addEventListener("click", abrirModal);

// fechar ao clicar fora
modal.addEventListener("click", (e) => {
    if (e.target === modal) fecharModal();
});

// ===============================
// SALVAR VANTAGEM (ENVIA PARA O PHP)
// ===============================
async function salvarVantagem() {
    const nome = document.getElementById("nomeVantagem").value.trim();
    const valor = document.getElementById("valorVantagem").value.trim();
    const status = document.getElementById("statusVantagem").value;
    const img = document.getElementById("imgVantagem").files[0];

    if (!nome || !valor || !status) {
        alert("Preencha todos os campos!");
        return;
    }

    const formData = new FormData();
    formData.append("nome", nome);
    formData.append("valor", valor);
    formData.append("status", status);

    let url = "";

    // EDITAR
    if (window.idEditando) {
        formData.append("id", window.idEditando);
        formData.append("imgAtual", window.imgAtual);

        if (img) {
            formData.append("img", img);
        }

        url = "../../back/editarVantagem.php";

    } else {
        // CADASTRAR
        if (!img) {
            alert("Selecione uma imagem!");
            return;
        }
        formData.append("img", img);
        url = "../../back/cadastrarVantagem.php";
    }

    try {
        const resposta = await fetch(url, {
            method: "POST",
            body: formData
        });

        const resultado = await resposta.json();

        if (resultado.status === "sucesso") {
            alert(resultado.mensagem);
            fecharModal();
            location.reload();
        } else {
            alert("Erro: " + resultado.mensagem);
        }

    } catch (erro) {
        console.error("Erro ao enviar:", erro);
        alert("Erro ao conectar com o servidor.");
    }
}

// ===============================
// ALTERAR STATUS
// ===============================
async function alterarStatus(id, statusAtual) {
    const novoStatus = statusAtual === "ativo" ? "inativo" : "ativo";

    const formData = new FormData();
    formData.append("id", id);
    formData.append("status", novoStatus);

    const resposta = await fetch("../../back/atualizarStatus.php", {
        method: "POST",
        body: formData
    });

    const resultado = await resposta.json();
    console.log("Retorno status:", resultado);

    if (resultado.status === "sucesso") {
        // Atualiza na tela
        const elementoStatus = document.querySelector(`#status-${id}`);
        if (elementoStatus) {
            elementoStatus.textContent = novoStatus === "ativo" ? "Ativo" : "Inativo";
        }

        const botao = document.querySelector(`#btn-status-${id}`);
        if (botao) {
            botao.textContent = novoStatus === "ativo" ? "Inativar" : "Ativar";

            // Atualiza o clique (para o próximo toggle)
            botao.setAttribute("onclick", `alterarStatus(${id}, '${novoStatus}')`);
        }

        alert("Status atualizado com sucesso!");
    } else {
        alert("Erro ao atualizar o status.");
    }
}

// ===============================
// RENDERIZAR VANTAGENS
// ===============================
function renderizarVantagens(vantagens) {
    const container = document.getElementById("vantagensContainer");
    container.innerHTML = "";

    vantagens.forEach(v => {
        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
            <div class="card-header">
                <h3>${v.nome}</h3>
                <i class="fa-solid fa-pen-to-square icon-editar" onclick="editarVantagem(${v.id})"></i>
            </div>

            <img src="../../back/${v.img}" class="img-vantagem">

            <p>Valor: ${v.valor} moedas</p>

            <p>Status: <span id="status-${v.id}">
                ${v.status === "ativo" ? "Ativo" : "Inativo"}
            </span></p>

            <button id="btn-status-${v.id}"
                    class="btn-status"
                    onclick="alterarStatus(${v.id}, '${v.status}')">
                ${v.status === "ativo" ? "Inativar" : "Ativar"}
            </button>
        `;

        container.appendChild(card);
    });
}

// ===============================
// EDITAR VANTAGEM
// ===============================
function editarVantagem(id) {
    console.log("Editando vantagem", id);

    fetch(`../../back/buscarVantagem.php?id=${id}`)
        .then(response => response.json())
        .then(dados => {
            document.getElementById("nomeVantagem").value = dados.nome;
            document.getElementById("valorVantagem").value = dados.valor;
            document.getElementById("statusVantagem").value = dados.status;

            window.imgAtual = dados.img;
            window.idEditando = dados.id;

            document.querySelector(".modal-content h2").textContent = "Editar vantagem";

            abrirModal();
        })
        .catch(erro => console.log("Erro ao carregar:", erro));
}

// ===============================
// CARREGAR VANTAGENS
// ===============================
async function carregarVantagens() {
    try {
        const resposta = await fetch("../../back/listarVantagens.php");
        const dados = await resposta.json();

        console.log("Vantagens carregadas:", dados);

        renderizarVantagens(dados);
    } catch (erro) {
        console.error("Erro ao carregar vantagens:", erro);
    }
}

carregarVantagens();
