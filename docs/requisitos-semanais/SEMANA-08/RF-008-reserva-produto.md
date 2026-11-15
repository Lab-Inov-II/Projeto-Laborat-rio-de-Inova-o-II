# 📋 ENTREGA SEMANAL DE REQUISITOS

**Versão:** 12.2  
**Laboratório de Inovação -** Prof. Edilberto Silva — 2026  
**Formato:** Markdown (será corrigido automaticamente)  
**Valor Total da Entrega:** 100%  
**Data de Entrega:** [26/10/2026]  
**Grupo:** [Embalare Distribuidora - Grupo 6]  
**Integrantes:**
[Sarah Domingos (sarah61701986@edu.df.senac.br); Anne Nunes (anne62409446@edu.df.senac.br); Matheus Reis (matheus62036126@edu.df.senac.br); Yasmin Souza (yasmin62376066@edu.df.senac.br);]  

**Localização deste arquivo:** `docs/requisitos-semanais/SEMANA-08/RF-008-reserva-produto.md`  
**Localização do Protótipo HTML+CSS:** `src/prototipos/SEMANA-08/RF-008-reserva-produto/index.html`

# SEMANA 08 — RF-008: Reserva de Produto

**Sistema:** Controle de Estoque da Embalare Distribuidora (aplicação web em HTML, CSS e JavaScript)
**Telas do sistema:** `index.html` (login), `home.html`, `perfil.html`, `usuarios.html`, `produtos.html`, `reservas.html`, `relatorio.html`
**Arquivos desta entrega:** `reservas.html` (reserva), `relatorio.html` (relatório do administrador), `produtos.html` (novos campos do produto), `dados.js` (persistência, status e proteção de acesso), `estilo.css`, protótipo em `src/prototipos/SEMANA-08/RF-008-reserva-produto/index.html`

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

### RF-008: Reserva de Produto

**ID:** RF-008
**Título:** Reservar produtos do estoque pelos funcionários operacionais, com relatório de estoque para o administrador
**Tipo:** Requisito Funcional
**Prioridade:** ALTA (a reserva muda a disponibilidade dos produtos e alimenta o relatório, os status e a Home)
**Complexidade:** BAIXA (estimado 3 story points: formulário de reserva com validações, status calculado e relatório que reaproveita o cadastro de produtos)
**Status:** IMPLEMENTADO
**Data de Criação:** 20/10/2026
**Última Atualização:** 24/10/2026

**Breve Descrição:**
O funcionário operacional reserva produtos informando nome, quantidade e lote, e cada reserva fica registrada em um histórico. O administrador acompanha tudo no relatório de estoque, que mostra o status de cada produto (Reservado, Em falta, Disponível ou Excedente) e permite editar ou excluir a linha. Nesta entrega o cadastro de produto também ganhou descrição, tamanho e lote.

---

## 2️⃣ DESCRIÇÃO E ATORES (15%)

## Descrição Detalhada

**Por que este requisito existe?**
Na Embalare, o funcionário operacional separa os descartáveis no estoque e os leva ao vendedor. Sem reserva, dois pedidos podem prometer o mesmo produto. A reserva traz estes benefícios:
- Evita vender ou separar mais unidades do que existem livres no estoque
- Registra quem reservou, o quê, quanto, de qual lote e quando
- Mostra ao administrador a situação real de cada produto no relatório
- Alimenta os números da Home (disponíveis, em falta e unidades reservadas)
- Identifica o lote exato, o que facilita encontrar o item na separação

**Contexto do Negócio:**
A Embalare vende descartáveis para empresas (copos, pratos, luvas, embalagens). O produto tem quantidade total, quantidade reservada e estoque mínimo. A quantidade livre é o total menos o reservado. Como o projeto é acadêmico e não tem servidor, os dados ficam no navegador e a primeira abertura do sistema carrega 16 produtos e 12 reservas de exemplo.

---

## Atores do Sistema

### 1. FUNCIONÁRIO OPERACIONAL (Ator Principal)
- **Papel:** Reservar produtos para levar ao vendedor
- **Responsabilidade:** Informar nome, quantidade e lote corretos e respeitar a quantidade disponível
- **Permissões:**
  - ✅ CREATE (registrar reserva)
  - ✅ READ (consultar o histórico de reservas)
  - ❌ UPDATE e DELETE (não altera nem cancela reservas; não acessa produtos, relatório nem usuários)

