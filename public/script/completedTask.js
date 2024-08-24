const createTodo = function (todo, index, data) {
  const listItem = document.createElement("li");
  const checkbox = document.createElement("input");
  const paragraph = document.createElement("p");
  const label = document.createElement("label");
  const deleteBtn = document.createElement("button");
  const deleteIcon = document.createElement("img");

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

  deleteBtn.id = todo.id;
  deleteIcon.src = "/images/icon-cross.svg";
  deleteIcon.addEventListener("click", () => {
    deleteTodo(todo.id);
  });
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
  listItem.appendChild(deleteBtn);
  deleteBtn.appendChild(deleteIcon);
};
fetch(`/allTodo`, {
  method: "GET",
})
  .then((response) => response.json())
  .then((data) => {
    data.forEach((todo, index) => {
      createTodo(todo, index, data);
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
        createTodo(todo, index, data);
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
        updateCounterUI(data.todos);
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
        createTodo(todo, index, data);
      });
    })
    .catch((error) => console.error(error));

  // window.location.href = "/activeTodo";
});
all.addEventListener("click", function () {
  // Redirect to another route when the button is clicked
  // window.location.href = "/allTodo";

  todoContainer.innerHTML = "";
  fetch(`/allTodo`, {
    method: "GET",
  })
    .then((response) => response.json())
    .then((data) => {
      data.forEach((todo, index) => {
        createTodo(todo, index, data);
      });
    })
    .catch((error) => console.error(error));
});
clearCompleted.addEventListener("click", function () {
  // Redirect to another route when the button is clicked
  window.location.href = "/clearCompleted";
});
