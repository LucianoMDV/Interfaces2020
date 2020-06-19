class Game {
    constructor() {
        this.container = document.querySelector(".container-player");
        this.body = document.querySelector('body');
        this.bodyHeight = parseInt(window.getComputedStyle(this.body, null).getPropertyValue("height").split("px")[0]);
        this.height = parseInt(window.getComputedStyle(this.container, null).getPropertyValue("height").split("px")[0]);
        this.diferencia = this.bodyHeight - this.height;
        this.player = new Player();
        this.obstacles = [];
        this.score;
        this.goUp = false;
        this.interval;
        this.cont = 0;
    }

    initGame() {
        this.score = 0;
        this.player.setPosition();

        // this.obstacles.push(new Obstaculo());
        let num = 1;
        for (let i = 0; i < 3; i++) {
            this.obstacles.push(new Obstaculo(200, num));
            num += 2;
        }

        window.addEventListener('keyup', e => {
            if (e.keyCode === 38) {
                console.log("entre");
                this.player.cambiarAnimacionSaltar();
                this.goUp = true;
            }
        });

        this.interval = setInterval(this.loop.bind(this), 40);

    }

    loop() {

        let top = window.getComputedStyle(this.container, null).getPropertyValue("top");
        top = parseInt(top.split('px')[0]);

        if (this.goUp) {
            if (this.cont < 10) {

                if ((top - 5) >= 0) {
                    this.player.goUp(top - 5);
                } else {
                    top = 0;
                }
                this.cont++;
                //REINICIAR
            } else {
                this.player.cambiarAnimacionNormal();
                this.goUp = false;
                this.cont = 0;
            }
        } else {
            //CAER
            if ((top + 1) <= this.diferencia) {
                this.player.setPosition(top + 3);
            }
        }

        // this.player.update();

        // for (let i = 0; i < this.obstacles.length; i++) {
        // this.obstacles[0].update();
        // }


        this.updateScreen();

        for (let i = 0; i < this.obstacles.length; i++) {
            if (this.checkColition(this.obstacles[i])) {
                this.endGame();
            } else {
                //     this.score++;
            }
        }

    }

    checkColition(obstacle) {
        //Ver si el pajaro choco;
        let posLeftObstacleX = obstacle.getPositionLeft_X();
        let posRigthObstacleX = obstacle.getPositionRight_X();
        let posObstacleBottom = obstacle.getPositionBottom();
        let posObstacleTop = obstacle.getPositionTop();

        let posLeftPlayerX = this.player.getPositionLeft_X();
        let posRigthPlayerX = this.player.getPositionRight_X();
        let posPlayerY = this.player.getPositionY();
        let posPlayerBottomY = this.player.getPositionBottomY();

        if (posRigthObstacleX > posLeftPlayerX && posLeftObstacleX < posRigthPlayerX) { //controlo que este dentro del rango de la columna y si se paso que deje de controlar si colisiono
            // console.log("ENTRO!!!");
            // if (((posLeftObstacleX <= posRigthPlayerX) && (posPlayerY <= posObstacleBottom)) || ((posLeftObstacleX2 <= posRigthPlayerX) && (posPlayerBottomY >= posObstacleTop))) {
            if (((posPlayerY <= posObstacleBottom)) || ((posPlayerBottomY >= posObstacleTop))) {
                // console.log("colisiono");
                // alert("perdiste");
                return true;

            }
        }
        // console.log(posObstacle);
        // console.log(posPlayer);

    }

    updateScreen() {

        //this.playerDiv.style.top = this.player.position;
        this.player.updateScreen();

        // for (let i = 0; i < this.obstacles.length; i++) {
        //     this.obstacles[i].updateScreen();
        //     //this.obstacles[i].obstacleDiv.style.left = this.obstacles[i].position;
        // }

        // this.scoreDiv.innerHTML = this.score;

    }

    endGame() {
        clearInterval(this.interval);
        alert("perdiste");
        // this.obstacles[0].classList.remove("obstaculo1");
    }

}