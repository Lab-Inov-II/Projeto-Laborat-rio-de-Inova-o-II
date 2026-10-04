***# 📋 ENTREGA SEMANAL DE REQUISITOS

**Versão:** 12.2  
**Laboratório de Inovação -** Prof. Edilberto Silva — 2026  
**Formato:** Markdown (será corrigido automaticamente)  
**Valor Total da Entrega:** 100%  
**Data de Entrega:** [05/10/2026]  
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
│   │   │   └── RF-001-login-usuario.md
│   │   ├── SEMANA-02/
│   │   │   └── RF-002-tela-home.md
│   │   ├── SEMANA-03/
│   │   │   └── RF-003-menu-lateral.md
│   │   ├── SEMANA-04/
│   │   │   └── RF-004-cadastro-vendedor.md
│   │   ├── SEMANA-05/
│   │   │   └── RF-005-cadastro-clientes.md
│   │   ├── SEMANA-06/
│   │   │   └── RF-006-esqueceu-senha.md
│   │   ├── SEMANA-07/
│   │   │   └── RF-007-cadastro-produto.md
│   │   ├── SEMANA-08/
│   │   │   └── RF-008-reserva-produto.md
│   │   ├── SEMANA-09/
│   │   │   └── RF-009-Relatorio-estoque-admin.md
│   │   ├── SEMANA-10/
│   │   │   └── RF-010-Relatorio-estoque-vendedor.md
│   │   └── SEMANA-11/
│   │       └── RF-011-Perfil-vendedor.md
│   │
│   ├── prototipos/
│   │   ├── SEMANA-06/
│   │   │   ├── RF-006-Esqueceu-senha/
│   │   │   │   ├── index.html


**Localização deste arquivo:** `docs/requisitos-semanais/SEMANA-06/RF-006-Esqueceu-senha.md`  
**Localização do Protótipo HTML+CSS:** `src/prototipos/SEMANA-06/RF-006-index.html`

# SEMANA 06 — RF-006: Recuperação de Senha (Esqueceu a senha)

**Sistema:** Controle de Estoque (aplicação web em HTML, CSS e JavaScript)
**Telas do sistema:** `index.html` (login), `home.html`
**Arquivos desta entrega:** `index.html` (modal de recuperação), `dados.js` (persistência), protótipo em `src/prototipos/SEMANA-06/RF-006-esqueceu-senha/index.html`

---

## 📊 PONTUAÇÃO POR TÓPICO (Total = 100%)

| # | Tópico | Percentual | Obrigatoriedade | Status |
|---|--------|-----------|-----------------|--------|
| 1 | **Identificação do Requisito** | 10% | Obrigatório | [x] |
| 2 | **Descrição e Atores** | 15% | Obrigatório | [x] |
| 3 | **Especificação de Casos de Uso** | 25% | Obrigatório | [x] |
| 4 | **Protótipos/Telas (HTML+CSS)** | 20% | **OBRIGATÓRIO** ⚠️ | [x] |
| 5 | **Arquitetura e ADR** | 20% | Obrigatório | [x] |
| 6 | **Qualidade e Conformidade** | 10% | Obrigatório | [x] |
| | **TOTAL** | **100%** | | |

---

## 1️⃣ IDENTIFICAÇÃO DO REQUISITO (10%)

### RF-006: Recuperação de Senha

**ID:** RF-006
**Título:** Redefinir a senha de um usuário pela tela de login, com código de verificação
**Tipo:** Requisito Funcional
**Prioridade:** MÉDIA (sem ela, quem esquece a senha perde o acesso ao sistema)
**Complexidade:** MÉDIA (estimado 5 story points: modal em duas etapas, geração e validação de código, persistência)
**Status:** IMPLEMENTADO
**Data de Criação:** 02/10/2026
**Última Atualização:** 03/10/2026

**Breve Descrição:**
O sistema deve permitir que um usuário que esqueceu a senha clique em "Esqueceu a senha?" no login, informe o e-mail da conta, receba um código de verificação de 6 dígitos (simulado na tela) e cadastre uma nova senha.

---

## 2️⃣ DESCRIÇÃO E ATORES (15%)

