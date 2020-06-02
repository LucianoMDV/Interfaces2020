class GameBoard {
    constructor(canvas, chipImage, boardImage) {
        this.players = [new Player("Lucho"), new Player("Seba")];
        this.chipsBoard = [];
        this.canvas = canvas;
        this.ultimaFicha = null;
        this.chipImage = chipImage;
        this.boardImage = boardImage;
        this.board = new Rect(240, 100, 720, 450, "#000000", canvas);
        this.board.setImage(this.boardImage);
        this.drawBoard();
        this.meQuedan = this.chipsBoard.length;
        // this.cont = 0;
    }


    drawBoard() {
        this.board.drawImage();
        let pointer = 0;
        let x = 0;
        let y = 0;
        let colour = "#FFFFFF";
        for (let row = 0; row < 640; row += 90) {
            for (let col = 0; col < 400; col += 90) {
                x = row + 285;
                y = col + 145;
                this.chipsBoard[pointer] = new Circle(x, y, 40, colour, this.canvas);
                this.chipsBoard[pointer].draw();
                // this.chipsBoard[pointer].drawImage(this.chipImage);
                pointer++;
            }
        }
    }

    redrawBoard() {
        this.board.drawImage();
        for (let i = 0; i < this.chipsBoard.length; i++) {
            // this.chipsBoard[i].draw();
            this.chipsBoard[i].drawImage();
        }
        // console.log(this.chipsBoard);

    }

    setCol(col, image, colour) {
        let freeSpace = false;
        switch (col) {
            case 1:
                freeSpace = this.setcolourColumn(0, 4, image, colour, freeSpace);
                break;
            case 2:
                freeSpace = this.setcolourColumn(5, 9, image, colour, freeSpace);
                break;
            case 3:
                freeSpace = this.setcolourColumn(10, 14, image, colour, freeSpace);
                break;
            case 4:
                freeSpace = this.setcolourColumn(15, 19, image, colour, freeSpace);
                break;
            case 5:
                freeSpace = this.setcolourColumn(20, 24, image, colour, freeSpace);
                break;
            case 6:
                freeSpace = this.setcolourColumn(25, 29, image, colour, freeSpace);
                break;
            case 7:
                freeSpace = this.setcolourColumn(30, 34, image, colour, freeSpace);
                break;
            case 8:
                freeSpace = this.setcolourColumn(35, 39, image, colour, freeSpace);
                break;
                // default:
                //     break;
        }
        this.redrawBoard();
        return freeSpace;
    }

    //deberia ser privada pero no se como 
    setcolourColumn(fromHere, toHere, image, colour, freeSpace) {
        // setcolourColumn(fromHere, toHere, pat, freeSpace) {

        for (let i = toHere; i >= fromHere; i--) {
            if (this.chipsBoard[i].getColour() == '#FFFFFF') {
                this.ultimaFicha = this.chipsBoard[i];
                this.chipsBoard[i].setColour(colour);
                this.chipsBoard[i].setImage(image);
                freeSpace = true;
                break;
            }
        }
        return freeSpace;
    }

    buscar() {
        let cont = 0;
        let colourTakeChip = this.ultimaFicha.getColour();
        for (let index = 0; index < this.chipsBoard.length; index++) {
            if (this.chipsBoard[index].getColour() == this.ultimaFicha.getColour()) {

                //busca por derecha
                if (cont != 4) {
                    cont = this.buscarPorDerecha(index, colourTakeChip, cont);
                }

                //busca por izquierda
                if (cont != 4) {
                    cont = this.buscarPorIzquierda(index, colourTakeChip, cont);
                }

                //busca por columnLimit hacia arriba
                if (cont != 4) {
                    cont = this.buscarParaArriba(index, colourTakeChip, cont);
                }

                //busca por columnLimit hacia abajo
                if (cont != 4) {
                    cont = this.buscarParaAbajo(index, colourTakeChip, cont);
                }

                //busca por diagonal derecha arriba
                if (cont != 4) {
                    cont = this.buscarDiagonalSuperiorDerecha(index, colourTakeChip, cont);
                }

                //busca por diagonal derecha abajo
                if (cont != 4) {
                    cont = this.buscarDiagonalInferiorDerecha(index, colourTakeChip, cont);
                }

                //busca por diagonal izquierda arriba
                if (cont != 4) {
                    cont = this.buscarDiagonalSuperiorIzquierda(index, colourTakeChip, cont);
                }

                //busca por diagonal izquierda abajo
                if (cont != 4) {
                    cont = this.buscarDiagonalInferiorIzquierda(index, colourTakeChip, cont);
                }

                if (cont == 4) {
                    // debugger;
                    if (this.chipsBoard[index].getColour() == "#FF0000") {
                        $("#modalMessage").text("Congratulations " + this.players[0].nombre + ", you win!");
                    } else {
                        $("#modalMessage").text("Congratulations " + this.players[1].nombre + ", you win!");
                    }
                    $("#staticBackdrop").modal("show");
                    break;
                }
            }
        }
    }

    buscarPorDerecha(index, colourTakeChip, cont) {
        for (let j = index; j < this.chipsBoard.length; j += 5) {
            if (this.chipsBoard[j].getColour() == colourTakeChip) {
                cont++;
                if (cont == 4) {
                    return cont;
                }
            } else {
                break;
            }
        }
        return 0;
    }

    buscarPorIzquierda(index, colourTakeChip, cont) {
        for (let j = index; j >= 0; j -= 5) {
            if (this.chipsBoard[j].getColour() == colourTakeChip) {
                cont++;
                if (cont == 4) {
                    return cont;
                }
            } else {
                break;
            }
        }
        return 0;
    }

    buscarParaArriba(index, colourTakeChip, cont) {
        let columnLimit = this.verifyColumnLimit(index, "top");
        for (let j = index; j >= columnLimit; j--) {
            if (this.chipsBoard[j].getColour() == colourTakeChip) {
                cont++;
                if (cont == 4) {
                    return cont;
                }
            } else {
                break;
            }
        }
        return 0;
    }

    verifyColumnLimit(index, thisSideIs) {
        // debugger;
        let columnLimit;
        if (index > 0 && index <= 4) {
            thisSideIs === "top" ? columnLimit = 0 : thisSideIs === "bottom" ? columnLimit = 4 : columnLimit;
        } else if (index > 4 && index <= 9) {
            thisSideIs === "top" ? columnLimit = 5 : thisSideIs === "bottom" ? columnLimit = 9 : columnLimit;
        } else if (index > 9 && index <= 14) {
            thisSideIs === "top" ? columnLimit = 10 : thisSideIs === "bottom" ? columnLimit = 14 : columnLimit;
        } else if (index > 14 && index <= 19) {
            thisSideIs === "top" ? columnLimit = 15 : thisSideIs === "bottom" ? columnLimit = 19 : columnLimit;
        } else if (index > 19 && index <= 24) {
            thisSideIs === "top" ? columnLimit = 20 : thisSideIs === "bottom" ? columnLimit = 24 : columnLimit;
        } else if (index > 24 && index <= 29) {
            thisSideIs === "top" ? columnLimit = 25 : thisSideIs === "bottom" ? columnLimit = 39 : columnLimit;
        } else if (index > 29 && index <= 34) {
            thisSideIs === "top" ? columnLimit = 30 : thisSideIs === "bottom" ? columnLimit = 34 : columnLimit;
        } else if (index > 34 && index <= 39) {
            thisSideIs === "top" ? columnLimit = 35 : thisSideIs === "bottom" ? columnLimit = 39 : columnLimit;
        }
        return columnLimit;
    }

    buscarParaAbajo(index, colourTakeChip, cont) {
        let columnLimit = this.verifyColumnLimit(index, "bottom");
        for (let j = index; j <= columnLimit; j++) {
            if (this.chipsBoard[j].getColour() == colourTakeChip) {
                cont++;
                if (cont == 4) {
                    return cont;
                }
            } else {
                break;
            }
        }
        return 0;
    }

    buscarDiagonalSuperiorDerecha(index, colourTakeChip, cont) {
        for (let j = index; j < this.chipsBoard.length; j += 4) {
            if (this.chipsBoard[j].getColour() == colourTakeChip) {
                cont++;
                if (cont == 4) {
                    // $("#staticBackdrop").modal("show");
                    return cont;
                }
            } else {
                break;
            }
        }
        return 0;
    }

    buscarDiagonalInferiorDerecha(index, colourTakeChip, cont) {
        for (let j = index; j < this.chipsBoard.length; j += 6) {
            if (this.chipsBoard[j].getColour() == colourTakeChip) {
                cont++;
                if (cont == 4) {
                    return cont;
                }
            } else {
                break;
            }
        }
        return 0;
    }

    buscarDiagonalSuperiorIzquierda(index, colourTakeChip, cont) {
        for (let j = index; j >= 0; j -= 6) {
            if (this.chipsBoard[j].getColour() == colourTakeChip) {
                cont++;
                if (cont == 4) {
                    return cont;
                }
            } else {
                break;
            }
        }
        return 0;
    }

    buscarDiagonalInferiorIzquierda(index, colourTakeChip, cont) {
        for (let j = index; j >= 0; j -= 4) {
            if (this.chipsBoard[j].getColour() == colourTakeChip) {
                cont++;
                if (cont == 4) {
                    return cont;
                }
            } else {
                break;
            }
        }
        return 0;
    }

    verificarFichas() {
        // debugger;
        let cont = 0;
        for (let i = 0; i < this.chipsBoard.length; i++) {
            if (this.chipsBoard[i].getColour() == "#FFFFFF") {
                cont++;
            }
        }
        // debugger;
        if (cont < this.meQuedan) {
            this.meQuedan = cont;
            return true;
        }
        return false;
    }

    play(turn) {
        if (turn == true) {
            this.drawPlayer("PLAYER 1", this.players[0], 10, 55);
            // console.log(this.players[0]);

        } else {
            this.drawPlayer("PLAYER 2", this.players[1], 970, 55);
            // console.log(this.players[1]);
        }
    }

    drawPlayer(player, name, x, y) {
        console.log("nombre: " + name.nombre);
        let ctx = this.canvas.getContext('2d');
        /* Dibujando texto relleno y con contorno */
        ctx.beginPath(); // Inicializamos una ruta
        ctx.lineCap = "butt"; // Trazo sin terminaciones
        ctx.lineWidth = 4; // Trazo de 1 pixeles de ancho
        ctx.strokeStyle = "#000000"; // Azul
        ctx.fillStyle = "#F3E00B"; // Amarillo
        ctx.font = "45px Verdana"; // Establecemos la tipografía
        ctx.strokeText(player, x, y);
        ctx.fillText(player, x, y);
        ctx.strokeText(name.nombre, x + 40, y + 50);
        ctx.fillText(name.nombre, x + 40, y + 50);
        ctx.closePath();
    }

}