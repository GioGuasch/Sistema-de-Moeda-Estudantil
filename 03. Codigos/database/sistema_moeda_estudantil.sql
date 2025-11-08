CREATE DATABASE MOEDAS;
USE MOEDAS;

 -- TABELA ALUNO --
CREATE TABLE aluno (
  id int(10) primary key auto_increment not null,
  nome varchar(150) not null,
  email varchar(150) not null,
  cpf varchar(15) not null,
  rg varchar(15) not null,
  idInstituicao int(10) not null,
  curso varchar(150) not null,
  rua varchar(150) not null,
  bairro varchar(150) not null,
  numero varchar(150) not null,
  senha varchar(150) not null,
  confirmarSenha varchar(150) not null,
  FOREIGN KEY (idInstituicao) REFERENCES instituicao(id)
);

 -- TABELA PROFESSOR --
CREATE TABLE professor (
  id int(10) primary key auto_increment not null,
  nome varchar(150) not null,
  email varchar(150) not null,
  cpf varchar(15) not null,
  rg varchar(15) not null,
  idInstituicao int(10) not null,
  rua varchar(150) not null,
  bairro varchar(150) not null,
  numero varchar(150) not null,
  senha varchar(150) not null,
  confirmarSenha varchar(150) not null,
  FOREIGN KEY (idInstituicao) REFERENCES instituicao(id)
);

 -- TABELA EMPRESA --
CREATE TABLE empresa (
  id int(10) primary key auto_increment not null,
  nome varchar(150) not null,
  email varchar(150) not null,
  cnpj varchar(15) not null,
  telefone varchar(15) not null,
  areaAtuacao varchar(150) not null,
  rua varchar(150) not null,
  bairro varchar(150) not null,
  numero varchar(150) not null,
  senha varchar(150) not null,
  confirmarSenha varchar(150) not null
);

-- TABELA CARTEIRA ALUNO E PROFESSOR --
CREATE TABLE carteira (
  id int(10) primary key auto_increment not null,
  saldo double not null, 
  instituicao varchar(150) not null
  );

-- TABELA DE HISTÓRICO RESGASTES VANTAGENS ALUNO --
CREATE TABLE resgates (
  id int(10) primary key auto_increment not null,
  idVantagem int(10) not null,
  status varchar(150) not null, -- resgatado, confirmado, não utilizado.
  FOREIGN KEY (idVantagem) REFERENCES vantagem(id)
  );
  
  -- TABELA DE EXTRATO RESGASTES VANTAGENS ALUNO --
CREATE TABLE extrato (
  id int(10) primary key auto_increment not null,
  idVantagem int(10) not null,
  status varchar(150) not null, -- Resgatado
  data Date not null,
  tipo varchar(150) not null, -- recebimento, retirada, envio
  idEmpresa int(10) not null,
  motivo varchar(150) not null, 
  valor double not null,
  img varchar(255) not null,
  FOREIGN KEY (idVantagem) REFERENCES vantagem(id),
  FOREIGN KEY (idEmpresa) REFERENCES empresa(id)
);

-- TABELA DISTRIBUICAO MOEDINHAS PROFESSOR --
-- TAMBEM SERÁ USADA PARA A PÁGINA DE EXTRATO DO PROFESSOR --
CREATE TABLE distribuicao (
  id int(10) primary key auto_increment not null,
  idAluno int(10) not null,
  data Date not null,
  motivo varchar(150) not null, 
  valor double not null,
  FOREIGN KEY (idAluno) REFERENCES aluno(id)
);

-- TABELA CADASTRO VANTAGEM EMPRESA --
CREATE TABLE vantagem (
  id int(10) primary key auto_increment not null,
  nome varchar(150) not null, 
  valor double not null,
  status varchar(150) not null, -- inativo, ativo
  img varchar(255) not null  -- guardar o caminho da img
);

-- TABELA RESGATES NA EMPRESA - HISTÓRICO --
CREATE TABLE resgates (
  id int(10) primary key auto_increment not null,
  idAluno int(10) not null,
  data Date not null,
  idVantagem  int(10) not null,
  valor double not null,
  img varchar(255) not null, -- guardar o caminho da img
  FOREIGN KEY (idAluno) REFERENCES aluno(id),
  FOREIGN KEY (idVantagem) REFERENCES vantagem(id)
);




