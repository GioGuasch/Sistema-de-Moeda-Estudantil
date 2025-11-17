<?php
$servidor = "localhost";
$usuario = "root";
$senha = "";
$banco = "Moedas";

$conn = new mysqli($servidor, $usuario, $senha, $banco);

if ($conn->connect_error) {
    header("Content-Type: application/json; charset=UTF-8");
    echo json_encode(["sucesso" => false, "mensagem" => "Erro na conexão com o banco."]);
    exit;
}
?>
