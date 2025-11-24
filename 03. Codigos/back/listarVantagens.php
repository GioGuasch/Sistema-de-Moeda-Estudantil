<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
include("conexao.php");

$sql = "SELECT id, nome, valor, status, img FROM Vantagens ORDER BY id DESC";
$result = $conn->query($sql);

$vantagens = [];
while ($row = $result->fetch_assoc()) {
    $vantagens[] = $row;
}

echo json_encode($vantagens);
$conn->close();
?>
