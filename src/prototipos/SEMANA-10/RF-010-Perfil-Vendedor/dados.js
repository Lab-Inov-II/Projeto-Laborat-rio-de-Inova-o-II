const usuariosPadrao = [
  { email: "admin@estoque.com", senha: "admin123", nome: "Admin", tipo: "admin" },
  { email: "vendedor@estoque.com", senha: "vendedor123", nome: "Vendedor", tipo: "operacional" },
  // Equipe fictícia da Embalare
  { email: "marina@embalare.com.br", senha: "embalare123", nome: "Marina Souza", tipo: "admin" },
  { email: "carlos@embalare.com.br", senha: "embalare123", nome: "Carlos Mendes", tipo: "operacional" }
];

const salvarUsuarios = (lista) => localStorage.setItem("usuarios", JSON.stringify(lista));

const getUsuarios = () => {
  if (!localStorage.getItem("usuarios")) salvarUsuarios(usuariosPadrao);
  return JSON.parse(localStorage.getItem("usuarios"));
};

// ---------- PRODUTOS ----------
// Cada produto: id, codigo, nome, descricao, categoria, tamanho, lote,
// preco, quantidade (total em estoque), reservado, minimo
const getProdutos = () => JSON.parse(localStorage.getItem("produtos") || "[]");
const salvarProdutos = (lista) => localStorage.setItem("produtos", JSON.stringify(lista));

// Tamanhos aceitos no cadastro (usado na validação)
const TAMANHOS = ["Único", "P", "M", "G", "GG"];

// ---------- RESERVAS (RF08) ----------
const getReservas = () => JSON.parse(localStorage.getItem("reservas") || "[]");
const salvarReservas = (lista) => localStorage.setItem("reservas", JSON.stringify(lista));

// ---------- STATUS DO PRODUTO (RF09) ----------
// Excedente = quantidade livre maior que 3x o estoque mínimo (regra ajustável)
const FATOR_EXCEDENTE = 3;

function getStatus(p) {
  const reservado = p.reservado || 0;
  const livre = p.quantidade - reservado;

  if (reservado > 0 && livre <= 0) return "Reservado";   // tudo reservado
  if (livre <= p.minimo) return "Em falta";              // abaixo (ou igual) ao mínimo
  if (p.minimo > 0 && livre > p.minimo * FATOR_EXCEDENTE) return "Excedente";
  return "Disponível";
}

// ---------- PROTEÇÃO DE TELA ----------
// Qualquer usuário logado (admin ou operacional)
function exigirLogin() {
  const usuario = getUsuarios().find(u => u.email === sessionStorage.getItem("usuarioEmail"));
  if (sessionStorage.getItem("logado") !== "true" || !usuario) {
    sessionStorage.clear();
    window.location.href = "index.html";
    return null;
  }
  return usuario;
}

// Somente admin
function exigirAdmin() {
  const usuario = exigirLogin();
  if (!usuario) return null;

  if (usuario.tipo !== "admin") {
    alert("Acesso restrito ao administrador.");
    window.location.href = "home.html";
    return null;
  }
  return usuario;
}

// ---------- RBAC: PERMISSÕES POR PERFIL ----------
// Fonte única de verdade: para mudar o que um perfil pode fazer, edite só aqui.
const PERMISSOES = {
  admin: [
    "ver_home", "gerenciar_produtos", "ver_relatorio", "gerenciar_usuarios",
    "reservar_produtos", "entrada_estoque", "saida_estoque", "editar_perfil"
  ],
  operacional: [
    "ver_home", "reservar_produtos", "entrada_estoque", "saida_estoque", "editar_perfil"
  ]
};

const ROTULOS_PERFIL = { admin: "Administrador", operacional: "Operacional" };

// true se o perfil do usuário tem aquela permissão
const temPermissao = (usuario, permissao) =>
  !!usuario && (PERMISSOES[usuario.tipo] || []).includes(permissao);

// Mostra/esconde tudo que tiver data-permissao="..." na página
function aplicarPermissoes(usuario) {
  document.querySelectorAll("[data-permissao]").forEach(el => {
    el.style.display = temPermissao(usuario, el.dataset.permissao) ? "" : "none";
  });
}

