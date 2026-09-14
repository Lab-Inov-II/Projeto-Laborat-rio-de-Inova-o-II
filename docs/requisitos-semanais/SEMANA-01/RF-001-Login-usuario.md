***# 📋 ENTREGA SEMANAL DE REQUISITOS

**Versão:** 12.2  
**Laboratório de Inovação -** Prof. Edilberto Silva — 2026  
**Formato:** Markdown (será corrigido automaticamente)  
**Valor Total da Entrega:** 100%  
**Data de Entrega:** [30/08/2026]  
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
│   │   ├── SEMANA-01/
│   │   │   ├── RF-001-login-usuario/
│   │   │   │   ├── index.html

Localização deste arquivo: docs/requisitos-semanais/SEMANA-01/RF-001-login-usuario.md
Localização do Protótipo HTML+CSS: src/prototipos/SEMANA-01/RF-001-login-usuario/index.html

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

### 1️⃣ IDENTIFICAÇÃO DO REQUISITO

ID: RF-001
Título: Login de Usuário
Tipo: Requisito Funcional
Prioridade: MÉDIA (Definição de layout visual e acesso inicial)
Complexidade: BAIXA (3 story points)
Status: CONCLUÍDO
Data de Criação: 25/08/2026
Última Atualização: 13/09/2026

Breve Descrição:
Interface gráfica de login que permite aos usuários autenticarem-se através de e-mail e senha para acessar a área restrita do sistema (home.html).

---

### 2️⃣ DESCRIÇÃO E ATORES

Contexto do Negócio:
O sistema de controle de estoque da Embalare Distribuidora necessita de uma tela de login para restringir o acesso apenas a usuários autorizados e diferenciar os níveis de permissão entre administradores e vendedores.

Para esta fase inicial de prototipação visual, os usuários com perfis de Administrador e Vendedor são carregados por meio de uma estrutura inicial simulada (seed de dados em memória local/browser), permitindo testar a autenticação de interface sem dependência de um banco de dados relacional nesta etapa.

Atores do Sistema

1. ADMINISTRADOR (Ator Principal)
- Papel: Autenticar-se no sistema com acesso amplo às rotas da aplicação.
- Responsabilidade: Inserir credenciais válidas.
- Permissões:
  - ✅ CREATE (criar registros de produtos, clientes e usuários)
  - ✅ READ (visualizar todos relatórios e estoques)
  - ✅ UPDATE (editar registros cadastrados)
  - ✅ DELETE (remover dados do sistema)

2. VENDEDOR (Ator Principal)
- Papel: Autenticar-se no sistema com acesso restrito às rotas operacionais.
- Responsabilidade: Inserir credenciais válidas para gerenciamento de reservas e relatórios.
- Permissões:
  - ✅ CREATE (registrar reservas de produtos)
  - ✅ READ (consultar catálogo de produtos e relatórios de estoque em modo leitura)
  - ✅ UPDATE (atualizar dados do seu perfil)
  - ❌ DELETE (sem permissão de exclusão)

3. SISTEMA (Ator Automático/Secundário)
- Papel: Validar dados e gerenciar a sessão local.
- Responsabilidade: Verificar obrigatoriedade e formato dos campos, consultar a lista de usuários simulada, registrar os dados da sessão no sessionStorage e redirecionar o usuário logado para a página home.html.
- Permissões:
  - ✅ READ (consultar credenciais simuladas)
  - ✅ UPDATE (salvar estado de login no navegador)

---

### 3️⃣ ESPECIFICAÇÃO DE CASOS DE USO

UC-001: Realizar Login no Sistema

Atores Envolvidos: Administrador, Vendedor e Sistema.

Pré-Condições:
- ✅ Usuário cadastrado na lista de contas simuladas (seed).
- ✅ Interface da página de login carregada no navegador.

Pós-Condições (Sucesso):
- ✅ Dados de autenticação armazenados no sessionStorage do navegador.
- ✅ Redirecionamento com sucesso para a tela inicial (home.html).

Pós-Condições (Falha):
- ✅ Mensagem de erro amigável exibida (alerta ou validação visual).
- ✅ Redirecionamento cancelado e sessão não iniciada.

Fluxo Principal
1. Usuário acessa a página de login (index.html).
2. Sistema exibe o formulário com os campos de E-mail, Senha, recurso de visibilidade da senha ("olho"), opção "Lembrar-me" e botão "ENTRAR".
3. Usuário digita o e-mail no campo correspondente.
4. Usuário digita a senha no campo correspondente.
5. Usuário (opcionalmente) clica no ícone de "olho" para alternar a visibilidade da senha.
6. Usuário clica no botão "ENTRAR".
7. Sistema valida os campos preenchidos, verificando a obrigatoriedade de preenchimento e o formato de e-mail válido.
8. Sistema compara o e-mail e a senha informados com os registros cadastrados na lista de demonstração (mock).
9. Sistema salva os dados do usuário logado no sessionStorage.
10. Sistema redireciona o usuário autenticado para a tela home.html.

Fluxos Alternativos

