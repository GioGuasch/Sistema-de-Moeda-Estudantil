<?php
session_start();
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include("conexao.php");

if (!isset($_SESSION["id_usuario"])) {
    echo json_encode(["status" => "erro", "mensagem" => "Usuário não logado"]);
    exit;
}

$id = $_SESSION["id_usuario"];

$sql = $conexao->prepare("SELECT * FROM usuarios WHERE id = ?");
$sql->bind_param("i", $id);
$sql->execute();
$result = $sql->get_result();

if ($result->num_rows > 0) {
    echo json_encode([
        "status" => "ok",
        "usuario" => $result->fetch_assoc()
    ]);
} else {
    echo json_encode(["status" => "erro", "mensagem" => "Usuário não encontrado"]);
}
