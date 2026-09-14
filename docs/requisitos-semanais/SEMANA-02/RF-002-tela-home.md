***# 📋 ENTREGA SEMANAL DE REQUISITOS

**Versão:** 12.2  
**Laboratório de Inovação -** Prof. Edilberto Silva — 2026  
**Formato:** Markdown (será corrigido automaticamente)  
**Valor Total da Entrega:** 100%  
**Data de Entrega:** [14/09/2026]  
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
│   │   ├── SEMANA-02/
│   │   │   ├── RF-002-tela-home/
│   │   │   │   ├── home.html


**Localização deste arquivo:** `docs/requisitos-semanais/SEMANA-02/RF-002-tela-home.md`  
**Localização do Protótipo HTML+CSS:** `src/prototipos/SEMANA-02/RF-002-tela-home/home.html`

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

ID: RF-002  
Título: Tela Home (Painel Principal e Visão Geral do Estoque)  
Tipo: Requisito Funcional  
Prioridade: ALTA (Navegação principal pós-autenticação e visão do estado do sistema)  
Complexidade: MÉDIA (4 story points)  
Status: CONCLUÍDO  
Data de Criação: 08/09/2026  
Última Atualização: 13/09/2026  

Breve Descrição:  
Interface gráfica exibida imediatamente após a autenticação do usuário. Exibe a identificação do usuário logado e seu perfil (Administrador ou Vendedor), métricas numéricas do estoque, barras de progresso com o resumo do estoque, atalhos da aplicação e controle de guarda de sessão client-side.

---

### 2️⃣ DESCRIÇÃO E ATORES

Contexto do Negócio:  
A Tela Home do sistema da Embalare Distribuidora funciona como o painel central de controle. Ela consolida os principais indicadores de inventário (total de produtos, estoque disponível, estoque baixo e entradas do dia) para tomada de decisão rápida, além de identificar o perfil do operador logado (Administrador ou Vendedor) e disponibilizar a navegação pelas demais áreas do sistema.

Atores do Sistema

1. ADMINISTRADOR (Ator Principal)
- Papel: Operar o painel principal, visualizar o resumo do estoque e navegar para todas as áreas administrativas e operacionais do sistema.
- Responsabilidade: Estar autenticado no sistema com perfil de Administrador.
- Permissões:
  - ✅ READ (visualizar todos os cards de métricas, gráficos de resumo, dados de perfil e menus da aplicação)

2. VENDEDOR (Ator Principal)
- Papel: Operar o painel principal com foco no acompanhamento operacional de vendas e disponibilidade de estoque.
- Responsabilidade: Estar autenticado no sistema com perfil de Vendedor.
- Permissões:
  - ✅ READ (visualizar os cards de métricas, gráficos de resumo, dados de perfil e menus operacionais permitidos)

3. SISTEMA (Ator Automático/Secundário)
- Papel: Validar a sessão, mapear o perfil do usuário e controlar o encerramento do acesso.
- Responsabilidade: Verificar a presença do token de sessão (`logado === "true"`), resgatar `usuarioNome` e `usuarioEmail` do `sessionStorage`, determinar dinamicamente o perfil (Administrador ou Vendedor) e redirecionar para `index.html` em caso de tentativa de acesso não autorizado ou ao acionar a função de saída (`sair()`).
- Permissões:
  - ✅ READ (consultar chaves do `sessionStorage`)
  - ✅ DELETE (limpar o `sessionStorage` na função de logout)

---

### 3️⃣ ESPECIFICAÇÃO DE CASOS DE USO

UC-002: Visualizar Tela Home e Dashboard de Estoque

Atores Envolvidos: Administrador, Vendedor e Sistema.

Pré-Condições:
- ✅ Usuário autenticado com flag `logado = "true"` no `sessionStorage`.
- ✅ Dados de `usuarioNome` e `usuarioEmail` previamente gravados durante o login.

Pós-Condições (Sucesso):
- ✅ Tela Home renderizada com o nome e perfil do usuário logado (Administrador ou Vendedor).
- ✅ Métricas numéricas e barras de resumo de estoque exibidas corretamente.
- ✅ Menu lateral disponível para navegação de acordo com o perfil.

Pós-Condições (Falha):
- ✅ Redirecionamento automático para a tela de login (`index.html`) caso a sessão seja inválida ou inexistente.

Fluxo Principal
1. O usuário é redirecionado para a página `home.html` após autenticação no login.
2. O sistema verifica a chave `logado` no `sessionStorage`.
3. O sistema recupera as chaves `usuarioNome` e `usuarioEmail` do `sessionStorage`.
4. O sistema identifica dinamicamente o perfil com base no e-mail:
   - `admin@estoque.com` -> Administrador
   - `vendedor@estoque.com` -> Vendedor