Fluxo Alternativo A1: Campos vazios ou formato incorreto
1. Usuário deixa o campo de e-mail ou senha em branco, ou digita um e-mail com formato inválido.
2. Ao tentar submeter o formulário, a validação nativa do navegador impede o envio.
3. O sistema destaca o campo com erro e solicita a correção.

Fluxo Alternativo A2: Credenciais não encontradas
1. Usuário digita um e-mail ou senha que não correspondem a nenhuma conta demo.
2. Sistema identifica a divergência na verificação.
3. Sistema exibe a mensagem: "Erro na validação: E-mail ou senha incorretos."
4. O formulário permanece na tela aguardando nova tentativa.

Regras de Negócio (RN)
- RN-01: Cada conta de usuário deve possuir um endereço de e-mail exclusivo.
- RN-02: Em caso de erro de credencial, o sistema deve exibir uma mensagem genérica para não revelar qual campo específico está incorreto.
- RN-03: A conta do Administrador e do Vendedor são carregadas via dados iniciais (seed) diretamente na estrutura do frontend para o protótipo.
- RN-04: Ao autenticar com sucesso, o sistema deve manter as informações de sessão ativas no sessionStorage durante a navegação.
- RN-05: A senha deve possuir no mínimo 8 caracteres, contendo obrigatoriamente pelo menos uma letra e um número.

Requisitos Não-Funcionais (RNF)
- RNF-01: Interface responsiva adaptada para telas móveis (320px) e computadores (1024px+).
- RNF-02: Processamento da validação local com tempo de resposta inferior a 1 segundo.
- RNF-03: O sistema deve fornecer feedback visual imediato ao usuário em caso de dados inválidos ou campos obrigatórios vazios, utilizando validação nativa do navegador (Front-end).

---

### 4️⃣ PROTÓTIPOS/FLUXOS DE TELAS (HTML+CSS)

Caminho do Arquivo: src/prototipos/SEMANA-01/RF-001-login-usuario/index.html

Tela 1: Formulário Vazio (Estado Inicial)
┌───────────────────────────────────────────┐
│              LOGOTIPO                     │
│        Entre com seus dados               │
├───────────────────────────────────────────┤
│                                           │
│ E-mail:                                   │
│ [ Digite seu e-mail                    ]  │
│                                           │
│ Senha:                                    │
│ [ Digite sua senha                 ] [👁️] │
│                                           │
│ [ ] Lembrar-me         Esqueceu a senha?  │
│                                           │
│ [                 ENTRAR                ] │
└───────────────────────────────────────────┘
│ Contas demo (Simulação de Banco):         │
│ Admin: admin@estoque.com / admin123       │
│ Vendedor: vendedor@estoque.com /          │
│           vendedor123                     │
└───────────────────────────────────────────┘

Tela 2: Formulário Preenchido com Alternância de Senha ("Olho")
┌───────────────────────────────────────────┐
│              LOGOTIPO                     │
│        Entre com seus dados               │
├───────────────────────────────────────────┤
│                                           │
│ E-mail:                                   │
│ [ admin@estoque.com                    ]  │
│                                           │
│ Senha:                                    │
│ [ admin123                         ] [🙈] │
│                                           │
│ [x] Lembrar-me         Esqueceu a senha?  │
│                                           │
│ [                 ENTRAR                ] │
└───────────────────────────────────────────┘

Tela 3: Validação Visual de Campos Obrigatórios / E-mail Inválido
┌───────────────────────────────────────────┐
│              LOGOTIPO                     │
│        Entre com seus dados               │
├───────────────────────────────────────────┤
│                                           │
│ E-mail:                                   │
│ [ admin@estoque                        ]  │
│ ⚠️ Preencha um endereço de e-mail válido.  │
│                                           │
│ Senha:                                    │
│ [                                  ] [👁️] │
│                                           │
│ [                 ENTRAR                ] │
└───────────────────────────────────────────┘

---

### 5️⃣ ARQUITETURA E ADR

┌─────────────────────────────────────────┐
│           Navegador Web (Client)        │
│                                         │
│  ┌───────────────────────────────────┐  │
│  │ Interface (index.html + CSS)      │  │
│  └─────────────────┬─────────────────┘  │
│                    │                    │
│                    ▼                    │
│  ┌───────────────────────────────────┐  │
│  │ Scripts e Validações (JavaScript) │  │
│  └─────────────────┬─────────────────┘  │
│                    │                    │
│                    ▼                    │
│  ┌───────────────────────────────────┐  │
│  │ Web Storage (sessionStorage)      │  │
│  │ Simulação de Banco Interno        │  │
│  └───────────────────────────────────┘  │
└─────────────────────────────────────────┘

ADR-001: Uso do Web Storage (sessionStorage) para Simulação de Banco
* Status: ACEITO
* Contexto: Necessidade de validar o fluxo de login e manter o estado da sessão do usuário sem requerer a complexidade de um banco de dados relacional e backend nas semanas iniciais do projeto.
* Decisão: Utilizar a API nativa do sessionStorage do navegador para guardar os dados da sessão (ex: status de autenticação e nome do usuário logado) e direcioná-lo para a tela home.html.
* Consequências: 
  - ✅ Permite testar o fluxo completo de navegação do protótipo de forma rápida.
  - ✅ Elimina dependências de infraestrutura de servidores nesta etapa.
  - ⚠️ Os dados de sessão ficam restritos à aba atual do navegador.

