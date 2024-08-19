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
const createTodo = function (todo, index, data) {
  const listItem = document.createElement("li");
  const checkbox = document.createElement("input");
  const paragraph = document.createElement("p");
  const label = document.createElement("label");

  listItem.classList.add("round");
  listItem.classList.add("task");
  checkbox.type = "checkbox";
  checkbox.checked = todo.completed;

  checkbox.classList.add("chec");
  checkbox.value = todo.id;
  checkbox.id = `checkbox${index}`;
  checkbox.name = "todoId";

  paragraph.textContent = todo.item;

  label.htmlFor = `${todo.id}`;
  // label.classList.add("checked");
  // let checked = false;
  // let counter = updateCounterUI();
  // console.log(counter);
  label.addEventListener("click", function () {
    label.classList.toggle("checked");
    paragraph.classList.toggle("check");
    paragraph.classList.toggle("todoText");
    completedTodo(todo.id);
    console.log(todo.id);
  });

  function updateCounterUI(data) {
    //  update the UI with the new completedTodosCount value
    const todoLength = data.length;
    const completedTask = data.filter((todo) => todo.completed).length;
    const itemsLeft = todoLength - completedTask;
    document.getElementById("complete").innerText = itemsLeft + " items left";

    return itemsLeft;
  }
  updateCounterUI(data);
  // console.log(completedTodosCount);
  // updateCounterUI initially to set the counter value

  if (todo.completed) {
    label.classList.add("checked");
    paragraph.classList.add("check");
  } else {
    label.classList.remove("checked");
    paragraph.classList.remove("check");
    paragraph.classList.add("todoText");
  }

  todoContainer.appendChild(listItem);
  listItem.appendChild(checkbox);
  listItem.appendChild(label);
  listItem.appendChild(paragraph);
};
fetch(`/allTodo`, {
  method: "GET",
})
  .then((response) => response.json())
  .then((data) => {
    data.forEach((todo, index) => {
      createTodo(todo, index, data);

      // let counter = 0;
      // let todoLeft = updateCounterUI();
      // let completed = false;
      // const todoLabel = document.querySelectorAll("label");
      // todoLabel.forEach((checkbox) => {
      //   checkbox.addEventListener("click", function () {
      //     if (this.click) {
      //       counter++;
      //       todoCounter(counter, todoLeft);
      //     } else {
      //       counter--;
      //       todoCounter(counter, todoLeft);
      //     }
      //     console.log(counter);
      //     console.log(todoLeft);
      //   });
      // });
      // const todoCounter = function (counter, todoLeft) {
      //   document.getElementById("complete").innerText = `${
      //     todoLeft - counter
      //   }  items left`;
      // };
    });
  })
  .catch((error) => console.error(error));

const paragraph = document.querySelector(".task p");
const todoContainer = document.querySelector(".todo-container");
const list = document.querySelector("li");
const checkboxes = document.querySelectorAll(".chec");
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

        listItem.classList.add("round");
        listItem.classList.add("task");
        checkbox.type = "checkbox";
        checkbox.checked = todo.completed;

        checkbox.value = todo.id;
        checkbox.id = `checkbox${index}`;
        checkbox.name = "todoId";

        checkbox.addEventListener("change", function () {
          if (this.checked) {
            alert("hello");
          }
        });

        paragraph.textContent = todo.item;
        paragraph.classList.add("check");

        label.htmlFor = `${todo.id}`;
        // label.classList.add("checked");
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
        console.log("todo marked hello as completed succesfully");
      } else {
        console.error(data.message);
        updateCounterUI(data.todos);
      }

      function updateCounterUI(todos) {
        //  update the UI with the new completedTodosCount value
        const todoLength = todos.length;
        const completedTask = todos.filter((todo) => todo.completed).length;
        const itemsLeft = todoLength - completedTask;
        document.getElementById("complete").innerText =
          itemsLeft + " items left";

        return itemsLeft;
      }
      console.log(updateCounterUI(data.todos));
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
                <input type="checkbox" name="todoId" value = "${todo.id}" id="checkbox${index}" class="checked" onchange="alert('hello')" onclick="completedTodo('${todo.id}')">
                <label for="checkbox${index}" class = "checked"></label>
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

// const newTodos = [tod];

// const todoArray = getTodos(todos);
// console.log(todoArray);
// checkboxes.forEach((checkbox) => {
//   checkbox.addEventListener("click", function () {
//     // Update counter based on checkbox state
//     if (this.checked) {
//       completedTodosCount++;
//     } else {
//       completedTodosCount--;
//     }

//     // Update the UI with the new counter value
//     updateCounterUI();
//   });
// });
// const updatedTodos = newTodos.map((todo) => todo.split(","));
// const allTodos = updatedTodos[0].length;
