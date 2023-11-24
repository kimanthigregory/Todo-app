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
    const todo =req.body.newItem.trim();
    if(todo !==""){
        todos.push({text:todo,completed:false})
    }
    
    res.redirect("/");
    
})
app.post("/completed",(req,res)=>{
    const completedTodo=req.body.todo
    const todoIndex =todos.findIndex(todo=>todo.text===completedTodo)
    if(todoIndex !==-1){
        todos[todoIndex].completed=!todos[todoIndex].completed;
        
        res.json({succes:true,message:"todo marked completed succesfully"});
    }else{
        res.status(404).json({succes:false,message:"todo not found"})
    }
    // console.log(todos);
    
})
app.post("/submit",(req,res)=>{
    console.log(todos);
})
app.delete("/delete/:todo", (req,res)=>{
    const todoDelete =decodeURIComponent(req.params.todo);
    todos=todos.filter(todo=>todo !==todoDelete)
    res.json({succes:true,message:"todo deleted successfully"});
})
app.listen(port, ()=>{
    console.log(`server started at ${port}`);

})