// Protege a tela inteira: exige login E a permissão informada
function exigirPermissao(permissao) {
  const usuario = exigirLogin();
  if (!usuario) return null;

  if (!temPermissao(usuario, permissao)) {
    alert("Seu perfil não tem permissão para acessar esta tela.");
    window.location.href = "home.html";
    return null;
  }
  return usuario;
}

// Evita que texto digitado vire HTML na tabela
const escapar = (txt) => String(txt).replace(/[&<>"']/g, c => (
  { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]
));

// ==========================================================
// DADOS FICTÍCIOS — EMBALARE (descartáveis B2B)
// Ficam no localStorage e podem ser editados normalmente:
//   - Admin: cadastra, edita e exclui produtos e usuários, vê o relatório
//   - Operacional: só faz reservas (não acessa produtos/relatório/usuários)
// ==========================================================
const produtosPadrao = [
  // id, codigo, nome, descricao, categoria, tamanho, lote, preco (por pacote/caixa), quantidade, reservado, minimo
  { id: "1001", codigo: "EMB-001", nome: "Copo Descartável 200ml", descricao: "Pacote com 100 un, polipropileno branco", categoria: "Copos", tamanho: "Único", lote: "L2026-01", preco: 8.90, quantidade: 1200, reservado: 150, minimo: 200 },
  { id: "1002", codigo: "EMB-002", nome: "Copo Descartável 300ml", descricao: "Pacote com 100 un, polipropileno transparente", categoria: "Copos", tamanho: "Único", lote: "L2026-02", preco: 11.50, quantidade: 640, reservado: 80, minimo: 200 },
  { id: "1003", codigo: "EMB-003", nome: "Prato Descartável 21cm", descricao: "Pacote com 10 un, poliestireno, fundo", categoria: "Pratos", tamanho: "Único", lote: "L2026-01", preco: 9.90, quantidade: 420, reservado: 0, minimo: 150 },
  { id: "1004", codigo: "EMB-004", nome: "Garfo Descartável Cristal", descricao: "Caixa com 50 un, poliestireno cristal", categoria: "Talheres", tamanho: "Único", lote: "L2026-03", preco: 6.50, quantidade: 90, reservado: 0, minimo: 120 },
  { id: "1005", codigo: "EMB-005", nome: "Marmitex Alumínio nº 8", descricao: "Caixa com 100 un, com tampa de papelão", categoria: "Embalagens de Alumínio", tamanho: "P", lote: "L2026-02", preco: 38.00, quantidade: 300, reservado: 50, minimo: 100 },
  { id: "1006", codigo: "EMB-006", nome: "Marmitex Alumínio nº 12", descricao: "Caixa com 100 un, com tampa de papelão", categoria: "Embalagens de Alumínio", tamanho: "G", lote: "L2026-02", preco: 52.00, quantidade: 180, reservado: 180, minimo: 60 },
  { id: "1007", codigo: "EMB-007", nome: "Luva Nitrílica sem Pó", descricao: "Caixa com 100 un, azul, tamanho P", categoria: "Luvas", tamanho: "P", lote: "L2026-04", preco: 42.00, quantidade: 260, reservado: 30, minimo: 80 },
  { id: "1008", codigo: "EMB-008", nome: "Luva Nitrílica sem Pó", descricao: "Caixa com 100 un, azul, tamanho M", categoria: "Luvas", tamanho: "M", lote: "L2026-04", preco: 42.00, quantidade: 75, reservado: 20, minimo: 80 },
  { id: "1009", codigo: "EMB-009", nome: "Luva Nitrílica sem Pó", descricao: "Caixa com 100 un, azul, tamanho G", categoria: "Luvas", tamanho: "G", lote: "L2026-04", preco: 42.00, quantidade: 520, reservado: 0, minimo: 90 },
  { id: "1010", codigo: "EMB-010", nome: "Touca Descartável TNT", descricao: "Pacote com 100 un, branca, elástico duplo", categoria: "Higiene", tamanho: "Único", lote: "L2026-03", preco: 14.80, quantidade: 800, reservado: 0, minimo: 100 },
  { id: "1011", codigo: "EMB-011", nome: "Saco Plástico PEBD 40x60", descricao: "Pacote com 1 kg, transparente, 0,10 mm", categoria: "Sacos", tamanho: "M", lote: "L2026-05", preco: 27.00, quantidade: 350, reservado: 60, minimo: 100 },
  { id: "1012", codigo: "EMB-012", nome: "Saco para Lixo 100L", descricao: "Pacote com 100 un, preto reforçado", categoria: "Sacos", tamanho: "GG", lote: "L2026-05", preco: 34.50, quantidade: 220, reservado: 40, minimo: 70 },
  { id: "1013", codigo: "EMB-013", nome: "Filme PVC 28cm x 300m", descricao: "Rolo industrial para alimentos, transparente", categoria: "Filmes", tamanho: "Único", lote: "L2026-06", preco: 45.00, quantidade: 60, reservado: 10, minimo: 40 },
  { id: "1014", codigo: "EMB-014", nome: "Papel Toalha Interfolhado", descricao: "Caixa com 1000 folhas, folha dupla branca", categoria: "Higiene", tamanho: "Único", lote: "L2026-04", preco: 19.90, quantidade: 140, reservado: 0, minimo: 50 },
  { id: "1015", codigo: "EMB-015", nome: "Pote Plástico com Tampa 500ml", descricao: "Pacote com 50 un, polipropileno, vai ao micro-ondas", categoria: "Potes", tamanho: "M", lote: "L2026-06", preco: 56.00, quantidade: 45, reservado: 15, minimo: 60 },
  { id: "1016", codigo: "EMB-016", nome: "Canudo Biodegradável", descricao: "Caixa com 500 un, embalado individualmente", categoria: "Canudos", tamanho: "Único", lote: "L2026-07", preco: 12.40, quantidade: 900, reservado: 0, minimo: 150 }
];

