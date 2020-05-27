(function() {
    'use strict';

    document.addEventListener("DOMContentLoaded", function(event) {
        let canvas = document.querySelector("#canvas");
        let ctx = canvas.getContext("2d");
        let fourInLine = new GameBoard(canvas);
        document.querySelector("#startGame").addEventListener("click", e => {
            fourInLine.start();
        });

        let chips = [];

        addChipsPlayer(40, 360, "#FF0000", 0);
        addChipsPlayer(1010, 360, "#0000FF", 20);

        function addChipsPlayer(x, y, colour, pointer) {
            for (let i = 0; i < 120; i += 6) {
                let chip = new Circle((x + Math.floor(Math.random() * 150 + 1)), (y + i), 40, colour, canvas);
                chip.draw();
                chips[pointer] = chip;
                pointer++;
            }
        }

        // let figures = [];
        let dragging = false;
        let draggingId = -1;
        console.log(chips);


        // detectClick();

        // function detectClick() {
        canvas.addEventListener('mousedown', r => {
            dragging = true;
            for (let i = 0; i < chips.length; i++) {
                let status = chips[i].hit(r.layerX, r.layerY);
                if (status) {
                    draggingId = i;
                    console.log('le pegue');
                    break;
                }
            }
        });

        canvas.addEventListener('mouseup', r => {
            dragging = false;
            draggingId = -1;
        });

        canvas.addEventListener('mousemove', r => {
            if (draggingId != -1) {
                chips[draggingId].setPosition(r.layerX, r.layerY);
                redraw();
            }
        });

        function redraw() {

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            // tablero.dibujarTablero();
            fourInLine.drawBoard(canvas);
            for (let i = 0; i < chips.length; i++) {
                if (draggingId !== i) {
                    chips[i].draw();
                }
            }


            if (draggingId !== -1) {
                chips[draggingId].draw();
            }

        }
        // }
    });
}());