import express from "express";
import pg from "pg";

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "Todo-app",
  password: "greg",
  port: "5432",
});

db.connect();

const app = express();
const port = 3000;
// let todos = [];

let completedTask = 0;

async function getItems() {
  const result = await db.query("  SELECT *  FROM todo ");
  const todoItems = result.rows;
  return todoItems;
}

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.get("/", async (req, res) => {
  // console.log(todos)
  res.render("index.ejs");
});

app.post("/", async (req, res) => {
  try {
    const todo = req.body.newItem.trim();
    // console.log(todo);
    if (todo !== "") {
      const result = await db.query(
        "INSERT INTO todo (item) VALUES ($1) RETURNING *;",
        [todo]
      );
      const todosItem = result.rows;
      const extracterdItem = todosItem.map((todo) => ({
        item: todo.item,
        completed: todo.completed,
      }));
      console.log(extracterdItem);
      // console.log(todosItem[2]);

      // todos.push(extracterdItem);
    }

    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
});
app.post("/completed", async (req, res) => {
  const completedTodoId = req.body.todo;
  console.log(completedTodoId);
  try {
    const result = await db.query("SELECT * FROM todo WHERE id= $1;", [
      completedTodoId,
    ]);
    const todos = result.rows[0];
    console.log(todos);
    if (todos) {
      const completedStatus = todos.completed;
      todos.completed = !completedStatus;
      console.log(todos);
      const result = await db.query(
        "UPDATE  todo SET  completed = $1 WHERE  id = $2 RETURNING *",
        [todos.completed, todos.id]
      );
      const updatedTodo = result.rows;
      // res.json(updatedTodo);
      res
        .status(200)
        .json({ succes: true, message: "todo marked completed succesfully" });
    } else {
      res.status(404).json({ succes: false, message: "todo not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ succes: false, message: "internal server error" });
  }
  // console.log(todos);
});
app.get("/completedTodo", async (req, res) => {
  try {
    const result = await db.query(
      "SELECT * FROM  todo WHERE completed = $1; ",
      [true]
    );
    const completedTodo = result.rows;
    console.log(completedTodo);

    // res.render("index.ejs", { newTodos: completedTodo });
    res.json(completedTodo);
  } catch (error) {
    console.log(error);
  }
});
// app.get("/active",(req,res)=>{
//     res.render("index.ejs",{newTodos:active});
//     active=[];
// })
app.get("/activeTodo", async (req, res) => {
  try {
    const result = await db.query(
      "SELECT * FROM  todo WHERE completed = $1; ",
      [false]
    );
    const activeTodo = result.rows;
    console.log(activeTodo);

    res.json(activeTodo);
  } catch (error) {
    console.log(error);
  }
});
app.get("/allTodo", async (req, res) => {
  const todos = await getItems();

  res.json(todos);
});
app.get("/clearCompleted", async (req, res) => {
  try {
    const result = await db.query("DELETE  FROM  todo WHERE completed = $1; ", [
      true,
    ]);
    const clearTodo = result.rows;
    console.log(clearTodo);

    res.render("index.ejs", { newTodos: clearTodo });
  } catch (error) {
    console.log(error);
  }
});
app.delete("/delete/:todo", async (req, res) => {
  const todoDelete = decodeURIComponent(req.params.todo);
  console.log(todoDelete);
  try {
    const result = await db.query("DELETE FROM  todo WHERE id = $1; ", [
      todoDelete,
    ]);
    const deleteTodo = result.rows;
    console.log(deleteTodo);

    // res.redirect("/");
    res.json({ succes: true, message: "todo deleted successfully" });
  } catch (error) {
    console.log(error);
  }
});
app.listen(port, () => {
  console.log(`server started at http://localhost:${port} `);
});
