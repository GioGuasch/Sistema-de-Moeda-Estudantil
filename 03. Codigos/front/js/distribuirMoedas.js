// ========================
// FUNÇÃO MODAL DE MENSAGEM
// ========================
function mostrarModal(msg, duracao = 1000) {
  const modal = document.getElementById("modalSucesso");
  if (!modal) return;

  modal.innerHTML = `<p>${msg}</p>`;
  modal.style.display = "flex";
  modal.style.opacity = 1;

  setTimeout(() => {
    modal.style.opacity = 0;
    setTimeout(() => modal.style.display = "none", 300); // fade out suave
  }, duracao);
}

// ========================
// CARREGAR ALUNOS
// ========================
async function carregarAlunos() {
  try {
    const resposta = await fetch("http://localhost/Projeto-Lab-teste/back/listarAlunos.php");
    const texto = await resposta.text();

    let alunos = [];
    try {
      alunos = JSON.parse(texto);
    } catch {
      console.error("Erro ao converter JSON:", texto);
      mostrarModal("Erro ao carregar alunos.");
    }

    renderizarAlunos(alunos);

  } catch (erro) {
    console.error("Erro ao carregar alunos:", erro);
    mostrarModal("Erro ao conectar com o servidor.");
  }
}

// ========================
// RENDERIZAR ALUNOS
// ========================
function renderizarAlunos(lista) {
  const tbody = document.querySelector("#listaAlunos tbody");
  if (!tbody) return;

  tbody.innerHTML = "";

  lista.forEach(aluno => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${aluno.idAluno}</td>
      <td>${aluno.nomeAluno}</td>
      <td>${aluno.email}</td>
      <td>
        <button class="btnDistribuir" 
                data-id="${aluno.idAluno}" 
                data-nome="${aluno.nomeAluno}"
                data-email="${aluno.email}">
          Distribuir moedas
        </button>
      </td>
    `;

    tbody.appendChild(tr);
  });

  document.querySelectorAll(".btnDistribuir").forEach(btn => {
    btn.addEventListener("click", abrirModal);
  });
}

// ========================
// FILTRO DE ALUNOS
// ========================
document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("searchInput");

  if (input) {
    input.addEventListener("keyup", () => {
      const filtro = input.value.toLowerCase();
      document.querySelectorAll("#listaAlunos tbody tr").forEach(tr => {
        const nome = tr.querySelector("td:nth-child(2)").textContent.toLowerCase();
        tr.style.display = nome.includes(filtro) ? "" : "none";
      });
    });
  }

  carregarAlunos();
});

// ========================
// MODAL DE DISTRIBUIÇÃO DE MOEDAS
// ========================
const modal = document.getElementById("modalMoedas");
const spanClose = document.querySelector(".close");
const formMoedas = document.getElementById("formMoedas");

function abrirModal(event) {
  const btn = event.currentTarget;

  document.getElementById("alunoId").value = btn.dataset.id;
  document.getElementById("nomeAluno").value = btn.dataset.nome;
  document.getElementById("emailAluno").value = btn.dataset.email;

  modal.style.display = "block";
}

spanClose.onclick = () => (modal.style.display = "none");

window.onclick = (event) => {
  if (event.target == modal) modal.style.display = "none";
};

// ========================
// ENVIO DO FORMULÁRIO DE MOEDAS
// ========================
formMoedas.addEventListener("submit", async (e) => {
  e.preventDefault();

  const dados = {
    idAluno: document.getElementById("alunoId").value,
    nomeSobrenomeAluno: document.getElementById("nomeAluno").value,
    data: document.getElementById("dataMoeda").value,
    motivo: document.getElementById("motivoMoeda").value,
    quantidade: document.getElementById("qtdMoedas").value
  };

  console.log("Enviando dados:", dados);

  try {
    const resposta = await fetch("http://localhost/Projeto-Lab-teste/back/salvarDistribuicao.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dados)
    });

    const resultado = await resposta.json();

    mostrarModal(resultado.mensagem); // usando o modal #modalSucesso
    modal.style.display = "none";
    formMoedas.reset();

  } catch (erro) {
    console.error("Erro ao salvar:", erro);
    mostrarModal("Erro ao salvar.");
  }
});

// ========================
// DROPDOWN DO USUÁRIO
// ========================
const userIcon = document.getElementById("userIcon");
const userDropdown = document.getElementById("userDropdown");

userIcon.addEventListener("click", () => {
    userDropdown.style.display = userDropdown.style.display === "block" ? "none" : "block";
});

document.addEventListener("click", (e) => {
    if (!userIcon.contains(e.target) && !userDropdown.contains(e.target)) {
        userDropdown.style.display = "none";
    }
});


document.getElementById("baixarRelatorio").addEventListener("click", async () => {
    try {
        const resposta = await fetch("http://localhost/Sistema-de-Moeda-Estudantil/Codigos/back/gerarRelatorioMoedas.php");
        
        if (!resposta.ok) throw new Error("Erro ao gerar relatório");

        const texto = await resposta.text();
        const blob = new Blob([texto], { type: "text/plain" });
        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = "Relatório_de_extrato.txt";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

    } catch (erro) {
        console.error("Erro ao baixar relatório:", erro);
        alert("Erro ao baixar relatório.");
    }
});
