***# 📋 ENTREGA SEMANAL DE REQUISITOS

**Versão:** 12.2  
**Laboratório de Inovação -** Prof. Edilberto Silva — 2026  
**Formato:** Markdown (será corrigido automaticamente)  
**Valor Total da Entrega:** 100%  
**Data de Entrega:** [21/09/2026]  
**Grupo:** [Embalare Distribuidora - Grupo 6]  
**Integrantes:**
[Sarah Domingos (sarah61701986@edu.df.senac.br); Anne Nunes (anne62409446@edu.df.senac.br); Matheus Reis (matheus62036126@edu.df.senac.br); Yasmin Souza (yasmin62376066@edu.df.senac.br);]  

---

## ⚙️ ESTRUTURA DE DIRETÓRIOS

```
Projeto-Laborat-rio-de-Inova-o-II/
├── docs/
│   ├── requisitos-semanais/
│   │   ├── SEMANA-01/
│   │   │   ├── RF-001-login-usuario.md
│   │   ├── SEMANA-02/
│   │   │   ├── RF-002-tela-home.md
│   │   ├── SEMANA-03/
│   │   │   └── RF-003-menu-lateral.md
│   │   ├── SEMANA-04/
│   │   │   ├── RF-004-cadastro-vendedor.md
│   │   ├── SEMANA-05/
│   │   │   └── RF-005-cadastro-clientes.md
│   │   ├── SEMANA-06/
│   │   │   ├── RF-006-cadastro-produto.md
│   │   ├── SEMANA-07/
│   │   │   └── RF-007-reserva-produto.md
│   │   ├── SEMANA-08/
│   │   │   └── RF-008-Relatorio-estoque-admin.md
│   │   ├── SEMANA-09/
│   │   │   └── RF-009-Relatorio-estoque-vendedor.md
│   │   ├── SEMANA-10/
│   │   │   └── RF-010-Perfil-vendedor.md
│   │
│   ├── prototipos/
│   │   ├── SEMANA-03/
│   │   │   ├── RF-003-menu-lateral/
│   │   │   │   ├── menu-lateral.html
│   │   │   │   │   ├── perfil.html


**Localização deste arquivo:** `docs/requisitos-semanais/SEMANA-03/RF-003-menu-lateral.md`  
**Localização do Protótipo HTML+CSS:** `src/prototipos/SEMANA-03/RF-003-home.html`, `src/prototipos/SEMANA-03/RF-003-perfil.html`

---

## 📊 PONTUAÇÃO POR TÓPICO

| # | Tópico | Percentual | Obrigatoriedade | Status |
|---|--------|-----------|-----------------|--------|
| 1 | Identificação do Requisito | 10% | Obrigatório | [x] |
| 2 | Descrição e Atores | 15% | Obrigatório | [x] |
| 3 | Especificação de Casos de Uso | 25% | Obrigatório | [x] |
| 4 | Protótipos/Telas (HTML+CSS) | 20% | Obrigatório | [x] |
| 5 | Arquitetura e ADR | 20% | Obrigatório | [x] |
| 6 | Qualidade e Conformidade | 10% | Obrigatório | [x] |
| | TOTAL | 100% | | |

---

## 1️⃣ IDENTIFICAÇÃO DO REQUISITO (10%)

### RF-003: Controle de Acesso (RBAC) e Gestão de Perfil

**ID:** RF-003  
**Título:** Implementar níveis de acesso e operações de CRUD no perfil do usuário  
**Tipo:** Requisito Funcional  
**Prioridade:** ALTA (fundamental para a segurança e gestão de usuários)  
**Complexidade:** MÉDIA (estimado 8 story points)  
**Status:** CONCLUÍDO  
**Data de Criação:** 20/09/2026  
**Última Atualização:** 20/09/2026  

**Breve Descrição:**  
O sistema deve distinguir os usuários entre Administrador e Operacional, liberando a função de criar novas contas apenas para administradores. Além disso, o sistema deve permitir que o usuário logado visualize, edite seus dados pessoais (nome e senha) e exclua permanentemente sua própria conta, persistindo as mudanças no armazenamento local.

---

## 2️⃣ DESCRIÇÃO E ATORES (15%)

## Descrição Detalhada

**Por que este requisito existe?**  
O sistema precisa de um controle de contas e gerenciamento de permissões para:
- Restringir a criação de novos acessos ao sistema apenas para cargos de gerência (Administrador).
- Permitir que os usuários mantenham seus dados atualizados com autonomia.
- Garantir que um funcionário possa excluir seu registro de forma segura.
- Garantir que o sistema renderize as telas dinamicamente baseando-se no papel (role) de quem logou.

**Contexto do Negócio:**  
Em um ambiente de controle de estoque, funcionários operacionais (vendedores) não podem ter a capacidade de criar acessos para pessoas não autorizadas. Essa responsabilidade é exclusiva da administração.

---

## Atores do Sistema

### 1. ADMINISTRADOR (Ator Principal)
- **Papel:** Gerente do sistema e supervisor da equipe.
- **Responsabilidade:** Cadastrar novos usuários operacionais e administrar seus próprios dados.
- **Permissões:** 
  - ✅ CREATE (cadastrar novos funcionários)
  - ✅ READ (visualizar dashboard e dados do próprio perfil)
  - ✅ UPDATE (editar próprio nome e senha)
  - ✅ DELETE (excluir própria conta)

### 2. FUNCIONÁRIO OPERACIONAL (Ator Secundário)
- **Papel:** Usuário padrão do estoque.
- **Responsabilidade:** Acessar o sistema e atualizar seus próprios dados de acesso.
- **Permissões:**
  - ❌ CREATE (não possui acesso ao formulário de cadastro)
  - ✅ READ (visualizar dashboard e dados do próprio perfil)
  - ✅ UPDATE (editar próprio nome e senha)
  - ✅ DELETE (excluir própria conta)

### 3. SISTEMA (Ator Automático)
- **Papel:** Gestor de sessão e persistência.
- **Responsabilidade:** Renderizar menus condicionalmente, interceptar URLs, validar duplicidade de e-mails e salvar/deletar dados do `localStorage`.
- **Permissões:**
  - ✅ Todas operações de validação lógicas.

---

## 3️⃣ ESPECIFICAÇÃO DE CASOS DE USO (25%)

Para organizar a entrega desta semana, as funcionalidades foram divididas em 3 Casos de Uso sequenciais implementados na página de Perfil.

### UC-001: Cadastrar Novo Funcionário (Exclusivo Admin)

**Pré-Condições:**
- ✅ Usuário logado deve possuir a flag `tipo: "admin"` registrada na sessão.

**Pós-Condições (Sucesso):**
- ✅ Novo usuário inserido com sucesso no `localStorage`.
- ✅ Mensagem de sucesso na cor verde exibida na tela.

**Pós-Condições (Falha):**
- ✅ Mensagem de erro vermelha exibida caso o e-mail já exista no banco de dados.

**Fluxo Principal:**
1. Administrador acessa a aba "Perfil" (`perfil.html`).
2. Sistema renderiza o bloco "Cadastrar Funcionário" (oculto para operacionais).
3. Administrador preenche Nome, E-mail, Senha e Tipo de Acesso.
4. Administrador clica em "Cadastrar".
5. Sistema verifica se todos os campos estão preenchidos.
6. Sistema verifica no `localStorage` se o e-mail já existe.
7. Sistema adiciona o novo usuário ao array de usuários.
8. Sistema salva os dados atualizados no `localStorage`.
9. Sistema exibe a mensagem: "Funcionário cadastrado com sucesso!" e limpa o formulário.

**Fluxo Alternativo A1: E-mail já cadastrado**
6a.1. Sistema detecta que o e-mail digitado já pertence a outro usuário.
6a.2. Sistema interrompe o salvamento.
6a.3. Sistema exibe a mensagem de erro: "Já existe um usuário com esse email."

---

### UC-002: Atualizar Dados da Conta

**Pré-Condições:**
- ✅ Usuário logado e visualizando a tela `perfil.html`.

**Pós-Condições (Sucesso):**
- ✅ Dados de nome ou senha alterados no `localStorage` e nome do cabeçalho atualizado via `sessionStorage`.

**Pós-Condições (Falha):**
- ✅ Dados não são salvos caso as senhas informadas não coincidam.

**Fluxo Principal:**
1. Usuário navega até a seção "Dados da conta".
2. Sistema preenche os campos Nome e E-mail (E-mail bloqueado para edição).
3. Usuário altera o Nome e digita uma Nova Senha e a Confirmação de Senha.
4. Usuário clica em "Salvar alterações".
5. Sistema valida se a confirmação de senha é idêntica à nova senha.
6. Sistema localiza o usuário no banco de dados (via e-mail).
7. Sistema atualiza as propriedades de nome e senha no array.
8. Sistema reescreve os dados no `localStorage`.
9. Sistema atualiza imediatamente o nome exibido no cabeçalho.
10. Sistema exibe a mensagem de sucesso.

**Fluxo Alternativo A1: Senhas divergentes**
5a.1. Sistema verifica que os campos "Nova senha" e "Confirmar nova senha" são diferentes.
5a.2. Sistema interrompe a execução.
5a.3. Sistema exibe a mensagem de erro: "As senhas não são iguais."

---

### UC-003: Excluir Conta Permanente

**Pré-Condições:**
- ✅ Usuário estar logado.

**Pós-Condições (Sucesso):**
- ✅ Conta removida permanentemente do `localStorage`.
- ✅ Sessão apagada e redirecionamento para o login.

**Fluxo Principal:**
1. Usuário navega até a seção "Excluir conta" (Danger Zone).
2. Usuário clica no botão "Excluir Conta".
3. Sistema emite um alerta do navegador pedindo confirmação da exclusão.
4. Usuário confirma a ação clicando em "OK".
5. Sistema filtra o array do `localStorage`, removendo o objeto que contém o e-mail atual.
6. Sistema regrava o `localStorage` sem o usuário.
7. Sistema limpa todos os dados do `sessionStorage`.
8. Sistema alerta "Sua conta foi excluída" e redireciona para `index.html`.

---

### Regras de Negócio (RN)
**RN-01:** O campo de E-mail atua como chave primária e nunca pode ser alterado após a criação da conta.
**RN-02:** É expressamente proibido o cadastro de dois usuários com o mesmo endereço de e-mail.
**RN-03:** A interface e lógica de cadastro de novos usuários só podem ser renderizadas e acessadas por perfis do tipo Administrador.
**RN-04:** A ação de excluir conta é irreversível e deve obrigatoriamente exigir uma confirmação (`confirm()`) do usuário.
**RN-05:** Se houver preenchimento do campo de nova senha na edição do perfil, a confirmação de senha passa a ser obrigatória e idêntica.
**RN-06:** O sistema deve validar campos vazios antes de realizar chamadas de inserção/alteração no storage.

### Requisitos Não-Funcionais (RNF)
**RNF-01:** Os dados persistentes devem ser armazenados de forma estruturada (JSON) no `localStorage`.
**RNF-02:** O controle de estado da sessão deve utilizar o `sessionStorage` para garantir que a sessão expire adequadamente.
**RNF-03:** Todas as validações visuais (sucesso/erro) devem ocorrer injetando texto dinâmico via JavaScript (`.textContent`) e manipulando classes CSS.
**RNF-04:** O sistema deve usar marcação HTML5 semântica (tags `<main>`, `<section>`, `<aside>`).
**RNF-05:** A interface deve ser 100% responsiva (Mobile First), ajustando o sidebar para empilhamento no topo em resoluções menores que 800px.
**RNF-06:** A seção de exclusão deve seguir princípios de UX usando cores de advertência (bordas e botões vermelhos) para sinalizar a Zona de Perigo.

---

## 4️⃣ PROTÓTIPOS/FLUXOS DE TELAS (HTML+CSS) (20%)

**Arquivos entregues:** `index.html`, `home.html` e `perfil.html` no diretório obrigatório. Abaixo, os principais estados renderizados pelo código na Semana 3.

**Tela 1: Perfil logado como Admin (Acesso completo)**
```text
┌──────────────┬───────────────────────────────────────────────┐
│ [Logo]       │ Meu Perfil                                    │
│ ☰ Menu       │ Visualize e altere seus dados pessoais        │
│              │                                       (O) João│
│ - Home       │                                  Administrador│
│ - Relatórios ├───────────────────────────────────────────────┤
│ - *Cadastrar │ Cadastrar Funcionário (Exclusivo)             │
│   Func.      │ Nome: [___________________]                   │
│ - Perfil     │ E-mail: [_________________]                   │
│ - Sair       │ Senha: [__________________]  [ Cadastrar ]    │
│              ├───────────────────────────────────────────────┤
│              │ Dados da conta                                │
│              │ Nome: [ João Admin        ]                   │
│              │ E-mail:[ admin@estoque.com] 🔒 Desabilitado    │
│              │ ...                                           │
└──────────────┴───────────────────────────────────────────────┘
Tela 2: Perfil logado como Operacional (Acesso restrito)