## Descrição Detalhada

**Por que este requisito existe?**
O sistema de estoque exige login para todas as telas. Se o usuário esquece a senha, ele fica bloqueado. A recuperação resolve isso e traz estes benefícios:
- Devolve o acesso sem depender de um administrador alterar a conta manualmente
- Confirma a posse da conta por meio de um código temporário (validade de 10 minutos)
- Reduz chamados de suporte e tempo de operação parada
- Mantém uma única lista de usuários consistente entre login, perfil e recuperação

**Contexto do Negócio:**
A empresa usa o sistema para controlar entrada e saída de produtos. Funcionários operacionais e administradores acessam com e-mail e senha. Como o projeto é acadêmico e não tem servidor de e-mail, o envio do código é simulado: o código aparece dentro do próprio modal.

---

## Atores do Sistema

### 1. USUÁRIO (Ator Principal: Administrador ou Operacional)
- **Papel:** Solicitar a recuperação e definir a nova senha
- **Responsabilidade:** Informar e-mail existente, digitar o código correto e escolher uma nova senha igual nos dois campos
- **Permissões:**
  - ❌ CREATE (não cria usuários nesta função)
  - ✅ READ (o e-mail informado é consultado na lista de usuários)
  - ✅ UPDATE (altera somente a própria senha)
  - ❌ DELETE

### 2. SISTEMA (Ator Automático)
- **Papel:** Validar dados, gerar o código e gravar a nova senha
- **Responsabilidade:** Verificar e-mail, gerar código de 6 dígitos, controlar a expiração de 10 minutos, comparar código e senhas, chamar `salvarUsuarios()`
- **Permissões:**
  - ✅ READ e UPDATE na lista de usuários (`localStorage`)

### 3. SERVIÇO DE E-MAIL SIMULADO (Ator Secundário)
- **Papel:** Entregar o código ao usuário
- **Responsabilidade:** Na implementação atual é um bloco na tela ("📧 Simulação de e-mail enviado para...") que exibe o código. Em produção seria um serviço real de envio.
- **Permissões:**
  - ✅ Somente leitura do e-mail destino e do código gerado

### 4. ADMINISTRADOR (Ator Indireto)
- **Papel:** Responsável pelos acessos, cadastra funcionários na tela de perfil
- **Benefício:** Não precisa redefinir senhas manualmente; as contas que ele cria também usam a recuperação
- **Permissões:** nenhuma ação direta neste fluxo

---

## 3️⃣ ESPECIFICAÇÃO DE CASOS DE USO (25%)

## UC-001: Recuperar Senha de Acesso

### Pré-Condições
- ✅ Usuário está na tela de login (`index.html`)
- ✅ Existe ao menos uma conta cadastrada (a lista padrão é criada automaticamente por `getUsuarios()`)
- ✅ Navegador com `localStorage` habilitado

### Pós-Condições (Sucesso)
- ✅ A senha da conta é atualizada na lista `usuarios` do `localStorage`
- ✅ A lista de contas demo do login é redesenhada com a nova senha
- ✅ O campo de e-mail do login vem preenchido e o foco vai para o campo de senha
- ✅ O modal é fechado após 1,5 segundo e o código de recuperação é descartado

### Pós-Condições (Falha)
- ✅ Mensagem de erro exibida no modal (cor vermelha)
- ✅ Nenhuma senha é alterada
- ✅ O usuário permanece no modal e pode corrigir o dado ou cancelar

### Fluxo Principal
1. Usuário clica em "Esqueceu a senha?" no login
2. Sistema abre o modal "Recuperar senha" limpo, na etapa 1, sugerindo o e-mail já digitado no login
3. Usuário informa o e-mail da conta
4. Usuário clica em "Enviar código"
5. Sistema procura o e-mail na lista de usuários e o encontra
6. Sistema gera um código de 6 dígitos e define validade de 10 minutos
7. Sistema troca para a etapa 2 e exibe o e-mail simulado com o código
8. Usuário digita o código de verificação
9. Usuário digita a nova senha e a confirmação
10. Usuário clica em "Redefinir senha"
11. Sistema valida validade, código e igualdade das senhas
12. Sistema grava a nova senha com `salvarUsuarios()` e atualiza a lista de contas demo
13. Sistema exibe "Senha redefinida com sucesso!" e fecha o modal após 1,5 segundo
14. Usuário entra com a nova senha