### 2. ADMINISTRADOR (Ator Secundário)
- **Papel:** Acompanhar o estoque e manter o catálogo
- **Responsabilidade:** Consultar o relatório, corrigir produtos e remover itens
- **Permissões:**
  - ✅ CREATE e READ de reservas (a tela está liberada para qualquer usuário logado)
  - ✅ READ no relatório, UPDATE (editar produto) e DELETE (excluir produto, com confirmação)

### 3. VENDEDOR (Ator Indireto)
- **Papel:** Recebe do operacional a mercadoria reservada
- **Responsabilidade:** Nenhuma tela própria nesta entrega; a conta "Vendedor" existe como tipo operacional
- **Permissões:** nenhuma ação direta neste fluxo

### 4. SISTEMA (Ator Automático)
- **Papel:** Validar, atualizar quantidades e calcular status
- **Responsabilidade:** Proteger as telas, localizar o produto por nome e lote, conferir a quantidade livre, somar ao reservado, gravar o histórico e calcular o status com `getStatus()`
- **Permissões:**
  - ✅ CREATE, READ, UPDATE e DELETE nas listas `produtos` e `reservas` (`localStorage`)

---

## 3️⃣ ESPECIFICAÇÃO DE CASOS DE USO (25%)

## UC-001: Reservar Produtos

### Pré-Condições
- ✅ Usuário autenticado (operacional ou administrador)
- ✅ Existe ao menos um produto cadastrado
- ✅ Navegador com `localStorage` habilitado

### Pós-Condições (Sucesso)
- ✅ O campo `reservado` do produto aumenta na quantidade reservada
- ✅ A reserva é gravada no histórico com data, produto, lote, quantidade e nome de quem reservou
- ✅ Relatório, status e Home refletem a nova reserva

### Pós-Condições (Falha)
- ✅ Mensagem de erro exibida em vermelho
- ✅ Nenhuma quantidade é alterada e nada é gravado no histórico

### Fluxo Principal
1. Operacional clica em "Reservar produtos" no menu
2. Sistema confere o login com `exigirLogin()` e abre a tela
3. Sistema exibe o formulário vazio, as sugestões de nome e o histórico de reservas
4. Operacional informa o nome do produto
5. Operacional informa a quantidade
6. Operacional informa o lote
7. Operacional clica em "Reservar produtos"
8. Sistema valida campos preenchidos e quantidade mínima de 1
9. Sistema localiza o produto pelo nome e lote
10. Sistema calcula a quantidade disponível (total menos reservado) e confere
11. Sistema soma a quantidade ao reservado e grava os produtos
12. Sistema grava a reserva no histórico com data e nome do usuário
13. Sistema exibe "Reserva realizada com sucesso!" e limpa o formulário
14. Sistema mostra a nova reserva no topo do histórico

### Fluxo Alternativo A1: Campos vazios
8a.1. Algum campo está vazio
8a.2. Sistema exibe "Preencha todos os campos."
8a.3. Operacional completa e envia de novo

### Fluxo Alternativo A2: Quantidade menor que 1
8b.1. Quantidade informada é zero ou negativa
8b.2. Sistema exibe "A quantidade deve ser pelo menos 1."
8b.3. Operacional corrige o valor

### Fluxo Alternativo A3: Produto não encontrado
9a.1. Não existe produto com esse nome e lote (maiúsculas e minúsculas contam igual)
9a.2. Sistema exibe "Não existe produto com esse nome e lote."
9a.3. Operacional confere o nome sugerido e o lote

### Fluxo Alternativo A4: Quantidade indisponível
10a.1. A quantidade pedida é maior que a disponível
10a.2. Sistema exibe "Quantidade indisponível. Disponível para reserva: N."
10a.3. Operacional reduz a quantidade ou escolhe outro lote

### Fluxo Alternativo A5: Usuário sem login
2a.1. Quem não está logado abre `reservas.html`
2a.2. Sistema limpa a sessão e redireciona para `index.html`

## UC-002: Consultar e Gerenciar o Relatório de Estoque

