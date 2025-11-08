<?php
session_start();
header('Content-Type: application/json');

$conn = new mysqli("localhost", "root", "", "MOEDAS");
if ($conn->connect_error) {
    echo json_encode(["status" => "erro", "mensagem" => "Erro ao conectar ao banco."]);
    exit;
}

$id_aluno = $_SESSION['id_aluno'] ?? null;

if (!$id_aluno) {
    echo json_encode(["status" => "erro", "mensagem" => "Usuário não autenticado."]);
    exit;
}

$sql = "
  SELECT a.nome, a.instituicao, c.saldo_atual
  FROM aluno a
  JOIN carteira c ON a.id_carteira = c.id_carteira
  WHERE a.id_aluno = ?
";

$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $id_aluno);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 0) {
    echo json_encode(["status" => "erro", "mensagem" => "Aluno não encontrado."]);
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
