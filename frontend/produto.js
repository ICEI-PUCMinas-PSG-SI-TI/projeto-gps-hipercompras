

document.addEventListener("DOMContentLoaded", async () => {
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
      });
    } catch (error) {
      container.innerHTML = `<p>Erro ao carregar o produto: ${error && error.message ? error.message : error}</p>`;
    }
  });
  