### Fluxo Alternativo A1: E-mail não encontrado
5a.1. Sistema não localiza o e-mail na lista
5a.2. Exibe "E-mail não encontrado." e permanece na etapa 1
5a.3. Usuário corrige o e-mail ou cancela

### Fluxo Alternativo A2: Código incorreto
11a.1. Código digitado é diferente do gerado
11a.2. Sistema exibe "Código incorreto." e não altera a senha
11a.3. Usuário digita novamente e confirma

### Fluxo Alternativo A3: Código expirado ou inexistente
11b.1. Passaram 10 minutos ou o modal foi reaberto (a recuperação foi descartada)
11b.2. Sistema exibe "O código expirou. Tente novamente."
11b.3. Usuário fecha o modal e reinicia a partir do passo 1

### Fluxo Alternativo A4: Senhas diferentes
11c.1. Nova senha e confirmação não coincidem
11c.2. Sistema exibe "As senhas não coincidem." e não altera a senha
11c.3. Usuário corrige os dois campos

### Fluxo Alternativo A5: Cancelar
3a.1. Usuário clica em "Cancelar" ou fora do modal em qualquer etapa
3a.2. Sistema fecha o modal e descarta o código gerado
3a.3. Usuário volta ao login sem alterações

### Regras de Negócio (RN)
**RN-01:** Só é possível recuperar a senha de um e-mail que já existe na lista de usuários
**RN-02:** O código tem 6 dígitos numéricos, gerado aleatoriamente entre 100000 e 999999
**RN-03:** O código vale 10 minutos a partir da geração
**RN-04:** A senha só é alterada se o código digitado for igual ao gerado
**RN-05:** Nova senha e confirmação devem ser idênticas
**RN-06:** A recuperação altera apenas a senha; nome, e-mail e tipo de acesso permanecem
**RN-07:** Cada abertura do modal descarta qualquer recuperação anterior e limpa os campos
**RN-08:** Após a redefinição, o login volta com o e-mail preenchido e o campo de senha vazio

### Requisitos Não-Funcionais (RNF)
**RNF-01:** Resposta imediata (abaixo de 1 segundo), pois a validação é feita no navegador
**RNF-02:** Persistência local: as senhas ficam no `localStorage` e sobrevivem ao recarregamento da página
**RNF-03:** Interface responsiva: o modal ocupa até 380 px e se adapta a telas pequenas (320 px)
**RNF-04:** Usabilidade: botão de mostrar/ocultar senha nos campos de nova senha e mensagens claras de erro e sucesso
**RNF-05:** Acessibilidade básica: campos com `label`, botões com `aria-label` e foco automático no primeiro campo de cada etapa
**RNF-06:** Compatibilidade com navegadores atuais que suportam ES2015 (`const`, arrow functions, `localStorage`)
**RNF-07:** Segurança limitada ao escopo acadêmico: senhas em texto puro e código exibido na tela (ver melhorias no tópico 5)

---

## 4️⃣ PROTÓTIPOS/FLUXOS DE TELAS (HTML+CSS) (20%)

**Arquivo entregue:** `src/prototipos/SEMANA-06/RF-006-esqueceu-a-senha/index.html` (CSS embutido na tag `<style>`, sem dependências externas).

O protótipo tem uma barra superior para alternar entre os estados da tela, usando o mesmo visual do sistema (fundo pêssego `#fcd8b6`, botões laranja `#ffae58`, fonte Poppins com fallback Arial). Ele usa `<main>`, `<section>`, `<label>`, `<nav>` e atributos `role` para status e alerta. O layout é responsivo: o cartão tem `max-width: 380px` e `width: 100%`, e abaixo de 360 px os botões empilham.

