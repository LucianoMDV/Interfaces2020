class GameBoard {
    constructor(canvas) {
        this.players = [new Player("Lucho"), new Player("Seba")];
        this.startGame = false;
        this.arrayCircles = [];
        this.turn = 0;
        this.canvas = canvas;
        this.ultimaFicha = null;
        this.board = new Rect(240, 100, 720, 450, "#000000", canvas);
        this.drawBoard();
        // this.cont = 0;
    }

    start() {
        this.startGame = true;
        setInterval(() => {
            // this.cont++;
            // if (this.cont == 10) {
            //     this.endGame();
            // }
            if (this.startGame == true) {
                if (this.turn == 0) {
                    this.play(this.players[0]);
                    this.turn = 1;

                } else if (this.turn == 1) {
                    this.play(this.players[1]);
                    this.turn = 0;
                }
            }
        }, 3000);
    }

    play(player) {
        console.log(player);
    }

    endGame() {
        this.startGame = false;
    }

    drawBoard() {
        this.board.draw();
        let pointer = 0;
        let x = 0;
        let y = 0;
        let colour = "#FFFFFF";
        for (let row = 0; row < 640; row += 90) {
            for (let col = 0; col < 400; col += 90) {
                x = row + 285;
                y = col + 145;
                this.arrayCircles[pointer] = new Circle(x, y, 40, colour, this.canvas);
                this.arrayCircles[pointer].draw();
                pointer++;
            }
        }
    }

    redrawBoard() {
        this.board.draw();
        for (let i = 0; i < this.arrayCircles.length; i++) {
            this.arrayCircles[i].draw();
        }
        console.log(this.arrayCircles);

    }

    setCol(col, colour) {
        let freeSpace = false;
        switch (col) {
            case 1:
                freeSpace = this.setcolourColumn(0, 4, colour, freeSpace);
                break;
            case 2:
                freeSpace = this.setcolourColumn(5, 9, colour, freeSpace);
                break;
            case 3:
                freeSpace = this.setcolourColumn(10, 14, colour, freeSpace);
                break;
            case 4:
                freeSpace = this.setcolourColumn(15, 19, colour, freeSpace);
                break;
            case 5:
                freeSpace = this.setcolourColumn(20, 24, colour, freeSpace);
                break;
            case 6:
                freeSpace = this.setcolourColumn(25, 29, colour, freeSpace);
                break;
            case 7:
                freeSpace = this.setcolourColumn(30, 34, colour, freeSpace);
                break;
            case 8:
                freeSpace = this.setcolourColumn(35, 39, colour, freeSpace);
                break;
                // default:
                //     break;
        }
        this.redrawBoard();
        return freeSpace;
    }

    //deberia ser privada pero no se como 
    setcolourColumn(fromHere, toHere, colour, freeSpace) {
        for (let i = toHere; i >= fromHere; i--) {
            if (this.arrayCircles[i].getColour() == '#FFFFFF') {
                this.ultimaFicha = i;
                this.arrayCircles[i].setColour(colour);
                freeSpace = true;
                break;
            }
        }
        return freeSpace;
    }

    buscar(takeChip, limite) {
        // console.log("ultima FICHA: ");
        // console.log(this.ultimaFicha);
        let cont = 0;

        for (let index = 0; index < this.arrayCircles.length; index++) {
            if (this.arrayCircles[index].getColour() == takeChip.getColour()) {
                for (let j = index; j < this.arrayCircles.length; j += 5) {
                    //busca por derecha
                    if (this.arrayCircles[j].getColour() == takeChip.getColour()) {
                        //console.log(" busco hacia la derecha " + index + " ---- " + cont);
                        cont++;
                        if (cont == 4) {
                            console.log("win");
                        }
                    } else {
                        break;
                    }
                }
                cont = 0;
                //busca por izquierda
                for (let j = index; j >= 0; j -= 5) {
                    if (this.arrayCircles[j].getColour() == takeChip.getColour()) {
                        //console.log(" busco hacia la izquierda " + index + " ---- " + cont);
                        cont++;
                        if (cont == 4) {
                            console.log("win");
                        }
                    } else {
                        break;
                    }
                }
                cont = 0;
                //busca por limite hacia arriba
                for (let j = index; j >= 0; j--) {
                    if (this.arrayCircles[j].getColour() == takeChip.getColour()) {
                        //console.log(" busco hacia la izquierda " + index + " ---- " + cont);
                        cont++;
                        if (cont == 4) {
                            console.log("win");
                        }
                    } else {
                        break;
                    }
                }
                cont = 0;
                //busca por limite hacia abajo
                for (let j = index; j <= limite; j++) {
                    if (this.arrayCircles[j].getColour() == takeChip.getColour()) {
                        //console.log(" busco hacia la izquierda " + index + " ---- " + cont);
                        cont++;
                        if (cont == 4) {
                            console.log("win");
                        }
                    } else {
                        break;
                    }
                }
                cont = 0;
                //busca por diagonal derecha arriba
                for (let j = index; j < this.arrayCircles.length; j += 4) {
                    if (this.arrayCircles[j].getColour() == takeChip.getColour()) {
                        //console.log(" busco hacia la izquierda " + index + " ---- " + cont);
                        cont++;
                        if (cont == 4) {
                            console.log("win");
                        }
                    } else {
                        break;
                    }
                }
                cont = 0;
                //busca por diagonal derecha abajo
                for (let j = index; j < this.arrayCircles.length; j += 6) {
                    if (this.arrayCircles[j].getColour() == takeChip.getColour()) {
                        //console.log(" busco hacia la izquierda " + index + " ---- " + cont);
                        cont++;
                        if (cont == 4) {
                            console.log("win");
                        }
                    } else {
                        break;
                    }
                }
                cont = 0;
                //busca por diagonal izquierda arriba
                for (let j = index; j >= 0; j -= 6) {
                    if (this.arrayCircles[j].getColour() == takeChip.getColour()) {
                        //console.log(" busco hacia la izquierda " + index + " ---- " + cont);
                        cont++;
                        if (cont == 4) {
                            console.log("win");
                        }
                    } else {
                        break;
                    }
                }
                cont = 0;
                //busca por diagonal izquierda abajo
                for (let j = index; j >= 0; j -= 4) {
                    if (this.arrayCircles[j].getColour() == takeChip.getColour()) {
                        //console.log(" busco hacia la izquierda " + index + " ---- " + cont);
                        cont++;
                        if (cont == 4) {
                            console.log("win");
                        }
                    } else {
                        break;
                    }
                }
                cont = 0;
            }

        }

        // for (let i = 0; i < this.arrayCircles.length; i++) {
        //     if (this.arrayCircles[i].getColour() == takeChip.getColour()) {
        //         // debugger;
        //         // if (this.ultimaFicha >= 15) {
        //         cont = this.horizontalIzqMenos5(15, takeChip, cont);
        //         // }
        //         // if (this.ultimaFicha <= 24) {
        //         // cont = this.horizontalDerMas5(this.ultimaFicha, takeChip, cont);
        //         // }
        //     }

        // }

        // console.log(takeChip);
        // let cont = 0;
        // if (this.arrayCircles[this.ultimaFicha].getColour() == takeChip.getColour()) {
        //     console.log("buscar: " + this.ultimaFicha);
        //     if (this.ultimaFicha >= 15) {
        //         cont = this.horizontalIzqMenos5(this.ultimaFicha, takeChip, cont);
        //     }
        //     if (this.ultimaFicha <= 24) {
        //         cont = this.horizontalDerMas5(this.ultimaFicha, takeChip, cont);
        //     }

        // }
    }

    horizontalIzqMenos5(i, takeChip, cont) {
        debugger;
        for (let j = i; j >= 0; j -= 5) {
            if (this.arrayCircles[j].getColour() == takeChip.getColour()) {
                console.log(this.arrayCircles[j]);
                console.log("ficha buscada: " + j);
                cont++;
                if (cont == 4) {
                    console.log("gano");
                    // document.querySelector("#staticBackdrop");
                    $("#staticBackdrop").modal("show");
                    break;
                }
            } else {
                break;
            }
        }
        return cont;
    }

    horizontalDerMas5(i, takeChip, cont) {
        for (let j = i; j < this.arrayCircles.length; j += 5) {
            if (this.arrayCircles[j].getColour() == takeChip.getColour()) {
                console.log(this.arrayCircles[j]);
                console.log("ficha buscada: " + j);
                cont++;
                if (cont == 4) {
                    console.log("gano");
                    $("#staticBackdrop").modal("show");
                    break;
                }
            } else {
                break;
            }
        }
        return cont;
    }

}