### Pré-Condições
- ✅ Usuário autenticado com tipo de acesso `admin`
- ✅ Navegador com `localStorage` habilitado

### Pós-Condições (Sucesso)
- ✅ Tabela exibida com o status atualizado de cada produto
- ✅ Em edição ou exclusão, a lista `produtos` é gravada com a alteração

### Pós-Condições (Falha)
- ✅ Usuário sem permissão é redirecionado e nenhum dado é exibido ou alterado
- ✅ Edição com dado inválido não grava e mostra o erro

### Fluxo Principal
1. Administrador clica em "Relatório de estoque" no menu
2. Sistema confere login e perfil com `exigirAdmin()`
3. Sistema lê a lista de produtos
4. Sistema calcula a quantidade livre de cada produto
5. Sistema define o status: Reservado, Em falta, Excedente ou Disponível
6. Sistema monta a tabela com Nome, Descrição, Tamanho, Quantidade, Status e Ações
7. Sistema mostra "(N reservados)" ao lado da quantidade quando houver reserva
8. Administrador consulta a tabela e identifica produtos em falta ou excedentes

### Fluxo Alternativo A1: Editar produto
8a.1. Administrador clica em "Editar" na linha
8a.2. Sistema abre `produtos.html` com o produto carregado no formulário
8a.3. Administrador altera os dados; sistema valida descrição (5 a 100 caracteres), tamanho (Único, P, M, G, GG), lote (3 a 20 caracteres) e quantidade não menor que a reservada
8a.4. Sistema grava e exibe "Produto atualizado com sucesso!"

### Fluxo Alternativo A2: Excluir produto
8b.1. Administrador clica em "Excluir" na linha
8b.2. Sistema pergunta "Excluir este produto?"
8b.3. Se confirmar, o produto é removido e a tabela atualizada; se cancelar, nada muda

### Fluxo Alternativo A3: Acesso não autorizado
2a.1. Usuário operacional abre `relatorio.html`
2a.2. Sistema exibe "Acesso restrito ao administrador." e redireciona para `home.html`

### Fluxo Alternativo A4: Sem produtos
6a.1. A lista de produtos está vazia
6a.2. Sistema exibe "Nenhum produto cadastrado."

### Regras de Negócio (RN)
**RN-01:** Nome, quantidade e lote são obrigatórios na reserva
**RN-02:** A quantidade reservada deve ser um número inteiro maior ou igual a 1
**RN-03:** O produto é identificado pelo nome e pelo lote, sem diferenciar maiúsculas de minúsculas
**RN-04:** A quantidade reservada não pode passar da disponível (quantidade total menos reservado)
**RN-05:** Toda reserva soma ao campo `reservado` do produto e grava um registro com data e nome de quem reservou
**RN-06:** O histórico mostra as reservas mais recentes primeiro
**RN-07:** Status: Reservado (todo o estoque reservado), Em falta (livre menor ou igual ao mínimo), Excedente (livre maior que 3 vezes o mínimo) e Disponível (demais casos)
**RN-08:** Relatório, edição e exclusão de produtos são exclusivos do administrador; a reserva é liberada a qualquer usuário logado
**RN-09:** Todo produto exige descrição de 5 a 100 caracteres, tamanho entre Único, P, M, G e GG e lote de 3 a 20 caracteres (letras, números e hífen)
**RN-10:** Na edição, a quantidade total não pode ficar menor que a já reservada
**RN-11:** A exclusão de produto exige confirmação do administrador
**RN-12:** Textos digitados são escapados antes de entrar na tabela, para não virarem HTML

### Requisitos Não-Funcionais (RNF)
**RNF-01:** Resposta imediata (abaixo de 1 segundo), pois tudo roda no navegador
**RNF-02:** Persistência local: produtos e reservas ficam no `localStorage` (chaves `produtos` e `reservas`) e sobrevivem ao recarregamento
**RNF-03:** Interface responsiva: formulário em 2 colunas que passa para 1 abaixo de 800 px e tabelas com rolagem horizontal
**RNF-04:** Usabilidade: sugestões de nome (`datalist`), etiquetas coloridas de status, mensagens verde e vermelha e legenda no texto de apoio
**RNF-05:** Acessibilidade básica: campos com `label`, tipos `number` com `min` e `step` e foco visível
**RNF-06:** Segurança limitada ao escopo acadêmico: bloqueio por perfil feito no navegador (pode ser contornado) e escape de HTML
**RNF-07:** Consistência visual: `estilo.css` compartilhado, na mesma paleta de todas as telas
**RNF-08:** Dados de demonstração: na primeira abertura são carregados 16 produtos e 12 reservas da Embalare, sem sobrescrever dados já cadastrados

