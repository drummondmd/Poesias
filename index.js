//importação de frameworks
import express from "express";
import bodyParser from "body-parser";
import ejs from "ejs";
import axios from "axios";

///const
const port = 3000;
const app = express();
const API_URL = "http://localhost:4000"

//middlewarehe
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// Route to render the main page
app.get("/", async (req, res) => {
  try {
    const response = await axios.get(`${API_URL}/poems`);
    console.log(response);
    res.render("index.ejs", { poetry: response.data });
  } catch (error) {
    res.status(500).send({ message: "Error fetching posts" });
  }
});

//renderizando poesia especifica
app.get("/poetrybody/:id", async (req, res) => {
    try {
    const response = await axios.get(`${API_URL}/poems/${req.params.id}`);
    console.log(response);
    res.render("poetry.ejs", { poetry: response.data });
  } catch (error) {
    res.status(500).send({ message: "Error fetching posts" });
  }
});

//area de login
app.get("/check",(req,res)=>{
    res.render("login.ejs")
})

//checando se login é valido para postar poesia
app.post("/check",async (req, res) => {
  const resposta = req.body["password"];
  if (resposta === "123456") {
    const response = await axios.get(`${API_URL}/poems`);
    console.log(response)
    res.render("editor.ejs",{poetry: response.data});
  } else {
    const response = await axios.get(`${API_URL}/poems`);
    res.render("index.ejs",{poetry: response.data});
    console.log("Não credenciado")
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

/// Delete

app.delete("/delete/:id",(req,res)=>{
  const id = req.params.id
  console.log(id)


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
