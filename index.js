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
app.use(bodyParser.json());
app.use(express.static("public"));

// Route to render the main page
app.get("/", async (req, res) => {
  try {
    const response = await axios.get(`${API_URL}/poems`);
    console.log(response.data);
    res.render("index.ejs", { poetry: response.data });
  } catch (error) {
    res.status(500).send({ message: "Error fetching posts" });
  }
});

//renderizando poesia especifica
app.get("/poetrybody/:id", async (req, res) => {
    try {
    const response = await axios.get(`${API_URL}/poems/${req.params.id}`);
    res.render("poetry.ejs", { poetry: response.data });
  } catch (error) {
    res.status(500).send({ message: "Error fetching posts" });
  }
});

//area de login
app.get("/login",(req,res)=>{
    res.render("login.ejs")
})

//checando se login é válido 

app.post("/check",async(req,res)=>{
  const resposta = req.body["password"];
  //console.log(resposta)
  if (resposta === "123456") {
    const response = await axios.get(`${API_URL}/poems`);
    res.render("login1.ejs",{poetry: response.data});
  } else {
    const response = await axios.get(`${API_URL}/poems`);
    res.render("index.ejs",{poetry: response.data});
    console.log("Não credenciado")
  }


})

//Inscrição de novas poesias ou editar atuais

app.get("/submit/:id",async(req,res)=>{
  const id = req.params.id
  if(id === "x"){
    res.render("submit.ejs")
  }else{
    const response = await axios.get(`${API_URL}/poems/${req.params.id}`)
    res.render("submit.ejs",{poetry:response.data})
  }
})

//post para incluir novas poesias. 

app.post("/submit", async (req, res) => {
  try {
    const response = await axios.post(`${API_URL}/submit-db`,req.body);
    //console.log(response.data)
    res.redirect("/");
  } catch (error) {
    res.status(500).json({ message: "Error creating post" });
  }
});

//post para editar poesias atuais.

app.post("/edit", async (req, res) => {
  try {
    const response = await axios.put(`${API_URL}/edit`,req.body);
    //console.log(response.data)
    res.redirect("/")
  } catch (error) {
    res.status(500).json({ message: "Error creating post" });
  }
});

///Deletar

app.get("/delete/:id", async (req,res)=>{
  //console.log(req.params.id)
  try{ 
    const response = await axios.delete(`${API_URL}/delete/${req.params.id}`)
res.redirect("/")
  }catch (error) {
    res.status(500).json({ message: "Error Deleting post" });
    console.log(error)
  }
});


//listening port
app.listen(port, (req) => {
  console.log(`Servidor funcionando em ${port}`);
});
