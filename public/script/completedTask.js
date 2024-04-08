

function completedTodo(todo){
    fetch("/completed" ,{
        method:'POST',
        headers:{
            "content-type":" application/x-www-form-urlencoded",
        },
        body:`todo=${encodeURIComponent(todo)}`,
      })
    .then(response=>response.json())
    .then(data=>{
      if(data.success){
        console.log("todo marked as completed succesfully");
      } 
      else{
        console.error(data.message)
      }
    })
    .catch(error=>console.error(error));
}
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

const checkboxes = document.querySelectorAll('.checkbox');
const check =document.querySelector(".checkbox");
const button =document.getElementById("complete-status");
const active =document.getElementById("active");
const all =document.getElementById("all");
const clearCompleted =document.getElementById("clear-completed");
button.addEventListener("click", function() {
  // Redirect to another route when the button is clicked
  window.location.href = "/completedTodo";
});
active.addEventListener("click", function() {
  // Redirect to another route when the button is clicked
  window.location.href = "/activeTodo";
});
all.addEventListener("click", function() {
  // Redirect to another route when the button is clicked
  window.location.href = "/allTodo";
});
clearCompleted.addEventListener("click", function() {
  // Redirect to another route when the button is clicked
  window.location.href = "/clearCompleted";
});
let completedTodosCount = 0; // Counter for completed todos
let tod =check.getAttribute("onchange")

const newTodos=[tod];

    // const todoArray = getTodos(todos); 
    // console.log(todoArray);
checkboxes.forEach(checkbox => {
  checkbox.addEventListener('change', function() {
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
const updatedTodos =newTodos.map(todo=>todo.split(","));
const allTodos = updatedTodos[0].length;

function updateCounterUI() {
  //  update the UI with the new completedTodosCount value
 
  document.getElementById('complete').innerText = allTodos-completedTodosCount +" items left";
}


// updateCounterUI initially to set the counter value
updateCounterUI();