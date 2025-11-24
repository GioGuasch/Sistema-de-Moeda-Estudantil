<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include("conexao.php");

$data = json_decode(file_get_contents("php://input"), true);
$codigo = $data["codigoAluno"] ?? null;

if (!$codigo) {
    echo json_encode(["status" => "erro", "mensagem" => "Código não enviado"]);
    exit;
}

$sql = "SELECT nomeAluno, email FROM Alunos WHERE idAluno = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $codigo);
$stmt->execute();
$stmt->store_result();

if ($stmt->num_rows === 0) {
    echo json_encode(["status" => "erro", "mensagem" => "Aluno não encontrado"]);
    exit;
}

$stmt->bind_result($nome, $email);
$stmt->fetch();

echo json_encode([
    "status" => "sucesso",
    "nomeAluno" => $nome,
    "emailAluno" => $email
]);