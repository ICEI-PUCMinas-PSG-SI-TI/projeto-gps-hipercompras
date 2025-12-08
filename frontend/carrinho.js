
document.addEventListener("DOMContentLoaded", () => {
  // Inicializar funcionalidades do header
  inicializarHeader();
  atualizarContadorCarrinho();
  
  const itensDiv = document.getElementById("carrinho-itens");
  const totalDiv = document.getElementById("carrinho-total");
  const pontosDiv = document.getElementById("carrinho-pontos");
  const usarPontosArea = document.getElementById("usar-pontos-area");
  const finalizarBtn = document.getElementById("finalizar-compra");

  let usarPontos = false;

  function renderCarrinho() {
    const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
    const usuario = JSON.parse(localStorage.getItem("usuario")) || { pontos: 0 };
    itensDiv.innerHTML = "";
    pontosDiv.innerHTML = "";
    usarPontosArea.innerHTML = "";
    if (carrinho.length === 0) {
      itensDiv.innerHTML = "<p>Seu carrinho está vazio.</p>";
      totalDiv.textContent = "";
      pontosDiv.textContent = "";
      usarPontosArea.innerHTML = "";
      finalizarBtn.style.display = "none";
      return;
    }
    let total = 0;
    carrinho.forEach(item => {
      const itemDiv = document.createElement("div");
      itemDiv.className = "carrinho-item";
      itemDiv.innerHTML = `
        <img src="public/images/${item.imagem.split('/').pop()}" alt="${item.nome}" style="width:60px;height:60px;object-fit:cover;vertical-align:middle;">
        <span style="margin-left:10px;">${item.nome}</span>
        <button class="qtd-menos" data-id="${item.id}" style="margin-left:10px;">-</button>
        <span style="margin:0 5px;">${item.quantidade}</span>
        <button class="qtd-mais" data-id="${item.id}">+</button>
        <span style="margin-left:10px;">R$ ${(item.preco * item.quantidade).toFixed(2)}</span>
        <button class="remover-item" data-id="${item.id}" style="margin-left:10px;">Remover</button>
      `;
      itensDiv.appendChild(itemDiv);
      total += item.preco * item.quantidade;
    });
    // Pontos ganhos: 1 ponto a cada 10 reais
    const pontosGanhos = Number((total / 10).toFixed(2));
    pontosDiv.textContent = `Pontos ganhos nesta compra: ${pontosGanhos}`;

    // Pontos disponíveis do usuário
    const pontosDisponiveis = usuario.pontos || 0;
    let desconto = 0;
    if (usarPontos && pontosDisponiveis > 0) {
      desconto = Math.min(pontosDisponiveis, Math.floor(total));
    }
    let totalComDesconto = total - desconto;
    if (totalComDesconto < 0) totalComDesconto = 0;
    totalDiv.textContent = `Total: R$ ${totalComDesconto.toFixed(2)}`;

    // Opção de usar pontos
    if (pontosDisponiveis > 0) {
      usarPontosArea.innerHTML = `
        <label style="font-size:1em;">
          <input type="checkbox" id="usar-pontos-check" ${usarPontos ? "checked" : ""}>
          Usar meus pontos (${pontosDisponiveis} disponíveis) como desconto (R$ ${desconto.toFixed(2)})
        </label>
      `;
      const check = document.getElementById("usar-pontos-check");
      if (check) {
        check.addEventListener("change", (e) => {
          usarPontos = e.target.checked;
          renderCarrinho();
        });
      }
    }
    finalizarBtn.style.display = "inline-block";
  }

  itensDiv.addEventListener("click", (e) => {
    const id = Number(e.target.getAttribute("data-id"));
    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
    
    if (e.target.classList.contains("remover-item")) {
      carrinho = carrinho.filter(item => item.id !== id);
      localStorage.setItem("carrinho", JSON.stringify(carrinho));
      atualizarContadorCarrinho();
      renderCarrinho();
    } else if (e.target.classList.contains("qtd-mais")) {
      const idx = carrinho.findIndex(item => Number(item.id) === id);
      if (idx > -1) {
        carrinho[idx].quantidade += 1;
        localStorage.setItem("carrinho", JSON.stringify(carrinho));
        atualizarContadorCarrinho();
        renderCarrinho();
      }
    } else if (e.target.classList.contains("qtd-menos")) {
      const idx = carrinho.findIndex(item => Number(item.id) === id);
      if (idx > -1 && carrinho[idx].quantidade > 1) {
        carrinho[idx].quantidade -= 1;
        localStorage.setItem("carrinho", JSON.stringify(carrinho));
        atualizarContadorCarrinho();
        renderCarrinho();
      }
    }
  });


  finalizarBtn.addEventListener("click", async () => {
    const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
    const usuario = JSON.parse(localStorage.getItem("usuario")) || { pontos: 0 };
    let total = 0;
    carrinho.forEach(item => {
      total += item.preco * item.quantidade;
    });
    let pontosDisponiveis = usuario.pontos || 0;
    let desconto = 0;
    if (usarPontos && pontosDisponiveis > 0) {
      desconto = Math.min(pontosDisponiveis, Math.floor(total));
    }
    // Envia para o backend
    try {
      const res = await fetch("http://localhost:3000/finalizar-compra", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          usuarioId: usuario.id,
          carrinho: carrinho.map(item => ({ id: item.id, quantidade: item.quantidade })),
          pontosUsados: desconto
        })
      });
      const data = await res.json();
      if (res.ok && data.ok) {
        usuario.pontos = data.pontos;
        localStorage.setItem("usuario", JSON.stringify(usuario));
        alert(`Compra finalizada! Pontos ganhos: ${data.pontosGanhos}. Pontos totais: ${data.pontos}`);
        localStorage.removeItem("carrinho");
        atualizarContadorCarrinho();
        renderCarrinho();
        if (window.renderUser) window.renderUser();
        else if (typeof window.location.reload === 'function') window.location.reload();
      } else {
        alert(data.error || "Erro ao finalizar compra.");
      }
    } catch (err) {
      alert("Erro de conexão com o servidor.");
    }
  });

  renderCarrinho();
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
