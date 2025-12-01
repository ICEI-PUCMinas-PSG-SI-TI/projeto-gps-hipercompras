// (A rota /finalizar-compra foi movida para depois da inicialização do app)
const express = require("express");
const app = express();
const port = 3000;
const db = require("./database");
app.use(express.json());
const cors = require("cors");
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// Rota inicial
app.get("/", (req, res) => {
  res.send("API do HiperCompras funcionando!");
});

// Rota de cadastro de usuário
app.post("/cadastro", (req, res) => {
  const { nome, email, senha } = req.body;
  if (!nome || !email || !senha) {
    return res.status(400).json({ error: "Nome, email e senha obrigatórios." });
  }
  db.run(
    "INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)",
    [nome, email, senha],
    function (err) {
      if (err) {
        if (err.message.includes("UNIQUE")) {
          return res.status(409).json({ error: "Email já cadastrado." });
        }
        return res.status(500).json({ error: "Erro no servidor." });
      }
      res.status(201).json({ id: this.lastID, nome, email });
    }
  );
});

// Rota de login
app.post("/login", (req, res) => {
  const { email, senha } = req.body;
  if (!email || !senha) {
    return res.status(400).json({ error: "Email e senha obrigatórios." });
  }
  db.get(
    "SELECT * FROM usuarios WHERE email = ? AND senha = ?",
    [email, senha],
    (err, usuario) => {
      if (err) {
        return res.status(500).json({ error: "Erro no servidor." });
      }
      if (!usuario) {
        return res.status(401).json({ error: "Credenciais inválidas." });
      }
      // Retorna dados do usuário (exceto senha)
      const { senha, ...userData } = usuario;
      res.json({ usuario: userData });
    }
  );
});

// Rota para listar todos os usuários
app.get("/usuarios", (req, res) => {
  db.all("SELECT id, nome, email, pontos FROM usuarios", [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: "Erro ao buscar usuários." });
    }
    res.json({ usuarios: rows });
  });
});

// Rota para listar todos os produtos
app.get("/produtos", (req, res) => {
  db.all("SELECT * FROM produtos", [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: "Erro ao buscar produtos." });
    }
    res.json(rows);
  });
});

// Rota para produto específico
app.get("/produtos/:id", (req, res) => {
  const id = req.params.id;
  db.get("SELECT * FROM produtos WHERE id = ?", [id], (err, row) => {
    if (err) {
      return res.status(500).json({ error: "Erro ao buscar produto." });
    }
    if (!row) {
      return res.status(404).json({ error: "Produto não encontrado." });
    }
    res.json({ produto: row });
  });
});

// Rota para finalizar compra: atualiza estoque e pontos do usuário
app.post("/finalizar-compra", (req, res) => {
  const { usuarioId, carrinho, pontosUsados } = req.body;
  if (!usuarioId || !Array.isArray(carrinho) || carrinho.length === 0) {
    return res.status(400).json({ error: "Dados inválidos para finalizar compra." });
  }

  db.serialize(() => {
    let erroEstoque = null;
    let total = 0;
    let produtosProcessados = 0;
    for (const item of carrinho) {
      db.get("SELECT estoque, preco FROM produtos WHERE id = ?", [item.id], (err, row) => {
        produtosProcessados++;
        if (erroEstoque || err || !row || row.estoque < item.quantidade) {
          erroEstoque = err || (!row ? "Produto não encontrado" : "Estoque insuficiente");
        } else {
          total += row.preco * item.quantidade;
          db.run("UPDATE produtos SET estoque = estoque - ? WHERE id = ?", [item.quantidade, item.id]);
        }
        // Só processa pontos quando todos os produtos foram verificados
        if (produtosProcessados === carrinho.length) {
          if (erroEstoque) {
            return res.status(400).json({ error: erroEstoque });
          }
          db.get("SELECT pontos FROM usuarios WHERE id = ?", [usuarioId], (err, userRow) => {
            if (err || !userRow) {
              return res.status(500).json({ error: "Usuário não encontrado." });
            }
            const pontosGanhos = Number((total / 10).toFixed(2));
            let pontosFinais = (userRow.pontos || 0) - (pontosUsados || 0) + pontosGanhos;
            if (pontosFinais < 0) pontosFinais = 0;
            db.run("UPDATE usuarios SET pontos = ? WHERE id = ?", [pontosFinais, usuarioId], (err2) => {
              if (err2) {
                return res.status(500).json({ error: "Erro ao atualizar pontos." });
              }
              return res.json({ ok: true, pontos: pontosFinais, pontosGanhos });
            });
          });
        }
      });
    }
  });
});

// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
