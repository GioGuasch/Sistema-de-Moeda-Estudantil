document.addEventListener("DOMContentLoaded", () => {
    const inputCodigo = document.getElementById("codigoAluno");
    const btnConsultar = document.getElementById("consultarSaldo");
    const resultado = document.getElementById("resultadoSaldo");

    btnConsultar.addEventListener("click", async () => {
        const codigo = inputCodigo.value.trim();
        if (!codigo) {
            alert("Digite seu código!");
            return;
        }

        try {
            const resposta = await fetch("../../back/consultarSaldo.php", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ codigoAluno: codigo })
            });

            const texto = await resposta.text();
            let dados;
            try {
                dados = JSON.parse(texto);
            } catch {
                console.error("Resposta do PHP não é JSON válido:", texto);
                alert("Erro ao consultar saldo.");
                return;
            }

            if (dados.status === "sucesso") {
                resultado.innerHTML = `<b>Saldo:</b> ${dados.saldo} moedas`;
            } else {
                resultado.innerHTML = `<b>Erro:</b> ${dados.mensagem}`;
            }

        } catch (erro) {
            console.error("Erro ao consultar saldo:", erro);
        }
    });
});


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
