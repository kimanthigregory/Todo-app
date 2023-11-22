

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
