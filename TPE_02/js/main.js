(function() {
    'use strict';

    document.addEventListener("DOMContentLoaded", function(event) {
        let canvas = document.querySelector("#canvas");
        let fourInLine = new GameBoard(canvas);
        document.querySelector("#startGame").addEventListener("click", e => {
            fourInLine.start();
        });

        let arrFichas = [];

        fichas(40, 360, "#FF0000", 2);
        fichas(1010, 360, "#0000FF", 23);

        function fichas(x, y, color, c) {
            for (let i = 0; i < 126; i += 6) {
                let ficha = new Circle((x + Math.floor(Math.random() * 150 + 1)), (y + i), 40, color, canvas);
                ficha.draw();
                arrFichas[c] = ficha;
                c++;
            }
        }

        let figures = [];
        let dragging = false;
        let draggingId = -1;
        detectClick();

        function detectClick() {
            canvas.addEventListener('mousedown', r => {
                dragging = true;
                for (let i = 0; i < figures.length; i++) {
                    let status = figures[i].hit(r.layerX, r.layerY);
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
                    figures[draggingId].setPosition(r.layerX, r.layerY);
                    this.redraw();
                }
            });

        }
    });
}());