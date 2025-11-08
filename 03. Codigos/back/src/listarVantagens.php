<?php
include("conexao.php");

$sql = "SELECT id, nome, valor, img, status FROM vantagens";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
  $vantagens = [];
  while ($row = $result->fetch_assoc()) {
    $vantagens[] = $row;
  }
  echo json_encode(["status" => "sucesso", "vantagens" => $vantagens]);
} else {
  echo json_encode(["status" => "erro", "mensagem" => "Nenhuma vantagem encontrada."]);
}
$conn->close();
?>
