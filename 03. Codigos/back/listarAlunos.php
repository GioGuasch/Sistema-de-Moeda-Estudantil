<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

error_reporting(0);

include("conexao.php");

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

echo json_encode($alunos);
exit;
?>
