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
  db.run(`CREATE TABLE IF NOT EXISTS produtos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    preco REAL NOT NULL,
    estoque INTEGER NOT NULL
  )`);

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