// Reservas coerentes com o campo "reservado" de cada produto
const reservasPadrao = [
  { id: "2001", produtoId: "1001", nome: "Copo Descartável 200ml", lote: "L2026-01", quantidade: 150, usuario: "Carlos Mendes", data: "19/10/2026, 09:12:00" },
  { id: "2002", produtoId: "1002", nome: "Copo Descartável 300ml", lote: "L2026-02", quantidade: 50, usuario: "Vendedor", data: "19/10/2026, 10:40:00" },
  { id: "2003", produtoId: "1002", nome: "Copo Descartável 300ml", lote: "L2026-02", quantidade: 30, usuario: "Carlos Mendes", data: "20/10/2026, 14:05:00" },
  { id: "2004", produtoId: "1005", nome: "Marmitex Alumínio nº 8", lote: "L2026-02", quantidade: 50, usuario: "Vendedor", data: "20/10/2026, 15:30:00" },
  { id: "2005", produtoId: "1006", nome: "Marmitex Alumínio nº 12", lote: "L2026-02", quantidade: 120, usuario: "Carlos Mendes", data: "21/10/2026, 08:50:00" },
  { id: "2006", produtoId: "1006", nome: "Marmitex Alumínio nº 12", lote: "L2026-02", quantidade: 60, usuario: "Vendedor", data: "21/10/2026, 11:20:00" },
  { id: "2007", produtoId: "1007", nome: "Luva Nitrílica sem Pó", lote: "L2026-04", quantidade: 30, usuario: "Carlos Mendes", data: "22/10/2026, 09:00:00" },
  { id: "2008", produtoId: "1008", nome: "Luva Nitrílica sem Pó", lote: "L2026-04", quantidade: 20, usuario: "Vendedor", data: "22/10/2026, 13:45:00" },
  { id: "2009", produtoId: "1011", nome: "Saco Plástico PEBD 40x60", lote: "L2026-05", quantidade: 60, usuario: "Carlos Mendes", data: "23/10/2026, 10:10:00" },
  { id: "2010", produtoId: "1012", nome: "Saco para Lixo 100L", lote: "L2026-05", quantidade: 40, usuario: "Vendedor", data: "23/10/2026, 16:25:00" },
  { id: "2011", produtoId: "1013", nome: "Filme PVC 28cm x 300m", lote: "L2026-06", quantidade: 10, usuario: "Carlos Mendes", data: "23/10/2026, 17:00:00" },
  { id: "2012", produtoId: "1015", nome: "Pote Plástico com Tampa 500ml", lote: "L2026-06", quantidade: 15, usuario: "Vendedor", data: "24/10/2026, 08:35:00" }
];

