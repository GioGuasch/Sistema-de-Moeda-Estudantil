<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include("conexao.php");

if (!isset($_FILES["img"])) {
    echo json_encode([
        "status" => "erro",
        "mensagem" => "Imagem não enviada!"
    ]);
    exit;
}

$nome = $_POST["nome"] ?? "";
$valor = $_POST["valor"] ?? "";
$status = $_POST["status"] ?? "";
$imgFile = $_FILES["img"];

if (empty($nome) || empty($valor) || empty($status)) {
    echo json_encode([
        "status" => "erro",
        "mensagem" => "Preencha todos os campos!"
    ]);
    exit;
}

$pasta = "uploads/";
if (!is_dir($pasta)) {
    mkdir($pasta, 0777, true);
}

$nomeImg = $pasta . uniqid() . "-" . basename($imgFile["name"]);
move_uploaded_file($imgFile["tmp_name"], $nomeImg);

// salvar no banco
$sql = "INSERT INTO Vantagens (nome, valor, status, img)
        VALUES (?, ?, ?, ?)";

$stmt = $conn->prepare($sql);
$stmt->bind_param("sdss", $nome, $valor, $status, $nomeImg);

if ($stmt->execute()) {
    echo json_encode([
        "status" => "sucesso",
        "mensagem" => "Vantagem cadastrada!",
        "id" => $stmt->insert_id
    ]);
} else {
    echo json_encode([
        "status" => "erro",
        "mensagem" => "Erro ao salvar no banco."
    ]);
}

$stmt->close();
$conn->close();
?>
