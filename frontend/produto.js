document.addEventListener("DOMContentLoaded", async () => {
    const container = document.getElementById("produto-detalhe");
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
  
    if (!id) {
      container.innerHTML = "<p>ID do produto não encontrado.</p>";
      return;
    }
  
    try {
      const res = await fetch(`http://localhost:3000/produtos/${id}`);
      const data = await res.json();
  
      if (!data.produto) {
        container.innerHTML = "<p>Produto não encontrado.</p>";
        return;
      }
  
      const produto = data.produto;
  
      container.innerHTML = `
        <div class="produto-detalhado">
          <img src="public/images/${produto.imagem.split('/').pop()}" alt="${produto.nome}">
          <div class="info">
            <h2>${produto.nome}</h2>
            <p class="preco">R$ ${produto.preco.toFixed(2)}</p>
            <p class="estoque">Disponíveis: ${produto.estoque}</p>
            <button id="btn-comprar">Adicionar ao carrinho 🛍️</button>
          </div>
        </div>
      `;
  
      document.getElementById("btn-comprar").addEventListener("click", () => {
        alert(`${produto.nome} foi adicionado ao carrinho!`);
      });
    } catch (error) {
      container.innerHTML = "<p>Erro ao carregar o produto.</p>";
      console.error(error);
    }
  });
  