(function () {
  emailjs.init("2vnNQ6i-DnKnQgPI0");
})();

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("formMoedas");

  if (!form) return;

  form.addEventListener("submit", function () {

    const nomeAluno = document.getElementById("nomeAluno")?.value.trim();
    const nomeProfessor = document.getElementById("nomeProfessor")?.value.trim();
    const qtdMoedas = document.getElementById("qtdMoedas")?.value.trim();
    const motivoMoeda = document.getElementById("motivoMoeda")?.value.trim();

    if (!nomeAluno || !nomeProfessor || !qtdMoedas) {
      console.warn("Campos obrigatórios faltando para envio de e-mail.");
      return;
    }
    const SERVICE_ID = "service_sg34jfh";
    const TEMPLATE_ALUNO = "template_nmlknji";   // Template para e-mails ao aluno (genérico)
    const TEMPLATE_PROFESSOR = "template_4747wpq"; // Template para confirmação do professor

    // (1) Enviar e-mail para o aluno (recebeu moedas)

    emailjs.send(SERVICE_ID, TEMPLATE_ALUNO, {
      student_name: nomeAluno,
      to_email: emailAluno,

      email_subject: "Você recebeu moedas no Sistema de Moeda Estudantil",

      message_body: `
        Você acabou de receber <strong>${qtdMoedas}</strong> moedas no Sistema de Moeda Estudantil! 🎉<br><br>
        👨‍🏫 Professor(a): <strong>${nomeProfessor}</strong><br><br>
        Motivo: ${motivoMoeda}
      `
    })
    .then(() => {
      console.log("Email enviado para o aluno com sucesso!");
    })
    .catch((error) => {
      console.error("Erro ao enviar email para o aluno:", error);
    });

    // (2) Enviar e-mail para o professor (confirmação)

    emailjs.send(SERVICE_ID, TEMPLATE_PROFESSOR, {
      professor_name: nomeProfessor,
      student_name: nomeAluno,
      coin_amount: qtdMoedas,
      reason: motivoMoeda
    })
    .then(() => {
      console.log("Email de confirmação enviado ao professor!");
    })
    .catch((error) => {
      console.error("Erro ao enviar email para o professor:", error);
    });

  });
});
