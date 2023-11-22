import express from "express";

const app = express();
const port = 3000;
var todos = [];
let completedTask= 0;
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.get("/", (req,res)=>{
    res.render("index.ejs",{newTodos:todos,completedTask});
})

app.post("/",(req,res)=>{
    const todo =req.body.newItem;
    todos.push(todo)
    console.log(todo);
    res.redirect("/");
    
})
app.post("/completed",(req,res)=>{
    const completedTodo=req.body.todo
    if(todos.includes(completedTodo)){
        completedTask++
    }
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