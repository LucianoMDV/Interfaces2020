(function() {
    "use strict";

    document.addEventListener("DOMContentLoaded", e => {

        let btnStart = document.querySelector("#start");
        btnStart.addEventListener("click", e => {
            let game = new Game();
            game.initGame();
            btnStart.setAttribute("hidden", "");
        });

    });

}());