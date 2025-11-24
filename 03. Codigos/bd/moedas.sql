CREATE DATABASE Moedas;
USE Moedas;

-- TABELA DE ALUNOS --
select * from Alunos;

CREATE TABLE Alunos (
    idAluno INT AUTO_INCREMENT PRIMARY KEY,
    nomeAluno VARCHAR(150) NOT NULL,
    curso VARCHAR(150) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    rua VARCHAR(150) NOT NULL,
    cpf VARCHAR(20) NOT NULL,
    bairro VARCHAR(150) NOT NULL,
    rg VARCHAR(20) NOT NULL,
    numero INT NOT NULL,
    instituicaoEnsino VARCHAR(150) NOT NULL,
    senha VARCHAR(255) NOT NULL
);

-- TABELA DE PROFESSORES --
select * from Professores;
CREATE TABLE Professores (
    idProfessor INT AUTO_INCREMENT PRIMARY KEY,
    nomeProfessor VARCHAR(150) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    cpf VARCHAR(20) NOT NULL,
    rg VARCHAR(20) NOT NULL,
    instituicaoEnsino VARCHAR(150) NOT NULL,
    rua VARCHAR(150) NOT NULL,
    bairro VARCHAR(150) NOT NULL,
    numero INT NOT NULL,
    senha VARCHAR(255) NOT NULL
);

-- TABELA DE EMPRESAS PARCEIRAS --
select * from EmpresasParceiras;
CREATE TABLE EmpresasParceiras (
    idEmpresa INT AUTO_INCREMENT PRIMARY KEY,
    nomeEmpresa VARCHAR(150) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    cnpj VARCHAR(20) NOT NULL,
    telefone VARCHAR(20) NOT NULL,
    areaAtuacao VARCHAR(150) NOT NULL,
    rua VARCHAR(150) NOT NULL,
    bairro VARCHAR(150) NOT NULL,
    numero INT NOT NULL,
    senha VARCHAR(255) NOT NULL
);

-- TABELA VANTAGENS --
select * from Vantagens;
CREATE TABLE Vantagens(
     id INT AUTO_INCREMENT PRIMARY KEY,
     nome VARCHAR(150) NOT NULL,
     valor DOUBLE NOT NULL,
     status VARCHAR(50) NOT NULL,
     img varchar(150) NOT NULL
);

-- TABELA DISTRIBUIÇÃO DE MOEDAS --
select * from Moedas;
CREATE TABLE Moedas(
	id INT AUTO_INCREMENT PRIMARY KEY,
    idAluno INT NOT NULL, 
	nomeSobrenomeAluno VARCHAR(150) NOT NULL,
	data DATE NOT NULL,
	motivo VARCHAR(200) NOT NULL,
    quantidadeMoedas INT NOT NULL,
    FOREIGN KEY (idAluno) REFERENCES Alunos(id)
);

INSERT INTO Moedas(idAluno, nomeSobrenomeAluno, data, motivo, quantidadeMoedas)
values (2, '2025-11-23', 'Melhor nota', 20);

-- TABELA CARTEIRA ALUNO -- 
select * from CarteiraAluno;
CREATE TABLE CarteiraAluno (
    idCarteira INT AUTO_INCREMENT PRIMARY KEY,
    idAluno INT NOT NULL,
    moedasTotais INT DEFAULT 0,
    FOREIGN KEY (idAluno) REFERENCES Alunos(id)
);

INSERT INTO CarteiraAluno(idCarteira,idAluno,moedasTotais) 
values (1, 1, 20);


-- TABELA VANTAGEM RESGATADA PELO ALUNO --
SELECT * FROM VantagemResgatadaAluno;
CREATE TABLE VantagemResgatadaAluno(
	id INT AUTO_INCREMENT PRIMARY KEY,
	idAluno int NOT NULL,
    moedasUsadas int NOT NULL,
	data DATE NOT NULL
);


-- EXTRATO PROFESSOR --
select * from ExtratoProfessor;
CREATE TABLE ExtratoProfessor(
	id INT AUTO_INCREMENT PRIMARY KEY,
    idProfessor int not null,
    idMoedas INT not null,
    idAluno int not null,
    FOREIGN KEY (idMoedas) REFERENCES Moedas(id),
    FOREIGN KEY (idAluno) REFERENCES Alunos(id)
 );
 
