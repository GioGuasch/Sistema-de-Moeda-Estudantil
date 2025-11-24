<?php
include("conexao.php");

// Query para pegar todos os registros da tabela Moedas
$sql = "SELECT * FROM Moedas ORDER BY id ASC";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // Monta o conteúdo do arquivo
    $conteudo = "ID | ID Aluno | Nome do Aluno | Data | Motivo | Quantidade de Moedas\n";
    $conteudo .= str_repeat("=", 70) . "\n";

    while ($row = $result->fetch_assoc()) {
        $conteudo .= "{$row['id']} | {$row['idAluno']} | {$row['nomeSobrenomeAluno']} | {$row['data']} | {$row['motivo']} | {$row['quantidadeMoedas']}\n";
    }

    // Define os headers para download
    header("Content-Type: text/plain");
    header("Content-Disposition: attachment; filename=relatorio_moedas.txt");
    echo $conteudo;
    exit;
} else {
    echo "Nenhum registro encontrado.";
}
?>
