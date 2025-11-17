<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// Evitar qualquer aviso/erro poluindo o JSON
error_reporting(0);

include("conexao.php");

// Verificar se a conexão existe
if (!$conn) {
    echo json_encode([]);
    exit;
}

$query = "SELECT * FROM Alunos";
$result = mysqli_query($conn, $query);

$alunos = [];
if ($result) {
    while ($row = mysqli_fetch_assoc($result)) {
        $alunos[] = $row;
    }
}

// Retorna JSON limpo
echo json_encode($alunos);
exit;
?>
