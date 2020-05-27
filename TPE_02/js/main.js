(function() {
    'use strict';

    document.addEventListener("DOMContentLoaded", function(event) {
        let canvas = document.querySelector("#canvas");
        let fourInLine = new GameBoard(canvas);
        document.querySelector("#startGame").addEventListener("click", e => {
            fourInLine.start();
        });

    });
}());