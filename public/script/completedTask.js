// const compl=document.querySelector("#complete-status");
// function completeStatus(todos){
//   fetch("/submit",{
//     method:'POST',
//     headers:{
//       "content-type":" application/x-www-form-urlencoded",
//     },
//     body:`todo=${encodeURIComponent(todos)}`,
//   })
// .then(response=>response.json())
// .then(data=>{
//   if(data.success){
//     console.log("todo list updated succesfully ")
//   }
//   else{
//     console.error(data.message)
//   }
// })
// .catch(error=>console.error(error));

// }

const paragraph = document.querySelector(".task p");
const todoContainer = document.querySelector(".todo-container");
const list = document.querySelector("li");
const checkboxes = document.querySelectorAll(".checkbox");
const checkboxs = document.querySelectorAll(".check");
const check = document.querySelector(".checkbox");
const button = document.getElementById("complete-status");
const active = document.getElementById("active");
const all = document.getElementById("all");
const clearCompleted = document.getElementById("clear-completed");
button.addEventListener("click", function () {
  // Redirect to another route when the button is clicked
  // window.location.href = "/completedTodo";

  todoContainer.innerHTML = "";
  fetch(`/completedTodo`, {
    method: "GET",
  })
    .then((response) => response.json())
    .then((data) => {
      data.forEach((todo, index) => {
        const listItem = document.createElement("li");
        const checkbox = document.createElement("input");
        const paragraph = document.createElement("p");
        const label = document.createElement("label");

        checkbox.addEventListener("change", function () {
          console.log("hello");
          completedTodo(todo.id);
          label.classList.remove("checked");
        });

        listItem.classList.add("round");
        listItem.classList.add("task");
        checkbox.type = "checkbox";
        // checkbox.checked = todo.completed;

        checkbox.classList.add("check");
        checkbox.value = todo.id;
        checkbox.id = `checkbox${index}`;
        checkbox.name = "todoId";

        paragraph.textContent = todo.item;
        paragraph.classList.add("check");

        label.for = `${todo.id}`;
        label.classList.add("checked");
        if (todo.completed) {
          label.classList.add("checked");
        } else {
          label.classList.remove("checked");
        }

        todoContainer.appendChild(listItem);
        listItem.appendChild(checkbox);
        listItem.appendChild(label);
        listItem.appendChild(paragraph);
      });
    })
    .catch((error) => console.error(error));
});

function completedTodo(todo) {
  fetch("/completed", {
    method: "POST",
    headers: {
      "content-type": " application/x-www-form-urlencoded",
    },
    body: `todo=${encodeURIComponent(todo)}`,
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        console.log("todo marked as completed succesfully");
      } else {
        console.error(data.message);
      }
    })
    .catch((error) => console.error(error));
}

active.addEventListener("click", function () {
  // Redirect to another route when the button is clicked
  todoContainer.innerHTML = "";
  fetch(`/activeTodo`, {
    method: "GET",
  })
    .then((response) => response.json())
    .then((data) => {
      data.forEach((todo, index) => {
        const html = `
        <div class="todo-container">
                        
            <li  class="round task">
                <input type="checkbox" name="todoId" value = "${todo.id}" id="checkbox${index}" class="checked" onchange="getTodos('${data}')" onclick="completedTodo('${todo.id}')">
                <label for="checkbox${index}"></label>
                <p class = "todoText">${todo.item}</p>                        
            </li>
        </div>
        `;
        todoContainer.insertAdjacentHTML("afterbegin", html);
      });
    })
    .catch((error) => console.error(error));

  // window.location.href = "/activeTodo";
});
all.addEventListener("click", function () {
  // Redirect to another route when the button is clicked
  // window.location.href = "/allTodo";
  fetch(`/allTodo`, {
    // method: "GET",
  })
    .then((response) => response.json())
    .then((data) => {
      todoContainer.innerHTML = "";
      data.forEach((todo, index) => {
        const html = `
        <div class="todo-container">
                        
            <li  class="round task">
                <input type="checkbox" name="todoId" value = "${todo.id}" id="checkbox${index}" class="checkbox" onchange="getTodos('${data}')" onclick="completedTodo('${todo.id}')">
                <label for="checkbox${index}"></label>
                <p>${todo.item}</p> 
                <button id="${todo.id}" onclick="deleteTodo('${todo.id}')">
                    <img src="/images/icon-cross.svg" alt="">
                </button>                        
            </li>
        </div>
        `;
        todoContainer.insertAdjacentHTML("afterbegin", html);
      });
    })
    .catch((error) => console.error(error));
});
clearCompleted.addEventListener("click", function () {
  // Redirect to another route when the button is clicked
  window.location.href = "/clearCompleted";
});
let completedTodosCount = 0; // Counter for completed todos
let tod = check.getAttribute("onchange");

const newTodos = [tod];

// const todoArray = getTodos(todos);
// console.log(todoArray);
checkboxes.forEach((checkbox) => {
  checkbox.addEventListener("change", function () {
    // Update counter based on checkbox state
    if (this.checked) {
      completedTodosCount++;
    } else {
      completedTodosCount--;
    }

    // Update the UI with the new counter value
    updateCounterUI();
  });
});
const updatedTodos = newTodos.map((todo) => todo.split(","));
const allTodos = updatedTodos[0].length;

function updateCounterUI() {
  //  update the UI with the new completedTodosCount value

  document.getElementById("complete").innerText =
    allTodos - completedTodosCount + " items left";
}

// updateCounterUI initially to set the counter value
updateCounterUI();
