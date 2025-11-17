async function carregarAlunos() {
  try {
    const resposta = await fetch("http://localhost/Projeto-Lab-teste/back/listarAlunos.php");
    const texto = await resposta.text();
    let alunos = [];
    try { alunos = JSON.parse(texto); }
    catch { console.error("Erro ao converter JSON:", texto); }
    renderizarAlunos(alunos);
  } catch (erro) {
    console.error("Erro ao carregar alunos:", erro);
  }
}

function renderizarAlunos(lista) {
  const tbody = document.querySelector("#listaAlunos tbody");
  if (!tbody) return;
  tbody.innerHTML = "";

  lista.forEach(aluno => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${aluno.idAluno}</td>
      <td>${aluno.nomeAluno}</td>
      <td>${aluno.curso}</td>
      <td>${aluno.instituicao ?? "—"}</td>
      <td>
        <button class="btnDistribuir" 
                data-id="${aluno.idAluno}" 
                data-nome="${aluno.nomeAluno}">
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


document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("searchInput");
  if (!input) return;

  input.addEventListener("keyup", () => {
    const filtro = input.value.toLowerCase();
    document.querySelectorAll("#listaAlunos tbody tr").forEach(tr => {
      const nome = tr.querySelector("td:nth-child(2)").textContent.toLowerCase();
      tr.style.display = nome.includes(filtro) ? "" : "none";
    });
  });

  carregarAlunos();
});

const modal = document.getElementById("modalMoedas");
const spanClose = document.querySelector(".close");
const formMoedas = document.getElementById("formMoedas");

function abrirModal(event) {
  const btn = event.currentTarget;
  document.getElementById("alunoId").value = btn.dataset.id;
  document.getElementById("nomeAluno").value = btn.dataset.nome;
  modal.style.display = "block";
}

spanClose.onclick = () => modal.style.display = "none";
window.onclick = (event) => { if (event.target == modal) modal.style.display = "none"; };

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
    alert(resultado.mensagem);
    modal.style.display = "none";
    formMoedas.reset();
  } catch (erro) {
    console.error(erro);
    alert("Erro ao salvar.");
  }
});
