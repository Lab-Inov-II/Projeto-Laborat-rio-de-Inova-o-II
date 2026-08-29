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
seu-projeto-arquitetura/
├── docs/
│   ├── requisitos-semanais/
│   │   ├── SEMANA-01/
│   │   │   ├── RF-001-login-usuario.md
│   │   │── SEMANA-02/
│   │   │   ├── RF-002-Menu-lateral.md
│   │   │── SEMANA-03/
│   │   │   └── RF-003-tela-home.md
│   │   ├── SEMANA-04/
│   │   │   ├── RF-004-cadastro-vendedor.md
│   │   │── SEMANA-05/
│   │   │   └── RF-005-cadastro-clientes.md
│   │   ├── SEMANA-06/
│   │   │   ├── RF-006-cadastro-produto.md
│   │   │── SEMANA-07/
│   │   │   └── RF-007-reserva-produto.md
│   │   │── SEMANA-08/
│   │   │   └── RF-008-Relatorio-estoque-vendedor.md 
│   │   │── SEMANA-09/
│   │   │   └── RF-009-Relatorio-estoque-admin.md
│   │   │── SEMANA-10/
│   │   │   └── RF-010-Perfil-vendedor.md
│   │  
│   ├── prototipos/
│   │   ├── SEMANA-01/
│   │   │   ├── RF-001-login-usuario/
│   │   │   │   ├── index.html
│   │   │── SEMANA-02/
│   │   │   ├── RF-002-Menu-lateral/
│   │   │   │   ├── index.html
│   │   │── SEMANA-03/
│   │   │   ├── RF-003-tela-home/
│   │   │   │   ├── index.html
│   │   │── SEMANA-04/
│   │   │   ├── RF-004-cadastro-vendedor/
│   │   │   │   ├── index.html
│   │   │── SEMANA-05/
│   │   │   ├── RF-005-cadastro-clientes/
│   │   │   │   ├── index.html
│   │   │── SEMANA-06/
│   │   │   ├── RF-006-cadastro-produto/
│   │   │   │   ├── index.html
│   │   │── SEMANA-07/
│   │   │   ├── RF-007-reserva-produto/
│   │   │   │   ├── index.html
│   │   │── SEMANA-08/
│   │   │   ├── RF-008-Relatorio-estoque-vendedor/
│   │   │   │   ├── index.html
│   │   │── SEMANA-09/
│   │   │   ├── RF-009-Relatorio-estoque-admin/
│   │   │   │   ├── index.html
│   │   │── SEMANA-10/
│   │   │   ├── RF-010-Perfil-vendedor/
│   │   │   │   ├── index.html
```

**Localização deste arquivo:**  
`docs/requisitos-semanais/SEMANA-01/RF-001-login-usuario.md`

**Localização do Protótipo HTML+CSS:**  
`src/prototipos/SEMANA-01/RF-001-login-usuario/index.html` ⚠️ **OBRIGATÓRIO**

⚠️ **ATENÇÃO ALUNOS:** Os arquivos MD e HTML (com CSS embutido) devem ser entregues ao professor. Se o arquivo `index.html` não existir, você **NÃO receberá pontuação** no tópico 4 (Protótipos/Telas)!

---

## 📊 PONTUAÇÃO POR TÓPICO (Total = 100%)

| # | Tópico | Percentual | Obrigatoriedade | Status |
|---|--------|-----------|-----------------|--------|
| 1 | **Identificação do Requisito** | 10% | Obrigatório | [ ] |
| 2 | **Descrição e Atores** | 15% | Obrigatório | [ ] |
| 3 | **Especificação de Casos de Uso** | 25% | Obrigatório | [ ] |
| 4 | **Protótipos/Telas (HTML+CSS)** | 20% | **OBRIGATÓRIO** ⚠️ | [ ] |
| 5 | **Arquitetura e ADR** | 20% | Obrigatório | [ ] |
| 6 | **Qualidade e Conformidade** | 10% | Obrigatório | [ ] |
| | **TOTAL** | **100%** | | |

⚠️ **IMPORTANTE:** O arquivo `src/prototipos/SEMANA-XX/RF-NNN/index.html` com CSS embutido DEVE ser entregue ao professor. Se não existir, você recebe **0%** no tópico 4!

---

## 1️⃣ IDENTIFICAÇÃO DO REQUISITO (10%)

**Objetivo:** Identificar claramente o requisito, seu tipo e prioridade.

**O que avaliar:**
- ✅ ID do requisito está presente (RF-XXX)
- ✅ Título claro e conciso
- ✅ Tipo identificado (Funcional/Não-Funcional)
- ✅ Prioridade definida (Alta/Média/Baixa)
- ✅ Complexidade estimada

### Exemplo Completo (10/10):

```markdown
### RF-001: Cadastro de Hóspede

