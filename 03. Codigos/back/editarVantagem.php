<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include("conexao.php");

$id = $_POST["id"];
$nome = $_POST["nome"];
$valor = $_POST["valor"];
$status = $_POST["status"];
$imgAtual = $_POST["imgAtual"];

if (!empty($_FILES["img"]["name"])) {
    $nomeImg = time() . "_" . $_FILES["img"]["name"];
    move_uploaded_file($_FILES["img"]["tmp_name"], $nomeImg);
} else {
    $nomeImg = $imgAtual;
}

$sql = $conn->prepare("UPDATE vantagens SET nome=?, valor=?, status=?, img=? WHERE id=?");
$sql->bind_param("sissi", $nome, $valor, $status, $nomeImg, $id);

if ($sql->execute()) {
    echo json_encode(["status" => "sucesso", "mensagem" => "Vantagem atualizada!"]);
} else {
    echo json_encode(["status" => "erro", "mensagem" => "Erro ao salvar edição."]);
}
