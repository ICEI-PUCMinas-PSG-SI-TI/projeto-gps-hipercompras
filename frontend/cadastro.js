document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("cadastro-form");
  const erro = document.getElementById("cadastro-erro");
  const senhaInput = document.getElementById("senha");
  const confirmarSenhaInput = document.getElementById("ConfirmarSenha");

  // Validação em tempo real
  confirmarSenhaInput.addEventListener("input", () => {
    if (senhaInput.value !== confirmarSenhaInput.value) {
      confirmarSenhaInput.setCustomValidity("As senhas não coincidem");
    } else {
      confirmarSenhaInput.setCustomValidity("");
    }
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    erro.textContent = "";

    const nome = form.nome.value;
    const email = form.email.value;
    const senha = form.senha.value;
    const confirmarSenha = form.ConfirmarSenha.value;

    if (senha !== confirmarSenha) {
      erro.textContent = "As senhas não coincidem.";
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/cadastro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, email, senha })
      });

      const data = await res.json();

      if (res.ok) {
        //Removi o alert porque alguns navegadores não redirecionam após o alert
        window.location.href = "login.html";
      } 
      else {
        erro.textContent = data.error || "Erro ao cadastrar.";
      }

    } catch (err) {
      erro.textContent = "Erro de conexão com o servidor.";
    }
  });
});
