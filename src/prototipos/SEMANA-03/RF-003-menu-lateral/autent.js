/* ============================================================
   auth.js — sessão, usuários, permissões e dados do estoque
   Compartilhado entre login.html e home.html
   ============================================================ */

const CHAVE_USUARIOS = 'plataforma_usuarios';
const CHAVE_SESSAO   = 'usuarioLogado';
const CHAVE_PRODUTOS = 'plataforma_produtos';
const CHAVE_EMAIL    = 'emailLembrado';
const CHAVE_CODIGO   = 'codigoRecuperacao';

/* ---------- Matriz de permissões ---------- */
const PERMISSOES = {
  admin:       ['consultar', 'criar', 'atualizar', 'excluir', 'usuarios'],
  operacional: ['consultar', 'atualizar']
};

const ROTULO_PERFIL = {
  admin: 'Administrador',
  operacional: 'Operacional'
};

/* ---------- Usuários ---------- */
function carregarUsuarios() {
  const dados = localStorage.getItem(CHAVE_USUARIOS);
  if (dados) return JSON.parse(dados);

  const iniciais = [
    { id: 1, nome: 'Administrador', email: 'admin@sistema.com', senha: 'admin123', perfil: 'admin' },
    { id: 2, nome: 'Maria Operação', email: 'operador@sistema.com', senha: 'oper123', perfil: 'operacional' }
  ];
  salvarUsuarios(iniciais);
  return iniciais;
}

function salvarUsuarios(lista) {
  localStorage.setItem(CHAVE_USUARIOS, JSON.stringify(lista));
}

function buscarUsuarioPorEmail(email) {
  return carregarUsuarios().find(
    u => u.email.toLowerCase() === String(email).trim().toLowerCase()
  );
}

/* ---------- Sessão ---------- */
function usuarioLogado() {
  const dados = localStorage.getItem(CHAVE_SESSAO);
  return dados ? JSON.parse(dados) : null;
}

function abrirSessao(usuario) {
  localStorage.setItem(CHAVE_SESSAO, JSON.stringify({
    id: usuario.id, nome: usuario.nome, email: usuario.email, perfil: usuario.perfil
  }));
}

function encerrarSessao() {
  localStorage.removeItem(CHAVE_SESSAO);
  window.location.href = 'login.html';
}

/** Bloqueia páginas internas para quem não está logado. */
function exigirLogin() {
  const usuario = usuarioLogado();
  if (!usuario) {
    window.location.replace('login.html');
    return null;
  }
  return usuario;
}

/** Verifica se o usuário da sessão pode executar uma ação. */
function pode(acao) {
  const usuario = usuarioLogado();
  if (!usuario) return false;
  return (PERMISSOES[usuario.perfil] || []).includes(acao);
}

/* ---------- Produtos (estoque) ---------- */
function carregarProdutos() {
  const dados = localStorage.getItem(CHAVE_PRODUTOS);
  if (dados) return JSON.parse(dados);

  const iniciais = [
    { id: 1, codigo: 'CAF-001', nome: 'Café torrado 1kg',      categoria: 'Alimentos', quantidade: 48, minimo: 20, preco: 32.90 },
    { id: 2, codigo: 'ACU-014', nome: 'Açúcar refinado 5kg',   categoria: 'Alimentos', quantidade: 12, minimo: 15, preco: 18.50 },
    { id: 3, codigo: 'EMB-220', nome: 'Caixa de papelão média', categoria: 'Embalagem', quantidade: 310, minimo: 100, preco: 3.20 },
    { id: 4, codigo: 'LIM-007', nome: 'Detergente neutro 5L',  categoria: 'Limpeza',   quantidade: 6, minimo: 10, preco: 27.00 }
  ];
  salvarProdutos(iniciais);
  return iniciais;
}

function salvarProdutos(lista) {
  localStorage.setItem(CHAVE_PRODUTOS, JSON.stringify(lista));
}

function proximoId(lista) {
  return lista.reduce((maior, item) => Math.max(maior, item.id), 0) + 1;
}