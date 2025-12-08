document.addEventListener("DOMContentLoaded", async () => {
  // Controle de login simples via localStorage
  const loginBtn = document.getElementById("login-btn");
  const userInfo = document.getElementById("user-info");
  const userEmail = document.getElementById("user-email");
  const userPontos = document.getElementById("user-pontos");
  const carrinhoBtn = document.getElementById("carrinho-btn");
  const logoutBtn = document.getElementById("logout-btn");
  const searchInput = document.getElementById("search-input");
  const searchBtn = document.getElementById("search-btn");

  let todosOsProdutos = []; // Array para armazenar todos os produtos

  function renderUser() {
    const usuario = JSON.parse(localStorage.getItem("usuario"));
    if (usuario) {
      document.getElementById("login-btn").style.display = "none";
      document.getElementById("user-info").style.display = "inline-block";
      
      // Atualiza as informações do usuário
      document.getElementById("user-name-display").textContent = usuario.nome || usuario.email;
      document.getElementById("user-pontos").textContent = `Pontos: ${usuario.pontos || 0}`;
    } else {
      if (loginBtn) {
        loginBtn.style.display = "inline-block";
        loginBtn.style.visibility = "visible";
      }
      if (userInfo) userInfo.style.display = "none";
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
      todosOsProdutos = data; // Salvar todos os produtos
      exibirProdutos(data);
    } catch (error) {
      container.innerHTML = "<p>Erro ao carregar produtos</p>";
      console.error(error);
    }
  }

  // Função para exibir produtos
  function exibirProdutos(produtos) {
    const container = document.getElementById("produtos-container");
    if (!container) return;
    
    container.innerHTML = "";
    if (!Array.isArray(produtos) || produtos.length === 0) {
      container.innerHTML = "<p>Nenhum produto encontrado.</p>";
      return;
    }
    
    produtos.forEach(produto => {
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
  }

  // Função para filtrar produtos
  function filtrarProdutos(termo) {
    if (!termo.trim()) {
      exibirProdutos(todosOsProdutos);
      return;
    }
    
    const produtosFiltrados = todosOsProdutos.filter(produto => 
      produto.nome.toLowerCase().includes(termo.toLowerCase()) ||
      produto.categoria?.toLowerCase().includes(termo.toLowerCase())
    );
    
    exibirProdutos(produtosFiltrados);
  }

  // Event listeners para pesquisa
  if (searchBtn) {
    searchBtn.addEventListener("click", () => {
      const termo = searchInput.value;
      filtrarProdutos(termo);
    });
  }

  if (searchInput) {
    searchInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        const termo = searchInput.value;
        filtrarProdutos(termo);
      }
    });
    
    // Pesquisa em tempo real (opcional)
    searchInput.addEventListener("input", (e) => {
      const termo = e.target.value;
      filtrarProdutos(termo);
    });
  }

  atualizarContadorCarrinho();

});

const container = document.getElementById("produtos-container");

function atualizarContadorCarrinho() {
  const carrinho = JSON.parse(localStorage.getItem('carrinho') || '[]');
  const contador = document.getElementById('carrinho-contador');
  const totalItens = carrinho.reduce((total, item) => total + (item.quantidade || 1), 0);
  
  contador.textContent = totalItens;
  
  if (totalItens === 0) {
    contador.classList.add('hidden');
  } else {
    contador.classList.remove('hidden');
  }
}
