//importação de frameworks
import express from "express";
import bodyParser from "body-parser";
import ejs from "ejs";
import axios from "axios";
import pg from "pg";

///const
const port = 3000;
const app = express();

//middlewarehe
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(express.static("public"));

// databases
const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "permalist",
  password: "123369",
  port: 5432,
});
db.connect();

// Route to render the main page
app.get("/", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM poesias ORDER BY likes DESC")
    res.render("index.ejs",{
      poetry: result.rows
    })
    
  } catch (error) {
    console.log(error)
    res.sendStatus(error.status)
    
  }
});

/// getting specif poetry
app.get("/poesias/:poetryId", async (req,res)=>{
  try {
    const result = await db.query("SELECT * FROM poesias WHERE id = $1",[req.params.poetryId])
    const poetryC= result.rows[0]
    if(poetryC){
      res.render("poetry.ejs",{
        poetry: poetryC
      })
    }else{
      res.redirect("/")
    }
  } catch (error) {
    console.log(error)
    res.redirect("/")    
  }
})


/// get editor page

app.get("/editor",async (req,res)=>{
  try {
    const result = await db.query("SELECT * FROM poesias ORDER BY likes DESC")
    res.render("editor.ejs",{
      poetry: result.rows
    })
    
    
  } catch (error) {
    console.log(error)
    res.send("errror")
    
  }

})

/// new poetry
app.post("/submit",async (req,res)=>{
  const today = Date.now()
try {
  const result = await
   db.query("INSERT INTO poesias (titulo,autor,corpo,data,likes) VALUES($1,$2,$3,$4,$5) RETURNING *",[req.body.titulo,req.body.autor,req.body.corpo,new Date(today),0])
   res.render("poetry.ejs",{
    poetry: result.rows[0]
  })
  
} catch (error) {
  console.log(error)
  res.send("Algum erro aconteceu")
  
}

})



//listening port
app.listen(port, (req) => {
  console.log(`Servidor funcionando em ${port}`);
});
