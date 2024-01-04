//importação de frameworks
import express from "express";
import bodyParser from "body-parser";
import ejs from "ejs";

///const
const port = 3000;
const app = express();
//middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

//global variables

let poetry = [];

//ao entrar no servidor renderizar index
app.get("/", (req, res) => {
const obj = Object.assign({},poetry)
console.log(obj)
console.log(poetry)

res.render("index.ejs",poetry);
});

//checando se login é valido para postar poesia
app.post("/check", (req, res) => {
  const resposta = req.body["password"];
  if (resposta === "123456") {
    res.render("submit.ejs");
  } else {
    res.render("index.ejs");
  }
});

//teste

app.post("/submit", (req, res) => {
  //res.render("submit.ejs")
  const poem = req.body;
  poetry.push(poem);
  console.log(poetry)
  res.redirect("/")
  //res.render("index.ejs")
});


//final do teste

//listening port
app.listen(port, (req) => {
  console.log(`Servidor funcionando em ${port}`);
});
