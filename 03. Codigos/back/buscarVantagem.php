<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include("conexao.php");

$id = $_GET["id"];

$sql = $conn->prepare("SELECT * FROM vantagens WHERE id = ?");
$sql->bind_param("i", $id);
$sql->execute();

$result = $sql->get_result();
$dados = $result->fetch_assoc();

echo json_encode($dados);