---

## 4️⃣ PROTÓTIPOS/FLUXOS DE TELAS (HTML+CSS) (20%)

**Arquivo entregue:** `src/prototipos/SEMANA-08/RF-008-reserva-produto/index.html` (CSS embutido na tag `<style>`, sem dependências externas).

O protótipo tem uma barra superior para alternar entre 6 estados, na mesma identidade visual do sistema (fundo `#f7f3ef`, botões `#ffae58`, fonte Poppins com Arial de reserva). Usa `<main>`, `<section>`, `<label>`, `<nav>` e `role="status"`. O layout é responsivo: a grade de 2 colunas vira 1 abaixo de 600 px e as tabelas rolam na horizontal.

### Tela 1: Vazio (estado inicial)
```
┌──────────────────────────────────────────┐
│ Reservar produtos                        │
│ Nome [ Nome do produto ]                 │
│ Quantidade [ 0 ]       Lote [ L2026-01 ] │
│ [ Reservar produtos ]                    │
│ Reservas realizadas                      │
│ Nenhuma reserva realizada.               │
└──────────────────────────────────────────┘
```

### Tela 2: Preenchido
```
┌──────────────────────────────────────────┐
│ Nome [ Copo Descartável 200ml ] ✅       │
│ Quantidade [ 100 ] ✅  Lote [ L2026-01 ] ✅│
│ [ Reservar produtos ]                    │
└──────────────────────────────────────────┘
```

### Tela 3: Carregando
```
┌──────────────────────────────────────────┐
│ (campos preenchidos)                     │
│ ⟳ Registrando reserva                    │
└──────────────────────────────────────────┘
```
Observação: na implementação real a reserva é gravada na hora (local). O estado de carregando existe no protótipo para representar uma gravação em servidor.

### Tela 4: Erro
```
┌──────────────────────────────────────────┐
│ Quantidade [ 5000 ] ❌                   │
│ Quantidade indisponível. Disponível para │
│ reserva: 1050.                           │
└──────────────────────────────────────────┘
```

### Tela 5: Sucesso e histórico
```
┌─────────────────────────────────────────────────────┐
│ Reserva realizada com sucesso!                      │
│ Data        | Produto         | Lote     | Qtd | Por │
│ 24/10 08:35 | Pote 500ml      | L2026-06 | 15  | Vendedor│
│ 23/10 17:00 | Filme PVC 28cm  | L2026-06 | 10  | Carlos  │
└─────────────────────────────────────────────────────┘
```

### Tela 6: Relatório de estoque (administrador)
```
┌─────────────────────────────────────────────────────────────┐
│ Nome            | Descrição | Tam | Quantidade | Status | Ações│
│ Copo 200ml      | Pacote... | Único| 1200 (150 res.)| Disponível | Editar Excluir│
│ Garfo Cristal   | Caixa...  | Único| 90         | Em falta   | Editar Excluir│
│ Marmitex nº 12  | Caixa...  | G   | 180 (180 res.)| Reservado | Editar Excluir│
│ Touca TNT       | Pacote... | Único| 800        | Excedente  | Editar Excluir│
└─────────────────────────────────────────────────────────────┘
```
No protótipo e no sistema, cada status tem uma etiqueta colorida (verde, laranja, vermelha e azul).

### Descrição dos elementos
| Elemento | Função |
|----------|--------|
| Campo nome (com sugestões) | Escolhe o produto entre os cadastrados |
| Campo quantidade | Número inteiro, mínimo 1 |
| Campo lote | Junto com o nome, identifica o produto |
| Botão "Reservar produtos" | Valida e grava a reserva |
| Mensagem (`.msg`) | Erro em vermelho ou sucesso em verde |
| Tabela de histórico | Data, produto, lote, quantidade e quem reservou |
| Tabela do relatório | Nome, descrição, tamanho, quantidade, status e ações |
| Etiqueta de status | Reservado, Em falta, Disponível ou Excedente |
| Botões "Editar" e "Excluir" | Abrem o produto no formulário ou removem com confirmação |