// Carrega os dados da Embalare só na primeira vez (não sobrescreve nada que você já cadastrou)
function iniciarDadosEmbalare() {
  if (localStorage.getItem("seedEmbalare")) return;

  // garante os usuários da Embalare mesmo se a lista já existia
  const usuarios = getUsuarios();
  usuariosPadrao.forEach(padrao => {
    if (!usuarios.some(u => u.email === padrao.email)) usuarios.push(padrao);
  });
  salvarUsuarios(usuarios);

  // só preenche produtos/reservas se ainda estiverem vazios
  if (getProdutos().length === 0 && getReservas().length === 0) {
    salvarProdutos(produtosPadrao);
    salvarReservas(reservasPadrao);
  }
  localStorage.setItem("seedEmbalare", "1");
}

// Para voltar aos dados originais da Embalare: rode resetarDadosEmbalare() no console do navegador
function resetarDadosEmbalare() {
  salvarProdutos(produtosPadrao);
  salvarReservas(reservasPadrao);
  salvarMovimentacoes([]);
  localStorage.removeItem("seedMov");
  localStorage.setItem("seedEmbalare", "1");
  location.reload();
}

iniciarDadosEmbalare();


// ==========================================================
// MOVIMENTAÇÕES DE ESTOQUE
// Histórico único de tudo que mexe no estoque: entradas, saídas,
// reservas e cancelamentos. Alimenta as telas de Entrada, Saída,
// Reservas, Home e Relatório.
// Cada movimentação: id, tipo, produtoId, codigo, nome, lote, tamanho,
// quantidade, saldoAnterior, saldoNovo, motivo, documento, observacao,
// reservaId, usuario, timestamp, data
// ==========================================================
const getMovimentacoes = () => JSON.parse(localStorage.getItem("movimentacoes") || "[]");
const salvarMovimentacoes = (lista) => localStorage.setItem("movimentacoes", JSON.stringify(lista));

const ROTULOS_MOV = {
  entrada: "Entrada",
  saida: "Saída",
  reserva: "Reserva",
  cancelamento: "Reserva cancelada"
};

const MOTIVOS_ENTRADA = [
  "Compra de fornecedor", "Devolução de cliente", "Transferência recebida",
  "Ajuste de inventário", "Outro"
];
const MOTIVOS_SAIDA = [
  "Venda / expedição", "Perda ou avaria", "Vencimento", "Uso interno",
  "Transferência enviada", "Ajuste de inventário", "Outro"
];

// ---------- helpers de exibição ----------
const quantidadeLivre = (p) => p.quantidade - (p.reservado || 0);

const formatarMoeda = (n) =>
  Number(n || 0).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

const classeStatus = (status) => ({
  "Disponível": "status-disponivel",
  "Reservado": "status-reservado",
  "Em falta": "status-emfalta",
  "Excedente": "status-excedente"
}[status] || "");

// "EMB-001 · Copo Descartável 200ml · Lote L2026-01"
function rotuloProduto(p) {
  const tam = p.tamanho && p.tamanho !== "Único" ? " (" + p.tamanho + ")" : "";
  return p.codigo + " · " + p.nome + tam + " · Lote " + (p.lote || "-");
}

// "19/10/2026, 09:12:00" -> timestamp
function parseDataBR(txt) {
  const m = String(txt).match(/(\d{2})\/(\d{2})\/(\d{4}),?\s*(\d{2}):(\d{2})(?::(\d{2}))?/);
  if (!m) return Date.now();
  return new Date(+m[3], +m[2] - 1, +m[1], +m[4], +m[5], +(m[6] || 0)).getTime();
}