5. O sistema insere o nome e o perfil correspondente no cabeçalho da página.
6. O sistema exibe a seção de métricas numéricas com os cards: Total de produtos (125), Estoque disponível (98), Estoque baixo (12) e Entradas hoje (15).
7. O sistema renderiza a seção "Resumo do estoque" com as barras de progresso visuais.
8. O sistema exibe os blocos da "Estrutura da aplicação" (Produtos, Movimentações e Relatórios).
9. O usuário visualiza o painel e pode utilizar os links do menu lateral para navegar ou encerrar a sessão.

Fluxos Alternativos

Fluxo Alternativo A1: Acesso direto sem autenticação (Guarda de Sessão)
1. O usuário tenta acessar a URL `home.html` sem ter realizado o login prévio (`logado !== "true"`).
2. O script do sistema identifica a ausência da flag de autenticação no `sessionStorage`.
3. O sistema redireciona imediatamente o navegador para a tela de login (`index.html`).

Fluxo Alternativo A2: Encerramento de sessão (Logout)
1. O usuário clica no link "Sair" localizado no menu lateral.
2. O sistema executa a função `sair()`.
3. O sistema limpa todas as informações do `sessionStorage` através da instrução `sessionStorage.clear()`.
4. O sistema redireciona o usuário para a tela de login (`index.html`).

Regras de Negócio (RN)
- RN-01: A visualização da Tela Home é restrita a usuários com sessão válida e ativa no navegador (`logado === "true"`).
- RN-02: A identificação do perfil exibida na interface é inferida dinamicamente no front-end entre Administrador e Vendedor com base no e-mail armazenado no `sessionStorage`.
- RN-03: O acionamento da opção "Sair" deve apagar integralmente os dados de sessão do `sessionStorage` antes de redirecionar para o login.

Requisitos Não-Funcionais (RNF)
- RNF-01: Layout responsivo utilizando CSS Grid e Flexbox com suporte a telas menores/tablets (quebra de colunas em 1000px).
- RNF-02: Validação da guarda de sessão e atualização do perfil executadas no client-side em tempo inferior a 200ms.
- RNF-03: Identificação visual de estado no menu lateral através de classes ativas (`.active`) e efeitos de destaque ao passar o mouse (`:hover`).

---

### 4️⃣ PROTÓTIPOS/FLUXOS DE TELAS (HTML+CSS)

Caminho do Arquivo: `src/prototipos/SEMANA-02/RF-002-tela-home/home.html`

Tela 1: Visualização da Home com Usuário Autenticado
┌─────────────────────────┬───────────────────────────────────────────────────────────┐
│ [LOGO EMBALARE]         │ Home                                      [◯] João        │
│                         │ Visão geral do seu estoque                    Administrador│
│ Menu principal          ├───────────────────────────────────────────────────────────┤
│                         │ ┌──────────────┐ ┌──────────────┐ ┌──────────┐ ┌──────────┐│
│ > Home (active)         │ │Total produtos│ │Estoque dispon│ │Est. baixo│ │Entradas  ││
│   Produtos              │ │     125      │ │      98      │ │    12    │ │    15    ││
│   Entrada de estoque    │ └──────────────┘ └──────────────┘ └──────────┘ └──────────┘│
│   Saída de estoque      ├───────────────────────────────────────────────────────────┤
│   Relatórios            │ Resumo do estoque                                         │
│   Configurações         │ Estoque disponível [██████████████████░░░] 98 (78%)       │
│   Sair                  │ Estoque baixo      [██████░░░░░░░░░░░░░░░] 12 (25%)       │
│                         │ Entradas hoje      [███████░░░░░░░░░░░░░░] 15 (30%)       │
│                         ├───────────────────────────────────────────────────────────┤
│                         │ Estrutura da aplicação                                    │
│                         │ ┌─────────────┐  ┌─────────────┐  ┌─────────────┐         │
│                         │ │  Produtos   │  │Movimentações│  │ Relatórios  │         │
│                         │ └─────────────┘  └─────────────┘  └─────────────┘         │
└─────────────────────────┴───────────────────────────────────────────────────────────┘


---

### 5️⃣ ARQUITETURA E ADR

┌────────────────────────────────────────────────────────┐
│                Navegador Web (Client)                  │
│                                                        │
│  ┌──────────────────────────────────────────────────┐  │
│  │ Interface (home.html + CSS)                      │  │
│  └─────────────────────────┬────────────────────────┘  │
│                            │                           │
│                            ▼                           │
│  ┌──────────────────────────────────────────────────┐  │
│  │ Guarda de Sessão & Script de Perfil (JavaScript) │  │
│  └─────────────────────────┬────────────────────────┘  │
│                            │                           │
│                            ▼                           │
│  ┌──────────────────────────────────────────────────┐  │
│  │ Web Storage (sessionStorage)                     │  │
│  │ - logado: "true"                                 │  │
│  │ - usuarioEmail: "admin@estoque.com"              │  │
│  │ - usuarioNome: "Admin"                           │  │
│  └──────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────┘


