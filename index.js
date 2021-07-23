const express = require("express");
const app = express();
var cors = require('cors')
const { MongoClient, ObjectId } = require("mongodb");

app.use(cors())

(async () => {
  //const url = "mongodb://localhost:27017";
  const url = "mongodb+srv://admin:GVzwT2kZzR8XugnD@cluster0.ovq4e.mongodb.net/ocean_db?retryWrites=true&w=majority";
  //const dbName = "ocean_bancodados_09_07_21";
  const dbName = "ocean_db"

  console.info("Conectando ao banco de dados...");

  const client = await MongoClient.connect(url, { useUnifiedTopology: true });

  console.info("MongoDB conectado com sucesso!");

  const db = client.db(dbName);

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
  const collFilmes = db.collection("filmes");

  // [GET] - Read all
  //  com função anônima
  app.get("/filmes", async function (req, res) {
    const listaFilmes = await collFilmes.find().toArray();
    res.send(listaFilmes);
  });

  // [GET] - Read Single (ou Read by ID)
  //  exemplo com arrow function
  app.get("/filmes/:id", async (req, res) => {
    const id = req.params.id;
    const item = await collFilmes.findOne({ _id: ObjectId(id) });
    res.send(item);
  });

  // [POST] - Create
  app.post("/filmes", async function (req, res) {
    const item = req.body;
    await collFilmes.insertOne(item);
    res.send(item);
  });

  // [PUT] - Update
  app.put("/filmes/:id", async function (req, res) {
    const idFilme = req.params.id;
    const item = req.body;
    await collFilmes.updateOne({ _id: ObjectId(idFilme) }, { $set: item });
    res.send("filme alterado com sucesso");
  });

  // [DELETE] - Delete
  app.delete("/filmes/:id", async function (req, res) {
    const idFilme = req.params.id;
    await collFilmes.deleteOne({ _id: ObjectId(idFilme) });
    res.send("filme excluido com sucesso");
  });

  app.listen(process.env.PORT || 3000);
})();
