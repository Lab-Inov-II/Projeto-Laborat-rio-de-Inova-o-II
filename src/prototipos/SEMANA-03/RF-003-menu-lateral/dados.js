const usuariosPadrao = [
  { email: "admin@estoque.com", senha: "admin123", nome: "Admin", tipo: "admin" },
  { email: "vendedor@estoque.com", senha: "vendedor123", nome: "Vendedor", tipo: "operacional" }
];

const salvarUsuarios = (lista) => localStorage.setItem("usuarios", JSON.stringify(lista));

const getUsuarios = () => {
  if (!localStorage.getItem("usuarios")) salvarUsuarios(usuariosPadrao);
  return JSON.parse(localStorage.getItem("usuarios"));
};