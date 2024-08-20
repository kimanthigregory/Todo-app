function deleteTodo(todo) {
  fetch(`/delete/${encodeURIComponent(todo)}`, {
    method: "DELETE",
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.succes) {
        const buttons = document.querySelectorAll("li button");
        buttons.forEach((button) => {
          const buttonId = button.getAttribute("id");
          console.log(buttonId);
          if (buttonId == todo) {
            button.closest("li").remove();
          }
        });

        updateCounterUI(data.allTodos);
        console.log(data.allTodos);
      } else {
        console.error(data.message);
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
    })
    .catch((error) => console.error(error));
}
