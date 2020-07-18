"use strict";

document.addEventListener("DOMContentLoaded", e => {

    let fondoBlur = document.querySelector(".fondo-blur");
    let hamburguesa = document.querySelector("#hamburguesa");
    let botones = document.querySelector(".botones");
    let botonPerfil = document.querySelector(".container_IcoProfile");
    let container_buttons2 = document.querySelector(".container_buttons2");
    let containerDropdown = document.querySelector(".container_dropdown");
    let containerFiltro = document.querySelector(".container_filtro ");
    let filtroDespregable = document.querySelector(".container_filtro_despregable ");

    hamburguesa.addEventListener("click", e => {
        efectoHamburguesa();
    });

    fondoBlur.addEventListener("click", e => {
        efectoHamburguesa();
    });

    function efectoHamburguesa() {
        botones.classList.toggle("desplegarNavBar");
        hamburguesa.classList.toggle("activeHamburguesa");
        if (botones.classList.contains("desplegarNavBar")) {
            fondoBlur.style.setProperty("opacity", "1");
            fondoBlur.removeAttribute("hidden");
        } else {
            fondoBlur.style.setProperty("opacity", "0");
            fondoBlur.setAttribute("hidden", true);
        }
    }

    botonPerfil.addEventListener("click", e => {
        container_buttons2.classList.toggle("moveTop");
        containerDropdown.firstElementChild.classList.toggle("rotar");
    });

    containerFiltro.addEventListener("click", e => {
        filtroDespregable.classList.toggle("moveTopFiltro");
        containerFiltro.classList.toggle("activeFiltro");
        // if (filtroDespregable.classList.contains("moveTopFiltro")) {
        //     fondoBlur.style.setProperty("opacity", "1");
        //     fondoBlur.removeAttribute("hidden");
        // } else {
        //     fondoBlur.style.setProperty("opacity", "0");
        //     fondoBlur.setAttribute("hidden", true);
        // }
    });
});