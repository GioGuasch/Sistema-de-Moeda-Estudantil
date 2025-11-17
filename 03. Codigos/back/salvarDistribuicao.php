<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$host = "localhost";
$user = "root";
$pass = "";
$dbname = "Moedas";

$conn = new mysqli($host, $user, $pass, $dbname);

if ($conn->connect_error) {
    echo json_encode([
        "status" => false,
        "mensagem" => "Erro na conexão: " . $conn->connect_error
    ]);
    exit;
}

$input = file_get_contents("php://input");
$dados = json_decode($input, true);

$idAluno = intval($dados["idAluno"] ?? 0);
$nome = trim($dados["nomeSobrenomeAluno"] ?? "");
$data = trim($dados["data"] ?? "");
$motivo = trim($dados["motivo"] ?? "");
$quantidade = intval($dados["quantidade"] ?? 0);

if ($idAluno <= 0 || empty($nome) || empty($data) || empty($motivo) || $quantidade <= 0) {
    echo json_encode([
        "status" => false,
        "mensagem" => "Dados incompletos.",
        "dados_recebidos" => $dados
    ]);
    exit;
}

// Inserir na tabela Moedas
$stmt = $conn->prepare("
    INSERT INTO Moedas (idAluno, nomeSobrenomeAluno, data, motivo, quantidadeMoedas)
    VALUES (?, ?, ?, ?, ?)
");
$stmt->bind_param("isssi", $idAluno, $nome, $data, $motivo, $quantidade);

if (!$stmt->execute()) {
    echo json_encode([
        "status" => false,
        "mensagem" => "Erro ao salvar no banco de Moedas.",
        "erro" => $stmt->error
    ]);
    exit;
}
$stmt->close();

// Verificar se o aluno já tem carteira
$stmt = $conn->prepare("SELECT moedasTotais FROM CarteiraAluno WHERE idAluno = ?");
$stmt->bind_param("i", $idAluno);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 0) {
    // Criar carteira caso não exista
    $stmtInsert = $conn->prepare("
        INSERT INTO CarteiraAluno (idAluno, moedasTotais) VALUES (?, ?)
    ");
    $stmtInsert->bind_param("ii", $idAluno, $quantidade);
    $stmtInsert->execute();
    $stmtInsert->close();
} else {
    // Atualizar saldo existente
    $stmtUpdate = $conn->prepare("
        UPDATE CarteiraAluno SET moedasTotais = moedasTotais + ? WHERE idAluno = ?
    ");
    $stmtUpdate->bind_param("ii", $quantidade, $idAluno);
    $stmtUpdate->execute();
    $stmtUpdate->close();
}

$conn->close();

echo json_encode([
    "status" => true,
    "mensagem" => "Moedas distribuídas e saldo atualizado com sucesso!"
]);
?>
