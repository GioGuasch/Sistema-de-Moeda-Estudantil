// Habilitar edição ao clicar no ícone pequeno
document.querySelectorAll('.editar-icone-menor').forEach(icon => {
    icon.addEventListener('click', () => {
        const input = icon.parentElement.querySelector('input, select');
        if (input) {
            input.disabled = !input.disabled;
            if (!input.disabled) input.focus();
        }
    });
});

// Mostrar / ocultar senha
document.querySelectorAll('.toggle-senha').forEach(eye => {
    eye.addEventListener('click', () => {
        const input = eye.previousElementSibling;
        if (input.type === "password") {
            input.type = "text";
            eye.classList.replace("fa-eye", "fa-eye-slash");
        } else {
            input.type = "password";
            eye.classList.replace("fa-eye-slash", "fa-eye");
        }
    });
});

// =============================
// 📌 MÁSCARA DE TELEFONE
// =============================
document.querySelectorAll('input[data-mascara="telefone"]').forEach(input => {
    input.addEventListener('input', () => {
        let v = input.value.replace(/\D/g, ""); 

        if (v.length > 11) v = v.slice(0, 11);

        if (v.length > 10) {
            v = v.replace(/^(\d{2})(\d{5})(\d{4}).*/, "($1) $2-$3");
        } else if (v.length > 6) {
            v = v.replace(/^(\d{2})(\d{4})(\d{0,4}).*/, "($1) $2-$3");
        } else if (v.length > 2) {
            v = v.replace(/^(\d{2})(\d{0,5})/, "($1) $2");
        } else {
            v = v.replace(/^(\d{0,2})/, "($1");
        }

        input.value = v;
    });
});

// =============================
// 📌 MÁSCARA DE CNPJ
// =============================
document.querySelectorAll('input[data-mascara="cnpj"]').forEach(input => {
    input.addEventListener('input', () => {
        let v = input.value.replace(/\D/g, "");
        if (v.length > 14) v = v.slice(0, 14);

        v = v.replace(/^(\d{2})(\d)/, "$1.$2");
        v = v.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3");
        v = v.replace(/\.(\d{3})(\d)/, ".$1/$2");
        v = v.replace(/(\d{4})(\d)/, "$1-$2");

        input.value = v;
    });
});


// =============================
// 📌 FUNÇÃO PARA SALVAR DADOS NO PHP
// =============================
async function salvarPerfilEmpresa() {
    const dados = {
        idUsuario: document.querySelector("#idUsuario")?.value ?? "",
        nome: document.querySelector("#nomeEmpresa")?.value ?? "",
        email: document.querySelector("#emailEmpresa")?.value ?? "",
        telefone: document.querySelector("#telefoneEmpresa")?.value ?? "",
        cnpj: document.querySelector("#cnpjEmpresa")?.value ?? "",
        senha: document.querySelector("#senhaEmpresa")?.value ?? ""
    };

    console.log("Enviando para o PHP:", dados);

    try {
        const resposta = await fetch("../php/updateDados.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dados)
        });

        const retorno = await resposta.json();
        console.log("Retorno:", retorno);

        if (retorno.status) {
            alert("Dados atualizados com sucesso!");
        } else {
            alert("Erro: " + retorno.mensagem);
        }

    } catch (erro) {
        console.error("Erro ao enviar dados:", erro);
        alert("Falha na comunicação com o servidor.");
    }
}


// =============================
// 📌 BOTÃO DE SALVAR (SE EXISTIR)
// =============================
const botaoSalvar = document.querySelector("#salvarPerfilEmpresa");

if (botaoSalvar) {
    botaoSalvar.addEventListener("click", salvarPerfilEmpresa);
}
