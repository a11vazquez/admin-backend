/*======================
        HAM MENU
=========================*/console.log("nav.js se está ejecutando");
const navbar = document.getElementById("navbar");
const hamMenu = document.getElementById("ham-btn");
const hamClose = document.getElementById("ham-close");

hamMenu.addEventListener("click",() =>{
    navbar.classList.add("animate","nav-visible");
});

hamClose.addEventListener("click",() => {
    navbar.classList.remove("animate", "nav-visible");
   
});