//importação de frameworks
import express from "express";
import bodyParser from "body-parser";

//const
const app = express();
const port = 4000;

//middlewarehe
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

//in Memory - database

let poetry = [{
    id:1,
    title: 'Blah',
    autor: 'Marcelo',
    body: 'Testando\r\nquebra\r\nde \r\nlinhas',
    date: "17/02/2024"
  }];

let lastID =poetry.length

//send all poetry

app.get("/poems", (req, res) => {
    res.send(poetry)
    });

//renderizar poesia especifica

app.get("/poems/:id",(req,res)=>{
    const id = parseInt(req.params.id)
    const index = poetry.findIndex((elem)=> elem.id === id)
    const choose = poetry[index];
    res.send(choose)
})




//listening port
app.listen(port, (req) => {
    console.log(`Servidor funcionando em ${port}`);
  });


  