ADR-001: Guarda de Rota Client-side com sessionStorage
* Status: ACEITO
* Contexto: Necessidade de impedir o acesso direto à tela Home por usuários não autenticados na fase de protótipo de front-end.
* Decisão: Implementar uma verificação no início da execução do JavaScript da página `home.html` que checa a presença de `sessionStorage.getItem("logado") === "true"`. Caso a condição não seja atendida, a aplicação força a navegação para `index.html`.
* Consequências: 
  - ✅ Garante a simulação correta do fluxo de proteção de rotas no front-end.
  - ✅ Fácil implementação sem necessidade de infraestrutura de servidor.
  - ⚠️ A segurança de rotas real deverá ser tratada posteriormente com middleware no backend.

ADR-002: Determinação Dinâmica de Perfil no Front-end
* Status: ACEITO
* Contexto: Exibir o perfil correspondente (Administrador ou Vendedor) de forma personalizada no cabeçalho da interface sem banco de dados ativo.
* Decisão: Avaliar a string contida em `usuarioEmail` resgatada do `sessionStorage` através de uma estrutura condicional (`if/else`) e atualizar dinamicamente o elemento HTML `#usuarioPerfil`.
* Consequências: 
  - ✅ Proporciona experiência de usuário condizente com a regra de negócio.
  - ✅ Permite testar diferentes visualizações alterando apenas a conta informada no login.

Tecnologias Escolhidas
Frontend: HTML5 + CSS3 (Uso de CSS Grid para cards e layout de sidebar com área principal)  
Linguagem de Script: JavaScript ES6+ (Checagem de sessão, manipulação de elementos da DOM e controle da função `sair()`)  
Armazenamento: Web Storage - sessionStorage (Validação do estado de login e leitura de dados do usuário)

---

### 6️⃣ QUALIDADE E CONFORMIDADE

Checklist de Qualidade:
- [x] Sem erros ortográficos e gramaticais.
- [x] Markdown renderiza corretamente.
- [x] Código com syntax highlighting.
- [x] Diagramas ASCII art legíveis e condizentes com a tela `home.html`.
- [x] Nenhuma seção incompleta ou com placeholders.
- [x] Referências internas consistentes (RF-002, UC-002, RN-XX, RNF-XX).

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
☑ ID do requisito presente (RF-002)
☑ Título claro e descritivo
☑ Tipo identificado (Requisito Funcional)
☑ Prioridade e complexidade estimadas em story points
STATUS: 10/10 | Atingido: 10%

TÓPICO 2: DESCRIÇÃO E ATORES (15%)
☑ Descrição detalhada do painel e contexto de negócio
☑ Atores identificados (Administrador, Vendedor e Sistema)
☑ Permissões de leitura e controle de sessão mapeadas
STATUS: 10/10 | Atingido: 15%

TÓPICO 3: ESPECIFICAÇÃO DE CASOS DE USO (25%)
☑ Pré-condições e pós-condições detalhadas
☑ Fluxo principal contemplando validação do perfil (Admin/Vendedor) e métricas do estoque
☑ Fluxos alternativos cobrindo acesso não autorizado e ação de logout
☑ Regras de negócio (RN) ajustadas ao escopo da Tela Home
☑ Requisitos Não-Funcionais (RNF) focados em responsividade e desempenho client-side
STATUS: 10/10 | Atingido: 25%

TÓPICO 4: PROTÓTIPOS/TELAS (HTML+CSS) (20%)
☑ Arquivo `home.html` entregue com CSS embutido
☑ Representação visual ASCII fidedigna à estrutura do código
☑ Cabeçalho de perfil, cards numéricos, barras de progresso e menu lateral implementados
STATUS: 10/10 | Atingido: 20%

TÓPICO 5: ARQUITETURA E ADR (20%)
☑ ADR-001 cobrindo a guarda de rotas via `sessionStorage`
☑ ADR-002 detalhando o mapeamento dinâmico do perfil do usuário
☑ Tabela de tecnologias atualizada e alinhada ao protótipo
STATUS: 10/10 | Atingido: 20%

TÓPICO 6: QUALIDADE E CONFORMIDADE (10%)
☑ Documento revisado sem erros gramaticais
☑ Markdown sem seções incompletas ou placeholders
☑ Referências internas padronizadas
STATUS: 10/10 | Atingido: 10%

RESULTADO FINAL
TOTAL: 100% FINAL - ACEITO