function registrarMovimentacao(d) {
  const lista = getMovimentacoes();
  const agora = new Date();
  const p = d.produto;
  lista.push({
    id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
    tipo: d.tipo,
    produtoId: p.id,
    codigo: p.codigo,
    nome: p.nome,
    lote: p.lote || "",
    tamanho: p.tamanho || "",
    quantidade: d.quantidade,
    saldoAnterior: d.saldoAnterior ?? null,
    saldoNovo: d.saldoNovo ?? null,
    motivo: d.motivo || "",
    documento: d.documento || "",
    observacao: d.observacao || "",
    reservaId: d.reservaId || "",
    usuario: d.usuario,
    timestamp: agora.getTime(),
    data: agora.toLocaleString("pt-BR")
  });
  salvarMovimentacoes(lista);
}

// ---------- SITUAÇÃO DAS RESERVAS ----------
// Uma reserva guarda "quantidade" (original) e "atendido" (já retirado por saídas).
// Reservas antigas, sem esses campos, continuam funcionando (atendido = 0).
const reservaPendente = (r) => r.cancelada ? 0 : Math.max(0, r.quantidade - (r.atendido || 0));

function statusReserva(r) {
  if (r.cancelada) return "Cancelada";
  const atendido = r.atendido || 0;
  if (atendido >= r.quantidade) return "Atendida";
  if (atendido > 0) return "Parcial";
  return "Ativa";
}

// ---------- OPERAÇÕES ----------
// Todas devolvem { ok: true, ... } ou { ok: false, erro: "mensagem" }

function registrarEntrada(d, usuarioNome) {
  const quantidade = Number(d.quantidade);
  if (!Number.isInteger(quantidade) || quantidade < 1)
    return { ok: false, erro: "Informe uma quantidade inteira maior que zero." };
  if (!d.motivo) return { ok: false, erro: "Escolha o motivo da entrada." };

  const produtos = getProdutos();
  const p = produtos.find(x => x.id === d.produtoId);
  if (!p) return { ok: false, erro: "Selecione um produto válido." };

  const anterior = p.quantidade;
  p.quantidade = anterior + quantidade;
  salvarProdutos(produtos);

  registrarMovimentacao({
    tipo: "entrada", produto: p, quantidade,
    saldoAnterior: anterior, saldoNovo: p.quantidade,
    motivo: d.motivo, documento: d.documento, observacao: d.observacao,
    usuario: usuarioNome
  });
  return { ok: true, produto: p, saldoAnterior: anterior };
}

// d.reservaId (opcional): a saída atende uma reserva (baixa total/parcial dela).
// Sem reservaId, só pode sair o que está livre (quantidade - reservado).
function registrarSaida(d, usuarioNome) {
  const quantidade = Number(d.quantidade);
  if (!Number.isInteger(quantidade) || quantidade < 1)
    return { ok: false, erro: "Informe uma quantidade inteira maior que zero." };
  if (!d.motivo) return { ok: false, erro: "Escolha o motivo da saída." };

  const produtos = getProdutos();
  const p = produtos.find(x => x.id === d.produtoId);
  if (!p) return { ok: false, erro: "Selecione um produto válido." };

  const reservas = getReservas();
  let reserva = null;

  if (d.reservaId) {
    reserva = reservas.find(r => r.id === d.reservaId && r.produtoId === p.id);
    if (!reserva) return { ok: false, erro: "Reserva não encontrada para este produto." };
    const pendente = reservaPendente(reserva);
    if (quantidade > pendente)
      return { ok: false, erro: "Essa reserva tem apenas " + pendente + " un. pendentes." };
  } else {
    const livre = quantidadeLivre(p);
    if (quantidade > livre)
      return {
        ok: false,
        erro: "Quantidade indisponível. Livre para saída: " + livre + " un." +
          ((p.reservado || 0) > 0 ? " Os " + p.reservado + " un. reservados só saem pela própria reserva." : "")
      };
  }

  const anterior = p.quantidade;
  p.quantidade = anterior - quantidade;

  if (reserva) {
    p.reservado = Math.max(0, (p.reservado || 0) - quantidade);
    reserva.atendido = (reserva.atendido || 0) + quantidade;
    salvarReservas(reservas);
  }
  salvarProdutos(produtos);

  registrarMovimentacao({
    tipo: "saida", produto: p, quantidade,
    saldoAnterior: anterior, saldoNovo: p.quantidade,
    motivo: d.motivo, documento: d.documento, observacao: d.observacao,
    reservaId: reserva ? reserva.id : "",
    usuario: usuarioNome
  });
  return { ok: true, produto: p, saldoAnterior: anterior };
}

