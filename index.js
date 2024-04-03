import express from "express";
import pg from "pg";

const db = new pg.Client({
    user:"postgres",
    host:"localhost",
    database:"Todo-app",
    password:"greg",
    port:"5432",
})

db.connect();



const app = express();
const port = 3000;
// let todos = [];
let comp =[];
let active=[];
let all =[];
let completedTask= 0;

async function getItems (){
     const result = await db.query("  SELECT *  FROM todo ")
     const todoItems = result.rows;
     return todoItems
}

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.get("/", async(req,res)=>{
    const todos =  await getItems(); 
    res.render("index.ejs",{newTodos:todos,completedTask});
     
})

app.post("/",async(req,res)=>{
    try {
        const todo =req.body.newItem.trim();
        console.log(todo);
        if(todo !==""){
            const result =  await db.query("INSERT INTO todo (item,completed) VALUES ($1,$2) RETURNING *;",
            [todo,false]
            );
            const todosItem = result.rows
            const extracterdItem = todosItem.map(todo =>({item:todo.item,completed:todo.completed}))
            console.log(extracterdItem);
            // console.log(todosItem[2]);

            // todos.push(extracterdItem);
        }
    
        res.redirect("/"); 
    } catch (error) {
        console.log(error);
    }
    
    
})
app.post("/completed",(req,res)=>{
    const completedTodo=req.body.todo
    const todoIndex =todos.findIndex(todo=>todo.text===completedTodo)
    if(todoIndex !==-1){
        const completedStatus= todos[todoIndex].completed;
        todos[todoIndex].completed=!completedStatus; 
        if (completedStatus){
            active.filter(todo=>todo.text !==completedTodo);
        }
        res.json({succes:true,message:"todo marked completed succesfully"});
    }else{
        res.status(404).json({succes:false,message:"todo not found"})
    }
    // console.log(todos);
    
})
app.get("/complete",(req,res)=>{
    res.render("index.ejs",{newTodos:comp});
    comp=[]
})
app.get("/completedTodo",(req,res)=>{
    const list = todos.filter(todo=>todo.completed !==false);
    const newArray =list.filter(item=>!comp.some(existingItem=>existingItem.text ===item.text))
    comp.push(...newArray);
    console.log(comp);
    res.redirect("/complete");
    
})
app.get("/active",(req,res)=>{
    res.render("index.ejs",{newTodos:active});
    active=[];
})
app.get("/activeTodo",(req,res)=>{
    const list = todos.filter(todo=>todo.completed !==true);
    const newList =list.filter(item=>!active.some(existingItem=>existingItem.text ===item.text));
    active.push(...newList)
    console.log(active);    
    res.redirect("/active");
})
app.get("/allTodo",(req,res)=>{
    res.redirect("/");
})
app.get("/clearCompleted",(req,res)=>{
    const cleared =todos.filter(item=>item.completed !==true)
    todos=[]
    todos.push(...cleared);    
    console.log(cleared);
    res.redirect("/");
})
app.delete("/delete/:todo", (req,res)=>{
    const todoDelete =decodeURIComponent(req.params.todo);
    todos=todos.filter(todo=>todo !==todoDelete)
    res.json({succes:true,message:"todo deleted successfully"});
})
app.listen(port, ()=>{
    console.log(`server started at http://localhost:${port} `);

})