<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include("conexao.php");

// Recebe email do aluno via GET
$email = $_GET['email'] ?? null;

if (!$email) {
    echo json_encode(["status" => "erro", "mensagem" => "Email do aluno não informado"]);
    exit;
}

// Busca dados do aluno pelo email
$sql = "SELECT nome, curso, email, cpf, rg, rua, numero, bairro, instituicao, tipoUsuario
        FROM Alunos
        WHERE email = ?";

$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 0) {
    echo json_encode(["status" => "erro", "mensagem" => "Aluno não encontrado"]);
    exit;
}

$aluno = $result->fetch_assoc();

echo json_encode([
    "status" => "sucesso",
    "aluno" => $aluno
]);

$stmt->close();
$conn->close();
?>