// Cancela o que ainda está pendente da reserva e devolve ao estoque livre
function cancelarReserva(reservaId, usuarioNome) {
  const reservas = getReservas();
  const r = reservas.find(x => x.id === reservaId);
  if (!r) return { ok: false, erro: "Reserva não encontrada." };

  const pendente = reservaPendente(r);
  if (pendente <= 0) return { ok: false, erro: "Essa reserva não tem mais itens pendentes." };

  const produtos = getProdutos();
  const p = produtos.find(x => x.id === r.produtoId);
  if (p) {
    p.reservado = Math.max(0, (p.reservado || 0) - pendente);
    salvarProdutos(produtos);
  }

  r.cancelada = true;
  salvarReservas(reservas);

  registrarMovimentacao({
    tipo: "cancelamento",
    produto: p || { id: r.produtoId, codigo: "-", nome: r.nome, lote: r.lote },
    quantidade: pendente, motivo: "Reserva cancelada", reservaId: r.id,
    usuario: usuarioNome
  });
  return { ok: true, liberado: pendente };
}

// Exclui o produto e cancela as reservas que ainda estavam abertas.
// O histórico de movimentações é mantido (guarda nome e código do produto).
function excluirProdutoComVinculos(id) {
  salvarProdutos(getProdutos().filter(p => p.id !== id));
  const reservas = getReservas();
  reservas.forEach(r => { if (r.produtoId === id && reservaPendente(r) > 0) r.cancelada = true; });
  salvarReservas(reservas);
}

// ---------- DADOS FICTÍCIOS DO HISTÓRICO (Embalare) ----------
// Os saldos são calculados "de trás pra frente" a partir do estoque atual,
// então o histórico sempre fecha com a quantidade real de cada produto.
const movimentosPadrao = [
  { produtoId: "1001", tipo: "entrada", quantidade: 800, motivo: "Compra de fornecedor", documento: "NF 4521", usuario: "Marina Souza", data: "05/10/2026, 08:30:00" },
  { produtoId: "1001", tipo: "saida", quantidade: 300, motivo: "Venda / expedição", documento: "Pedido 1180", usuario: "Carlos Mendes", data: "14/10/2026, 10:15:00" },
  { produtoId: "1002", tipo: "entrada", quantidade: 400, motivo: "Compra de fornecedor", documento: "NF 4522", usuario: "Marina Souza", data: "06/10/2026, 09:00:00" },
  { produtoId: "1002", tipo: "saida", quantidade: 120, motivo: "Venda / expedição", documento: "Pedido 1184", usuario: "Vendedor", data: "16/10/2026, 11:20:00" },
  { produtoId: "1003", tipo: "entrada", quantidade: 300, motivo: "Compra de fornecedor", documento: "NF 4530", usuario: "Marina Souza", data: "07/10/2026, 14:10:00" },
  { produtoId: "1003", tipo: "saida", quantidade: 80, motivo: "Venda / expedição", documento: "Pedido 1190", usuario: "Carlos Mendes", data: "17/10/2026, 15:40:00" },
  { produtoId: "1004", tipo: "saida", quantidade: 60, motivo: "Venda / expedição", documento: "Pedido 1187", usuario: "Vendedor", data: "15/10/2026, 16:05:00" },
  { produtoId: "1005", tipo: "entrada", quantidade: 200, motivo: "Compra de fornecedor", documento: "NF 4541", usuario: "Marina Souza", data: "07/10/2026, 10:45:00" },
  { produtoId: "1005", tipo: "saida", quantidade: 70, motivo: "Venda / expedição", documento: "Pedido 1193", usuario: "Carlos Mendes", data: "18/10/2026, 09:30:00" },
  { produtoId: "1006", tipo: "entrada", quantidade: 150, motivo: "Compra de fornecedor", documento: "NF 4542", usuario: "Marina Souza", data: "08/10/2026, 11:00:00" },
  { produtoId: "1008", tipo: "saida", quantidade: 25, motivo: "Perda ou avaria", documento: "", usuario: "Carlos Mendes", data: "20/10/2026, 13:10:00" },
  { produtoId: "1009", tipo: "entrada", quantidade: 500, motivo: "Compra de fornecedor", documento: "NF 4550", usuario: "Marina Souza", data: "09/10/2026, 08:50:00" },
  { produtoId: "1010", tipo: "entrada", quantidade: 600, motivo: "Compra de fornecedor", documento: "NF 4555", usuario: "Marina Souza", data: "10/10/2026, 09:20:00" },
  { produtoId: "1010", tipo: "saida", quantidade: 100, motivo: "Venda / expedição", documento: "Pedido 1197", usuario: "Vendedor", data: "21/10/2026, 10:00:00" },
  { produtoId: "1013", tipo: "saida", quantidade: 15, motivo: "Uso interno", documento: "", usuario: "Carlos Mendes", data: "22/10/2026, 08:40:00" },
  { produtoId: "1015", tipo: "saida", quantidade: 20, motivo: "Perda ou avaria", documento: "", usuario: "Vendedor", data: "23/10/2026, 14:30:00" },
  { produtoId: "1016", tipo: "entrada", quantidade: 900, motivo: "Compra de fornecedor", documento: "NF 4570", usuario: "Marina Souza", data: "12/10/2026, 09:10:00" }
];

