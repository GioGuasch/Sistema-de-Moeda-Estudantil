<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

include("conexao.php");

$codigoAluno = $_POST["codigoAluno"] ?? null;

if (!$codigoAluno) {
    $dados = json_decode(file_get_contents("php://input"), true);
    $codigoAluno = $dados['codigoAluno'] ?? null;
}

if (!$codigoAluno) {
    echo json_encode(["status" => "erro", "mensagem" => "Código do aluno não informado"]);
    exit;
}

$sql = "SELECT moedasTotais FROM CarteiraAluno WHERE idAluno = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $codigoAluno);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 0) {
    echo json_encode(["status" => "erro", "mensagem" => "Carteira do aluno não encontrada"]);
    exit;
}

$saldo = $result->fetch_assoc()["moedasTotais"];

echo json_encode([
    "status" => "sucesso",
    "saldo" => $saldo
]);

$stmt->close();
$conn->close();
?>
