//importação de frameworks
import express from "express";
import bodyParser from "body-parser";
import ejs from "ejs";

///const
const port = 3000;
const app = express();
//middleware
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",(req,res)=>{
    res.render("index.ejs")
});

app.get("/submit",(req,res)=>{
    res.render("submit.ejs")
});

app.post("/submit-poetry",(req,res)=>{
    const password =req.body["Pass"]

    console.log(password)
    //console.log(req.body["password"])
    res.send("OK")

})

app.listen(port, (req)=>{
    console.log(`Servidor funcionando em ${port}`)
})

