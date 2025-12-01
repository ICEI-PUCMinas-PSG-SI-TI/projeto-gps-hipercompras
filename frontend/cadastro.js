document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("cadastro-form");
  const erro = document.getElementById("cadastro-erro");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    erro.textContent = "";
    const nome = form.nome.value;
    const email = form.email.value;
    const senha = form.senha.value;
    try {
      const res = await fetch("http://localhost:3000/cadastro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, email, senha })
      });
      const data = await res.json();
      if (res.ok) {
        alert("Cadastro realizado com sucesso! Faça login.");
        window.location.href = "login.html";
      } else {
        erro.textContent = data.error || "Erro ao cadastrar.";
      }
    } catch (err) {
      erro.textContent = "Erro de conexão com o servidor.";
    }
  });
});