### Fluxo de navegação
`Login` → `Home` → menu "Reservar produtos" → `reservas.html` (formulário e histórico). Para o administrador: menu "Relatório de estoque" → `relatorio.html` → "Editar" → `produtos.html?editar=id` ("Registrar produto" ou "Salvar alterações") → volta ao menu. Operacional não vê Produtos, Relatório e Usuários no menu.

---

## 5️⃣ ARQUITETURA E ADR (20%)

## Arquitetura da Solução

### Diagrama de Componentes

```
┌────────────────────────────────────────┐
│ Navegador (front-end)                  │
│                                        │
│  reservas.html   relatorio.html        │
│  produtos.html   home.html             │
│        │ usam                          │
│        ▼                               │
│  dados.js                              │
│  getProdutos() salvarProdutos()        │
│  getReservas() salvarReservas()        │
│  getStatus()   exigirLogin()           │
│  exigirAdmin() escapar()               │
│        │                               │
│        ▼                               │
│  localStorage["produtos"]              │
│  localStorage["reservas"]              │
│  sessionStorage (login e perfil)       │
│                                        │
│  estilo.css (estilos comuns)           │
└────────────────────────────────────────┘
```

### Fluxo de Dados
1. Ao abrir o sistema, `dados.js` carrega os dados de exemplo da Embalare apenas na primeira vez
2. `reservas.html` confere o login e monta as sugestões de nome a partir de `getProdutos()`
3. No envio, o sistema valida os campos e localiza o produto por nome e lote
4. Se houver quantidade livre, soma ao `reservado` do produto e grava com `salvarProdutos()`
5. A reserva é adicionada à lista e gravada com `salvarReservas()`; o histórico é redesenhado
6. `relatorio.html` e `home.html` leem os produtos e aplicam `getStatus()` para mostrar situação, etiquetas e totais

```javascript
// Trecho real do dados.js: status calculado a partir da quantidade livre
function getStatus(p) {
  const reservado = p.reservado || 0;
  const livre = p.quantidade - reservado;

  if (reservado > 0 && livre <= 0) return "Reservado";
  if (livre <= p.minimo) return "Em falta";
  if (p.minimo > 0 && livre > p.minimo * FATOR_EXCEDENTE) return "Excedente";
  return "Disponível";
}
```

### Padrão de Design
- **Camada de dados centralizada** em `dados.js`, usada por todas as telas
- **Regra de negócio única** para o status, reaproveitada pelo relatório e pela Home
- **Guardas de rota** (`exigirLogin()` e `exigirAdmin()`) no início de cada tela

### ADR-001: Reserva como campo no produto mais um histórico separado

**Status:** ACEITO

**Contexto:** É preciso saber rápido quanto de cada produto está reservado e também quem reservou, quando e quanto.

**Decisão:** Guardar o total no campo `reservado` do produto (`produtos`) e cada reserva como registro em `reservas`.

**Alternativas:**
- Só o histórico, somando as reservas a cada consulta: mais lento e mais código
- Só o campo no produto: perde quem reservou e quando

**Consequências:** ✅ Relatório e Home leem o total direto, ✅ Histórico completo, ⚠️ Os dois dados precisam andar juntos, ⚠️ Excluir produto não limpa as reservas dele

### ADR-002: Status calculado por uma função única

**Status:** ACEITO

**Contexto:** Relatório e Home precisam classificar os produtos do mesmo jeito.

**Decisão:** Criar `getStatus()` em `dados.js`, com o fator de excedente (`FATOR_EXCEDENTE = 3`) fácil de ajustar.

**Alternativas:** Calcular em cada tela (risco de regras diferentes), guardar o status no produto (fica desatualizado)

**Consequências:** ✅ Uma regra só, ✅ Fácil de mudar, ⚠️ O cálculo roda a cada abertura da tela

### ADR-003: Produto identificado por nome e lote na reserva

**Status:** ACEITO

**Contexto:** O mesmo nome existe em lotes e tamanhos diferentes (por exemplo, a luva P, M e G, ou o copo em lotes distintos).