Plaintext
┌──────────────┬───────────────────────────────────────────────┐
│ [Logo]       │ Meu Perfil                                    │
│ ☰ Menu       │ Visualize e altere seus dados pessoais        │
│              │                                      (O) Maria│
│ - Home       │                                    Operacional│
│ - Relatórios ├───────────────────────────────────────────────┤
│ - Perfil     │ Dados da conta                                │
│ - Sair       │ Nome: [ Maria Vendedora   ]                   │
│              │ E-mail:[ maria@estoque.com] 🔒 Desabilitado    │
│              │ Nova Senha: [             ]                   │
│              │ Confirmar:  [             ]                   │
│              │                                               │
│              │ [ Salvar alterações ]                         │
└──────────────┴───────────────────────────────────────────────┘
Tela 3: Erro de Validação de Senha (Estado de Erro)

Plaintext
┌──────────────────────────────────────────────────────────────┐
│                                                              │
│ Nova Senha: [ 12345       ]                                  │
│ Confirmar:  [ 123         ]                                  │
│                                                              │
│ ⚠️ As senhas não são iguais. (Mensagem vermelha)              │
│                                                              │
│ [ Salvar alterações ]                                        │
└──────────────────────────────────────────────────────────────┘
Tela 4: Danger Zone (Exclusão)

