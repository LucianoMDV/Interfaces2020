"use strick";

document.addEventListener("DOMContentLoaded", e => {

    let hamburgesa = document.querySelector("#hamburgesa")
    hamburgesa.addEventListener("click", e => {
        let botones = document.querySelector(".botones");
        botones.classList.toggle("desplegarNavBar");
        hamburgesa.classList.toggle("activeHamburgesa");
    });
});