-- phpMyAdmin SQL Dump
-- version 4.7.1
-- https://www.phpmyadmin.net/
--
-- Host: sql5.freesqldatabase.com
-- Tempo de geração: 16/10/2025 às 02:14
-- Versão do servidor: 5.5.62-0ubuntu0.14.04.1
-- Versão do PHP: 7.0.33-0ubuntu0.16.04.16

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `sql5803112`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `Aluno`
--

CREATE TABLE `Aluno` (
  `id_aluno` int(10) UNSIGNED NOT NULL,
  `id_instituicao` int(10) UNSIGNED NOT NULL,
  `id_curso` int(10) UNSIGNED DEFAULT NULL,
  `matricula` varchar(30) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Fazendo dump de dados para tabela `Aluno`
--

INSERT INTO `Aluno` (`id_aluno`, `id_instituicao`, `id_curso`, `matricula`) VALUES
(1, 1, NULL, '2025A0001'),
(18, 1, 7, '2025A0002'),
(19, 1, 7, '2025A0003'),
(20, 1, 7, '2025A0004');

-- --------------------------------------------------------

--
-- Estrutura para tabela `Carteira`
--

CREATE TABLE `Carteira` (
  `id_carteira` int(10) UNSIGNED NOT NULL,
  `owner_tipo` tinyint(3) UNSIGNED NOT NULL,
  `owner_id` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Fazendo dump de dados para tabela `Carteira`
--

INSERT INTO `Carteira` (`id_carteira`, `owner_tipo`, `owner_id`) VALUES
(1, 1, 1),
(8, 1, 18),
(9, 1, 19),
(10, 1, 20),
(2, 2, 1);

-- --------------------------------------------------------

--
-- Estrutura para tabela `Categoria_Vantagem`
--

CREATE TABLE `Categoria_Vantagem` (
  `id_categoria` int(10) UNSIGNED NOT NULL,
  `nome` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Fazendo dump de dados para tabela `Categoria_Vantagem`
--

INSERT INTO `Categoria_Vantagem` (`id_categoria`, `nome`) VALUES
(1, 'Lanches');

-- --------------------------------------------------------

--
-- Estrutura para tabela `Curso`
--

CREATE TABLE `Curso` (
  `id_curso` int(10) UNSIGNED NOT NULL,
  `nome` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `id_instituicao` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Fazendo dump de dados para tabela `Curso`
--

INSERT INTO `Curso` (`id_curso`, `nome`, `id_instituicao`) VALUES
(7, 'Sistemas de Informação', 1);

-- --------------------------------------------------------

--
-- Estrutura para tabela `Distribuicao`
--

CREATE TABLE `Distribuicao` (
  `id_distribuicao` int(10) UNSIGNED NOT NULL,
  `id_professor` int(10) UNSIGNED NOT NULL,
  `id_aluno` int(10) UNSIGNED NOT NULL,
  `quantidade` int(10) UNSIGNED NOT NULL,
  `data_dist` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Fazendo dump de dados para tabela `Distribuicao`
--

INSERT INTO `Distribuicao` (`id_distribuicao`, `id_professor`, `id_aluno`, `quantidade`, `data_dist`) VALUES
(5, 2, 1, 50, '2025-10-16 02:06:27');

-- --------------------------------------------------------

--
-- Estrutura para tabela `Empresa`
--

CREATE TABLE `Empresa` (
  `id_empresa` int(10) UNSIGNED NOT NULL,
  `cnpj` char(14) COLLATE utf8mb4_unicode_ci NOT NULL,
  `area_atuacao` varchar(75) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Fazendo dump de dados para tabela `Empresa`
--

INSERT INTO `Empresa` (`id_empresa`, `cnpj`, `area_atuacao`) VALUES
(3, '12345678000190', 'Alimentos');

-- --------------------------------------------------------

--
-- Estrutura para tabela `Instituicao`
--

CREATE TABLE `Instituicao` (
  `id_instituicao` int(10) UNSIGNED NOT NULL,
  `nome` varchar(120) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Fazendo dump de dados para tabela `Instituicao`
--

INSERT INTO `Instituicao` (`id_instituicao`, `nome`) VALUES
(1, 'PUC-MINAS'),
(2, 'PUC-MINAS');

-- --------------------------------------------------------

--
-- Estrutura para tabela `Movimentacao`
--

CREATE TABLE `Movimentacao` (
  `id_movimentacao` int(10) UNSIGNED NOT NULL,
  `id_carteira` int(10) UNSIGNED NOT NULL,
  `quantidade` int(10) UNSIGNED NOT NULL,
  `data_mov` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `tipo` enum('CREDITO','DEBITO') COLLATE utf8mb4_unicode_ci NOT NULL,
  `origem_tipo` enum('DISTRIBUICAO','RESGATE') COLLATE utf8mb4_unicode_ci NOT NULL,
  `origem_id` int(10) UNSIGNED NOT NULL,
  `id_distribuicao` int(10) UNSIGNED DEFAULT NULL,
  `id_resgate` int(10) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Fazendo dump de dados para tabela `Movimentacao`
--

INSERT INTO `Movimentacao` (`id_movimentacao`, `id_carteira`, `quantidade`, `data_mov`, `tipo`, `origem_tipo`, `origem_id`, `id_distribuicao`, `id_resgate`) VALUES
(2, 1, 50, '2025-10-16 02:06:28', 'CREDITO', 'DISTRIBUICAO', 5, 5, NULL),
(3, 2, 50, '2025-10-16 02:06:29', 'DEBITO', 'DISTRIBUICAO', 5, 5, NULL),
(4, 1, 30, '2025-10-16 02:06:30', 'DEBITO', 'RESGATE', 1, NULL, 1);

-- --------------------------------------------------------

--
-- Estrutura para tabela `Professor`
--

CREATE TABLE `Professor` (
  `id_professor` int(10) UNSIGNED NOT NULL,
  `id_instituicao` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Fazendo dump de dados para tabela `Professor`
--

INSERT INTO `Professor` (`id_professor`, `id_instituicao`) VALUES
(2, 1);

-- --------------------------------------------------------

--
-- Estrutura para tabela `Resgate`
--

CREATE TABLE `Resgate` (
  `id_resgate` int(10) UNSIGNED NOT NULL,
  `id_aluno` int(10) UNSIGNED NOT NULL,
  `id_vantagem` int(10) UNSIGNED NOT NULL,
  `codigo_conferencia` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` enum('SOLICITADO','UTILIZADO','CANCELADO') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'SOLICITADO',
  `data_resgate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `data_validacao` timestamp NULL DEFAULT NULL,
  `id_empresa_validadora` int(10) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Fazendo dump de dados para tabela `Resgate`
--

INSERT INTO `Resgate` (`id_resgate`, `id_aluno`, `id_vantagem`, `codigo_conferencia`, `status`, `data_resgate`, `data_validacao`, `id_empresa_validadora`) VALUES
(1, 1, 1, 'TEST123', 'UTILIZADO', '2025-10-16 02:06:30', '2025-10-16 02:06:31', 3);

-- --------------------------------------------------------

--
-- Estrutura para tabela `Usuario`
--

CREATE TABLE `Usuario` (
  `id_usuario` int(10) UNSIGNED NOT NULL,
  `tipo_usuario` enum('ALUNO','PROFESSOR','EMPRESA') COLLATE utf8mb4_unicode_ci NOT NULL,
  `nome` varchar(120) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(120) COLLATE utf8mb4_unicode_ci NOT NULL,
  `senha_hash` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `cpf` char(11) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `rg` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `telefone` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `rua` varchar(120) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `bairro` varchar(120) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `numero` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ativo` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Fazendo dump de dados para tabela `Usuario`
--

INSERT INTO `Usuario` (`id_usuario`, `tipo_usuario`, `nome`, `email`, `senha_hash`, `cpf`, `rg`, `telefone`, `rua`, `bairro`, `numero`, `ativo`, `created_at`) VALUES
(1, 'ALUNO', 'Ana Luiza', 'ana@exemplo.com', 'hash_qualquer', '12345678901', NULL, NULL, NULL, NULL, NULL, 1, '2025-10-16 01:44:45'),
(2, 'PROFESSOR', 'Aramuni', 'prof.aramuni@exemplo.com', 'hash_qualquer', '11122233344', NULL, NULL, NULL, NULL, NULL, 1, '2025-10-16 01:44:46'),
(3, 'EMPRESA', 'Boca do Forno', 'contato@bocadoforno.com', 'hash_qualquer', NULL, NULL, NULL, NULL, NULL, NULL, 1, '2025-10-16 01:44:47'),
(18, 'ALUNO', 'Paloma Dias', 'paloma@exemplo.com', 'hash_demo', '11111111111', NULL, NULL, NULL, NULL, NULL, 1, '2025-10-16 02:09:47'),
(19, 'ALUNO', 'João Silva', 'joao@exemplo.com', 'hash_demo', '22222222222', NULL, NULL, NULL, NULL, NULL, 1, '2025-10-16 02:09:49'),
(20, 'ALUNO', 'Mirelly Costa', 'mirelly@exemplo.com', 'hash_demo', '33333333333', NULL, NULL, NULL, NULL, NULL, 1, '2025-10-16 02:09:51');

-- --------------------------------------------------------

--
-- Estrutura para tabela `Vantagem`
--

CREATE TABLE `Vantagem` (
  `id_vantagem` int(10) UNSIGNED NOT NULL,
  `id_empresa` int(10) UNSIGNED NOT NULL,
  `id_categoria` int(10) UNSIGNED DEFAULT NULL,
  `custo_moedas` int(10) UNSIGNED NOT NULL,
  `titulo` varchar(120) COLLATE utf8mb4_unicode_ci NOT NULL,
  `descricao` text COLLATE utf8mb4_unicode_ci,
  `img_url` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ativo` tinyint(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Fazendo dump de dados para tabela `Vantagem`
--

INSERT INTO `Vantagem` (`id_vantagem`, `id_empresa`, `id_categoria`, `custo_moedas`, `titulo`, `descricao`, `img_url`, `ativo`) VALUES
(1, 3, 1, 30, 'Coxinha', 'Coxinha top', NULL, 1);

-- --------------------------------------------------------

--
-- Estrutura stand-in para view `vw_extrato_aluno`
-- (Veja abaixo para a visão atual)
--
CREATE TABLE `vw_extrato_aluno` (
`id_aluno` int(10) unsigned
,`data_mov` timestamp
,`tipo` enum('CREDITO','DEBITO')
,`quantidade` int(10) unsigned
,`origem_tipo` enum('DISTRIBUICAO','RESGATE')
,`id_distribuicao` int(10) unsigned
,`id_resgate` int(10) unsigned
,`vantagem_titulo` varchar(120)
,`status_resgate` enum('SOLICITADO','UTILIZADO','CANCELADO')
);

-- --------------------------------------------------------

--
-- Estrutura stand-in para view `vw_extrato_empresa`
-- (Veja abaixo para a visão atual)
--
CREATE TABLE `vw_extrato_empresa` (
`id_empresa` int(10) unsigned
,`id_resgate` int(10) unsigned
,`codigo_conferencia` varchar(20)
,`status` enum('SOLICITADO','UTILIZADO','CANCELADO')
,`data_resgate` timestamp
,`data_validacao` timestamp
,`titulo` varchar(120)
,`custo_moedas` int(10) unsigned
,`id_aluno` int(10) unsigned
);

-- --------------------------------------------------------

--
-- Estrutura stand-in para view `vw_extrato_professor`
-- (Veja abaixo para a visão atual)
--
CREATE TABLE `vw_extrato_professor` (
`id_professor` int(10) unsigned
,`id_distribuicao` int(10) unsigned
,`data_dist` timestamp
,`quantidade` int(10) unsigned
,`id_aluno` int(10) unsigned
);

-- --------------------------------------------------------

--
-- Estrutura stand-in para view `vw_saldo_carteira`
-- (Veja abaixo para a visão atual)
--
CREATE TABLE `vw_saldo_carteira` (
`id_carteira` int(10) unsigned
,`owner_tipo` tinyint(3) unsigned
,`owner_id` int(10) unsigned
,`saldo` decimal(32,0)
);

-- --------------------------------------------------------

--
-- Estrutura para view `vw_extrato_aluno`
--
DROP TABLE IF EXISTS `vw_extrato_aluno`;

CREATE ALGORITHM=UNDEFINED DEFINER=`sql5803112`@`%` SQL SECURITY DEFINER VIEW `vw_extrato_aluno`  AS  select `a`.`id_aluno` AS `id_aluno`,`m`.`data_mov` AS `data_mov`,`m`.`tipo` AS `tipo`,`m`.`quantidade` AS `quantidade`,`m`.`origem_tipo` AS `origem_tipo`,`m`.`id_distribuicao` AS `id_distribuicao`,`m`.`id_resgate` AS `id_resgate`,`v`.`titulo` AS `vantagem_titulo`,`r`.`status` AS `status_resgate` from ((((`Aluno` `a` join `Carteira` `ca` on(((`ca`.`owner_tipo` = 1) and (`ca`.`owner_id` = `a`.`id_aluno`)))) join `Movimentacao` `m` on((`m`.`id_carteira` = `ca`.`id_carteira`))) left join `Resgate` `r` on((`r`.`id_resgate` = `m`.`id_resgate`))) left join `Vantagem` `v` on((`v`.`id_vantagem` = `r`.`id_vantagem`))) ;

-- --------------------------------------------------------

--
-- Estrutura para view `vw_extrato_empresa`
--
DROP TABLE IF EXISTS `vw_extrato_empresa`;

CREATE ALGORITHM=UNDEFINED DEFINER=`sql5803112`@`%` SQL SECURITY DEFINER VIEW `vw_extrato_empresa`  AS  select `emp`.`id_empresa` AS `id_empresa`,`r`.`id_resgate` AS `id_resgate`,`r`.`codigo_conferencia` AS `codigo_conferencia`,`r`.`status` AS `status`,`r`.`data_resgate` AS `data_resgate`,`r`.`data_validacao` AS `data_validacao`,`v`.`titulo` AS `titulo`,`v`.`custo_moedas` AS `custo_moedas`,`r`.`id_aluno` AS `id_aluno` from ((`Empresa` `emp` join `Vantagem` `v` on((`v`.`id_empresa` = `emp`.`id_empresa`))) join `Resgate` `r` on((`r`.`id_vantagem` = `v`.`id_vantagem`))) ;

-- --------------------------------------------------------

--
-- Estrutura para view `vw_extrato_professor`
--
DROP TABLE IF EXISTS `vw_extrato_professor`;

CREATE ALGORITHM=UNDEFINED DEFINER=`sql5803112`@`%` SQL SECURITY DEFINER VIEW `vw_extrato_professor`  AS  select `p`.`id_professor` AS `id_professor`,`d`.`id_distribuicao` AS `id_distribuicao`,`d`.`data_dist` AS `data_dist`,`d`.`quantidade` AS `quantidade`,`d`.`id_aluno` AS `id_aluno` from (`Professor` `p` join `Distribuicao` `d` on((`d`.`id_professor` = `p`.`id_professor`))) ;

-- --------------------------------------------------------

--
-- Estrutura para view `vw_saldo_carteira`
--
DROP TABLE IF EXISTS `vw_saldo_carteira`;

CREATE ALGORITHM=UNDEFINED DEFINER=`sql5803112`@`%` SQL SECURITY DEFINER VIEW `vw_saldo_carteira`  AS  select `c`.`id_carteira` AS `id_carteira`,`c`.`owner_tipo` AS `owner_tipo`,`c`.`owner_id` AS `owner_id`,ifnull(sum((case when (`m`.`tipo` = 'CREDITO') then `m`.`quantidade` else -(`m`.`quantidade`) end)),0) AS `saldo` from (`Carteira` `c` left join `Movimentacao` `m` on((`m`.`id_carteira` = `c`.`id_carteira`))) group by `c`.`id_carteira`,`c`.`owner_tipo`,`c`.`owner_id` ;

--
-- Índices de tabelas apagadas
--

--
-- Índices de tabela `Aluno`
--
ALTER TABLE `Aluno`
  ADD PRIMARY KEY (`id_aluno`),
  ADD KEY `IX_Aluno_Inst` (`id_instituicao`),
  ADD KEY `IX_Aluno_Curso` (`id_curso`);

--
-- Índices de tabela `Carteira`
--
ALTER TABLE `Carteira`
  ADD PRIMARY KEY (`id_carteira`),
  ADD UNIQUE KEY `UQ_Carteira_Owner` (`owner_tipo`,`owner_id`);

--
-- Índices de tabela `Categoria_Vantagem`
--
ALTER TABLE `Categoria_Vantagem`
  ADD PRIMARY KEY (`id_categoria`);

--
-- Índices de tabela `Curso`
--
ALTER TABLE `Curso`
  ADD PRIMARY KEY (`id_curso`),
  ADD KEY `IX_Curso_Inst` (`id_instituicao`);

--
-- Índices de tabela `Distribuicao`
--
ALTER TABLE `Distribuicao`
  ADD PRIMARY KEY (`id_distribuicao`),
  ADD KEY `IX_Dist_Prof_Data` (`id_professor`,`data_dist`),
  ADD KEY `IX_Dist_Aluno_Data` (`id_aluno`,`data_dist`);

--
-- Índices de tabela `Empresa`
--
ALTER TABLE `Empresa`
  ADD PRIMARY KEY (`id_empresa`),
  ADD UNIQUE KEY `UQ_Empresa_CNPJ` (`cnpj`);

--
-- Índices de tabela `Instituicao`
--
ALTER TABLE `Instituicao`
  ADD PRIMARY KEY (`id_instituicao`);

--
-- Índices de tabela `Movimentacao`
--
ALTER TABLE `Movimentacao`
  ADD PRIMARY KEY (`id_movimentacao`),
  ADD KEY `IX_Mov_Carteira_Data` (`id_carteira`,`data_mov`),
  ADD KEY `FK_Mov_Dist` (`id_distribuicao`),
  ADD KEY `FK_Mov_Resg` (`id_resgate`);

--
-- Índices de tabela `Professor`
--
ALTER TABLE `Professor`
  ADD PRIMARY KEY (`id_professor`),
  ADD KEY `IX_Prof_Inst` (`id_instituicao`);

--
-- Índices de tabela `Resgate`
--
ALTER TABLE `Resgate`
  ADD PRIMARY KEY (`id_resgate`),
  ADD UNIQUE KEY `UQ_Resgate_Codigo` (`codigo_conferencia`),
  ADD KEY `IX_Resgate_Aluno_Data` (`id_aluno`,`data_resgate`),
  ADD KEY `IX_Resgate_Status` (`status`),
  ADD KEY `FK_Resgate_Vantagem` (`id_vantagem`),
  ADD KEY `FK_Resgate_EmpresaVal` (`id_empresa_validadora`);

--
-- Índices de tabela `Usuario`
--
ALTER TABLE `Usuario`
  ADD PRIMARY KEY (`id_usuario`),
  ADD UNIQUE KEY `UQ_Usuario_email` (`email`),
  ADD UNIQUE KEY `UQ_Usuario_cpf` (`cpf`);

--
-- Índices de tabela `Vantagem`
--
ALTER TABLE `Vantagem`
  ADD PRIMARY KEY (`id_vantagem`),
  ADD KEY `IX_Vantagem_Empresa` (`id_empresa`,`ativo`,`id_categoria`),
  ADD KEY `FK_Vantagem_Categoria` (`id_categoria`);

--
-- AUTO_INCREMENT de tabelas apagadas
--

--
-- AUTO_INCREMENT de tabela `Carteira`
--
ALTER TABLE `Carteira`
  MODIFY `id_carteira` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
--
-- AUTO_INCREMENT de tabela `Categoria_Vantagem`
--
ALTER TABLE `Categoria_Vantagem`
  MODIFY `id_categoria` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT de tabela `Curso`
--
ALTER TABLE `Curso`
  MODIFY `id_curso` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT de tabela `Distribuicao`
--
ALTER TABLE `Distribuicao`
  MODIFY `id_distribuicao` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT de tabela `Instituicao`
--
ALTER TABLE `Instituicao`
  MODIFY `id_instituicao` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT de tabela `Movimentacao`
--
ALTER TABLE `Movimentacao`
  MODIFY `id_movimentacao` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT de tabela `Resgate`
--
ALTER TABLE `Resgate`
  MODIFY `id_resgate` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT de tabela `Usuario`
--
ALTER TABLE `Usuario`
  MODIFY `id_usuario` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;
--
-- AUTO_INCREMENT de tabela `Vantagem`
--
ALTER TABLE `Vantagem`
  MODIFY `id_vantagem` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- Restrições para dumps de tabelas
--

--
-- Restrições para tabelas `Aluno`
--
ALTER TABLE `Aluno`
  ADD CONSTRAINT `FK_Aluno_Usuario` FOREIGN KEY (`id_aluno`) REFERENCES `Usuario` (`id_usuario`),
  ADD CONSTRAINT `FK_Aluno_Inst` FOREIGN KEY (`id_instituicao`) REFERENCES `Instituicao` (`id_instituicao`),
  ADD CONSTRAINT `FK_Aluno_Curso` FOREIGN KEY (`id_curso`) REFERENCES `Curso` (`id_curso`) ON DELETE SET NULL;

--
-- Restrições para tabelas `Curso`
--
ALTER TABLE `Curso`
  ADD CONSTRAINT `FK_Curso_Inst` FOREIGN KEY (`id_instituicao`) REFERENCES `Instituicao` (`id_instituicao`);

--
-- Restrições para tabelas `Distribuicao`
--
ALTER TABLE `Distribuicao`
  ADD CONSTRAINT `FK_Dist_Prof` FOREIGN KEY (`id_professor`) REFERENCES `Professor` (`id_professor`),
  ADD CONSTRAINT `FK_Dist_Aluno` FOREIGN KEY (`id_aluno`) REFERENCES `Aluno` (`id_aluno`);

--
-- Restrições para tabelas `Empresa`
--
ALTER TABLE `Empresa`
  ADD CONSTRAINT `FK_Empresa_Usuario` FOREIGN KEY (`id_empresa`) REFERENCES `Usuario` (`id_usuario`);

--
-- Restrições para tabelas `Movimentacao`
--
ALTER TABLE `Movimentacao`
  ADD CONSTRAINT `FK_Mov_Carteira` FOREIGN KEY (`id_carteira`) REFERENCES `Carteira` (`id_carteira`),
  ADD CONSTRAINT `FK_Mov_Dist` FOREIGN KEY (`id_distribuicao`) REFERENCES `Distribuicao` (`id_distribuicao`) ON DELETE SET NULL,
  ADD CONSTRAINT `FK_Mov_Resg` FOREIGN KEY (`id_resgate`) REFERENCES `Resgate` (`id_resgate`) ON DELETE SET NULL;

--
-- Restrições para tabelas `Professor`
--
ALTER TABLE `Professor`
  ADD CONSTRAINT `FK_Professor_Usuario` FOREIGN KEY (`id_professor`) REFERENCES `Usuario` (`id_usuario`),
  ADD CONSTRAINT `FK_Professor_Inst` FOREIGN KEY (`id_instituicao`) REFERENCES `Instituicao` (`id_instituicao`);

--
-- Restrições para tabelas `Resgate`
--
ALTER TABLE `Resgate`
  ADD CONSTRAINT `FK_Resgate_Aluno` FOREIGN KEY (`id_aluno`) REFERENCES `Aluno` (`id_aluno`),
  ADD CONSTRAINT `FK_Resgate_Vantagem` FOREIGN KEY (`id_vantagem`) REFERENCES `Vantagem` (`id_vantagem`),
  ADD CONSTRAINT `FK_Resgate_EmpresaVal` FOREIGN KEY (`id_empresa_validadora`) REFERENCES `Empresa` (`id_empresa`) ON DELETE SET NULL;

--
-- Restrições para tabelas `Vantagem`
--
ALTER TABLE `Vantagem`
  ADD CONSTRAINT `FK_Vantagem_Empresa` FOREIGN KEY (`id_empresa`) REFERENCES `Empresa` (`id_empresa`),
  ADD CONSTRAINT `FK_Vantagem_Categoria` FOREIGN KEY (`id_categoria`) REFERENCES `Categoria_Vantagem` (`id_categoria`) ON DELETE SET NULL;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
