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
  localStorage.setItem("seedEmbalare", "1");
  location.reload();
}

iniciarDadosEmbalare();
