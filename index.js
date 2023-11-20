import express from "express";

const app = express();
const port = 3000;
var todos = [];
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.get("/", (req,res)=>{
    res.render("index.ejs",{newTodos:todos});
})

app.post("/",(req,res)=>{
    const todo =req.body.newItem;
    todos.push(todo)
    console.log(todo);
    res.redirect("/");
    
})
app.delete("/delete/:todo", (req,res)=>{
    const todoDelete =decodeURIComponent(req.params.todo);
    todos=todos.filter(todo=>todo !==todoDelete)
    res.json({succes:true,message:"todo deleted successfully"});
})
app.listen(port, ()=>{
    console.log(`server started at ${port}`);
})