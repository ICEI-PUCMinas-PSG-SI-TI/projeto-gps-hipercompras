document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("login-form");
  const erro = document.getElementById("login-erro");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    erro.textContent = "";

    const email = form.email.value;
    const senha = form.senha.value;

    try {
      const res = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha })
      });

      const data = await res.json();
      console.log('DEBUG login retorno:', data);

      if (res.ok && data.usuario) {
        // Login bem-sucedido: salvar no localStorage
        localStorage.setItem("usuario", JSON.stringify(data.usuario));
        window.location.href = "index.html";
      } 
      else {
        erro.textContent = data.error || "Erro ao fazer login.";
      }

    } catch (err) {
      erro.textContent = "Erro de conexão com o servidor.";
    }

  });
});
