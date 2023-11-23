

function completedTodo(todo){
    fetch("/completed" ,{
        method:'POST',
        headers:{
            "content-type":" application/x-www-form-urlencoded",
        },
        body:`todo=${encodeURIComponent(todo)}`,
    })
    .then(response=>response.redirected ?window.location.href=response.url:null)
    document.querySelector(".round p").classList.add("line")
    .catch(error=>console.error(error));
}
const checkboxes = document.querySelectorAll('.checkbox');
const check =document.querySelector(".checkbox");
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
  // You can update the UI with the new completedTodosCount value
  // For example, if you have an element with id 'counter', you can do:
  document.getElementById('complete').innerText = allTodos-completedTodosCount +" items left";
}


// You can also call updateCounterUI initially to set the counter value
updateCounterUI();