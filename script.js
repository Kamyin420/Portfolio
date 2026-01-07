const hamburger = document.querySelector(".hamburger");
const menu = document.querySelector(".navigatie");
const title = document.querySelector("header h3");

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    menu.classList.toggle("active");
    title.classList.toggle("hide");
});

