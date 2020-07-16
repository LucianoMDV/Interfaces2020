"use strick";

document.addEventListener("DOMContentLoaded", e => {

    let fondoBlur = document.querySelector(".fondo-blur");
    let hamburgesa = document.querySelector("#hamburgesa");
    let botones = document.querySelector(".botones");

    hamburgesa.addEventListener("click", e => {
        efectoHamburgesa();
    });

    fondoBlur.addEventListener("click", e => {
        efectoHamburgesa();
    });

    function efectoHamburgesa() {
        botones.classList.toggle("desplegarNavBar");
        hamburgesa.classList.toggle("activeHamburgesa");
        if (botones.classList.contains("desplegarNavBar")) {
            fondoBlur.style.setProperty("opacity", "1");
            fondoBlur.removeAttribute("hidden");
        } else {
            fondoBlur.style.setProperty("opacity", "0");
            fondoBlur.setAttribute("hidden", true);
        }
    }
});