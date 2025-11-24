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

// Criar pasta se não existir
$pasta = "uploads/";
if (!is_dir($pasta)) {
    mkdir($pasta, 0777, true);
}

// Gerar nome único e seguro
$nomeImg = $pasta . uniqid() . "-" . basename($imgFile["name"]);

if (!move_uploaded_file($imgFile["tmp_name"], $nomeImg)) {
    echo json_encode([
        "status" => "erro",
        "mensagem" => "Erro ao enviar a imagem."
    ]);
    exit;
}

// Inserir no banco
$sql = "INSERT INTO Vantagens (nome, valor, status, img) VALUES (?, ?, ?, ?)";
$stmt = $conn->prepare($sql);
$valorFloat = floatval($valor);
$stmt->bind_param("sdss", $nome, $valorFloat, $status, $nomeImg);

if ($stmt->execute()) {
    echo json_encode([
        "status" => "sucesso",
        "mensagem" => "Vantagem cadastrada!",
        "id" => $stmt->insert_id,
        "img" => $nomeImg
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
