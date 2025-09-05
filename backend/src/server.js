const express = require("express");
const app = express();
const port = 3000;

// Rota inicial
app.get("/", (req, res) => {
  res.send("API do HiperCompras funcionando!");
});

// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