### Tela 1: Vazio (etapa 1, estado inicial)
```
┌─────────────────────────────────────┐
│  Recuperar senha                    │
│  Informe o e-mail da sua conta      │
│                                     │
│  E-mail: [ Digite seu e-mail    ]   │
│                                     │
│  [ Cancelar ]  [ Enviar código ]    │
└─────────────────────────────────────┘
```

### Tela 2: Carregando
```
┌─────────────────────────────────────┐
│  Recuperar senha                    │
│        ⟳ (spinner)                  │
│  Enviando código de verificação     │
│  [ Cancelar ]                       │
└─────────────────────────────────────┘
```
Observação: na implementação real a validação é instantânea (local). O estado de carregamento existe no protótipo para representar um envio de e-mail por servidor.

### Tela 3: Preenchido (etapa 2, tudo válido)
```
┌─────────────────────────────────────┐
│  Recuperar senha                    │
│  📧 E-mail enviado para admin@...   │
│  Seu código: 482915                 │
│                                     │
│  Código:         [ 482915 ]  ✅     │
│  Nova senha:     [ ••••••••• ] ✅   │
│  Confirmar:      [ ••••••••• ] ✅   │
│                                     │
│  [ Cancelar ]  [ Redefinir senha ]  │
└─────────────────────────────────────┘
```

### Tela 4: Erro
```
┌─────────────────────────────────────┐
│  E-mail: [ maria@estoque.com ] ❌   │
│  E-mail não encontrado.             │
│  Código: [ 123456 ] ❌              │
│  Código incorreto.                  │
│  [ Cancelar ]  [ Tentar novamente ] │
└─────────────────────────────────────┘
```

### Tela 5: Sucesso
```
┌─────────────────────────────────────┐
│  Senha redefinida com sucesso!      │
│  Voltando para o login              │
└─────────────────────────────────────┘
```

### Descrição dos elementos
| Elemento | Função |
|----------|--------|
| Campo e-mail | Identifica a conta (`type="email"`, obrigatório) |
| Botão "Enviar código" | Valida o e-mail e gera o código |
| Bloco de e-mail simulado | Mostra o código no lugar de um e-mail real |
| Campo código | Aceita só números, máximo de 6 dígitos |
| Campos de senha com ícone de olho | Alternam entre texto e senha oculta |
| Mensagem (`.msg`) | Mostra erro em vermelho ou sucesso em verde |
| Botão "Cancelar" | Fecha o modal e descarta a recuperação |

### Fluxo de navegação
`Login (index.html)` → clique em "Esqueceu a senha?" → `Modal etapa 1` → `Modal etapa 2` → `Sucesso` → `Login com e-mail preenchido`. Em qualquer etapa, "Cancelar" ou clique fora do modal volta ao login.

---

## 5️⃣ ARQUITETURA E ADR (20%)

## Arquitetura da Solução

### Diagrama de Componentes

```
┌─────────────────────────────┐
│ Navegador (front-end)       │
│                             │
│  index.html                 │
│  ├─ Formulário de login     │
│  └─ Modal de recuperação    │
│      (etapa 1 e etapa 2)    │
│            │ chama          │
│            ▼                │
│  dados.js                   │
│  getUsuarios() /            │
│  salvarUsuarios()           │
│            │                │
│            ▼                │
│  localStorage["usuarios"]   │
└─────────────────────────────┘
        ▲ lê a mesma lista
home.html, perfil.html, perfil.js
```

### Fluxo de Dados
1. O usuário digita o e-mail; o JavaScript consulta `getUsuarios()` (lê o JSON do `localStorage`)
2. O sistema cria na memória o objeto `recuperacao = { email, codigo, expira }`
3. O código é mostrado na tela (simulação do e-mail)
4. O usuário envia código e senhas; o sistema compara com o objeto `recuperacao`
5. Se tudo for válido, `usuario.senha` é alterada na lista e `salvarUsuarios(lista)` grava o JSON de volta
6. O login e as demais telas leem a mesma lista, então a nova senha vale imediatamente

```javascript
// Trecho real do index.html: geração do código com validade de 10 minutos
const codigo = String(Math.floor(100000 + Math.random() * 900000));
recuperacao = {
  email: email,
  codigo: codigo,
  expira: Date.now() + 10 * 60 * 1000
};
```

