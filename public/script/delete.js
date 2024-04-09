
function deleteTodo(todo){
    fetch(`/delete/${encodeURIComponent(todo)}`,{
        method:"DELETE"
    }) 
    .then(response=>response.json())
    .then(data=>{
        if(data.succes){
            const buttons=document.querySelectorAll("li button");
            buttons.forEach((button) => {
                const buttonId = button.getAttribute("id");
                console.log(buttonId);
                if(buttonId == todo){
                    button.closest("li").remove();
                }
            });
        }
        else{
            console.error(data.message);
        }
    })
    .catch(error => console.error(error));
}

