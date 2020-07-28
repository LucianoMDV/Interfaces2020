"use strict";

document.addEventListener("DOMContentLoaded", e => {

    let botones = document.querySelector(".botones");
    let cuerpo = document.querySelector("#cuerpo");
    let hamburguesa = document.querySelector("#hamburguesa");
    let fondoBlur = document.querySelector(".fondo-blur");

    let intervalReproductor;

    let botonPerfil = document.querySelector(".container_IcoProfile");
    let container_buttons2 = document.querySelector(".container_buttons2");
    let containerDropdown = document.querySelector(".container_dropdown");
    let containerFiltro = document.querySelector(".container_filtro ");
    let filtroDespregable = document.querySelector(".container_filtro_despregable ");



    let reproductor = document.querySelector("#reproductor ");
    let nombreBanda = document.querySelector(".nombreBanda ");
    let progress = document.querySelector(".progress ");
    let tiempoRecorrido = document.querySelector(".tiempoRecorrido");

    home();

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

    hamburguesa.addEventListener("click", e => {
        efectoHamburguesa();
    });

    fondoBlur.addEventListener("click", e => {
        efectoHamburguesa();
    });

    botonPerfil.addEventListener("click", e => {
        container_buttons2.classList.toggle("moveTop");
        containerDropdown.firstElementChild.classList.toggle("rotar");
    });

    containerFiltro.addEventListener("click", e => {
        filtroDespregable.classList.toggle("moveTopFiltro");
        containerFiltro.classList.toggle("activeFiltro");
        // if (filtroDespregable.classList.contains("moveTopFiltro")) {
        //     filtroDespregable.removeAttribute("hidden");
        //     fondoBlur.style.setProperty("opacity", "1");
        //     fondoBlur.removeAttribute("hidden");
        // } else {
        //     filtroDespregable.setAttribute("hidden", true);
        //     fondoBlur.style.setProperty("opacity", "0");
        //     fondoBlur.setAttribute("hidden", true);
        // }
    });

    botones.querySelector(".home").addEventListener("click", home);
    async function home() {
        let home = await fetch('home.html');
        home = await home.text();
        cuerpo.innerHTML = home;
        // cerrar hamburguesa
        fondoBlur.style.setProperty("opacity", "0");
        fondoBlur.setAttribute("hidden", true);
        botones.classList.remove("desplegarNavBar");
        hamburguesa.classList.remove("activeHamburguesa");

        let btnPause = document.querySelectorAll(".icoPause ");
        let btnPlay = document.querySelectorAll(".icoPlay ");
        let disco = document.querySelectorAll(".disco");


        let barraCargadaMax = parseInt(window.getComputedStyle(progress.children[0], null).getPropertyValue("width").split("px")[0]);
        // let margine = parseInt(window.getComputedStyle(progress, null).getPropertyValue("margin-left").split("px")[0]);
        // barraCargadaMax = barraCargadaMax - (margine);
        // console.log(barraCargadaMax);
        // console.log(margine);

        let audioDemo = new Audio("./music/videoplayback.mp4");
        audioDemo.addEventListener("onload", e => {
            console.log(audioDemo.duration);
        });

        btnPlay.forEach(btn => {
            btn.addEventListener("click", e => {
                // audioDemo.play();
                for (let i = 0; i < btnPlay.length; i++) {
                    btnPlay[i].removeAttribute("hidden");
                    btnPlay[i].nextElementSibling.setAttribute("hidden", true);
                    btnPlay[i].parentElement.parentElement.previousElementSibling.querySelector(".disco").classList.remove("moveDiscoPlay");
                    btnPlay[i].parentElement.parentElement.previousElementSibling.querySelector(".disco").children[0].removeAttribute("hidden");
                    btnPlay[i].parentElement.parentElement.previousElementSibling.querySelector(".palanca").classList.remove("movePalanca");

                    btnPlay[i].parentElement.parentElement.previousElementSibling.classList.remove("cancionActive");
                    btnPlay[i].parentElement.parentElement.previousElementSibling.querySelector(".decoracion").classList.remove("showDecoracion");
                }
                clearInterval(intervalReproductor);
                nombreBanda.classList.remove("moveText");

                btn.setAttribute("hidden", true);
                btn.parentElement.parentElement.previousElementSibling.querySelector(".disco").classList.toggle("moveDiscoPlay");
                btn.parentElement.parentElement.previousElementSibling.classList.toggle("cancionActive");
                setTimeout(() => {
                    btn.parentElement.parentElement.previousElementSibling.querySelector(".disco").children[0].setAttribute("hidden", true);
                }, 500);
                btn.parentElement.parentElement.previousElementSibling.querySelector(".palanca").classList.toggle("movePalanca");
                btn.parentElement.parentElement.previousElementSibling.querySelector(".decoracion").classList.toggle("showDecoracion");

                let nombreCompleto = "";
                let ruta = btn.parentElement.parentElement.previousElementSibling.querySelector(".nombreCancion");
                // console.log(ruta);
                let banda = ruta.children[0].innerHTML;
                let nombre = ruta.children[1].children[0].innerHTML;
                nombreCompleto = banda + " - " + nombre;
                // console.log(nombreCompleto);
                nombreBanda.innerHTML = nombreCompleto;
                btn.nextElementSibling.removeAttribute("hidden");
                // reproductor.style.setProperty("background", "#FFFFCE");
                nombreBanda.classList.toggle("moveText");
                let time = 0;
                let time2 = 0;
                let marcador = "0:0";
                intervalReproductor = setInterval(() => {
                    time++;
                    time2 = time;
                    if (time >= 10) {
                        marcador = "0:";
                    }
                    if (time >= 60) {
                        marcador = "1:0";
                        time2 = time2 - 60;
                    }
                    if (time >= 70) {
                        marcador = "1:";
                    }
                    tiempoRecorrido.innerHTML = marcador + time2;
                    progress.children[0].style.setProperty("width", time + "%");
                    if (time >= 100) {
                        clearInterval(intervalReproductor);
                    }
                }, 1000);
            });
        });
        btnPause.forEach(btn => {
            btn.addEventListener("click", e => {
                // audioDemo.pause();
                btn.setAttribute("hidden", true);
                btn.previousElementSibling.removeAttribute("hidden");
                btn.parentElement.parentElement.previousElementSibling.querySelector(".disco").classList.toggle("moveDiscoPlay");
                console.log(btn.parentElement.parentElement.previousElementSibling.querySelector(".disco").children[0].removeAttribute("hidden"));
                console.log(btn.parentElement.parentElement.previousElementSibling.querySelector(".palanca").classList.toggle("movePalanca"));

                btn.parentElement.parentElement.previousElementSibling.querySelector(".decoracion").classList.remove("showDecoracion");

                btn.parentElement.parentElement.previousElementSibling.classList.remove("cancionActive");
                // reproductor.style.setProperty("background", "#468EA2");
                nombreBanda.classList.toggle("moveText");
                clearInterval(intervalReproductor);
            });
        });

        document.querySelector(".infoDisturbed").addEventListener("click", busquedaHTML);
        async function busquedaHTML() {
            let busquedaHTML = await fetch('buscar.html');
            busquedaHTML = await busquedaHTML.text();
            cuerpo.innerHTML = busquedaHTML;

            // cerrar hamburguesa
            fondoBlur.style.setProperty("opacity", "0");
            fondoBlur.setAttribute("hidden", true);
            botones.classList.remove("desplegarNavBar");
            hamburguesa.classList.remove("activeHamburguesa");

            let dropList = document.querySelectorAll(".container_dropdown2");
            dropList.forEach(btn => {
                btn.addEventListener("click", e => {
                    // for (let i = 0; i < dropList.length; i++) {
                    //     dropList[i].parentElement.nextElementSibling.classList.add("ceroAltura");
                    // }
                    btn.parentElement.nextElementSibling.classList.toggle("ceroAltura");
                });

            });
        }
        // 
    }

    botones.querySelector(".myPlayList").addEventListener("click", playListHTML);
    async function playListHTML() {
        let playListHTML = await fetch('myPlayList.html');
        playListHTML = await playListHTML.text();
        cuerpo.innerHTML = playListHTML;

        // cerrar hamburguesa
        fondoBlur.style.setProperty("opacity", "0");
        fondoBlur.setAttribute("hidden", true);
        botones.classList.remove("desplegarNavBar");
        hamburguesa.classList.remove("activeHamburguesa");

        let dropList = document.querySelectorAll(".container_dropdown2");
        dropList.forEach(btn => {
            btn.addEventListener("click", e => {
                // for (let i = 0; i < dropList.length; i++) {
                //     dropList[i].parentElement.nextElementSibling.classList.add("ceroAltura");
                // }
                btn.parentElement.nextElementSibling.classList.toggle("ceroAltura");
            });

        });


    }


});