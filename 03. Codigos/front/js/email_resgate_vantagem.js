(function () {
  emailjs.init("2vnNQ6i-DnKnQgPI0");
})();

function enviarEmailResgateVantagem(dados) {
  const SERVICE_ID = "service_sg34jfh";
  const TEMPLATE_ALUNO = "template_nmlknji";

  return emailjs.send(SERVICE_ID, TEMPLATE_ALUNO, {
    student_name: dados.nomeAluno,
    to_email: dados.emailAluno || "",

    email_subject: "Confirmação de resgate de vantagem",

    message_body: `
      Seu resgate foi realizado com sucesso! 🎉<br><br>
      🛍 Vantagem: <strong>${dados.nomeVantagem}</strong><br>
      💰 Custo em moedas: <strong>${dados.custoMoedas}</strong><br><br>

      Veja o produto que você escolheu:<br>
      <img src="${dados.urlImagem}" alt="${dados.nomeVantagem}"
           style="max-width:260px; border-radius:10px; margin-top:10px;">
    `
  });
}
