<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$host = "localhost";
$user = "root";
$pass = "";
$dbname = "Moedas";

$conn = new mysqli($host, $user, $pass, $dbname);

if ($conn->connect_error) {
    echo json_encode(["status" => false, "erro" => $conn->connect_error]);
    exit;
}

// ID do professor logado — depois você troca pela sessão
$idProfessor = $_GET["idProfessor"] ?? null;

if (!$idProfessor) {
    echo json_encode(["status" => false, "mensagem" => "Professor não identificado."]);
    exit;
}

$sql = "
SELECT 
    p.nome AS nomeProfessor,
    m.quantidadeMoedas,
    m.motivo,
    m.data,
    a.nomeAluno,
    a.curso,
    a.instituicao
FROM ExtratoProfessor ep
JOIN Professores p ON ep.idProfessor = p.id
JOIN Moedas m ON ep.idMoedas = m.id
JOIN Alunos a ON ep.idAluno = a.id
WHERE ep.idProfessor = ?
ORDER BY m.data DESC
";

$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $idProfessor);
$stmt->execute();
$result = $stmt->get_result();

$extrato = [];

while ($row = $result->fetch_assoc()) {
    $extrato[] = $row;
}

echo json_encode($extrato);

$conn->close();
?>
