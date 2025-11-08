<?php
$conn = new mysqli("localhost", "root", "", "MOEDAS");

$_SESSION['id_aluno'] = $usuario['id_aluno'];
$_SESSION['id_professor'] = $usuario['id_professor'];

if ($conn->connect_error) {
    die("Erro na conexão: " . $conn->connect_error);
}

session_start();

$tipo = $_POST['tipoUsuario'];
$emailCpf = $_POST['emailCpf'];
$senha = $_POST['senha'];

$tabela = "";
$campoIdentificador = "";

switch ($tipo) {
    case 'aluno':
        $tabela = "aluno";
        $campoIdentificador = "(email = ? OR cpf = ?)";
        break;
    case 'professor':
        $tabela = "professor";
        $campoIdentificador = "(email = ? OR cpf = ?)";
        break;
    case 'empresa':
        $tabela = "empresa";
        $campoIdentificador = "(email = ? OR cnpj = ?)";
        break;
    default:
        echo "<script>alert('Tipo de usuário inválido!'); window.location.href='../pages/login.html';</script>";
        exit;
}

$sql = "SELECT * FROM $tabela WHERE $campoIdentificador AND senha = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("sss", $emailCpf, $emailCpf, $senha);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $usuario = $result->fetch_assoc();
    $_SESSION['usuario'] = $usuario['nome'];
    $_SESSION['tipo'] = $tipo;

    switch ($tipo) {
        case 'aluno':
            header("Location: ../pages/dashboard_aluno.html");
            break;
        case 'professor':
            header("Location: ../pages/dashboard_professor.html");
            break;
        case 'empresa':
            header("Location: ../pages/dashboard_empresa.html");
            break;
    }
    exit;
} else {
    echo "<script>alert('Usuário ou senha incorretos!'); window.location.href='../pages/login.html';</script>";
}

$stmt->close();
$conn->close();
?>
