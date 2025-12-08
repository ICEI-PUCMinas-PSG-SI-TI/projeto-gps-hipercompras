

document.addEventListener("DOMContentLoaded", async () => {
    // Inicializar funcionalidades do header
    inicializarHeader();
    atualizarContadorCarrinho();
    
    const container = document.getElementById("produto-detalhe");
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    if (!id) {
      container.innerHTML = `
        <p>ID do produto não encontrado.<br>
        Você acessou esta página sem escolher um produto.<br>
        <button id="voltar-home">Voltar para a Home</button></p>
      `;
      document.getElementById("voltar-home").onclick = () => {
        window.location.href = "index.html";
      };
      return;
    }
  
    try {
      const res = await fetch(`http://localhost:3000/produtos/${id}`);
      const data = await res.json();
  


      const produto = data.produto || data;
      if (!produto || !produto.id) {
        container.innerHTML = "<p>Produto não encontrado.</p>";
        return;
      }
  
      container.innerHTML = `
        <div class="produto-detalhado">
          <img src="public/images/${produto.imagem.split('/').pop()}" alt="${produto.nome}">
          <div class="info">
            <h2>${produto.nome}</h2>
            <p class="preco">R$ ${produto.preco.toFixed(2)}</p>
            <p class="estoque">Disponíveis: ${produto.estoque}</p>
            <button id="btn-comprar">Adicionar ao carrinho</button>
          </div>
        </div>
      `;
  
      document.getElementById("btn-comprar").addEventListener("click", () => {
        // Recupera o carrinho do localStorage ou inicializa vazio
        let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
        // Verifica se o produto já está no carrinho
        const idx = carrinho.findIndex(item => Number(item.id) === Number(produto.id));
        if (idx > -1) {
          carrinho[idx].quantidade += 1;
        } else {
          carrinho.push({
            id: produto.id,
            nome: produto.nome,
            preco: produto.preco,
            imagem: produto.imagem,
            quantidade: 1
          });
        }
        localStorage.setItem('carrinho', JSON.stringify(carrinho));
        alert(`${produto.nome} foi adicionado ao carrinho!`);
        
        // Atualiza o contador do carrinho
        atualizarContadorCarrinho();
      });
      
    } catch (error) {
      container.innerHTML = `<p>Erro ao carregar o produto: ${error && error.message ? error.message : error}</p>`;
    }
  });

// Função para atualizar contador do carrinho
function atualizarContadorCarrinho() {
  const carrinho = JSON.parse(localStorage.getItem('carrinho') || '[]');
  const contador = document.getElementById('carrinho-contador');
  if (!contador) return;
  
  const totalItens = carrinho.reduce((total, item) => total + (item.quantidade || 1), 0);
  contador.textContent = totalItens;
  
  if (totalItens === 0) {
    contador.classList.add('hidden');
  } else {
    contador.classList.remove('hidden');
  }
}

// Função para inicializar funcionalidades do header
function inicializarHeader() {
  const loginBtn = document.getElementById("login-btn");
  const userInfo = document.getElementById("user-info");
  const carrinhoBtn = document.getElementById("carrinho-btn");
  const logoutBtn = document.getElementById("logout-btn");

  // Verificar se usuário está logado
  function renderUser() {
    const usuario = JSON.parse(localStorage.getItem("usuario"));
    if (usuario) {
      if (loginBtn) loginBtn.style.display = "none";
      if (userInfo) userInfo.style.display = "inline-block";
      
      const userNameDisplay = document.getElementById("user-name-display");
      const userPontosDisplay = document.getElementById("user-pontos");
      
      if (userNameDisplay) userNameDisplay.textContent = usuario.nome || usuario.email;
      if (userPontosDisplay) userPontosDisplay.textContent = `Pontos: ${usuario.pontos || 0}`;
    } else {
      if (loginBtn) loginBtn.style.display = "inline-block";
      if (userInfo) userInfo.style.display = "none";
    }
  }

  renderUser();

  // Event listeners
  if (carrinhoBtn) {
    carrinhoBtn.onclick = () => window.location.href = "carrinho.html";
  }
  
  if (logoutBtn) {
    logoutBtn.onclick = () => {
      localStorage.removeItem("usuario");
      window.location.reload();
    };
  }
}
  