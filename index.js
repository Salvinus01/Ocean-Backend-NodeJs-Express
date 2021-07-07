const express = require("express");
const app = express();

//Indica que todo corpo de request está estruturado em JSON
app.use(express.json());

app.get("/", function (req, res) {
  res.send("Hello World");
});

/*
Lista de Endpoints CRUD
Create, Read (Single & All), Update, Delete
Criar, Ler (Individual & Tudo), Atualizar, Remover
Associamos os endpoints aos verbos de HTTP
Quando seguimos as convenções, utilizandos os verbos corretos,
podemos dizer que a nossa aplicação segue os padrões REST
Quando uma aplicação segue os padrões REST, ela é chamada de RESTful
[POST] -> Create
[GET] -> Read
[PUT/PATCH] -> Update
[DELETE] -> Delete
*/

const lista = ["Senhor dos Anéis", "Harry Potter"];

// [GET] - Read all
//  com função anônima
app.get("/filmes", function (req, res) {
  res.send(lista.filter(Boolean));
});

// [GET] - Read Single (ou Read by ID)
//  exemplo com arrow function
app.get("/filmes/:id", (req, res) => {
  const id = req.params.id;
  const item = lista[id - 1];
  res.send(item);
});

// [POST] - Create
app.post("/filmes", function (req, res) {
  const item = req.body.nome;
  lista.push(item);
  res.send("item criado com sucesso");
});

// [PUT] - Update
app.put("/filmes/:id", function (req, res) {
  const idFilme = req.params.id;
  const nomeFilme = req.body.nome;
  lista[idFilme - 1] = nomeFilme;
  res.send("filme alterado com sucesso");
});

// [DELETE] - Delete
app.delete("/filmes/:id", function (req, res) {
  const idFilme = req.params.id;
  delete lista[idFilme - 1];
  res.send("filme excluido com sucesso");
});

app.listen(3000);