ADR-002: Simulação de Autenticação sem Criptografia (Mocking)
* Status: ACEITO
* Contexto: O projeto encontra-se na fase de prototipação de interface gráfica (Front-end). O objetivo principal é validar a navegação e a experiência do usuário (UX/UI).
* Decisão: Utilizar uma lista estática (array de objetos JavaScript) para representar as contas de usuários registrados (Administrador, Vendedor). A verificação das senhas é realizada em texto simples sem o emprego de algoritmos de hash (como Bcrypt) ou criptografia nesta etapa.
* Consequências: 
  - ✅ Simplifica o desenvolvimento do protótipo.
  - ✅ Mantém o foco da equipe na estruturação de HTML, CSS e interações nativas da tela.
  - ⚠️ Implementações de criptografia e segurança corporativa serão introduzidas quando a camada de backend for integrada.

Tecnologias Escolhidas
Frontend: HTML5 + CSS3 (Construção de formulários semânticos e estilização responsiva)
Linguagem de Script: JavaScript ES6+ (Manipulação da DOM, validação de inputs e controle da visibilidade de senha)
Armazenamento: Web Storage - sessionStorage (Persistência temporária da sessão durante a navegação do protótipo)

---

### 6️⃣ QUALIDADE E CONFORMIDADE

Checklist de Qualidade:
- [x] Sem erros ortográficos e gramaticais.
- [x] Markdown renderiza corretamente.
- [x] Código com syntax highlighting.
- [x] Diagramas ASCII art legíveis.
- [x] Nenhuma seção incompletas ou com placeholders.
- [x] Referências internas consistentes (RF-001, UC-001, RN-XX, RNF-XX).

---

## 📊 RESUMO DE PONTUAÇÃO

┌─────────────────────────────────────┬────────┬──────────────┐
│ Tópico                              │ Peso   │ Seu Score    │
├─────────────────────────────────────┼────────┼──────────────┤
│ 1. Identificação do Requisito       │ 10%    │ 10/10        │
│ 2. Descrição e Atores               │ 15%    │ 15/15        │
│ 3. Especificação de Casos de Uso    │ 25%    │ 25/25        │
│ 4. Protótipos/Telas (HTML+CSS)      │ 20%    │ 20/20        │
│ 5. Arquitetura e ADR                │ 20%    │ 20/20        │
│ 6. Qualidade e Conformidade         │ 10%    │ 10/10        │
├─────────────────────────────────────┼────────┼──────────────┤
│ TOTAL                               │ 100%   │ 100/100      │
└─────────────────────────────────────┴────────┴──────────────┘

---

## ✅ CHECKLIST FINAL — PERCENTUAIS

TÓPICO 1: IDENTIFICAÇÃO DO REQUISITO (10%)
☑ ID do requisito presente (RF-001)
☑ Título claro e descritivo
☑ Tipo identificado (Requisito Funcional)
☑ Prioridade e complexidade estimadas em story points
STATUS: 10/10 | Atingido: 10%

TÓPICO 2: DESCRIÇÃO E ATORES (15%)
☑ Descrição detalhada e contexto de negócio
☑ Esclarecimento sobre o cadastro via Seed
☑ Atores identificados (Administrador, Vendedor, Sistema)
☑ Permissões CRUD mapeadas para cada perfil
STATUS: 10/10 | Atingido: 15%

TÓPICO 3: ESPECIFICAÇÃO DE CASOS DE USO (25%)
☑ Pré-condições e pós-condições detalhadas
☑ Fluxo principal contemplando alternância de senha e validações
☑ Fluxos alternativos cobrindo validações visuais e credenciais inválidas
☑ Regras de negócio (RN) ajustadas ao escopo atual (RN-05 validada)
☑ Requisitos Não-Funcionais (RNF) focados em responsividade e validação nativa
STATUS: 10/10 | Atingido: 25%

TÓPICO 4: PROTÓTIPOS/TELAS (HTML+CSS) (20%)
☑ Arquivo index.html com CSS embutido entregue
☑ Recurso de visibilidade de senha ("olho") presente no protótipo
☑ Redirecionamento configurado para home.html
☑ Simulação de banco no browser através do sessionStorage
STATUS: 10/10 | Atingido: 20%

TÓPICO 5: ARQUITETURA E ADR (20%)
☑ ADR-001 cobrindo uso de Web Storage / Browser DB
☑ ADR-002 detalhando a escolha de simulação sem criptografia nesta etapa
☑ Tabela de tecnologias simplificada e justificada
STATUS: 10/10 | Atingido: 20%

TÓPICO 6: QUALIDADE E CONFORMIDADE (10%)
☑ Documento revisado sem erros gramaticais
☑ Markdown sem seções incompletas ou placeholders
☑ Referências internas padronizadas
STATUS: 10/10 | Atingido: 10%

RESULTADO FINAL
TOTAL: 100% FINAL - ACEITO