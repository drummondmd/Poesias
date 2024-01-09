//importação de frameworks
import express from "express";
import bodyParser from "body-parser";
import ejs from "ejs";

///const
const port = 3000;
const app = express();

//middlewarehe
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

//global variables

let poetry = [{
  title: 'Blah',
  autor: 'Marcelo',
  body: 'Testando\r\nquebra\r\nde \r\nlinhas'
}];

//ao entrar no servidor renderizar index
app.get("/", (req, res) => {

res.render("index.ejs",{poetrydata: poetry});
});

app.get("/check",(req,res)=>{
    res.render("login.ejs")

})
//checando se login é valido para postar poesia
app.post("/check", (req, res) => {
  const resposta = req.body["password"];
  if (resposta === "123456") {
    res.render("submit.ejs");
  } else {
    res.render("index.ejs");
  }
});

//Inscrição de novas poesias

app.post("/submit", (req, res) => {
  const poem = req.body;
  poetry.push(poem);
  console.log(poem.body)
  res.redirect("/")
});


/// renderizando poesia certa na pagina

app.get("/poetrybody/[0-999]",(req,res)=>{
    const choose =req.path.slice(-1);
    const poetryC = poetry[choose];
    res.render("poetry.ejs",{data:poetryC})

})

app.delete("/poetrybody/[0-999]",(req,res)=>{
  const choose =req.path.slice(-1);
  const poetryC = poetry[choose];
  //res.render("poetry.ejs",{data:poetryC})

})


//deletando

app.delete("/",(req,res)=>{

})

//listening port
app.listen(port, (req) => {
  console.log(`Servidor funcionando em ${port}`);
});
