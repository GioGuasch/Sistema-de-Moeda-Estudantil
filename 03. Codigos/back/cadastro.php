<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

include("conexao.php");

$dados = json_decode(file_get_contents("php://input"), true);

if (!$dados || empty($dados["tipo"])) {
    echo json_encode(["sucesso" => false, "mensagem" => "Nenhum dado recebido."]);
    exit;
}

$tipo = $dados["tipo"];
$email = $dados["email"] ?? '';
$senha = $dados["senha"] ?? '';
$confirmarSenha = $dados["confirmarSenha"] ?? '';

if (!$email || !$senha || !$confirmarSenha) {
    echo json_encode(["sucesso" => false, "mensagem" => "Preencha todos os campos obrigatórios."]);
    exit;
}

if ($senha !== $confirmarSenha) {
    echo json_encode(["sucesso" => false, "mensagem" => "As senhas estão diferentes."]);
    exit;
}

$senhaHash = password_hash($senha, PASSWORD_DEFAULT);

switch ($tipo) {

    case "aluno":
        $sql = "INSERT INTO Alunos 
                (nomeAluno, curso, email, rua, cpf, bairro, rg, numero, instituicaoEnsino, senha)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

        $stmt = $conn->prepare($sql);
        $stmt->bind_param(
            "ssssssssss",
            $dados["nomeAluno"],
            $dados["curso"],
            $email,
            $dados["rua"],
            $dados["cpf"],
            $dados["bairro"],
            $dados["rg"],
            $dados["numero"],
            $dados["instituicaoEnsino"],
            $senhaHash
        );
        break;

    case "professor":
        $sql = "INSERT INTO Professores
                (nomeProfessor, email, cpf, rg, instituicaoEnsino, rua, bairro, numero, senha)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";

        $stmt = $conn->prepare($sql);
        $stmt->bind_param(
            "sssssssis",
            $dados["nomeAluno"],
            $email,
            $dados["cpf"],
            $dados["rg"],
            $dados["instituicaoEnsino"],
            $dados["rua"],
            $dados["bairro"],
            $dados["numero"],
            $senhaHash
        );
        break;

    case "empresa":
        $sql = "INSERT INTO EmpresasParceiras
                (nomeEmpresa, email, cnpj, telefone, areaAtuacao, rua, bairro, numero, senha)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";

        $stmt = $conn->prepare($sql);
        $stmt->bind_param(
            "sssssssis",
            $dados["nomeEmpresa"],
            $email,
            $dados["cnpj"],
            $dados["telefone"],
            $dados["areaAtuacao"],
            $dados["rua"],
            $dados["bairro"],
            $dados["numero"],
            $senhaHash
        );
        break;

    default:
        echo json_encode(["sucesso" => false, "mensagem" => "Tipo inválido."]);
        exit;
}

if ($stmt->execute()) {
    echo json_encode(["sucesso" => true, "mensagem" => "Cadastro realizado com sucesso!"]);
} else {
    echo json_encode(["sucesso" => false, "mensagem" => "Erro: " . $stmt->error]);
}

$stmt->close();
$conn->close();