**ID:** RF-001  
**Título:** Criar a tela de login no sistema  
**Tipo:** Requisito Funcional  
**Prioridade:** MÉDIA (Layout visual será definido com esta tela)  
**Complexidade:** BAIXA (estimado 3 story points)  
**Status:** EM DESENVOLVIMENTO  
**Data de Criação:** 25/08/2026  
**Última Atualização:** 28/08/2026  

**Breve Descrição:**  
Uma interface gráfica que irá permitir que os usuários preencham os campos de login (email, senha) para acessar as funcionalidades do sistema.
```

**CRITÉRIOS DE ACEITE PARA 10/10:**
- ✅ ID formatado corretamente (RF-NNN)
- ✅ Título descritivo (não genérico)
- ✅ Tipo claramente identificado
- ✅ Prioridade justificada
- ✅ Complexidade estimada

**PENALIDADES:**
- ❌ Falta ID (-25%)
- ❌ Título vago (-20%)
- ❌ Tipo não identificado (-20%)
- ❌ Sem prioridade (-15%)

---

## 2️⃣ DESCRIÇÃO E ATORES (15%)

**Objetivo:** Descrever o requisito com clareza e identificar todos os atores envolvidos.

**O que avaliar:**
- ✅ Descrição detalhada do requisito
- ✅ Objetivo do negócio claro
- ✅ Todos os atores identificados
- ✅ Papel de cada ator descrito
- ✅ Benefício para cada ator

### Exemplo Completo (10/10):

```markdown
## Descrição Detalhada

**Por que este requisito existe?**  
O sistema precisa gerenciar informações de hóspedes para:
- Manter histórico de clientes
- Personalizar atendimento
- Gerar relatórios de ocupação
- Facilitar check-in/check-out
- Cumprir regulamentações de hospedagem

**Contexto do Negócio:**  
Hotel precisa registrar dados de todos os hóspedes que chegam, coletando informações essenciais para contato e identificação.

---

## Atores do Sistema

### 1. RECEPCIONISTA (Ator Principal)
- **Papel:** Cadastrar novo hóspede
- **Responsabilidade:** Inserir dados corretos, validar informações
- **Permissões:** 
  - ✅ CREATE (criar novo hóspede)
  - ✅ READ (visualizar dados)
  - ❌ UPDATE (não pode editar dados de outros)
  - ❌ DELETE (não pode deletar)

### 2. GERENTE (Ator Secundário)
- **Papel:** Revisar e corrigir dados de hóspedes
- **Responsabilidade:** Supervisionar cadastros, resolver inconsistências
- **Permissões:**
  - ✅ CREATE, READ, UPDATE, DELETE

### 3. SISTEMA (Ator Automático)
- **Papel:** Validar dados, armazenar seguramente
- **Responsabilidade:** Validar formato, aplicar regras de negócio
- **Permissões:**
  - ✅ Todas operações