**Decisão:** A reserva localiza o produto pelo par nome e lote, sem diferenciar maiúsculas de minúsculas.

**Alternativas:** Escolher pelo código (mais exato, mas o operacional lê o lote na caixa), escolher só pelo nome (ambíguo)

**Consequências:** ✅ Combina com o trabalho de separação, ✅ Evita reservar o lote errado, ⚠️ Dois produtos com mesmo nome e lote seriam ambíguos

### ADR-004: Edição a partir do relatório reaproveitando o formulário de produtos

**Status:** ACEITO

**Contexto:** O relatório precisa de "Editar" por linha, e o formulário de produto já existe e valida os campos.

**Decisão:** O botão "Editar" abre `produtos.html?editar=id`, que carrega o produto no formulário.

**Alternativas:** Editar na própria tabela (duplica as validações), janela modal (mais código e CSS)

**Consequências:** ✅ Validações em um só lugar, ✅ Menos código, ⚠️ Troca de página ao editar

---

## Tecnologias Escolhidas

| Camada | Tecnologia | Versão | Justificativa |
|--------|-----------|--------|---------------|
| Interface | HTML5 + CSS3 | Padrão atual | Grid e media queries para responsividade |
| Lógica | JavaScript | ES2015+ | Roda direto no navegador, sem build |
| Persistência | localStorage | Web Storage API | Dispensa servidor e banco |
| Sessão | sessionStorage | Web Storage API | Guarda quem está logado e o perfil |
| Fonte | Poppins (Google Fonts) | 400 a 700 | Identidade visual do sistema, com Arial de reserva |

### Melhorias Futuras (limitações conhecidas)
- Permitir cancelar uma reserva, devolvendo a quantidade ao estoque livre
- Informar na reserva o vendedor que vai receber a mercadoria
- Ao excluir um produto, tratar as reservas dele no histórico
- Incluir o item "Reservar produtos" no menu de `usuarios.html`
- Liberar o relatório, somente para consulta, a vendedores e operacionais (RF-009)
- Validar acesso e dados em um servidor, e não só no navegador

---

## 6️⃣ QUALIDADE E CONFORMIDADE (10%)

### Checklist de Qualidade

- [x] Texto revisado, sem erros ortográficos ou gramaticais
- [x] Markdown estruturado com títulos, tabelas e listas consistentes
- [x] Código com syntax highlighting (```javascript)
- [x] Diagramas em ASCII legíveis
- [x] Nenhuma seção pendente ou vazia
- [x] Referências internas consistentes (RF-008, UC-001 e UC-002, RN-01 a RN-12, RNF-01 a RNF-08, ADR-001 a ADR-004)
- [x] Descrição fiel ao código entregue (`reservas.html`, `relatorio.html`, `produtos.html`, `dados.js`), com as limitações declaradas

---

## ✅ CHECKLIST FINAL — PERCENTUAIS (Total = 100%)

```
TÓPICO 1: IDENTIFICAÇÃO DO REQUISITO (10%)
☑ ID do requisito presente (RF-008)
☑ Título claro e descritivo
☑ Tipo identificado (Funcional)
☑ Prioridade definida (Alta)
☑ Complexidade estimada em story points (3)
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
☑ Fluxo principal com 8+ passos (14 passos no UC-001 e 8 no UC-002)
☑ Mínimo 3 fluxos alternativos (A1 a A5 no UC-001 e A1 a A4 no UC-002)
☑ Mínimo 6 Regras de Negócio (12 RN)
☑ Mínimo 6 Requisitos Não-funcionais (8 RNF)
STATUS: 10/10 | Atingido: 25%

TÓPICO 4: PROTÓTIPOS/TELAS (HTML+CSS) (20%) ⚠️ OBRIGATÓRIO
☑ Arquivo index.html com CSS embutido criado
☑ Arquivo entregue em src/prototipos/SEMANA-08/RF-008-reserva-produto/index.html
☑ HTML semanticamente correto
☑ CSS responsivo (mobile + desktop)
☑ Mínimo 3 telas representadas (vazio, preenchido, erro, mais carregando, sucesso e relatório)
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

**Entrega Semanal de Requisitos — Semana 08**
**Laboratório de Inovação Prof. Edilberto Silva — 2026**
