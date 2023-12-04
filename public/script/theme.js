const theme = document.querySelector(".theme-icon img")
const body = document.body;
const styles =document.getElementById("theme-styles")
let darkMode =localStorage.getItem("dark-mode");
if(darkMode==="anabled"){
    body.classList.add("light");
    

}
theme.addEventListener("click", function (){
    darkMode =localStorage.getItem("dark-mode");
    if(darkMode==="disabled"){
        theme.src = "/images/icon-moon.svg";
        body.classList.add("light")
        localStorage.setItem("dark-mode","anabled");
    }
    else{
        body.classList.remove("light")
        theme.src = "/images/icon-sun.svg";
        localStorage.setItem("dark-mode","disabled");

    }
    // console.log("clicked");
    // body.classList.toggle("light")
}) 