```

**CRITÉRIOS DE ACEITE PARA 10/10:**
- ✅ Descrição com 3+ benefícios de negócio
- ✅ Mínimo 3 atores descritos
- ✅ Papel de cada ator claro
- ✅ Permissões bem definidas

---

## 3️⃣ ESPECIFICAÇÃO DE CASOS DE USO (25%)

**Objetivo:** Descrever detalhadamente como o requisito é executado.

**O que avaliar:**
- ✅ Pré-condições definidas
- ✅ Pós-condições definidas (sucesso e falha)
- ✅ Fluxo principal com 8+ passos
- ✅ Fluxos alternativos (A1, A2, A3...)
- ✅ Regras de negócio (RN-XX)
- ✅ Requisitos Não-Funcionais (RNF-XX)

### Exemplo Completo (10/10):

```markdown
## UC-001: Realizar Cadastro de Hóspede

### Pré-Condições
- ✅ Recepcionista autenticado no sistema
- ✅ Dados de conexão disponíveis
- ✅ Banco de dados funcionando

### Pós-Condições (Sucesso)
- ✅ Hóspede registrado com ID único
- ✅ Confirmação enviada por email
- ✅ Histórico de cadastro registrado

### Pós-Condições (Falha)
- ✅ Mensagem de erro exibida
- ✅ Dados não salvos
- ✅ Tentativa registrada em log

### Fluxo Principal
1. Recepcionista clica em "Novo Hóspede"
2. Sistema exibe formulário vazio
3. Recepcionista preenche nome
4. Sistema valida formato do nome
5. Recepcionista preenche email
6. Sistema valida formato do email
7. Recepcionista clica "Salvar"
8. Sistema valida todos os campos
9. Sistema salva no banco de dados
10. Sistema exibe mensagem de sucesso
11. Recepcionista vê novo hóspede na lista

### Fluxo Alternativo A1: Email já cadastrado
6a.1. Sistema detecta email duplicado
6a.2. Exibe mensagem de erro
6a.3. Usuário pode tentar outro email ou ligar para suporte

### Fluxo Alternativo A2: Conexão de rede falha
8a.1. Sistema tenta 3 vezes (retry automático)
8a.2. Se falhar: exibe erro de conexão
8a.3. Usuário pode tentar novamente

### Regras de Negócio (RN)
**RN-01:** Email deve ser único no sistema
**RN-02:** CPF deve ser validado (algoritmo módulo 11)
**RN-03:** Data de nascimento não pode ser futura
**RN-04:** Telefone deve ter 11 dígitos (Brasil)
**RN-05:** Nome não pode estar vazio
**RN-06:** Dados sensíveis criptografados em repouso
**RN-07:** Histórico mantido por 5 anos

