// ========================
// FUNÇÃO MODAL DE MENSAGEM
// ========================
function mostrarModal(msg) {
  let modal = document.getElementById("modalMensagem");
  if (!modal) {
    modal = document.createElement("div");
    modal.id = "modalMensagem";
    modal.style.position = "fixed";
    modal.style.top = "20px";
    modal.style.left = "50%";
    modal.style.transform = "translateX(-50%)";
    modal.style.backgroundColor = "#333";
    modal.style.color = "#fff";
    modal.style.padding = "10px 20px";
    modal.style.borderRadius = "5px";
    modal.style.zIndex = 10000;
    modal.style.fontSize = "16px";
    modal.style.boxShadow = "0 2px 10px rgba(0,0,0,0.3)";
    modal.style.opacity = "0";
    modal.style.transition = "opacity 0.3s";
    document.body.appendChild(modal);
  }

  modal.innerHTML = msg;
  modal.style.opacity = "1";

  setTimeout(() => {
    modal.style.opacity = "0";
  }, 1000);
}

// ========================
// INIT EMAILJS
// ========================
(function () {
  emailjs.init("2vnNQ6i-DnKnQgPI0");
})();

// ========================
// FUNÇÃO DE ENVIO DE EMAIL
// ========================
function enviarEmailResgateVantagem(dados) {
  const SERVICE_ID = "service_sg34jfh";
  const TEMPLATE_ALUNO = "template_nmlknji";

  return emailjs.send(SERVICE_ID, TEMPLATE_ALUNO, {
    student_name: dados.nomeAluno,
    to_email: dados.emailAluno || "",
    email_subject: "Confirmação de resgate de vantagem",

    message_body: `
      Seu resgate foi realizado com sucesso! 🎉<br><br>

      🛍 <strong>Vantagem:</strong> ${dados.nomeVantagem}<br>
      💰 <strong>Custou:</strong> ${dados.custoMoedas} moedas<br><br>

      ${dados.urlImagem ? `
        <strong>Produto escolhido:</strong><br>
        <img src="${dados.urlImagem}" 
             alt="Imagem do produto" 
             style="max-width:250px; border-radius:12px; margin:10px 0;"><br><br>
      ` : ""}

      ${dados.urlQRCode ? `
        <strong>Apresente este QRCode para validar o resgate:</strong><br>
        <img src="${dados.urlQRCode}" 
             alt="QR Code de resgate" 
             style="max-width:220px; margin-top:8px;"><br><br>
      ` : ""}

      Obrigado por utilizar o Sistema de Moeda Estudantil!
    `
  })
  .then(() => mostrarModal("Email enviado ao aluno com QRCode!"))
  .catch((erro) => mostrarModal("Erro ao enviar email para o aluno."));
}