function iniciarMovimentacoes() {
  if (localStorage.getItem("seedMov")) return;

  if (getMovimentacoes().length === 0) {
    const produtos = getProdutos();
    const lista = [];
    let n = 0;

    // entradas e saídas, com saldo calculado a partir do estoque atual
    const porProduto = {};
    movimentosPadrao.forEach(m => { (porProduto[m.produtoId] = porProduto[m.produtoId] || []).push(m); });

    Object.keys(porProduto).forEach(pid => {
      const p = produtos.find(x => x.id === pid);
      if (!p) return;
      let saldo = p.quantidade;
      porProduto[pid]
        .map(m => ({ ...m, timestamp: parseDataBR(m.data) }))
        .sort((a, b) => b.timestamp - a.timestamp)
        .forEach(m => {
          const anterior = m.tipo === "entrada" ? saldo - m.quantidade : saldo + m.quantidade;
          if (anterior < 0) return;
          lista.push({
            id: "seed" + (++n), tipo: m.tipo, produtoId: p.id, codigo: p.codigo, nome: p.nome,
            lote: p.lote || "", tamanho: p.tamanho || "", quantidade: m.quantidade,
            saldoAnterior: anterior, saldoNovo: saldo, motivo: m.motivo, documento: m.documento,
            observacao: "", reservaId: "", usuario: m.usuario, timestamp: m.timestamp, data: m.data
          });
          saldo = anterior;
        });
    });

    // reservas já existentes entram no histórico
    getReservas().forEach(r => {
      const p = produtos.find(x => x.id === r.produtoId);
      lista.push({
        id: "seed" + (++n), tipo: "reserva", produtoId: r.produtoId, codigo: p ? p.codigo : "-",
        nome: r.nome, lote: r.lote || "", tamanho: p ? p.tamanho || "" : "", quantidade: r.quantidade,
        saldoAnterior: null, saldoNovo: null, motivo: "Reserva de produto", documento: "",
        observacao: "", reservaId: r.id, usuario: r.usuario,
        timestamp: parseDataBR(r.data), data: r.data
      });
    });

    lista.sort((a, b) => a.timestamp - b.timestamp);
    salvarMovimentacoes(lista);
  }
  localStorage.setItem("seedMov", "1");
}

iniciarMovimentacoes();
