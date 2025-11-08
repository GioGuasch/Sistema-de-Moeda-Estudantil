<?php
session_start();
header('Content-Type: application/json');

$conn = new mysqli("localhost", "root", "", "MOEDAS");
if ($conn->connect_error) {
    echo json_encode(["status" => "erro", "mensagem" => "Erro na conexão com o banco."]);
    exit;
}

$nome = $_POST['nome'] ?? '';
$valor = $_POST['valor'] ?? '';
$status = 'ativo';


if (isset($_FILES['img']) && $_FILES['img']['error'] === 0) {
    $pasta = "../uploads/";
    if (!file_exists($pasta)) {
        mkdir($pasta, 0777, true);
    }

    $nomeImg = uniqid() . "-" . basename($_FILES['img']['name']);
    $caminho = $pasta . $nomeImg;

    if (move_uploaded_file($_FILES['img']['tmp_name'], $caminho)) {
        $imgPath = "../uploads/" . $nomeImg;
    } else {
        echo json_encode(["status" => "erro", "mensagem" => "Falha ao mover a imagem."]);
        exit;
    }
} else {
    echo json_encode(["status" => "erro", "mensagem" => "Imagem não enviada."]);
    exit;
}


$stmt = $conn->prepare("INSERT INTO vantagem (nome, valor, status, img) VALUES (?, ?, ?, ?)");
$stmt->bind_param("sdss", $nome, $valor, $status, $imgPath);

if ($stmt->execute()) {
    echo json_encode(["status" => "sucesso"]);
} else {
    echo json_encode(["status" => "erro", "mensagem" => "Erro ao salvar no banco."]);
}

$stmt->close();
$conn->close();
?>