### Requisitos Não-Funcionais (RNF)
**RNF-01:** Resposta < 2 segundos
**RNF-02:** Suporta 1000+ hóspedes
**RNF-03:** Backup diário automático
**RNF-04:** Modo offline com sincronização
**RNF-05:** HTTPS obrigatório
**RNF-06:** WCAG 2.1 (acessibilidade)
```

**CRITÉRIOS DE ACEITE PARA 10/10:**
- ✅ Fluxo principal com 8+ passos
- ✅ Mínimo 3 fluxos alternativos
- ✅ Mínimo 6 Regras de Negócio
- ✅ Mínimo 6 Requisitos Não-Funcionais

---

## 4️⃣ PROTÓTIPOS/FLUXOS DE TELAS (HTML+CSS) (20%)

**Objetivo:** Visualizar como o requisito aparece na interface do usuário com protótipo HTML+CSS.

**⚠️ OBRIGATORIEDADE:**
- ✅ Arquivo `index.html` com CSS embutido DEVE ser entregue ao professor
- ✅ Arquivo deve estar em: `src/prototipos/SEMANA-XX/RF-NNN-nome-requisito/index.html`
- ✅ Se o arquivo NÃO for entregue → **você recebe 0% neste tópico**
- ✅ O professor pode verificar o link do GitHub conforme necessário

**O que avaliar:**
- ✅ Arquivo HTML+CSS entregue
- ✅ Telas: vazio, preenchido, erro, carregando
- ✅ HTML semanticamente correto
- ✅ CSS responsivo (mobile + desktop)
- ✅ Descrição de cada elemento
- ✅ Fluxo de navegação
- ✅ Estados diferentes (normal, erro, loading)

### Mockup/Descrição das Telas

**Tela 1: Formulário Vazio (Estado Inicial)**
```
┌─────────────────────────────────────┐
│  Login                              │
├─────────────────────────────────────┤
│                                     │
│ Email: [________________]           │
│                                     │
│ senha: [________________]           │
│                                     │
│ [x] [ Lembrar-me ]                  │
│                                     │
│ [ Entrar ]  [ Esqueci a senha ]     │
│                                     │
└─────────────────────────────────────┘
```

**Tela 2: Formulário Preenchido (Validação Visual)**
```
┌─────────────────────────────────────┐
│  Login                              │
├─────────────────────────────────────┤
│                                     │
│ Email: [teste@teste.com.br] ✅      │
│                                     │
│ senha: [**********] ✅              │
│                                     │
│ [x] [ Lembrar-me ]                  │
│                                     │
│ [ Entrar ]  [ Esqueci a senha ]     │
│                                     │
└─────────────────────────────────────┘
```

**Tela 3: Carregando (Processando)**
```
┌─────────────────────────────────────┐
│  Login                              │
├─────────────────────────────────────┤
│                                     │
│  Logando...                         │
│  ⟳ (spinner de carregamento)       │
│                                     │
│  [ CANCELAR ]                       │
│                                     │
└─────────────────────────────────────┘
```

**Tela 4: Erro de Validação**
```
┌─────────────────────────────────────┐
│  Login                              │
├─────────────────────────────────────┤
│                                     │
│ Email: [testedasilva] ❌ E-mail invalido │
│                                     │
│ senha: [********]  ✅               │
│                                     │
│ [x] [ Lembrar-me ]                  │
│                                     │
│ [ Entrar ]  [ Esqueci a senha ]     │
│                                     │
└─────────────────────────────────────┘
```

---

**CRITÉRIOS DE ACEITE PARA 10/10 (20%):**
- ✅ Arquivo index.html com CSS entregue ao professor
- ✅ 4 telas diferentes (vazio, preenchido, carregando, erro)
- ✅ HTML semanticamente correto
- ✅ CSS responsivo (mobile 320px, desktop 1024px)
- ✅ Validação visual (borda verde/vermelha)
- ✅ Mensagens de erro claras
- ✅ Estados diferentes bem definidos
- ✅ Spinner de carregamento

---

## 5️⃣ ARQUITETURA E ADR (20%)

**Objetivo:** Descrever como o requisito será implementado.

**O que avaliar:**
- ✅ Diagrama de arquitetura (componentes)
- ✅ ADR (Architecture Decision Record)
- ✅ Padrão de design utilizado
- ✅ Tecnologias escolhidas
- ✅ Justificativas técnicas

## Arquitetura da Solução

### Diagrama de Componentes

```
┌──────────────────┐
│   Frontend       │ (HTML+CSS+JS)
│Gestao de Produtos│
└──────┬───────────┘
       │ HTTPS
       ▼
┌──────────────────┐
│ API REST Backend │ (Express.js)
│ POST /produtos   │
└──────┬───────────┘
       │ Validações & Regras de negócio
       ▼
