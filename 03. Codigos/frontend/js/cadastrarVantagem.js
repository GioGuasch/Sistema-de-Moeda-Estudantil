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
      <form id="formVantagem" enctype="multipart/form-data">
        <input type="text" name="nome" placeholder="Nome da vantagem:" required />
        <input type="number" name="valor" placeholder="Valor em moedas: $" required />
        <input type="file" name="img" accept="image/*" required />
        <div class="modal-buttons">
          <button type="button" class="btn-cancelar" id="cancelar">Cancelar</button>
          <button type="submit" class="btn-enviar" id="salvar">Salvar</button>
        </div>
      </form>
    `);

  modal.querySelector("#cancelar").onclick = () => modal.remove();

  const form = modal.querySelector("#formVantagem");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(form);

    const confirmModal = criarModal(`
        <h2>Tem certeza que deseja salvar?</h2>
        <div class="modal-buttons">
          <button class="btn-cancelar" id="cancelarConf">Cancelar</button>
          <button class="btn-confirmar" id="confirmar">Tenho certeza</button>
        </div>
      `);

    confirmModal.querySelector("#cancelarConf").onclick = () => confirmModal.remove();
    confirmModal.querySelector("#confirmar").onclick = async () => {
      confirmModal.remove();
      try {
        const response = await fetch("../php/cadastrarVantagem.php", {
          method: "POST",
          body: formData
        });
        const data = await response.json();
        if (data.status === "sucesso") {
          const enviadoModal = criarModal(`<h2>✅ Cadastrado com sucesso!</h2>`);
          setTimeout(() => enviadoModal.remove(), 1500);
          modal.remove();
          carregarVantagens(); 
        } else {
          alert("Erro: " + data.mensagem);
        }
      } catch (error) {
        alert("Erro ao cadastrar vantagem.");
      }
    };
  });
}

document.getElementById("novaVantagemBtn").addEventListener("click", abrirModalVantagem);


function ativarBotoesInativar() {
  document.querySelectorAll(".btn-inativar").forEach(botao => {
    botao.addEventListener("click", async () => {
      const nomeVantagem = botao.closest(".card").querySelector("h3").textContent;
      const acao = botao.textContent.includes("INATIVAR") ? "inativar" : "ativar";
      const mensagem = acao === "inativar" ? "Certeza que deseja inativar?" : "Deseja reativar esta oferta?";

      const modal = criarModal(`
          <h2>${mensagem}</h2>
          <div class="modal-buttons">
            <button class="btn-cancelar" id="cancelar">Cancelar</button>
            <button class="btn-confirmar" id="confirmar">Confirmar</button>
          </div>
        `);

      modal.querySelector("#cancelar").onclick = () => modal.remove();
      modal.querySelector("#confirmar").onclick = async () => {
        modal.remove();

        try {
          const response = await fetch("../php/alterarStatusVantagem.php", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: `nome=${encodeURIComponent(nomeVantagem)}&acao=${acao}`
          });
          const data = await response.json();
          if (data.status === "sucesso") {
            const sucesso = criarModal(`<h2>✅ ${data.mensagem}</h2>`);
            setTimeout(() => sucesso.remove(), 1500);
            carregarVantagens();
          } else {
            alert("Erro: " + data.mensagem);
          }
        } catch {
          alert("Erro ao alterar status.");
        }
      };
    });
  });
}

async function carregarVantagens() {
  const container = document.getElementById("vantagensContainer");

  try {
    const response = await fetch("../php/listarVantagens.php");
    const data = await response.json();

    if (data.status === "sucesso") {
      container.innerHTML = ""; 
      data.vantagens.forEach(v => {
        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
          <img src="${v.img}" alt="${v.nome}">
          <h3>${v.nome}</h3>
          <h4>$${v.valor}</h4>
          <button class="btn-inativar">
            ${v.status === "ativo" ? "INATIVAR OFERTA" : "REATIVAR OFERTA"}
          </button>
        `;
        container.appendChild(card);
      });
      ativarBotoesInativar();
    } else {
      container.innerHTML = "<p>Erro ao carregar vantagens.</p>";
    }
  } catch {
    container.innerHTML = "<p>Erro ao conectar com o servidor.</p>";
  }
}

window.addEventListener("DOMContentLoaded", carregarVantagens);
