<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
include("conexao.php");

$dados = json_decode(file_get_contents("php://input"), true);

if (!$dados) {
    echo json_encode(["status" => "erro", "mensagem" => "Requisição inválida."]);
    exit;
}

$tipo  = trim($dados["tipo"] ?? "");
$email = trim($dados["email"] ?? "");
$senha = trim($dados["senha"] ?? "");

if ($tipo === "" || $email === "" || $senha === "") {
    echo json_encode(["status" => "erro", "mensagem" => "Preencha todos os campos."]);
    exit;
}
switch ($tipo) {
    case "aluno":
        $tabela = "Alunos";
        break;
    case "professor":
        $tabela = "Professores";
        break;
    case "empresa":
        $tabela = "EmpresasParceiras";
        break;
    default:
        echo json_encode(["status" => "erro", "mensagem" => "Tipo de usuário inválido."]);
        exit;
}

$sql = "SELECT * FROM $tabela WHERE email = ? LIMIT 1";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $email);
$stmt->execute();
$resultado = $stmt->get_result();

if ($resultado->num_rows === 0) {
    echo json_encode(["status" => "erro", "mensagem" => "Usuário não encontrado."]);
    exit;
}

$usuario = $resultado->fetch_assoc();

if (!password_verify($senha, $usuario["senha"])) {
    echo json_encode(["status" => "erro", "mensagem" => "Senha incorreta."]);
    exit;
}

echo json_encode([
    "status" => "ok",
    "mensagem" => "Login realizado com sucesso!",
    "usuario" => [
        "id"   => $usuario[array_keys($usuario)[0]],
        "email" => $usuario["email"],
        "tipo" => $tipo
    ]
]);

$stmt->close();
$conn->close();