┌──────────────────┐
│  PostgreSQL BD   │ (ACID Transactions)
│  Tabela: produtos│
└──────────────────┘
```

### ADR-001: PostgreSQL como Banco de Dados

**Status:** ACEITO

**Contexto**: Operações de movimentação de estoque (entradas, saídas e controle de lote/validade) exigem alta consistência, integridade referencial e transações ACID para evitar furos de inventário.

**Decisão:** Usar PostgreSQL 14+ para armazenar dados do sistema (produtos, clientes, pedidos e lotes de descartáveis). 

**Alternativas:**
- MySQL: Suporta ACID, mas possui recursos avançados de concorrência e extensões menos robustos que o PostgreSQL.
- MongoDB: Modelo noSQL flexível, porém sem a garantia de integridade referencial nativa indispensável para transações financeiras e de estoque.

**Consequências**: ✅ Integridade de dados garantida, ✅ Excelente suporte a concorrência de acessos, ⚠️ Requer modelagem relacional rigorosa e administração de BD.

### ADR-002: Bcrypt para Senhas

**Status:** ACEITO

**Contexto:** Autenticação segura de usuários (operadores de estoque, gerentes e clientes distribuidores) com armazenamento irreversível de credenciais.

**Decisão:** Usar bcrypt com 12 rounds de salt para criptografia de senhas no backend.

**Alternativas:** Scrypt, PBKDF2

**Consequências:** ✅ Conformidade com recomendações OWASP, ✅ Custo computacional adaptativo contra ataques de força bruta, ⚠️ Maior processamento no servidor durante o login.

### ADR-003: REST API com Express.js

**Status:** ACEITO

**Contexto:** Necessidade de criar rotas leves e de rápida resposta para operações frequentes no estoque (leitura de código de barras, atualização de lote, emissão de pedidos).

**Decisão:** Usar Express.js 4.18+ com Node.js 18 LTS para estruturação da API REST.

**Alternativas:** Django (Python), Ruby on Rails

**Consequências:** ✅ Desenvolvimento ágil com ecossistema JavaScript full-stack, ✅ Baixa latência nas requisições, ⚠️ Necessidade de arquitetura bem definida para evitar código acoplado.

---

## Tecnologias Escolhidas

| Camada | Tecnologia | Versão | Justificativa |
|--------|-----------|--------|---------------|
| Frontend | HTML5 + CSS3 + JavaScript | ES2015+ | Padrão web, leve e de fácil integração com telas de gestão de estoque. |
| Backend | Express.js | 4.18+ | Framework minimalista e de alta performance para criação da API REST. |
| BD | PostgreSQL | 14+ | Garantia de transações ACID e forte integridade relacional para dados de inventário. |
| Hash | bcrypt | 5+ | Padrão da indústria recomendado pela OWASP para proteção de senhas. |
| Validação | express-validator | 7+ | Validação robusta de payloads na API (ex: quantidade positiva, formatos de SKU). |

---

**CRITÉRIOS DE ACEITE PARA 10/10 (20%):**
- ✅ Diagrama de componentes claro
- ✅ 3+ ADRs com Status, Contexto, Decisão, Alternativas, Consequências
- ✅ Tecnologias justificadas
- ✅ Fluxo de dados documentado

---

## 6️⃣ QUALIDADE E CONFORMIDADE (10%)

**Objetivo:** Verificar se o documento segue padrões de qualidade.

**O que avaliar:**
- ✅ Sem erros ortográficos ou gramaticais
- ✅ Markdown bem formatado
- ✅ Links funcionam (se houver)
- ✅ Exemplos têm código com sintaxe correta
- ✅ Tamanho apropriado

### Checklist de Qualidade (10/10):

```markdown
- [x] Sem erros ortográficos (revisado)
- [x] Sem erros gramaticais
- [x] Markdown renderiza corretamente no GitHub
- [x] Código está com syntax highlighting (```language)
- [x] Diagramas ASCII art são legíveis
- [x] Nenhuma seção está com "TODO" ou "..."
- [x] Documento tem tamanho apropriado (3-5 páginas)
- [x] Referências internas consistentes (RF-XXX, UC-XXX, RN-XX, RNF-XX)
- [x] Formatação consistente (títulos, listas, espaçamento)
```

**PENALIDADES:**
- ❌ Mais de 5 typos (-20%)
- ❌ Markdown não renderiza bem (-15%)
- ❌ Código sem syntax highlighting (-10%)
- ❌ Referências inconsistentes (-15%)

---

## 📊 RESUMO DE PONTUAÇÃO

```
┌─────────────────────────────────────┬────────┬──────────────┐
│ Tópico                              │ Peso   │ Seu Score    │
├─────────────────────────────────────┼────────┼──────────────┤
│ 1. Identificação do Requisito        │ 10%    │ 10/10        │
│ 2. Descrição e Atores                │ 15%    │ 15/15        │
│ 3. Especificação de Casos de Uso     │ 25%    │ 25/25        │
│ 4. Protótipos/Telas (HTML+CSS)       │ 20%    │ 20/20        │
│ 5. Arquitetura e ADR                 │ 20%    │ 20/20        │
│ 6. Qualidade e Conformidade          │ 10%    │ 10/10        │
├─────────────────────────────────────┼────────┼──────────────┤
│ TOTAL                               │ 100%   │ 100/100      │
└─────────────────────────────────────┴────────┴──────────────┘
```

**Fórmula de Cálculo:**
```
Score Total (%) = (T1×10%) + (T2×15%) + (T3×25%) + (T4×20%) + (T5×20%) + (T6×10%)
                = Score de 0% a 100%

Exemplo desta entrega:
T1: 10/10 = 10%
T2: 10/10 = 15%
T3: 10/10 = 25%
T4: 10/10 = 20% (arquivo HTML entregue ✅)
T5: 10/10 = 20%
T6: 10/10 = 10%
─────────────────
TOTAL     = 100% ✅ ACEITO
```

---

## ✅ INSTRUÇÕES FINAIS E CHECKLIST

### Para o Aluno:

1. **Copie este arquivo** e renomeie:
   - Exemplo: `docs/requisitos-semanais/SEMANA-01/RF-001-validar-credencial.md`

2. **Preencha cada tópico** seguindo os exemplos fornecidos

3. **CRIE O PROTÓTIPO HTML+CSS:**
   - Pasta: `src/prototipos/SEMANA-01/RF-001-validar-credencial/`
   - Arquivo obrigatório: `index.html`
   - CSS embutido no arquivo HTML (style tag)
   - ⚠️ **SEM ESTE ARQUIVO, VOCÊ RECEBE 0% NO TÓPICO 4**

4. **Entregue os dois arquivos ao professor:**
   - Arquivo MD: `RF-001-validar-credencial.md`
   - Arquivo HTML: `index.html` (com CSS embutido)

5. **Remova os comentários de exemplo** (mantenha apenas seus dados)

6. **Valide o Checklist Final:**
   - ✅ Sem seções vazias
   - ✅ Sem "TODO"
   - ✅ Markdown renderiza bem
   - ✅ Arquivo `index.html` criado com CSS embutido
   - ✅ Nenhuma referência quebrada

7. **Preencha o Checklist Percentual ao Final:**

---

## ✅ CHECKLIST FINAL — PERCENTUAIS (Total = 100%)

Preencha este checklist ao finalizar sua entrega:

```
TÓPICO 1: IDENTIFICAÇÃO DO REQUISITO (10%)
═══════════════════════════════════════════
☑ ID do requisito presente (RF-XXX)
☑ Título claro e descritivo
☑ Tipo identificado (Funcional/Não-Funcional)
☑ Prioridade definida (Alta/Média/Baixa)
☑ Complexidade estimada em story points

STATUS: 10/10 | Atingido: 10%

---

TÓPICO 2: DESCRIÇÃO E ATORES (15%)
═══════════════════════════════════
☑ Descrição detalhada do requisito
☑ Objetivo de negócio claro
☑ Mínimo 3 atores identificados
☑ Papel e responsabilidade de cada ator
☑ Permissões mapeadas (CREATE/READ/UPDATE/DELETE)

STATUS: 10/10 | Atingido: 15%

---

TÓPICO 3: ESPECIFICAÇÃO DE CASOS DE USO (25%)
═════════════════════════════════════════════════
☑ Pré-condições definidas
☑ Pós-condições definidas (sucesso e falha)
☑ Fluxo principal com 8+ passos
☑ Mínimo 3 fluxos alternativos (A1, A2, A3)
☑ Mínimo 6 Regras de Negócio (RN-XX)
☑ Mínimo 6 Requisitos Não-funcionais (RNF-XX)

STATUS: 10/10 | Atingido: 25%

---

TÓPICO 4: PROTÓTIPOS/TELAS (HTML+CSS) (20%) ⚠️ OBRIGATÓRIO
═════════════════════════════════════════════════════════════
☑ Arquivo `index.html` com CSS embutido criado
☑ Arquivo será entregue ao professor
☑ HTML semanticamente correto
☑ CSS responsivo (mobile + desktop)
☑ Mínimo 3 telas representadas (vazio, preenchido, erro)
☑ Descrição de cada elemento
☑ Fluxo de navegação documentado
☑ Estados diferentes (normal, erro, loading)

⚠️ SE O ARQUIVO index.html NÃO FOR ENTREGUE: VOCÊ RECEBE 0% NESTE TÓPICO!

STATUS: 10/10 | Atingido: 20%

---

TÓPICO 5: ARQUITETURA E ADR (20%)
═════════════════════════════════
☑ Diagrama de arquitetura claro (componentes)
☑ Mínimo 3 ADRs estruturados
☑ Cada ADR tem: Status, Contexto, Decisão, Alternativas, Consequências
☑ Padrão de design utilizado documentado
☑ Tecnologias escolhidas com justificativas
☑ Fluxo de dados documentado

STATUS: 10/10 | Atingido: 20%

---

TÓPICO 6: QUALIDADE E CONFORMIDADE (10%)
═════════════════════════════════════════
☑ Sem erros ortográficos graves
☑ Markdown renderiza corretamente no GitHub
☑ Código com syntax highlighting (```language)
☑ Nenhuma seção com "TODO" ou "..."
☑ Referências internas consistentes (RF-X, UC-X, RN-X, RNF-X)

