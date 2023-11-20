
function deleteTodo(todo){
    fetch(`/delete/${encodeURIComponent(todo)}`,{
        method:"DELETE"
    }) 
    .then(response=>response.json())
    .then(data=>{
        if(data.succes){
            const todoItem=document.querySelectorAll("li p");
            todoItem.forEach((item) => {
                if(item.textContent.includes(todo)){
                    item.closest("li").remove();
                }
            });
        }
        else{
            console.error(data.message);
        }
    })
    .catch(error => console.error(error));
}
