<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// Conexão
include("conexao.php");

// Recebe JSON do fetch()
$dados = json_decode(file_get_contents("php://input"), true);

// Se der erro de parsing
if (!$dados) {
    echo json_encode([
        "status" => false,
        "mensagem" => "JSON inválido recebido no servidor."
    ]);
    exit;
}

// Extrair campos
$nome      = trim($dados["nome"] ?? "");
$email     = trim($dados["email"] ?? "");
$telefone  = trim($dados["telefone"] ?? "");
$cnpj      = trim($dados["cnpj"] ?? "");
$senha     = trim($dados["senha"] ?? "");
$idUsuario = intval($dados["idUsuario"] ?? 0);

// Verificar campos obrigatórios
if ($idUsuario <= 0 || empty($nome) || empty($email)) {
    echo json_encode([
        "status" => false,
        "mensagem" => "Campos obrigatórios não preenchidos."
    ]);
    exit;
}

// LIMPAR MÁSCARAS para salvar no banco
$telefone_limpo = preg_replace("/\D/", "", $telefone);
$cnpj_limpo     = preg_replace("/\D/", "", $cnpj);

// Se telefone não tiver 10 ou 11 dígitos
if (!empty($telefone_limpo) && strlen($telefone_limpo) < 10) {
    echo json_encode([
        "status" => false,
        "mensagem" => "Telefone inválido."
    ]);
    exit;
}

// Se CNPJ tiver tamanho errado
if (!empty($cnpj_limpo) && strlen($cnpj_limpo) != 14) {
    echo json_encode([
        "status" => false,
        "mensagem" => "CNPJ inválido."
    ]);
    exit;
}

// Atualizar no banco
$sql = "UPDATE usuarios SET 
            nome = ?, 
            email = ?, 
            telefone = ?, 
            cnpj = ?"
        . (!empty($senha) ? ", senha = ?" : "") . 
        " WHERE id = ?";

$stmt = $conn->prepare($sql);

if (!empty($senha)) {
    // Senha criptografada
    $senhaHash = password_hash($senha, PASSWORD_DEFAULT);
    $stmt->bind_param("sssssi", 
        $nome, $email, $telefone_limpo, $cnpj_limpo, $senhaHash, $idUsuario
    );
} else {
    // Sem senha
    $stmt->bind_param("sssisi", 
        $nome, $email, $telefone_limpo, $cnpj_limpo, $idUsuario
    );
}

if ($stmt->execute()) {
    echo json_encode([
        "status" => true,
        "mensagem" => "Dados atualizados com sucesso!"
    ]);
} else {
    echo json_encode([
        "status" => false,
        "mensagem" => "Erro ao atualizar: " . $stmt->error
    ]);
}

$stmt->close();
$conn->close();
?>