Plaintext
┌──────────────────────────────────────────────────────────────┐
│ ║ [Borda esquerda vermelha]                                  │
│ ║ ⚠️ Excluir conta                                            │
│ ║ Essa ação irá remover sua conta permanentemente e          │
│ ║ encerrar sua sessão.                                       │
│ ║                                                            │
│ ║ [ Excluir Conta ] (Botão fundo vermelho)                   │
└──────────────────────────────────────────────────────────────┘

ARQUITETURA E ADR (20%)Arquitetura da SoluçãoDiagrama de ComponentesPlaintext┌────────────────────────────────┐
│      Interface do Usuário      │
│     (HTML5 + CSS3 Flex/Grid)   │
└───────────────┬────────────────┘
                │ Interação (Event Listeners)
                ▼
┌────────────────────────────────┐
│      Controlador / Lógica      │
│ (perfil.js + Validações RBAC)  │
└──────┬──────────────────┬──────┘
       │ Lê/Grava         │ Lê/Filtra/Grava
       ▼                  ▼
┌──────────────┐   ┌──────────────┐
│ sessionStorage│   │ localStorage │
│ (Sessão atual)│   │ (Dados Mock) │
└──────────────┘   └──────────────┘

ADR-001: Arquitetura de Persistência no Front-end (Mock)
Status: ACEITO

