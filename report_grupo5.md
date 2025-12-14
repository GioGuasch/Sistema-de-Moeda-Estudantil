# 📘 Relatório de Análise Crítica do Projeto 👨‍💻

## 1. Informações do grupo
- **🎓 Curso:** Engenharia de Software
- **📘 Disciplina:** Laboratório de Desenvolvimento de Software
- **🗓 Período:** 4° Período
- **👨‍🏫 Professor(a):** Prof. Dr. João Paulo Carneiro Aramuni
- **👥 Membros do Grupo:** Giovanna Guasch, Natalie Abreu e Paloma Carvalho
---

## 📌 2. Identificação do Projeto
- **Nome do projeto:** Sistema de Moeda Estudantil
- **Integrantes do outro grupo:** Cauê Afonso Moraes, Thomas Ramos de Oliveira, Vinicius Gomes Rodrigues e Vitor Veiga Silva
- **Link do repositório:** (https://github.com/vitorveigas/Sistema-de-moeda-estudantil)
- **Pull requests submetidos pelo seu grupo:**

## 🧱 3. Arquitetura e Tecnologias Utilizadas

O sistema adota o padrão **MVC** com camadas adicionais para garantir organização e manutenibilidade.

### 📦 Camadas da Aplicação

#### **Controller**

Recebe requisições HTTP, mapeia DTOs e aciona serviços.


#### **Service**

Onde mora a lógica de negócio.

#### **Repository**

Interfaces JPA responsáveis pela comunicação com o banco.

#### **Model (Entidades)**

Mapa das tabelas do banco, representando o domínio da aplicação.

---

## 🔗 Integração com Banco de Dados

* Banco relacional PostgreSQL.
* Mapeamento usando **JPA**.
* Persistência via repositórios com CRUD completo.

---

## ✨ Benefícios da Arquitetura

* **Manutenibilidade** elevada.
* **Escalabilidade** por módulos isolados.
* **Reutilização** de serviços e DTOs.
* **Segurança** ao proteger entidades do domínio.

---

## 🧰 Ferramentas Utilizadas

* **VSCode** — Desenvolvimento.
* **Draw.io** — Criação de diagramas.
* **Astah UML** — Modelagem UML.
* **GitHub** — Controle de versão e colaboração.


## 🔎 4. Análise de Qualidade do Código e Testes

### 4.1. Design e Princípios SOLID
Coesão e Acoplamento:
Foi observada uma separação básica em camadas no backend (Controller/Service/Repository), porém ainda existem pontos de baixa coesão e acoplamento elevado, principalmente no frontend. O arquivo login.html concentra marcação (HTML), estilização (CSS) e regras de negócio/integração (JavaScript com fetch, localStorage, controle de sessão e navegação), caracterizando baixa coesão por acumular responsabilidades distintas no mesmo artefato. Além disso, há acoplamento direto ao ambiente local via API_BASE = 'http://localhost:8080', o que dificulta portabilidade e deploy em ambientes diferentes.

Princípios SOLID Violados (Se aplicável):

SRP (Single Responsibility Principle): no frontend, login.html mistura responsabilidades de interface, comunicação com API, persistência de token e redirecionamento de navegação. No backend, alguns services possuem muita lógica repetida para “mesclar” campos (atualização via builder() com vários ternários), o que indica falta de centralização e reutilização, tornando a manutenção mais custosa.

DIP (Dependency Inversion Principle): no frontend, as funções dependem diretamente de detalhes de implementação (fetch, endpoints e localStorage) em vez de abstrações (ex.: um módulo AuthApi ou StorageService).

DRY (boa prática relacionada): há repetição significativa de padrão de atualização em múltiplos services (Aluno/Empresa/Professor) e padrões semelhantes de tratamento de resposta em fluxos de autenticação/cadastro.

Code Smells Identificados:

Duplicated Code: repetição de lógica de atualização de entidades (padrão campo != null ? campoNovo : campoAtual) em AlunoServices, EmpresaServices e ProfessorServices.

Magic Values/Hardcoded: uso de URL fixa de API no frontend e uso de valores fixos no domínio, como o professor “do sistema” com ID estático.

Exceções genéricas: uso de catch (Throwable t) em AlunoServices.buscarAlunoPorMatricula, o que pode mascarar erros e dificultar diagnóstico.

Evidência/Exemplo:

Frontend: login.html define const API_BASE = 'http://localhost:8080' e centraliza autenticação, armazenamento de token e redirecionamento no mesmo arquivo.

Backend: VantagemService utiliza um ID fixo para localizar o “Professor do sistema” (findById(1L)), acoplando uma regra de negócio a um valor rígido.

Backend: AlunoServices.buscarAlunoPorMatricula contém catch (Throwable t), ampliando demais o escopo de exceções capturadas.

### 4.2. Testabilidade e Cobertura

O repositório não apresenta nenhum teste implementado.

### 4.3. Segurança e Tratamento de Erros (OWASP Top 10)

Validação de Entrada (Input Validation):
No frontend, existem validações básicas de usabilidade (campos required e type="email"), mas elas não substituem validações no backend. No backend, os endpoints recebem entidades diretamente (@RequestBody Aluno/Empresa), sem evidência de validação robusta via DTOs com Bean Validation (@Valid, @NotBlank, @Email, etc.). Isso pode permitir entradas inconsistentes e regras distribuídas.

Há também um risco de XSS no frontend, pois a função showMessage insere conteúdo utilizando innerHTML. Caso mensagens retornadas pela API sejam manipuláveis ou não sanitizadas, pode haver injeção de scripts.

Tratamento de Credenciais:
Foi identificado um ponto positivo: o sistema utiliza PasswordEncoder para armazenar senha com hash e validar credenciais (matches()), reduzindo riscos de armazenamento em texto puro. Entretanto, há um risco relevante no JWT: o JwtService define um segredo padrão por fallback. Se o ambiente não sobrescrever jwt.secret, o segredo pode se tornar previsível, comprometendo a segurança dos tokens. Além disso, o token é armazenado em localStorage, o que aumenta o impacto caso haja XSS (roubo de token).

Tratamento de Exceções e Vazamento de Informações:
Há ocorrências de printStackTrace() e logs com informações internas em controllers (por exemplo, em endpoints de perfil e troca), o que não é recomendado em produção. A ausência de um tratamento centralizado (ex.: @ControllerAdvice) também gera inconsistência de respostas e dificulta padronização de erros.

Broken Access Control / IDOR (risco alto):
Foram observados pontos com risco de falhas de autorização. Alguns endpoints recebem IDs no corpo/URL e realizam ações sensíveis sem garantir que o usuário autenticado tem permissão para operar sobre aqueles recursos. Isso pode caracterizar Broken Access Control (OWASP A01) e IDOR, por exemplo:

envio de moedas em /transacoes/enviar recebendo professorId no body sem validação de vínculo com o token;

criação de vantagem com empresaId no body sem validar se o usuário autenticado pertence à empresa;

consultas por ID de transações/saldos sem checagens claras de autorização por perfil.

Evidência/Exemplo:

Frontend: login.html usa innerHTML para exibir mensagens em showMessage, com possibilidade de XSS caso conteúdo não seja controlado.

Backend: JwtService possui segredo padrão via fallback em @Value, podendo expor o sistema caso não haja configuração segura no ambiente.

Backend: endpoint /transacoes/enviar depende de IDs enviados na requisição e não apresenta validação de autorização baseada no token, indicando risco de Broken Access Control.

## 🚀 5. Sugestões de Melhorias

1. Padronização do Código e Boas Práticas
Sugere-se a adoção de padrões formais de versionamento e commits, como o Conventional Commits, além da utilização de ferramentas de apoio à qualidade do código, como Checkstyle, Spotless, SonarLint ou SonarQube, a fim de garantir consistência, reduzir code smells e facilitar a manutenção do código.

2. Refatoração para Melhor Aderência ao SOLID
É recomendável refatorar pontos do código que concentram múltiplas responsabilidades, especialmente no frontend (arquivos HTML com lógica de negócio e integração) e nos services do backend que possuem lógica duplicada. A introdução de DTOs, mappers e serviços utilitários pode melhorar a coesão, reduzir duplicações e aumentar a clareza do código.

3. Testes Automatizados e Cobertura
Implementar testes unitários na camada de Service e testes de integração utilizando Spring Boot Test é uma melhoria prioritária. Recomenda-se buscar ao menos 80% de cobertura de código nas funcionalidades principais, como autenticação, transferência de moedas e troca de vantagens, utilizando ferramentas como JaCoCo para medição.

4. Melhorias de Segurança
Recomenda-se fortalecer a segurança do sistema com a utilização de Spring Validation (@Valid, @NotBlank, @Email, etc.) em DTOs, evitando o uso direto de entidades nos controllers. Também é indicada a criação de um tratamento centralizado de exceções com @ControllerAdvice, a remoção de printStackTrace() e logs sensíveis, além da revisão periódica de dependências vulneráveis utilizando ferramentas como OWASP Dependency-Check.

5. Controle de Acesso e Autorização
É altamente recomendável reforçar o controle de acesso, garantindo que ações sensíveis sejam executadas apenas por usuários autorizados. Isso inclui validar se o usuário autenticado (via JWT) possui permissão para operar sobre recursos identificados por ID, mitigando riscos de Broken Access Control (IDOR). A adoção de Spring Security com roles e permissões tornaria o sistema mais robusto.

6. Automação e CI/CD
Como melhoria final, sugere-se a criação de uma pipeline de CI/CD com GitHub Actions, automatizando a execução de testes, análise estática de código, verificação de segurança das dependências e build da aplicação a cada Pull Request. Isso aumenta a confiabilidade do projeto, reduz falhas em produção e incentiva boas práticas de engenharia de software.

## 🔧 6. Refatorações Propostas (3 partes do código)

🔧 Refatoração 1 – Extração de Método (Extract Method)

Arquivo e localização:
src/main/resources/static/login.html — script JavaScript responsável pelo submit de Login e Cadastro

Tipo de refatoração aplicada:
Extract Method

Link do Pull Request:
(inserir link do PR aqui)

🔴 Código Antes

document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    showLoading(true);

    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    try {
        const response = await fetch(`${API_BASE}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (response.ok) {
            currentToken = data.token;
            currentUserType = data.userType;
            localStorage.setItem('token', currentToken);
            localStorage.setItem('userType', currentUserType);
            console.log('Token salvo:', currentToken);
            console.log('UserType salvo:', currentUserType);
            showMessage('Login realizado com sucesso!');
            setTimeout(() => {
                window.location.href = redirectByUserType(currentUserType);
            }, 800);
        } else {
            showMessage(data.error || 'Erro no login', 'error');
        }
    } catch (error) {
        showMessage('Erro de conexão', 'error');
    } finally {
        showLoading(false);
    }
});

🟢 Código Depois

async function postJson(url, payload) {
    const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });

    const data = await response.json().catch(() => ({}));
    return { response, data };
}

function handleAuthSuccess(data, successMessage) {
    currentToken = data.token;
    currentUserType = data.userType;

    localStorage.setItem('token', currentToken);
    localStorage.setItem('userType', currentUserType);

    showMessage(successMessage);

    setTimeout(() => {
        window.location.href = redirectByUserType(currentUserType);
    }, 800);
}

document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    showLoading(true);

    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    try {
        const { response, data } = await postJson(
            `${API_BASE}/auth/login`,
            { email, password }
        );

        if (response.ok) {
            handleAuthSuccess(data, 'Login realizado com sucesso!');
        } else {
            showMessage(data.error || 'Erro no login', 'error');
        }
    } catch {
        showMessage('Erro de conexão', 'error');
    } finally {
        showLoading(false);
    }
});