STATUS: 10/10 | Atingido: 10%

---

RESULTADO FINAL
═══════════════════════════════════════════════════════════════════

T1 (10%):  10/10 × 10% = 10% do total
T2 (15%):  10/10 × 15% = 15% do total
T3 (25%):  10/10 × 25% = 25% do total
T4 (20%):  10/10 × 20% = 20% do total (arquivo HTML entregue: ✅)
T5 (20%):  10/10 × 20% = 20% do total
T6 (10%):  10/10 × 10% = 10% do total
           ─────────────────────────────
TOTAL:     100% ÷ 100% = 100% FINAL

✅ ACEITO (≥ 70%) - EXCELENTE ENTREGA!
```

8. **Commit no Git (se usar GitHub):**
   ```bash
   git add docs/requisitos-semanais/SEMANA-01/RF-001-validar-credencial.md
   git add src/prototipos/SEMANA-01/RF-001-validar-credencial/index.html
   git commit -m "[SEMANA-01] RF-001 Validar Credencial + Protótipo HTML+CSS"
   git push
   ```

9. **Entregue no moodle para o professor** os dois arquivos:
   - Arquivo Markdown: `RF-001-validar-credencial.md`
   - Arquivo HTML: `index.html` (com CSS embutido)

---

**Template v12.2 — Entrega Semanal de Requisitos**  
**Laboratório de Inovação Prof. Edilberto Silva — 2026**

*"Cada entrega vale 100%. Seja minucioso, justificado, exemplificado!"*

*"Fé, Força e Foco!"*