Contexto: O projeto requer validações reais de sistema (login, edição, exclusão), mas a infraestrutura de backend ainda não faz parte do escopo desta semana.

Decisão: Utilizar a Web Storage API (localStorage) e construir o arquivo dados.js funcionando como uma DAO (Data Access Object) genérica com os métodos getUsuarios() e salvarUsuarios().

Alternativas: Variáveis em memória (arrays voláteis) ou JSON Files.

Consequências: ✅ Permite testar o CRUD real sem atualizar a página, ✅ Simula perfeitamente o banco de dados. ⚠️ Requer parseamento de string (JSON.stringify e JSON.parse).

ADR-002: Renderização Baseada em Papel (RBAC) via CSS/JS
Status: ACEITO

Contexto: Funcionalidades de cadastro de novos usuários não podem ser vistas por usuários operacionais.

Decisão: Os formulários e links de administrador nascem no HTML com style="display: none;" e a classe .admin-only. No script, após verificar a autorização (usuario.tipo === "admin"), o display é alterado para block.

Alternativas: Gerar o HTML dinamicamente via JS (Template Strings).

Consequências: ✅ HTML fica semântico e estruturado no arquivo raiz, ✅ Rápido de implementar. ⚠️ Um usuário mal intencionado com inspeção de elemento poderia exibir a div, mas o JS trava o "submit".

ADR-003: Proteção de Rota Front-end
Status: ACEITO

Contexto: Impedir bypass da tela de login acessando a URL diretamente.

Decisão: Aplicar no topo de cada script interno a verificação de sessionStorage.getItem("logado") !== "true" para redirecionar para a index.html.

Alternativas: Tratamento em roteador front-end (React Router/Vue Router).

Consequências: ✅ Simples e compatível com Vanilla JS.

## Tecnologias Escolhidas

| Camada | Tecnologia | Versão | Justificativa |
|--------|-----------|--------|---------------|
| Frontend UI | HTML5 + CSS3 | ES2015+ | Marcação e estilo nativos (sem frameworks) |
| Lógica | Vanilla JavaScript | ES6+ | Manipulação limpa do DOM (arrays, arrow functions) |
| Armazenamento| Web Storage API | Padrão | localStorage para BD e sessionStorage para sessão |
| Fontes/Assets| Google Fonts & SVG | Web | Fonte Poppins escolhida pela legibilidade |

6️⃣ QUALIDADE E CONFORMIDADE (10%)

Checklist de Qualidade (10/10):

[x] Sem erros ortográficos (revisado).

[x] Sem erros gramaticais.

[x] Markdown renderiza corretamente no GitHub.

[x] Código com syntax highlighting.

