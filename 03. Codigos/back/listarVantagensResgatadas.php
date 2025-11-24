<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include("conexao.php");

$idAluno = $_GET['idAluno'] ?? null;

if (!$idAluno) {
    echo json_encode(["status" => "erro", "mensagem" => "ID do aluno não informado"]);
    exit;
}

$sql = "SELECT id, moedasUsadas, data 
        FROM VantagemResgatadaAluno 
        WHERE idAluno = ?
        ORDER BY data DESC";

$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $idAluno);
$stmt->execute();
$result = $stmt->get_result();

$vantagens = [];
while ($row = $result->fetch_assoc()) {
    $vantagens[] = $row;
}

if (empty($vantagens)) {
    echo json_encode(["status" => "vazio", "mensagem" => "Nenhuma vantagem resgatada ainda."]);
} else {
    echo json_encode(["status" => "sucesso", "vantagens" => $vantagens]);
}

$stmt->close();
$conn->close();
?>