### Padrão de Design
- **Wizard em duas etapas** dentro de um modal: etapa 1 (identificar) e etapa 2 (validar e redefinir), alternando `display` de dois formulários
- **Camada de acesso a dados centralizada** em `dados.js`, usada por login, home e perfil
- **Estado temporário em memória** (`recuperacao`), que não é gravado no `localStorage`

### ADR-001: localStorage como persistência

**Status:** ACEITO

**Contexto:** O projeto é acadêmico, sem servidor nem banco de dados, e várias telas precisam enxergar a mesma lista de usuários.

**Decisão:** Guardar a lista de usuários como JSON em `localStorage`, acessada somente por `getUsuarios()` e `salvarUsuarios()`.

**Alternativas:**
- Banco com API (Node.js e PostgreSQL): mais seguro, mas fora do escopo da disciplina nesta etapa
- `sessionStorage`: perderia os dados ao fechar a aba

**Consequências:** ✅ Simples e sem dependências, ✅ Persiste entre páginas, ⚠️ Dados ficam expostos no navegador, ⚠️ Não compartilha dados entre máquinas

### ADR-002: Código de verificação gerado no front-end e exibido na tela

**Status:** ACEITO (provisório)

**Contexto:** Não há servidor de e-mail, mas o requisito pede confirmação de posse da conta.

**Decisão:** Gerar um código de 6 dígitos com `Math.random()`, validade de 10 minutos, e exibi-lo em um bloco que simula o e-mail.

**Alternativas:**
- Envio real por serviço de e-mail: exige back-end
- Redefinir sem código: mais simples, mas sem nenhuma verificação

**Consequências:** ✅ Demonstra o fluxo completo, ✅ Dispensa infraestrutura, ⚠️ Quem vê a tela já vê o código, ⚠️ Deve ser trocado por envio real em produção

### ADR-003: Recuperação em modal na tela de login

**Status:** ACEITO

**Contexto:** A recuperação precisa do e-mail digitado no login e deve manter o usuário no mesmo contexto.

**Decisão:** Implementar o fluxo como modal no `index.html`, sem criar uma nova página.

**Alternativas:**
- Página própria `recuperar.html`: separa melhor o código, mas perde o e-mail já digitado e adiciona navegação
- `prompt()` do navegador: não permite validação visual nem estilo

**Consequências:** ✅ Menos navegação, ✅ Reaproveita o e-mail do login, ⚠️ `index.html` fica maior por concentrar HTML, CSS e JavaScript

### ADR-004: HTML, CSS e JavaScript puros, sem framework

**Status:** ACEITO

**Contexto:** A equipe está em formação e precisa de código legível e fácil de estudar e explicar.

**Decisão:** Usar apenas HTML5, CSS3 e JavaScript ES2015+, sem bibliotecas.

**Alternativas:** React ou Vue (curva de aprendizado maior), Bootstrap (visual padronizado, mais dependências)

**Consequências:** ✅ Zero dependências, ✅ Código didático, ⚠️ Mais código repetido entre telas (menu lateral, estilos)

---

## Tecnologias Escolhidas

| Camada | Tecnologia | Versão | Justificativa |
|--------|-----------|--------|---------------|
| Interface | HTML5 + CSS3 | Padrão atual | Simples, responsivo com media queries |
| Lógica | JavaScript | ES2015+ | Roda direto no navegador, sem build |
| Persistência | localStorage | Web Storage API | Dispensa servidor e banco |
| Sessão | sessionStorage | Web Storage API | Guarda quem está logado enquanto a aba estiver aberta |
| Fonte | Poppins (Google Fonts) | 400 a 700 | Identidade visual do sistema, com Arial de reserva |

### Melhorias Futuras (limitações conhecidas)
- Guardar senhas com hash (por exemplo, bcrypt) em um back-end, em vez de texto puro
- Enviar o código por e-mail real e não exibi-lo na tela
- Definir tamanho mínimo e regras de força para a nova senha
- Limitar tentativas de código incorreto

---

## 6️⃣ QUALIDADE E CONFORMIDADE (10%)