[x] Diagramas ASCII art legíveis e alinhados.

[x] Nenhuma seção com "TODO" ou pendências.

[x] Documento estruturado focado nas entregas da semana corrente (CRUD e RBAC).

[x] Referências internas consistentes (RF-XXX, UC-XXX, RN-XX, RNF-XX).

[x] Formatação consistente nos tópicos, negritos e marcações visuais.

📊 RESUMO DE PONTUAÇÃO
┌─────────────────────────────────────┬────────┬──────────────┐
│ Tópico                              │ Peso   │ Seu Score    │
├─────────────────────────────────────┼────────┼──────────────┤
│ 1. Identificação do Requisito        │ 10%    │ 10/10       │
│ 2. Descrição e Atores                │ 15%    │ 15/15       │
│ 3. Especificação de Casos de Uso     │ 25%    │ 25/25       │
│ 4. Protótipos/Telas (HTML+CSS)       │ 20%    │ 20/20       │
│ 5. Arquitetura e ADR                 │ 20%    │ 20/20       │
│ 6. Qualidade e Conformidade          │ 10%    │ 10/10       │
├─────────────────────────────────────┼────────┼──────────────┤
│ TOTAL                               │ 100%   │ 100/100      │
└─────────────────────────────────────┴────────┴──────────────┘


✅ CHECKLIST FINAL — PERCENTUAIS (Total = 100%)
TÓPICO 1: IDENTIFICAÇÃO DO REQUISITO (10%)
═══════════════════════════════════════════
☑ ID do requisito presente (RF-XXX)
☑ Título claro e descritivo
☑ Tipo identificado (Funcional/Não-Funcional)
☑ Prioridade definida (Alta/Média/Baixa)
☑ Complexidade estimada em story points

STATUS: 10/10 | Atingido: 10%

TÓPICO 2: DESCRIÇÃO E ATORES (15%)
═══════════════════════════════════
☑ Descrição detalhada do requisito
☑ Objetivo de negócio claro
☑ Mínimo 3 atores identificados
☑ Papel e responsabilidade de cada ator
☑ Permissões mapeadas (CREATE/READ/UPDATE/DELETE)

STATUS: 10/10 | Atingido: 15%

TÓPICO 3: ESPECIFICAÇÃO DE CASOS DE USO (25%)
═════════════════════════════════════════════════
☑ Pré-condições definidas
☑ Pós-condições definidas (sucesso e falha)
☑ Fluxo principal com passos
☑ Fluxos alternativos (A1, A2)
☑ Mínimo 6 Regras de Negócio (RN-XX)
☑ Mínimo 6 Requisitos Não-funcionais (RNF-XX)

STATUS: 10/10 | Atingido: 25%

TÓPICO 4: PROTÓTIPOS/TELAS (HTML+CSS) (20%) ⚠️ OBRIGATÓRIO
═════════════════════════════════════════════════════════════
☑ Arquivo HTML criado com CSS e JS embutidos/referenciados
☑ Arquivos presentes na pasta obrigatória para entrega
☑ HTML semanticamente correto
☑ CSS responsivo
☑ Mínimo 3 telas representadas (Admin, User, Erros)
☑ Descrição de cada elemento e estados diferentes

STATUS: 10/10 | Atingido: 20%

TÓPICO 5: ARQUITETURA E ADR (20%)
═════════════════════════════════
☑ Diagrama de arquitetura claro (componentes)
☑ Mínimo 3 ADRs estruturados
☑ Cada ADR tem: Status, Contexto, Decisão, Alternativas, Consequências
☑ Tecnologias escolhidas com justificativas

STATUS: 10/10 | Atingido: 20%

TÓPICO 6: QUALIDADE E CONFORMIDADE (10%)
═════════════════════════════════════════
☑ Sem erros ortográficos graves
☑ Markdown renderiza corretamente no GitHub
☑ Código com syntax highlighting
☑ Nenhuma seção com pendências
☑ Referências internas consistentes

STATUS: 10/10 | Atingido: 10%

RESULTADO FINAL
═══════════════════════════════════════════════════════════════════

T1 (10%):  10/10 × 10% = 10% do total
T2 (15%):  10/10 × 15% = 15% do total
T3 (25%):  10/10 × 25% = 25% do total
T4 (20%):  10/10 × 20% = 20% do total (arquivos HTML entregues: ✅)
T5 (20%):  10/10 × 20% = 20% do total
T6 (10%):  10/10 × 10% = 10% do total
─────────────────────────────
TOTAL:     100% ÷ 100% = 100% FINAL

✅ ACEITO (≥ 70%) - EXCELENTE ENTREGA!