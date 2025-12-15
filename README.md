# Sistema de Moeda Estudantil
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

01. Fluxo de aluno resgata vantagem:
<img alt="Fluxo Aluno Resgata Vantagem" src="https://github.com/GioGuasch/Sistema-de-Moeda-Estudantil/blob/main/01.Documentacao/Fluxo%20-%20Aluno%20Resgata%20Vantagem%20(HS05).png" />

02. Fluxo empresa cadastra vantagem:
<img alt="Fluxo Empresa Cadastra Vantagem" src="https://github.com/GioGuasch/Sistema-de-Moeda-Estudantil/blob/main/01.Documentacao/Fluxo%20-%20Empresa%20Cadastra%20Vantagem%20(HS14).png" />
 
03. Fluxo do professor distribuidos moedas: 
<img alt="Fluxo Login de Usuario" src="https://github.com/GioGuasch/Sistema-de-Moeda-Estudantil/blob/main/01.Documentacao/Fluxo%20-%20Professor%20Distribui%20Moedas%20(HS10).png" />

04. Fluxo de login de usuários:
<img alt="Fluxo Professor Distribui Moeda" src="https://github.com/GioGuasch/Sistema-de-Moeda-Estudantil/blob/main/01.Documentacao/Fluxo%20de%20Login%20de%20Usuário%20(HS18).png" />

## Diagrama de Comunicação
<img alt="Diagrama - Classes - Sistema de Moeda Estudantil" src="https://github.com/GioGuasch/Sistema-de-Moeda-Estudantil/blob/main/01.Documentacao/ComunicacaoEnvioCupons.png" />

## Diagrama de Implementação
<img alt="Diagrama - Classes - Sistema de Moeda Estudantil" src="https://github.com/GioGuasch/Sistema-de-Moeda-Estudantil/blob/main/01.Documentacao/Implementação.png" />


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


## Como utilizar o sistema?

1️⃣ Tipo de usuário: PROFESSOR 
Nesse caso, o professor terá acesso a página de login e de cadastro, caso seja um novo professor. Após isso, a primeira página é a de inicio, onde ele consegue ver a quantidade de moedas disponiveis, um menu e um icone de perfil. 
Este icone de perfil leva a página de edição de informações cadastradas, caso necessário. 
No menu, temos a opção de voltar ao inicio, enviar moedas aos alunos, onde pode ser cadastrado novos envios, e por fim, a tela de visualizar o extrato onde deve ser visto tudo que foi enviado ao alunos e gerar um relatório dessas informações. 

2️⃣ Tipo de usuário: ALUNO 
Nesse caso, o aluno terá acesso a página de login e de cadastro, caso seja um novo aluno. Após isso, a primeira página é a de inicio, onde ele consegue ver a quantidade de moedas disponiveis, um menu e um icone de perfil. 
Este icone de perfil leva a página de edição de informações cadastradas, caso necessário. 
No menu, temos a opção de voltar ao inicio, resgatar novas vantagens, onde pode ser resgatado qualquer coisa que seja menor ou igual a quantidade de moedas disponiveis, e por fim, a tela de visualizar o extrato onde deve ser visto tudo que foi resgatado. 

3️⃣ Tipo de usuário: EMPRESA PARCEIRA 
Nesse caso, a empresa parceira terá acesso a página de login e de cadastro, caso seja uma nova empresa. Após isso, a primeira página é a de inicio, onde ela consegue ver as instituições onde ela faz parte, um menu e um icone de perfil. 
Este icone de perfil leva a página de edição de informações cadastradas, caso necessário. 
No menu, temos a opção de voltar ao inicio, cadastrar novas vantagens que ficará disponivel aos alunos, e por fim, a tela de visualizar o extrato onde deve ser visto tudo que foi resgatado na sua empresa e gerar um relatório dessas informações. 

## Apresentação do sistema:
https://www.youtube.com/watch?v=TrXJlPXeV6I

## Link do vercel: 

## Configuração de envio de e-mails:

1️⃣ Envio de e-mail ao confirmar um resgate de vantagem:
<img alt="Fluxo de implementção do QRCode" src="https://github.com/GioGuasch/Sistema-de-Moeda-Estudantil/blob/main/01.Documentacao/confirmacao-resgate-aluno.jpg" />

2️⃣ Envio de e-mail quando o professor envia uma moedas:
<img alt="Fluxo de implementção do QRCode" src="https://github.com/GioGuasch/Sistema-de-Moeda-Estudantil/blob/main/01.Documentacao/confirmacao-envio-moedas-prof.jpg" />

3️⃣ Quando o aluno recebe as moedas: 
<img alt="Fluxo de implementção do QRCode" src="https://github.com/GioGuasch/Sistema-de-Moeda-Estudantil/blob/main/01.Documentacao/confirmacao-recebeu-moedas-aluno.jpg" />

