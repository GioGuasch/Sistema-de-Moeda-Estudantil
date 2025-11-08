<?php
session_start();
$conn = new mysqli("localhost", "root", "", "MOEDAS");

if ($conn->connect_error) {
  die(json_encode(["status" => "erro", "mensagem" => "Erro na conexão com o banco."]));
}

$professor_id = $_SESSION['id_professor'] ?? null;
$nome_aluno = $_POST['nomeAluno'] ?? '';
$quantidade = $_POST['quantidade'] ?? 0;
$data = $_POST['data'] ?? date('Y-m-d');
$motivo = $_POST['motivo'] ?? '';

if (!$professor_id || !$nome_aluno || !$quantidade || !$motivo) {
  echo json_encode(["status" => "erro", "mensagem" => "Preencha todos os campos."]);
  exit;
}

$stmt = $conn->prepare("SELECT id_aluno FROM aluno WHERE nome = ?");
$stmt->bind_param("s", $nome_aluno);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 0) {
  echo json_encode(["status" => "erro", "mensagem" => "Aluno não encontrado."]);
  exit;
}

$aluno = $result->fetch_assoc();
$id_aluno = $aluno['id_aluno'];

$stmt = $conn->prepare("INSERT INTO distribuicao (id_professor, id_aluno, quantidade, data_distribuicao, motivo) VALUES (?, ?, ?, ?, ?)");
$stmt->bind_param("iiiss", $professor_id, $id_aluno, $quantidade, $data, $motivo);

if ($stmt->execute()) {
  echo json_encode(["status" => "sucesso", "mensagem" => "Distribuição registrada com sucesso!"]);
} else {
  echo json_encode(["status" => "erro", "mensagem" => "Erro ao registrar distribuição."]);
}

$stmt->close();
$conn->close();
?>
