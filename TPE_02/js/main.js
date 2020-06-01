(function() {
    'use strict';

    document.addEventListener("DOMContentLoaded", function(event) {
        let canvas = document.querySelector("#canvas");
        let ctx = canvas.getContext("2d");
        let fourInLine = new GameBoard(canvas);

        let chips = [];
        let detectPosition = [];
        let takeChip = null;
        let dragging = false;
        let draggingId = -1;

        let startGame = false;
        let turn;

        document.querySelector("#startGame").addEventListener("click", e => {
            start();
        });

        addChipsToPlayer(40, 360, "#FF0000", 0);
        addChipsToPlayer(1010, 360, "#0000FF", 20);

        function addChipsToPlayer(x, y, colour, pointer) {
            for (let i = 0; i < 120; i += 6) {
                let chip = new Circle((x + Math.floor(Math.random() * 150 + 1)), (y + i), 40, colour, canvas);
                chip.draw();
                // chip.drawImage2();
                // this.chipsBoard[pointer].drawImage2()("repeat");
                chips[pointer] = chip;
                pointer++;
            }
        }

        //----------------------------------------> DETECTAR POSICIONES DE FICHAS <----------------------------------------
        //                  X,  Y, X1, Y1
        let re = new Rect(240, 15, 90, 85, "#00FF00", canvas);
        let re2 = new Rect(330, 15, 90, 85, "#00FFAA", canvas);
        let re3 = new Rect(420, 15, 90, 85, "#AAFF00", canvas);
        let re4 = new Rect(510, 15, 90, 85, "#00FF00", canvas);
        let re5 = new Rect(600, 15, 90, 85, "#00FFAA", canvas);
        let re6 = new Rect(690, 15, 90, 85, "#AAFF00", canvas);
        let re7 = new Rect(780, 15, 90, 85, "#00FFAA", canvas);
        let re8 = new Rect(870, 15, 90, 85, "#00FF00", canvas);
        detectPosition = [re, re2, re3, re4, re5, re6, re7, re8];

        detectPosition.forEach(elem => {
            elem.draw();
        });
        //----------------------------------------> ///////////////////////////// <----------------------------------------

        canvas.addEventListener('mousedown', r => {
            // debugger;
            // console.log(startGame);
            // console.log(turn);
            // console.log(chips[0].getImage());


            if (startGame == true) {
                if (turn == true) {
                    fourInLine.play(turn);
                    // turn = 1;


                    dragging = true;
                    if (turn == true) {
                        for (let i = 0; i < chips.length; i++) {
                            // console.log(Math.floor((chips.length / 2) - 1) + " ROJO");
                            if (chips[i].getColour() == "#FF0000") {
                                let status = chips[i].hit(r.layerX, r.layerY);
                                if (status) {
                                    draggingId = i;
                                    takeChip = chips[i];
                                    // console.log('le pegue');
                                    console.log(takeChip);
                                    console.log(i);

                                    break;
                                }
                            }
                        }
                    }
                } else {
                    fourInLine.play(turn);

                    // turn = 0;
                    if (turn == false) {
                        for (let i = 0; i < chips.length; i++) {

                            // console.log(Math.floor((chips.length / 2)) + " AZUL");
                            if (chips[i].getColour() == "#0000FF") {
                                let status = chips[i].hit(r.layerX, r.layerY);
                                if (status) {
                                    draggingId = i;
                                    takeChip = chips[i];
                                    console.log(takeChip);
                                    console.log(i);
                                    // console.log('le pegue');
                                    break;
                                }
                            }
                        }
                    }
                }
            }
        });

        canvas.addEventListener('mouseup', r => {
            dragging = false;
            draggingId = -1;
            let dropX = r.layerX;
            let dropY = r.layerY;
            // console.log(takeChip);
            if (takeChip != null) { //lo necesito para evitar que se coloque una ficha sin agarrar ninguna y evitar el error que no hay ninguna ficha seleccionada para colocar en el tablero
                if (re.hit(dropX, dropY)) {
                    fijarFichaColumna(1);
                    fourInLine.buscar(takeChip);
                }
                if (re2.hit(dropX, dropY)) {
                    fijarFichaColumna(2);
                    fourInLine.buscar(takeChip);
                }
                if (re3.hit(dropX, dropY)) {
                    fijarFichaColumna(3);
                    fourInLine.buscar(takeChip);
                }
                if (re4.hit(dropX, dropY)) {
                    fijarFichaColumna(4);
                    fourInLine.buscar(takeChip);
                }
                if (re5.hit(dropX, dropY)) {
                    fijarFichaColumna(5);
                    fourInLine.buscar(takeChip);
                }
                if (re6.hit(dropX, dropY)) {
                    fijarFichaColumna(6);
                    fourInLine.buscar(takeChip);
                }
                if (re7.hit(dropX, dropY)) {
                    fijarFichaColumna(7);
                    fourInLine.buscar(takeChip);
                }
                if (re8.hit(dropX, dropY)) {
                    fijarFichaColumna(8);
                    fourInLine.buscar(takeChip);
                }
                takeChip = null;
                // debugger;
                let change = fourInLine.verificarFichas();
                if (change == true) {
                    turn = !turn;
                    // turn == true ? false : true;
                }
            }
        });

        canvas.addEventListener('mousemove', r => {
            if (draggingId != -1) {
                chips[draggingId].setPosition(r.layerX, r.layerY);
                redraw();
            }
        });

        function redraw() {

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            detectPosition.forEach(elem => {
                elem.draw();
            });

            fourInLine.redrawBoard();
            for (let i = 0; i < chips.length; i++) {
                if (draggingId !== i) {
                    chips[i].draw();
                    // chips[i].drawImage2();
                }
            }

            if (draggingId !== -1) {
                chips[draggingId].draw();
                // chips[draggingId].drawImage2("repat");
            }

        }

        function fijarFichaColumna(col) {
            let cambio = fourInLine.setCol(col, takeChip.getColour());
            // let cambio = fourInLine.setCol(col, takeChip.getImage());
            if (cambio == true) {
                let a = chips.indexOf(takeChip);
                chips.splice(a, 1);
                redraw();
            }
        }

        function start() {
            startGame = true;

            let result = Math.floor((Math.random() * 2) + 1);
            // console.log(result);

            if (result == 1) {
                turn = true;
                alert("JUGADOR 1");
            } else {
                turn = false;
                alert("JUGADOR 2");
            }
        }

        function endGame() {
            startGame = false;
        }
    });
}());