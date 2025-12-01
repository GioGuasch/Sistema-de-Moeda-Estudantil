<?php
include("phpqrcode/qrlib.php");

// Conteúdo dentro do QR
$codigo = "Teste do QR Code - Funcionando!";

QRcode::png($codigo);
