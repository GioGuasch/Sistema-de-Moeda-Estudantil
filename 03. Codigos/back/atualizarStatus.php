<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

include("conexao.php");

$id = $_POST["id"] ?? null;
$status = $_POST["status"] ?? null;

if (!$id || !$status) {
    echo json_encode(["status" => "erro", "mensagem" => "Dados incompletos"]);
    exit;
}

$sql = "UPDATE Vantagens SET status = ? WHERE id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("si", $status, $id);

if ($stmt->execute()) {
    echo json_encode(["status" => "sucesso", "mensagem" => "Status atualizado com sucesso"]);
} else {
    echo json_encode(["status" => "erro", "mensagem" => "Falha ao atualizar status"]);
}

$stmt->close();
$conn->close();
?>
