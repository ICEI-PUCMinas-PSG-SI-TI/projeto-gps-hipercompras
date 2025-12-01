document.addEventListener("DOMContentLoaded", async () => {
  // Controle de login simples via localStorage
  const loginBtn = document.getElementById("login-btn");
  const userInfo = document.getElementById("user-info");
  const userEmail = document.getElementById("user-email");
  const userPontos = document.getElementById("user-pontos");
  const carrinhoBtn = document.getElementById("carrinho-btn");
  const logoutBtn = document.getElementById("logout-btn");

  function renderUser() {
    const usuario = JSON.parse(localStorage.getItem("usuario"));
    if (usuario) {
      if (loginBtn) {
        loginBtn.style.display = "none";
        loginBtn.style.visibility = "hidden";
      }
      userInfo.style.display = "inline-block";
      userEmail.textContent = usuario.nome;
      userPontos.textContent = ` | Pontos: ${usuario.pontos ?? 0}`;
    } else {
      if (loginBtn) {
        loginBtn.style.display = "inline-block";
        loginBtn.style.visibility = "visible";
      }
      userInfo.style.display = "none";
    }
  }

  renderUser();

  if (carrinhoBtn) {
    carrinhoBtn.onclick = () => window.location.href = "carrinho.html";
  }
  if (logoutBtn) {
    logoutBtn.onclick = () => {
      localStorage.removeItem("usuario");
      window.location.reload();
    };
  }

  // Produtos
  const container = document.getElementById("produtos-container");
  if (container) {
    container.innerHTML = "<p>Carregando produtos...</p>";
    try {
      const res = await fetch("http://localhost:3000/produtos");
      const data = await res.json();
      container.innerHTML = "";
      if (!Array.isArray(data) || data.length === 0) {
        container.innerHTML = "<p>Nenhum produto encontrado.</p>";
        return;
      }
      data.forEach(produto => {
        const card = document.createElement("div");
        card.classList.add("produto");
        card.style.border = "1px solid #ccc";
        card.style.margin = "8px";
        card.style.padding = "8px";
        card.style.display = "inline-block";
        card.style.background = "#fff";
        card.innerHTML = `
          <img src="public/images/${produto.imagem.split('/').pop()}" alt="${produto.nome}" style="width:100px;height:100px;object-fit:cover;display:block;margin:auto;">
          <h3>${produto.nome}</h3>
          <p>R$ ${produto.preco.toFixed(2)}</p>
        `;
        card.addEventListener("click", (event) => {
          event.preventDefault();
          window.location.href = `produto.html?id=${produto.id}`;
        });
        container.appendChild(card);
      });
    } catch (error) {
      container.innerHTML = "<p>Erro ao carregar produtos</p>";
      console.error(error);
    }
  }
});
    const container = document.getElementById("produtos-container");
