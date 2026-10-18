const usuariosPadrao = [
  { email: "admin@estoque.com", senha: "admin123", nome: "Admin", tipo: "admin" },
  { email: "vendedor@estoque.com", senha: "vendedor123", nome: "Vendedor", tipo: "operacional" }
];

const salvarUsuarios = (lista) => localStorage.setItem("usuarios", JSON.stringify(lista));

const getUsuarios = () => {
  if (!localStorage.getItem("usuarios")) salvarUsuarios(usuariosPadrao);
  return JSON.parse(localStorage.getItem("usuarios"));
<<<<<<< HEAD
};

// ---------- PRODUTOS ----------
const getProdutos = () => JSON.parse(localStorage.getItem("produtos") || "[]");
const salvarProdutos = (lista) => localStorage.setItem("produtos", JSON.stringify(lista));

// ---------- PROTEÇÃO DE TELA (somente admin) ----------
function exigirAdmin() {
  if (sessionStorage.getItem("logado") !== "true") {
    window.location.href = "index.html";
    return null;
  }
  const usuario = getUsuarios().find(u => u.email === sessionStorage.getItem("usuarioEmail"));
  if (!usuario) {
    sessionStorage.clear();
    window.location.href = "index.html";
    return null;
  }
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
=======
};
>>>>>>> d64c529f96c6b0382860e26ef1e743eca3fd8333
