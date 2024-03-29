//importação de frameworks
import express from "express";
import bodyParser from "body-parser";

//const
const app = express();
const port = 4000;

//middlewarehe
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static("public"));

//in Memory - database

let poetry = [{
    id:1,
    title: 'Universo',
    author: 'Clarice Pacheco',
    body: 'Quando penso no universo:\r\n sua complexidade e imensidão,\r\n penso nos meus problemas e no quão pequenos eles são.',
    date: "17/02/2024",
    likes:0
  },{
    id:2,
    title: 'Devaneios',
    author: 'Tata In poesias',
    body: "Vivo assim,\r\n entre tropeços e ganhos.\r\n Vivo em um mundo só meu,\r\n amo canções, versos e rimas.\r\n Perco-me em meus devaneios.",
    date: "20/02cd/2024",
    likes:0
  }

];

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


/// postar novas poesias ou 
app.post("/submit-db",(req,res)=>{
  var dt = new Date();
 const lastitem =poetry[poetry.length -1]
 const lastID =lastitem.id
  const newPost = {
   id:lastID +1,
    title:req.body.title,
    body: req.body.body,
    author:req.body.author,
    date: dt.getDate()  + "/" + (dt.getMonth() + 1) + "/" +  dt.getFullYear(),
    likes:0
  
  }    
  poetry.push(newPost)
  res.send(poetry)
})

//editar novas poesias

app.put("/edit",(req,res)=>{
  const id = parseInt(req.body.id)
  const index = poetry.findIndex((elem)=> elem.id === id)
  const dt = new Date();

  const updatePost = {
    id:id,
    title:req.body.title || poetry[index].title,
    body: req.body.body || poetry[index].body,
    author:req.body.author|| poetry[index].author,
    date: dt.getDate()  + "/" + (dt.getMonth() + 1) + "/" +  dt.getFullYear(),
    likes:poetry[index].likes
  }    
  poetry.splice(index,1,updatePost)
  res.send(poetry)
})


///deletando poesia

app.delete("/delete/:id",(req,res)=>{
  const id = parseInt(req.params.id);
  const index = poetry.findIndex((elem)=> elem.id === id);
 //console.log(id,index)
  poetry.splice(index,1,)
  res.send(poetry)

})

//listening port
app.listen(port, (req) => {
    console.log(`Servidor funcionando em ${port}`);
  });


  
