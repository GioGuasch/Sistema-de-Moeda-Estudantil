<?php
include("conexao.php");

if ($_SERVER["REQUEST_METHOD"] === "POST") {

    $tipoUsuario = $_POST["tipoUsuario"];

    if ($tipoUsuario === "aluno") {
        $nome = $_POST["nome"];
        $email = $_POST["email"];
        $cpf = $_POST["cpf"];
        $rg = $_POST["rg"];
        $idInstituicao = $_POST["idInstituicao"];
        $curso = $_POST["curso"];
        $rua = $_POST["rua"];
        $bairro = $_POST["bairro"];
        $numero = $_POST["numero"];
        $senha = $_POST["senha"];
        $confirmarSenha = $_POST["confirmarSenha"];

        $sql = "INSERT INTO aluno (nome, email, cpf, rg, idInstituicao, curso, rua, bairro, numero, senha, confirmarSenha)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

        $stmt = $conn->prepare($sql);
        $stmt->bind_param("ssssiSSSSss", $nome, $email, $cpf, $rg, $idInstituicao, $curso, $rua, $bairro, $numero, $senha, $confirmarSenha);

    } elseif ($tipoUsuario === "professor") {
        $nome = $_POST["nome"];
        $email = $_POST["email"];
        $cpf = $_POST["cpf"];
        $rg = $_POST["rg"];
        $idInstituicao = $_POST["idInstituicao"];
        $rua = $_POST["rua"];
        $bairro = $_POST["bairro"];
        $numero = $_POST["numero"];
        $senha = $_POST["senha"];
        $confirmarSenha = $_POST["confirmarSenha"];

        $sql = "INSERT INTO professor (nome, email, cpf, rg, idInstituicao, rua, bairro, numero, senha, confirmarSenha)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

        $stmt = $conn->prepare($sql);
        $stmt->bind_param("ssssisssss", $nome, $email, $cpf, $rg, $idInstituicao, $rua, $bairro, $numero, $senha, $confirmarSenha);

    } elseif ($tipoUsuario === "empresa") {
        $nome = $_POST["nome"];
        $email = $_POST["email"];
        $cnpj = $_POST["cnpj"];
        $telefone = $_POST["telefone"];
        $areaAtuacao = $_POST["areaAtuacao"];
        $rua = $_POST["rua"];
        $bairro = $_POST["bairro"];
        $numero = $_POST["numero"];
        $senha = $_POST["senha"];
        $confirmarSenha = $_POST["confirmarSenha"];

        $sql = "INSERT INTO empresa (nome, email, cnpj, telefone, areaAtuacao, rua, bairro, numero, senha, confirmarSenha)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

        $stmt = $conn->prepare($sql);
        $stmt->bind_param("ssssssssss", $nome, $email, $cnpj, $telefone, $areaAtuacao, $rua, $bairro, $numero, $senha, $confirmarSenha);
    } else {
        die("Tipo de usuário inválido!");
    }

    if ($stmt->execute()) {
        echo "Cadastro realizado com sucesso!";
    } else {
        echo "Erro ao cadastrar: " . $stmt->error;
    }

    $stmt->close();
    $conn->close();
}
?>
