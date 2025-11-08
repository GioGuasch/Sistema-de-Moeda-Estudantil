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
  const container = document.getElementById("vantagensContainer");
  container.innerHTML = "<p>Carregando vantagens...</p>";

  try {
    const response = await fetch("../php/listarVantagens.php");
    const data = await response.json();

    if (data.status === "sucesso") {
      container.innerHTML = "";
      const vantagensAtivas = data.vantagens.filter(v => v.status === "ativo");

      if (vantagensAtivas.length === 0) {
        container.innerHTML = "<p>Nenhuma vantagem disponível no momento.</p>";
        return;
      }

      vantagensAtivas.forEach(v => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML = `
          <img src="${v.img}" alt="${v.nome}">
          <h3>${v.nome}</h3>
          <h4>$${v.valor}</h4>
          <button onclick="resgatarVantagem('${v.id}', '${v.nome}', ${v.valor})">Resgatar</button>
        `;
        container.appendChild(card);
      });
    } else {
      container.innerHTML = "<p>Erro ao carregar vantagens.</p>";
    }
  } catch (error) {
    container.innerHTML = "<p>Erro ao conectar com o servidor.</p>";
  }
}

async function resgatarVantagem(id, nome, valor) {
  if (!confirm(`Deseja realmente resgatar "${nome}" por ${valor} moedas?`)) return;

  try {
    const response = await fetch("../php/resgatarVantagem.php", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `id=${id}&valor=${valor}`
    });
    const data = await response.json();

    if (data.status === "sucesso") {
      alert(`✅ ${data.mensagem}`);
      carregarVantagens();
    } else {
      alert("Erro: " + data.mensagem);
    }
  } catch {
    alert("Erro ao tentar resgatar vantagem.");
  }
}

window.addEventListener("DOMContentLoaded", carregarVantagens);
