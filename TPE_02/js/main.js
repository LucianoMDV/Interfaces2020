(function() {
    'use strict';

    document.addEventListener("DOMContentLoaded", function(event) {
        let canvas = document.querySelector("#canvas");
        let ctx = canvas.getContext("2d");
        let chipImage = document.querySelector("#img1");
        let boardImage = document.querySelector("#img2");
        let canvasImage = document.querySelector("#img3");
        let here = document.querySelector("#img4");
        ctx.drawImage(canvasImage, 0, 0, canvas.width, canvas.height);
        let fourInLine = new GameBoard(canvas, chipImage, boardImage);

        let chips = [];
        let detectPosition = [];
        let takeChip = null;
        let dragging = false;
        let draggingId = -1;

        let startGame = false;
        let turn;

        let btnStartGame = document.querySelector("#startGame");
        btnStartGame.addEventListener("click", e => {
            start();
        });

        addChipsToPlayer(40, 360, "#FF0000", 0);
        addChipsToPlayer(1010, 360, "#0000FF", 20);


        function addChipsToPlayer(x, y, colour, pointer) {
            for (let i = 0; i < 120; i += 6) {
                let chip = new Circle((x + Math.floor(Math.random() * 150 + 1)), (y + i), 40, colour, canvas);
                chip.setImage(chipImage);
                chip.drawImage();
                chips[pointer] = chip;
                pointer++;
            }
        }

        //----------------------------------------> DETECTAR POSICIONES DE FICHAS <----------------------------------------
        //                  X,  Y, X1, Y1
        let re = new Rect(240, 15, 90, 85, "RGB(255, 255, 255,0)", canvas);
        let re2 = new Rect(330, 15, 90, 85, "RGB(255, 255, 255,0)", canvas);
        let re3 = new Rect(420, 15, 90, 85, "RGB(255, 255, 255,0)", canvas);
        let re4 = new Rect(510, 15, 90, 85, "RGB(255, 255, 255,0)", canvas);
        let re5 = new Rect(600, 15, 90, 85, "RGB(255, 255, 255,0)", canvas);
        let re6 = new Rect(690, 15, 90, 85, "RGB(255, 255, 255,0)", canvas);
        let re7 = new Rect(780, 15, 90, 85, "RGB(255, 255, 255,0)", canvas);
        let re8 = new Rect(870, 15, 90, 85, "RGB(255, 255, 255,0)", canvas);
        detectPosition = [re, re2, re3, re4, re5, re6, re7, re8];

        detectPosition.forEach(elem => {
            elem.setImage(here);
            elem.drawImage();
        });
        //----------------------------------------> ///////////////////////////// <----------------------------------------

        canvas.addEventListener('mousedown', r => {
            if (startGame == true) {
                if (turn == true) {
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
                                    break;
                                }
                            }
                        }
                    }
                } else {
                    if (turn == false) {
                        for (let i = 0; i < chips.length; i++) {
                            // console.log(Math.floor((chips.length / 2)) + " AZUL");
                            if (chips[i].getColour() == "#0000FF") {
                                let status = chips[i].hit(r.layerX, r.layerY);
                                if (status) {
                                    draggingId = i;
                                    takeChip = chips[i];
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
                    fijarFichaColumna(1, takeChip);
                    fourInLine.buscar();
                }
                if (re2.hit(dropX, dropY)) {
                    fijarFichaColumna(2, takeChip);
                    fourInLine.buscar();
                }
                if (re3.hit(dropX, dropY)) {
                    fijarFichaColumna(3, takeChip);
                    fourInLine.buscar();
                }
                if (re4.hit(dropX, dropY)) {
                    fijarFichaColumna(4, takeChip);
                    fourInLine.buscar();
                }
                if (re5.hit(dropX, dropY)) {
                    fijarFichaColumna(5, takeChip);
                    fourInLine.buscar();
                }
                if (re6.hit(dropX, dropY)) {
                    fijarFichaColumna(6, takeChip);
                    fourInLine.buscar();
                }
                if (re7.hit(dropX, dropY)) {
                    fijarFichaColumna(7, takeChip);
                    fourInLine.buscar();
                }
                if (re8.hit(dropX, dropY)) {
                    fijarFichaColumna(8, takeChip);
                    fourInLine.buscar();
                }

                takeChip = null;

                if (chips.length != 0) {
                    let change = fourInLine.verificarFichas();
                    if (change == true) {
                        turn = !turn;
                        fourInLine.play(turn);
                    }
                } else {
                    $("#titleModal").text("Prepare for this");
                    $("#modalMessage").text("Game Over");
                    $("#staticBackdrop").modal("show");
                    endGame();
                }
            }
        });

        $("#playAgain").on("click", e => {
            startGame = false;
            fourInLine.drawBoard();
            $("#playerWin").text(" ");
            $("#staticBackdrop").modal("hide");
            chips = [];
            addChipsToPlayer(40, 360, "#FF0000", 0);
            addChipsToPlayer(1010, 360, "#0000FF", 20);
            redraw();
            start();
        });

        canvas.addEventListener('mousemove', r => {
            if (draggingId != -1) {
                chips[draggingId].setPosition(r.layerX, r.layerY);
                redraw();
            }
        });

        function redraw() {

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(canvasImage, 0, 0, canvas.width, canvas.height);
            detectPosition.forEach(elem => {
                elem.drawImage();
            });

            fourInLine.redrawBoard();
            for (let i = 0; i < chips.length; i++) {
                if (draggingId !== i) {
                    // chips[i].draw();
                    chips[i].drawImage();
                }
            }

            if (draggingId !== -1) {
                // chips[draggingId].draw();
                chips[draggingId].drawImage();
            }

        }

        function fijarFichaColumna(col, takeChip) {
            // debugger;
            // let cambio = fourInLine.setCol(col, takeChip.getColour());
            let cambio = fourInLine.setCol(col, takeChip.getImage(), takeChip.getColour());
            if (cambio == true) {
                let a = chips.indexOf(takeChip);
                chips.splice(a, 1);
                redraw();
            }
        }

        function start() {
            startGame = true;
            btnStartGame.setAttribute("disabled", " ");
            let result = Math.floor((Math.random() * 2) + 1);
            // console.log(result);

            if (result == 1) {
                turn = true;
                fourInLine.play(turn);
                // alert("JUGADOR 1");
            } else {
                turn = false;
                fourInLine.play(turn);
                // alert("JUGADOR 2");
            }
        }

        function endGame() {
            startGame = false;
        }

    });
}());