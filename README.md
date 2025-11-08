# Sistema de Moeda Estudantil 🪙
O Sistema de Moeda Estudantil tem como objetivo reconhecer e valorizar o mérito dos alunos por meio de uma moeda virtual. Professores recebem um saldo de moedas a cada semestre e podem distribuí-las aos alunos como forma de incentivo por desempenho, comportamento e participação.
Os alunos podem acumular essas moedas e trocá-las por benefícios em empresas parceiras, como descontos em restaurantes, mensalidades ou materiais. O sistema permite cadastro de alunos, professores e empresas, controle de saldo e extrato de transações, além do envio de notificações e cupons por e-mail.

## Integrantes 👩‍💻
Giovanna Lima Torres Guasch

Natalie Santana Dias Abreu

Paloma Dias de Carvalho

## Professor 🧔
João Paulo Carneiro Aramuni

## Caso de Uso

<img width="947" height="686" alt="image" src="https://github.com/user-attachments/assets/e02d940f-4720-46b6-ba8c-0ca4e2b8be79" />

## Histórias de Usuário
### Aluno
HS01 - Cadastro
   - Como aluno, quero me cadastrar informando meus dados pessoais e escolher minha instituição de ensino, para poder participar do sistema.

HS02 - Receber moedas
  - Como aluno, quero receber moedas dos professores, para ser reconhecido pelo meu desempenho e participação.

HS03 - Notificação por email
  - Como aluno, quero ser notificado por email sempre que receber moedas, para acompanhar meus ganhos.

HS04 - Consultar saldo e extrato
  - Como aluno, quero visualizar meu saldo e histórico de transações, para acompanhar minhas moedas recebidas e trocas realizadas.

HS05 - Trocar moedas por vantagens
 - Como aluno, quero trocar minhas moedas por produtos e descontos de empresas parceiras, para aproveitar os benefícios do sistema.

HS06 - Receber cupom por email
  - Como aluno, quero receber por email o cupom da vantagem que resgatei, para utilizá-lo presencialmente.

HS07 - Enviar notificação
   - como aluno, quero receber notificações e enviar notifcações sobre a utilização do sistema. 

### Professor
HS08 - Cadastro prévio
  - Como professor, quero ter meus dados cadastrados pela instituição, para que eu possa utilizar o sistema.

HS09 - Saldo de moedas
  - Como professor, quero receber 1.000 moedas a cada semestre, acumulando com o saldo anterior, para poder distribuir aos alunos.

HS10 - Enviar moedas aos alunos
  - Como professor, quero enviar moedas a um aluno, informando a quantidade e o motivo, para reconhecer o mérito estudantil.

HS11 - Consultar saldo e extrato
  - Como professor, quero visualizar meu saldo e histórico de transações, para acompanhar as moedas já distribuídas.
    
HS12 - Enviar notificação
   - como professor, quero receber notificações e enviar notifcações sobre a utilização do sistema. 

### Empresa Parceira

HS13 - Cadastro da empresa
  - Como empresa parceira, quero me cadastrar no sistema, para poder oferecer vantagens aos alunos.

HS14 - Cadastro de vantagens
  - Como empresa parceira, quero cadastrar produtos, descontos ou serviços, informando custo em moedas, descrição e foto, para que os alunos possam resgatá-los.

HS15 - Receber notificação de resgate
  - Como empresa parceira, quero receber por email o cupom de resgate com código único, para validar a troca realizada pelo aluno.

HS16 - Enviar notificação
   - como empresa parceira, quero receber notificações e enviar notifcações sobre a utilização do sistema.

HS17 - Gerar relatório
   - Gostaria de gerar relatórios sobre a usabilidade do sistema. 

### Usuários 
HS18 - Login e autenticação
  - Como usuário (aluno, professor ou empresa), quero ter login e senha para acessar o sistema, garantindo segurança e personalização.

## Diagrama Entidade Relacionamento

![Diagrama_Entidade_Relacionamento_Sistema_Moedas](https://github.com/GioGuasch/Sistema-de-Moeda-Estudantil/blob/main/01.Documentacao/Diagrama_entidade_relacionamento.png)

## Diagrama de Classes

<img alt="Diagrama - Classes - Sistema de Moeda Estudantil" src="https://github.com/GioGuasch/Sistema-de-Moeda-Estudantil/blob/main/01.Documentacao/Diagrama_de_Classes.png" />

## Diagrama de Componentes

<img alt="Diagrama - Componentes - Sistema de Moeda Estudantil" src="https://github.com/GioGuasch/Sistema-de-Moeda-Estudantil/blob/main/01.Documentacao/Diagrama_de_Componentes.png" />

## Diagrama de Sequências

<img alt="Diagrama - Sequências - Sistema de Moeda Estudantil" src="" />


## 🗄️ Como executar o Banco de Dados

Para usar o banco do Sistema de Moeda Estudantil, siga os passos abaixo:

01. Abra o phpMyAdmin (ou outro cliente MySQL da sua preferência).

02. Crie um banco de dados com o nome sistema_moeda_estudantil.

03. Vá até a aba Importar.

03. Clique em Escolher arquivo e selecione o arquivo sistema_moeda_estudantil.sql que está na pasta 03. Codigos/database/.

04. Clique em Executar e aguarde a importação.

Depois disso, todas as tabelas e dados de exemplo estarão disponíveis para uso.

⚙️ Backend (PHP) → http://localhost

💻 Frontend (HTML, CSS, JS) → http://localhost

💡 Dica: o banco de dados é importado automaticamente a partir do arquivo sistema_moeda_estudantil.sql localizado em 03. Codigos/database/.


## ⚙️ Variáveis de Ambiente

As variáveis podem ser ajustadas conforme necessidade: 

Backend
DB_HOST=db
DB_PORT=3306
DB_USER=root
DB_PASSWORD=root
DB_NAME=sistema_moeda_estudantil
PORT=3001

## 🚀 Como Rodar Localmente

Para executar localmente, siga os passos abaixo:

1️⃣ Banco de Dados
Faça o passo de execução do banco de dados que está logo no começo dessa instrutução. 


2️⃣ Backend

Coloque a pasta "cd 03. Codigos/backend"  do projeto da pasta WWWW 
Abra uma aba no google e busque por localhost
E abra o projeto desejado. 

E pronto, está rodando o back!! 

3️⃣ Frontend

Vá até a pasta: 'cd 03. Codigos/frontend', coloque-a dentro da pasta WWW
Abra uma aba no google e busque por localhost
E abra o projeto desejado. 

E pronto, está rodando o front!! 


O sistema abrirá em http://localhost
