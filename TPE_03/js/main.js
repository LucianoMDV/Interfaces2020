(function() {
    "use strict";

    document.addEventListener("DOMContentLoaded", e => {
        let btnStart = document.querySelector("#start");
        let btnHowToPlay = document.querySelector("#descripcion");
        let game = new Game();

        btnStart.addEventListener("click", e => {
            game.initGame();
            btnStart.classList.toggle("hidden");
            btnHowToPlay.classList.toggle("hidden");
        });

        btnHowToPlay.addEventListener("click", e => {
            btnHowToPlay.classList.toggle("agrandar");
            btnHowToPlay.classList.toggle("achicar");
            if (btnHowToPlay.classList.contains("achicar")) {
                btnHowToPlay.innerHTML = "¿How to play?";
            } else if (btnHowToPlay.classList.contains("agrandar")) {
                btnHowToPlay.innerHTML = "Solo tienes que usar la tecla flecha arriba ▲, para evitar tocar con los obstaculos! Mucha Suerte!";
            }
        });


    });

}());