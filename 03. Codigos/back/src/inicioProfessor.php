<?php
session_start();
header('Content-Type: application/json');

$conn = new mysqli("localhost", "root", "", "MOEDAS");
if ($conn->connect_error) {
    echo json_encode(["status" => "erro", "mensagem" => "Erro ao conectar ao banco."]);
    exit;
}

$id_professor = $_SESSION['id_professor'] ?? null;

if (!$id_professor) {
    echo json_encode(["status" => "erro", "mensagem" => "Usuário não autenticado."]);
    exit;
}

$sql = "
  SELECT p.nome, p.instituicao, c.saldo_atual
  FROM professor p
  JOIN carteira c ON p.id_carteira = c.id_carteira
  WHERE p.id_professor = ?
";

$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $id_professor);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 0) {
    echo json_encode(["status" => "erro", "mensagem" => "Professor não encontrado."]);
    exit;
}

$dados = $result->fetch_assoc();

echo json_encode([
    "status" => "sucesso",
    "nome" => $dados['nome'],
    "instituicao" => $dados['instituicao'],
    "saldo" => $dados['saldo_atual']
]);

$stmt->close();
$conn->close();
?>
