document.addEventListener("DOMContentLoaded", async () => {
    const container = document.getElementById("produtos-container");
    container.innerHTML = "<p>Carregando produtos...</p>";
  
    try {
      const res = await fetch("http://localhost:3000/produtos");
      const data = await res.json();
  
      container.innerHTML = "";
  
      data.produtos.forEach(produto => {
        const card = document.createElement("div");
        card.classList.add("produto");
        card.innerHTML = `
          <img src="public/images/${produto.imagem.split('/').pop()}" alt="${produto.nome}">
          <h3>${produto.nome}</h3>
          <p>R$ ${produto.preco.toFixed(2)}</p>
        `;
        card.addEventListener("click", () => {
          window.location.href = `produto.html?id=${produto.id}`;
        });
        container.appendChild(card);
      });
    } catch (error) {
      container.innerHTML = "<p>Erro ao carregar produtos 😞</p>";
      console.error(error);
    }
  });
  