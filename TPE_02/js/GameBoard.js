class GameBoard {
    constructor(canvas) {
        this.drawBoard(canvas);
        this.players = [new Player("Lucho"), new Player("Seba")];
        this.startGame = false;
        this.turn = 0;
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

    drawBoard(canvas) {
        this.board = new Rect(240, 100, 720, 450, "#000000", canvas);
        this.board.draw();
        let arrayCircles = [];
        let puntero = 0;
        let x = 0;
        let y = 0;
        // for (let fila = 0; fila < 640; fila += 90) {
        //     for (let col = 0; col < 400; col += 90) {
        let colour = "#FFFFFF";
        for (let fila = 0; fila < 640; fila += 90) {
            for (let col = 0; col < 400; col += 90) {
                x = fila + 285;
                y = col + 145;
                // arrayCircles[puntero] = new Circle(285, 145, 40, color, canvas);
                arrayCircles[puntero] = new Circle(x, y, 40, colour, canvas);
                if (puntero > 4) {
                    colour = "#FF0000";
                }
                arrayCircles[puntero].setColor(colour);
                arrayCircles[puntero].draw();
                puntero++;
            }
        }
        console.log(arrayCircles);

    }

}