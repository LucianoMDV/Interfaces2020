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
        this.board = new Rect(0, 0, canvas.width, canvas.height, canvas);
        this.board.draw();
        let arrayCircles = [];
        for (let fila = 0; fila < canvas.width; fila += 50) {
            arrayCircles[fila] = new Circle(25, 25, 50, canvas);
            arrayCircles[fila].setColor("#FFFFFF");
            arrayCircles[fila].draw();
        }
        console.log(arrayCircles);

    }

}