const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./hipercompras.db');

db.serialize(() => {
  // Usuário
  db.run(`CREATE TABLE IF NOT EXISTS usuarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    senha TEXT NOT NULL,
    pontos INTEGER DEFAULT 0
  )`);

  // Produto
  db.get("SELECT COUNT(*) AS count FROM produtos", (err, row) => {
    if (err) throw err;

    if (row.count === 0) {
      const stmt = db.prepare(`
        INSERT INTO produtos (nome, preco, estoque, imagem) VALUES (?, ?, ?, ?)
      `);
      db.serialize(() => {
        const stmt = db.prepare(`
          INSERT INTO produtos (nome, preco, estoque, imagem) VALUES (?, ?, ?, ?)
        `);
      
        // Frutas
        stmt.run("Banana", 2.50, 100, "https://example.com/banana.png");
        stmt.run("Maçã", 3.00, 80, "https://example.com/maca.png");
        stmt.run("Laranja", 2.80, 70, "https://example.com/laranja.png");
        stmt.run("Mamão", 4.00, 50, "https://example.com/mamao.png");
        stmt.run("Abacaxi", 5.50, 40, "https://example.com/abacaxi.png");
        stmt.run("Uva", 6.00, 60, "https://example.com/uva.png");
        stmt.run("Melancia", 8.00, 30, "https://example.com/melancia.png");
        stmt.run("Morango 250g", 7.50, 50, "https://example.com/morango.png");
      
        // Laticínios
        stmt.run("Leite 1L", 5.20, 60, "https://example.com/leite.png");
        stmt.run("Queijo Mussarela 500g", 20.00, 30, "https://example.com/queijo.png");
        stmt.run("Iogurte Natural 170g", 4.00, 50, "https://example.com/iogurte.png");
        stmt.run("Manteiga 200g", 8.50, 40, "https://example.com/manteiga.png");
        stmt.run("Requeijão 200g", 7.50, 45, "https://example.com/requeijao.png");
        stmt.run("Leite Condensado 395g", 6.50, 40, "https://example.com/leitecondensado.png");
        stmt.run("Creme de Leite 200g", 5.00, 50, "https://example.com/cremedeLeite.png");
      
        // Carnes e ovos
        stmt.run("Ovo 12 unidades", 8.00, 60, "https://example.com/ovo.png");
        stmt.run("Frango Resfriado 1kg", 15.00, 50, "https://example.com/frango.png");
        stmt.run("Carne Bovina 1kg", 30.00, 30, "https://example.com/carne.png");
        stmt.run("Linguiça 500g", 12.50, 40, "https://example.com/linguica.png");
      
        // Grãos e massas
        stmt.run("Arroz 5kg", 25.00, 40, "https://example.com/arroz.png");
        stmt.run("Feijão 1kg", 10.00, 70, "https://example.com/feijao.png");
        stmt.run("Macarrão 500g", 6.50, 50, "https://example.com/macarrao.png");
        stmt.run("Farinha de Trigo 1kg", 5.00, 60, "https://example.com/farinha.png");
        stmt.run("Açúcar 1kg", 4.50, 70, "https://example.com/acucar.png");
        stmt.run("Sal 1kg", 3.00, 80, "https://example.com/sal.png");
      
        // Doces e guloseimas
        stmt.run("Chocolate 100g", 6.50, 50, "https://example.com/chocolate.png");
        stmt.run("Bala Sortida 200g", 4.50, 60, "https://example.com/bala.png");
        stmt.run("Biscoito Recheado 150g", 5.00, 50, "https://example.com/biscoito.png");
        stmt.run("Bombom 250g", 12.00, 40, "https://example.com/bombom.png");
        stmt.run("Gelatina 20g", 2.50, 100, "https://example.com/gelatina.png");
      
        // Bebidas
        stmt.run("Refrigerante 2L", 8.00, 40, "https://example.com/refri.png");
        stmt.run("Suco de Laranja 1L", 7.00, 50, "https://example.com/suco.png");
        stmt.run("Água Mineral 1,5L", 3.00, 100, "https://example.com/agua.png");
        stmt.run("Cerveja 350ml", 4.50, 60, "https://example.com/cerveja.png");
        stmt.run("Vinho 750ml", 35.00, 30, "https://example.com/vinho.png");
      
        // Limpeza e higiene
        stmt.run("Detergente Líquido 500ml", 4.50, 60, "https://example.com/detergente.png");
        stmt.run("Sabão em Pó 1kg", 12.00, 50, "https://example.com/sabao.png");
        stmt.run("Álcool 70% 500ml", 6.00, 60, "https://example.com/alcol.png");
        stmt.run("Desinfetante 1L", 7.50, 50, "https://example.com/desinfetante.png");
        stmt.run("Papel Higiênico 4 unidades", 10.00, 70, "https://example.com/papel.png");
        stmt.run("Escova de Dentes", 5.00, 80, "https://example.com/escova.png");
        stmt.run("Shampoo 300ml", 12.00, 50, "https://example.com/shampoo.png");
      
        // Óleos e temperos
        stmt.run("Óleo de Soja 900ml", 7.50, 60, "https://example.com/oleo.png");
        stmt.run("Azeite de Oliva 500ml", 25.00, 30, "https://example.com/azeite.png");
        stmt.run("Tempero Pronto 50g", 4.50, 70, "https://example.com/tempero.png");
      
        // Outros
        stmt.run("Pão Francês (10 unidades)", 6.00, 80, "https://example.com/pao.png");
        stmt.run("Cereal 300g", 12.00, 50, "https://example.com/cereal.png");
        stmt.run("Leite em Pó 400g", 18.00, 40, "https://example.com/leitepo.png");
        stmt.run("Massa de Pizza 500g", 8.00, 60, "https://example.com/pizza.png");
        stmt.run("Creme Dental 90g", 6.50, 50, "https://example.com/cremedental.png");
      
        stmt.finalize();
      });
    }

  // Pedido
  db.run(`CREATE TABLE IF NOT EXISTS pedidos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    usuario_id INTEGER NOT NULL,
    data TEXT NOT NULL,
    total REAL NOT NULL,
    FOREIGN KEY(usuario_id) REFERENCES usuarios(id)
  )`);

  // Item do Pedido
  db.run(`CREATE TABLE IF NOT EXISTS itens_pedido (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    pedido_id INTEGER NOT NULL,
    produto_id INTEGER NOT NULL,
    quantidade INTEGER NOT NULL,
    preco REAL NOT NULL,
    FOREIGN KEY(pedido_id) REFERENCES pedidos(id),
    FOREIGN KEY(produto_id) REFERENCES produtos(id)
  )`);

  // Estacionamento
  db.run(`CREATE TABLE IF NOT EXISTS estacionamento (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    numero_vaga INTEGER NOT NULL,
    disponivel INTEGER DEFAULT 1
  )`);

  // Reserva de Estacionamento
  db.run(`CREATE TABLE IF NOT EXISTS reservas_estacionamento (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    usuario_id INTEGER NOT NULL,
    estacionamento_id INTEGER NOT NULL,
    data_reserva TEXT NOT NULL,
    FOREIGN KEY(usuario_id) REFERENCES usuarios(id),
    FOREIGN KEY(estacionamento_id) REFERENCES estacionamento(id)
  )`);
});

module.exports = db;
});