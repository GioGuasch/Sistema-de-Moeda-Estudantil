<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

include("conexao.php");

$idAluno = $_POST["idAluno"] ?? null;

if (!$idAluno) {
    echo json_encode(["status" => "erro", "mensagem" => "Aluno não informado"]);
    exit;
}

$sql = "SELECT moedasTotais FROM CarteiraAluno WHERE idAluno = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $idAluno);
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
