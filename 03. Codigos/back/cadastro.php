<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

include("conexao.php");

$dados = $_POST;

$tipo = $dados["tipoUsuario"] ?? '';
if (!$tipo) {
    echo json_encode(["sucesso" => false, "mensagem" => "Tipo de usuário não informado."]);
    exit;
}

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
        $nome = $dados["nomeAluno"] ?? '';
        $curso = $dados["curso"] ?? '';
        $cpf = $dados["cpf"] ?? '';
        $rg = $dados["rg"] ?? '';
        $instituicao = $dados["instituicaoEnsino"] ?? '';
        $rua = $dados["rua"] ?? '';
        $bairro = $dados["bairro"] ?? '';
        $numero = $dados["numero"] ?? '';

        if (!$nome || !$curso || !$cpf || !$rg || !$instituicao || !$rua || !$bairro || !$numero) {
            echo json_encode(["sucesso" => false, "mensagem" => "Preencha todos os campos do aluno."]);
            exit;
        }

        $sql = "INSERT INTO Alunos 
                (nomeAluno, curso, email, rua, cpf, bairro, rg, numero, instituicaoEnsino, senha)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param(
            "ssssssssss",
            $nome, $curso, $email, $rua, $cpf, $bairro, $rg, $numero, $instituicao, $senhaHash
        );
        break;

    case "professor":
        $nome = $dados["nomeProfessor"] ?? '';
        $cpf = $dados["cpf"] ?? '';
        $rg = $dados["rg"] ?? '';
        $instituicao = $dados["instituicaoEnsino"] ?? '';
        $rua = $dados["rua"] ?? '';
        $bairro = $dados["bairro"] ?? '';
        $numero = $dados["numero"] ?? '';

        if (!$nome || !$cpf || !$rg || !$instituicao || !$rua || !$bairro || !$numero) {
            echo json_encode(["sucesso" => false, "mensagem" => "Preencha todos os campos do professor."]);
            exit;
        }

        $sql = "INSERT INTO Professores
                (nomeProfessor, email, cpf, rg, instituicaoEnsino, rua, bairro, numero, senha)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param(
            "sssssssis",
            $nome, $email, $cpf, $rg, $instituicao, $rua, $bairro, $numero, $senhaHash
        );
        break;

    case "empresa":
        $nome = $dados["nomeEmpresa"] ?? '';
        $cnpj = $dados["cnpj"] ?? '';
        $telefone = $dados["telefone"] ?? '';
        $area = $dados["areaAtuacao"] ?? '';
        $rua = $dados["rua"] ?? '';
        $bairro = $dados["bairro"] ?? '';
        $numero = $dados["numero"] ?? '';

        if (!$nome || !$cnpj || !$telefone || !$area || !$rua || !$bairro || !$numero) {
            echo json_encode(["sucesso" => false, "mensagem" => "Preencha todos os campos da empresa."]);
            exit;
        }

        $sql = "INSERT INTO EmpresasParceiras
                (nomeEmpresa, email, cnpj, telefone, areaAtuacao, rua, bairro, numero, senha)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param(
            "sssssssis",
            $nome, $email, $cnpj, $telefone, $area, $rua, $bairro, $numero, $senhaHash
        );
        break;

    default:
        echo json_encode(["sucesso" => false, "mensagem" => "Tipo de usuário inválido."]);
        exit;
}

if ($stmt->execute()) {
    echo json_encode(["sucesso" => true, "mensagem" => "Cadastro realizado com sucesso!"]);
} else {
    echo json_encode(["sucesso" => false, "mensagem" => "Erro ao cadastrar: " . $stmt->error]);
}

$stmt->close();
$conn->close();
