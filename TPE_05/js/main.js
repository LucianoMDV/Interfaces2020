"use strick";

document.addEventListener("DOMContentLoaded", e => {

    let fondoBlur = document.querySelector(".fondo-blur");
    let hamburgesa = document.querySelector("#hamburgesa")
    hamburgesa.addEventListener("click", e => {
        let botones = document.querySelector(".botones");
        botones.classList.toggle("desplegarNavBar");
        hamburgesa.classList.toggle("activeHamburgesa");
        if (botones.classList.contains("desplegarNavBar")) {
            fondoBlur.style.setProperty("opacity", "1");
        } else {
            fondoBlur.style.setProperty("opacity", "0");
        }
    });
});