
const setMsg = (id, texto, classe) => {
  const el = document.getElementById(id);
  el.textContent = texto;
  el.className = "msg " + classe;
};

// ---------- C: Create (Cadastrar Funcionário) ----------
document.getElementById("cadastroForm").addEventListener("submit", (event) => {
  event.preventDefault();

  const nome = document.getElementById("novoNome").value.trim();
  const email = document.getElementById("novoEmail").value.trim();
  const senha = document.getElementById("novaSenhaFunc").value;
  const tipo = document.getElementById("novoTipo").value;

  if (!nome || !email || !senha) {
    setMsg("msgCadastro", "Preencha todos os campos.", "erro");
    return;
  }

  const usuarios = getUsuarios();

  if (usuarios.some(u => u.email === email)) {
    setMsg("msgCadastro", "Já existe um usuário com esse email.", "erro");
    return;
  }

  usuarios.push({ nome, email, senha, tipo });
  salvarUsuarios(usuarios);

  setMsg("msgCadastro", "Funcionário cadastrado com sucesso!", "sucesso");
  document.getElementById("novoNome").value = "";
  document.getElementById("novoEmail").value = "";
  document.getElementById("novaSenhaFunc").value = "";
});

//---------- R:(Read)
window.addEventListener("DOMContentLoaded", () => {
  const logado = sessionStorage.getItem("logado");
  if (logado !== "true") {
    window.location.href = "index.html";
    return;
  }

  const emailLogado = sessionStorage.getItem("usuarioEmail");
  const usuario = getUsuarios().find(u => u.email === emailLogado);

  if (!usuario) {
    // conta não existe mais (foi excluída em outra aba, por exemplo)
    sessionStorage.clear();
    window.location.href = "index.html";
    return;
  }

  // Preenche cabeçalho
  document.getElementById("usuarioNome").textContent = usuario.nome;
  document.getElementById("usuarioPerfil").textContent =
    usuario.tipo === "admin" ? "Administrador" : "Operacional";

  // Preenche o formulário "Dados da conta"
  document.getElementById("nome").value = usuario.nome;
  document.getElementById("email").value = usuario.email;

  // Mostra o formulário/menu de Cadastrar Funcionário só para admin
  if (usuario.tipo === "admin") {
    document.querySelectorAll(".admin-only").forEach(el => {
      el.style.display = "block";
    });
  }
});

// ---------- U: Update (Salvar alterações) ----------
document.getElementById("perfilForm").addEventListener("submit", (event) => {
  event.preventDefault();

  const emailLogado = sessionStorage.getItem("usuarioEmail");
  const usuarios = getUsuarios();
  const usuario = usuarios.find(u => u.email === emailLogado);

  const novoNome = document.getElementById("nome").value.trim();
  const novaSenha = document.getElementById("senha").value;
  const confirmarSenha = document.getElementById("confirmarSenha").value;

  if (novoNome === "") {
    setMsg("msgPerfil", "Digite seu nome.", "erro");
    return;
  }

  if (novaSenha !== "" && novaSenha !== confirmarSenha) {
    setMsg("msgPerfil", "As senhas não são iguais.", "erro");
    return;
  }

  usuario.nome = novoNome;
  if (novaSenha !== "") {
    usuario.senha = novaSenha;
  }

  salvarUsuarios(usuarios);
  sessionStorage.setItem("usuarioNome", novoNome);
  document.getElementById("usuarioNome").textContent = novoNome;

  document.getElementById("senha").value = "";
  document.getElementById("confirmarSenha").value = "";

  setMsg("msgPerfil", "Dados atualizados com sucesso!", "sucesso");
});

// ---------- D: Delete (Excluir Conta) ----------
function excluirConta() {
  const confirmar = confirm("Tem certeza que deseja excluir sua conta? Essa ação não pode ser desfeita.");
  if (!confirmar) return;

  const emailLogado = sessionStorage.getItem("usuarioEmail");
  const usuarios = getUsuarios().filter(u => u.email !== emailLogado);

  salvarUsuarios(usuarios); // agora sim remove de verdade do "banco"
  sessionStorage.clear();

  alert("Sua conta foi excluída.");
  window.location.href = "index.html";
}

function sair() {
  sessionStorage.clear();
  window.location.href = "index.html";
}