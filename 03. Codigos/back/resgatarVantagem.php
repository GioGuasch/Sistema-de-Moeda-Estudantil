<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
include("conexao.php");
include("phpqrcode/qrlib.php");

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

// 1. Verifica aluno
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

// 2. Verifica saldo
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

// 3. Resgatar vantagem
$stmt = $conn->prepare("INSERT INTO VantagemResgatadaAluno (idAluno, moedasUsadas, data) VALUES (?, ?, NOW())");
$stmt->bind_param("ii", $codigoAluno, $moedasUsadas);

if ($stmt->execute()) {

    // 4. Atualizar saldo
    $novoSaldo = $saldoAtual - $moedasUsadas;
    $stmtUpdate = $conn->prepare("UPDATE CarteiraAluno SET moedasTotais = ? WHERE idAluno = ?");
    $stmtUpdate->bind_param("ii", $novoSaldo, $codigoAluno);
    $stmtUpdate->execute();
    $stmtUpdate->close();

    // ============================
    // 5. GERAR QR CODE
    // ============================

    $resgateID = $stmt->insert_id;  // pega o ID do resgate salvo
    $codigoUnico = "resgate_" . $codigoAluno . "_" . $resgateID . "_" . time();

    // Pasta onde salvar QRCode
    $caminhoPasta = "qrcodes/";
    if (!is_dir($caminhoPasta)) {
        mkdir($caminhoPasta, 0777, true);
    }

    // Nome do arquivo
    $nomeArquivo = $caminhoPasta . $codigoUnico . ".png";

    // Gerar QR Code (conteúdo é o próprio código único)
    QRcode::png($codigoUnico, $nomeArquivo, QR_ECLEVEL_L, 6);

    // URL pública para acessar esse QRCode
    $urlQRCode = "http://localhost/Projeto-Lab-teste/back/" . $nomeArquivo;

    echo json_encode([
        "status" => "sucesso",
        "mensagem" => "Vantagem resgatada com sucesso!",
        "qrcode_url" => $urlQRCode
    ]);

} else {
    echo json_encode([
        "status" => "erro",
        "mensagem" => "Erro ao registrar resgate."
    ]);
}

$stmt->close();
$conn->close();