### Checklist de Qualidade

- [x] Texto revisado, sem erros ortográficos ou gramaticais
- [x] Markdown estruturado com títulos, tabelas e listas consistentes
- [x] Código com syntax highlighting (```javascript)
- [x] Diagramas em ASCII legíveis
- [x] Nenhuma seção pendente ou vazia
- [x] Referências internas consistentes (RF-006, UC-001, RN-01 a RN-08, RNF-01 a RNF-07, ADR-001 a ADR-004)
- [x] Descrição fiel ao código entregue (`index.html`, `dados.js`), com as limitações declaradas

---

## ✅ CHECKLIST FINAL — PERCENTUAIS (Total = 100%)

```
TÓPICO 1: IDENTIFICAÇÃO DO REQUISITO (10%)
☑ ID do requisito presente (RF-006)
☑ Título claro e descritivo
☑ Tipo identificado (Funcional)
☑ Prioridade definida (Alta)
☑ Complexidade estimada em story points (5)
STATUS: 10/10 | Atingido: 10%

TÓPICO 2: DESCRIÇÃO E ATORES (15%)
☑ Descrição detalhada do requisito
☑ Objetivo de negócio claro
☑ Mínimo 3 atores identificados (4 atores)
☑ Papel e responsabilidade de cada ator
☑ Permissões mapeadas (CREATE/READ/UPDATE/DELETE)
STATUS: 10/10 | Atingido: 15%

TÓPICO 3: ESPECIFICAÇÃO DE CASOS DE USO (25%)
☑ Pré-condições definidas
☑ Pós-condições definidas (sucesso e falha)
☑ Fluxo principal com 8+ passos (14 passos)
☑ Mínimo 3 fluxos alternativos (A1 a A5)
☑ Mínimo 6 Regras de Negócio (8 RN)
☑ Mínimo 6 Requisitos Não-funcionais (7 RNF)
STATUS: 10/10 | Atingido: 25%

TÓPICO 4: PROTÓTIPOS/TELAS (HTML+CSS) (20%) ⚠️ OBRIGATÓRIO
☑ Arquivo index.html com CSS embutido criado
☑ Arquivo entregue em src/prototipos/SEMANA-06/RF-006-esqueceu-a-senha/index.html
☑ HTML semanticamente correto
☑ CSS responsivo (mobile + desktop)
☑ Mínimo 3 telas representadas (vazio, preenchido, erro, mais carregando e sucesso)
☑ Descrição de cada elemento
☑ Fluxo de navegação documentado
☑ Estados diferentes (normal, erro, loading)
STATUS: 10/10 | Atingido: 20%

TÓPICO 5: ARQUITETURA E ADR (20%)
☑ Diagrama de arquitetura claro (componentes)
☑ Mínimo 3 ADRs estruturados (4 ADRs)
☑ Cada ADR tem: Status, Contexto, Decisão, Alternativas, Consequências
☑ Padrão de design utilizado documentado
☑ Tecnologias escolhidas com justificativas
☑ Fluxo de dados documentado
STATUS: 10/10 | Atingido: 20%

TÓPICO 6: QUALIDADE E CONFORMIDADE (10%)
☑ Sem erros ortográficos graves
☑ Markdown renderiza corretamente no GitHub
☑ Código com syntax highlighting
☑ Nenhuma seção pendente
☑ Referências internas consistentes (RF, UC, RN, RNF, ADR)
STATUS: 10/10 | Atingido: 10%

RESULTADO FINAL
T1 (10%):  10/10 × 10% = 10% do total
T2 (15%):  10/10 × 15% = 15% do total
T3 (25%):  10/10 × 25% = 25% do total
T4 (20%):  10/10 × 20% = 20% do total (arquivo HTML entregue: ✅)
T5 (20%):  10/10 × 20% = 20% do total
T6 (10%):  10/10 × 10% = 10% do total
           ─────────────────────────────
TOTAL:     100% FINAL

✅ ACEITO (≥ 70%)
```

---

**Entrega Semanal de Requisitos — Semana 06**
**Laboratório de Inovação Prof. Edilberto Silva — 2026**
