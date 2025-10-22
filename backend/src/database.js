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
        stmt.run("Banana Kg", 2.50, 100, "/images/banana.png");
        stmt.run("Maçã Kg", 3.00, 80, "/images/maca.png");
        stmt.run("Laranja Kg", 2.80, 70, "/images/laranja.png");
        stmt.run("Mamão Kg", 4.00, 50, "/images/mamao.png");
        stmt.run("Abacaxi Kg", 5.50, 40, "/images/abacaxi.png");
        stmt.run("Uva Kg", 6.00, 60, "/images/uva.png");
        stmt.run("Melancia Kg", 8.00, 30, "/images/melancia.png");
        stmt.run("Morango Kg", 7.50, 50, "/images/morango.png");

        // Laticínios
        stmt.run("Leite Piracanjuba 1L", 5.20, 60, "/images/leite.png");
        stmt.run("Queijo Mussarela 500g", 20.00, 30, "/images/queijo.png");
        stmt.run("Iogurte Natural Sabor Mel Itambé", 4.00, 50, "/images/iogurte.png");
        stmt.run("Manteiga Itambé 200g", 8.50, 40, "/images/manteiga.png");
        stmt.run("Requeijão Itambé 200g", 7.50, 45, "/images/requeijao.png");
        stmt.run("Leite Condensado Moça 395g", 6.50, 40, "/images/leitecondensado.png");
        stmt.run("Creme de Leite Nestle 200g", 5.00, 50, "/images/cremedeLeite.png");

        // Carnes e ovos
        stmt.run("Ovo 12 unidades", 8.00, 60, "/images/ovo.png");
        stmt.run("Frango Resfriado 1kg", 15.00, 50, "/images/frango.png");
        stmt.run("Carne Bovina 1kg", 30.00, 30, "/images/carne.png");
        stmt.run("Linguiça 500g", 12.50, 40, "/images/linguica.png");

        // Grãos e massas
        stmt.run("Arroz Camil 5kg", 25.00, 40, "/images/arroz.png");
        stmt.run("Feijão Carioca Camil 1kg", 10.00, 70, "/images/feijao.png");
        stmt.run("Macarrão Santa Amalia 500g", 6.50, 50, "/images/macarrao.png");
        stmt.run("Farinha de Trigo Rosa Branca 1kg", 5.00, 60, "/images/farinha.png");
        stmt.run("Açúcar Cristal União 1kg", 4.50, 70, "/images/acucar.png");
        stmt.run("Sal Refinado Cisne 1kg", 3.00, 80, "/images/sal.png");

        // Doces e guloseimas
        stmt.run("Chocolate Nestle Meio Amargo 80g", 6.50, 50, "/images/chocolate.png");
        stmt.run("Bala Florestal Sortida 500g", 4.50, 60, "/images/bala.png");
        stmt.run("Bolacha Recheada Passatempo 130g", 5.00, 50, "/images/biscoito.png");
        stmt.run("Saco de Bombom Ouro Branco 1Kg", 12.00, 40, "/images/bombom.png");
        stmt.run("Gelatina Royal Sabor Morango 25g", 2.50, 100, "/images/gelatina.png");

        // Bebidas
        stmt.run("Coca Cola 2L", 8.00, 40, "/images/coca.png");
        stmt.run("Suco de Laranja 1L", 7.00, 50, "/images/suco.png");
        stmt.run("Água Mineral 1,5L", 3.00, 100, "/images/agua.png");
        stmt.run("Cerveja Brahma 350ml", 4.50, 60, "/images/cerveja.png");
        stmt.run("Vinho Chileno Concha y Toro Reservado Carmenere 750ml", 35.00, 30, "/images/vinho.png");

        // Limpeza e higiene
        stmt.run("Detergente Líquido Ype 500ml", 4.50, 60, "/images/detergente.png");
        stmt.run("Sabão em Pó Tixan 1kg", 12.00, 50, "/images/sabao.png");
        stmt.run("Álcool 70% Facilita 1L", 6.00, 60, "/images/alcol.png");
        stmt.run("Desinfetante Lysoform 1L", 7.50, 50, "/images/desinfetante.png");
        stmt.run("Papel Higiênico Mili 4 unidades", 10.00, 70, "/images/papel.png");
        stmt.run("Escova de Dentes Colgate", 5.00, 80, "/images/escova.png");
        stmt.run("Shampoo L'Oréal Professionnel NutriOil 300ml", 12.00, 50, "/images/shampoo.png");

        // Óleos
        stmt.run("Óleo de Soja Liza 900ml", 7.50, 60, "/images/oleo.png");
        stmt.run("Azeite de Oliva Renata 500ml", 25.00, 30, "/images/azeite.png");

        // Outros
        stmt.run("Pão Francês (10 unidades)", 6.00, 80, "/images/pao.png");
        stmt.run("Sucrilhos 250g", 12.00, 50, "/images/cereal.png");
        stmt.run("Leite em Pó Ninho 400g", 18.00, 40, "/images/leitepo.png");
        stmt.run("Massa de Pizza Grossoni 500g", 8.00, 60, "/images/pizza.png");
        stmt.run("Creme Dental Colgate 220g", 6.50, 50, "/images/cremedental.png");

      
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