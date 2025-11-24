<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
include("conexao.php");

$dados = json_decode(file_get_contents("php://input"), true);

$idVantagem    = $dados['idVantagem'] ?? null;
$codigoAluno   = $dados['codigoAluno'] ?? null;
$moedasUsadas  = $dados['moedasUsadas'] ?? 0;

if (!$idVantagem || !$codigoAluno) {
    echo json_encode([
        "status" => "erro",
        "mensagem" => "Vantagem ou código do aluno inválido!"
    ]);
    exit;
}

$stmt = $conn->prepare("SELECT idAluno FROM Alunos WHERE idAluno = ?");
$stmt->bind_param("i", $codigoAluno);
$stmt->execute();
$resultAluno = $stmt->get_result();

if ($resultAluno->num_rows === 0) {
    echo json_encode([
        "status" => "erro",
        "mensagem" => "Aluno não encontrado!"
    ]);
    exit;
}

$stmt = $conn->prepare("SELECT moedasTotais FROM CarteiraAluno WHERE idAluno = ?");
$stmt->bind_param("i", $codigoAluno);
$stmt->execute();
$resultSaldo = $stmt->get_result();

if ($resultSaldo->num_rows === 0) {
    echo json_encode([
        "status" => "erro",
        "mensagem" => "Carteira do aluno não encontrada!"
    ]);
    exit;
}

$saldoAtual = $resultSaldo->fetch_assoc()['moedasTotais'];

if ($saldoAtual < $moedasUsadas) {
    echo json_encode([
        "status" => "erro",
        "mensagem" => "Saldo insuficiente!"
    ]);
    exit;
}

$stmt = $conn->prepare("INSERT INTO VantagemResgatadaAluno (idAluno, moedasUsadas, data) VALUES (?, ?, NOW())");
$stmt->bind_param("ii", $codigoAluno, $moedasUsadas);

if ($stmt->execute()) {
    $novoSaldo = $saldoAtual - $moedasUsadas;
    $stmtUpdate = $conn->prepare("UPDATE CarteiraAluno SET moedasTotais = ? WHERE idAluno = ?");
    $stmtUpdate->bind_param("ii", $novoSaldo, $codigoAluno);
    $stmtUpdate->execute();
    $stmtUpdate->close();

    echo json_encode([
        "status" => "sucesso",
        "mensagem" => "Vantagem resgatada com sucesso!"
    ]);
} else {
    echo json_encode([
        "status" => "erro",
        "mensagem" => "Erro ao registrar resgate."
    ]);
}

$stmt->close();
$conn->close();
