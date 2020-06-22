class Game {
    constructor() {
        this.continuar = document.querySelector("#continuar");
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
            this.obstacles.push(new Obstaculo(num, (3.5 * i)));
            this.obstacles[i].runningAnimation();
            num += 2;
        }

        window.addEventListener('keyup', e => {
            console.log(e.keyCode);

            if (e.keyCode === 38) {
                // console.log("entre");
                this.player.cambiarAnimacionSaltar();
                this.goUp = true;
            }
        });

        this.interval = setInterval(this.loop.bind(this), 16.6);

    }

    loop() {

        let top = window.getComputedStyle(this.container, null).getPropertyValue("top");
        top = parseInt(top.split('px')[0]);
        let seCorre = 2;

        if (this.goUp) {
            if (this.cont < 18) { //frame para activar turbo es 300ms /16.6 frame
                //subir
                if ((top - seCorre - 1) >= 0) {
                    this.player.goUp(top - seCorre - 1);
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
            // CAER
            top += seCorre + 1;
            if ((top) <= this.diferencia) {
                this.player.setPosition(top);
            } else {
                this.endGame();
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
                if ((this.checkPass(this.obstacles[i])) && (this.obstacles[i].getPassObs() == true)) {
                    this.score++;
                }
                this.obstacles[i].checkFinish();
            }
        }
        document.querySelector("#point").innerHTML = this.score;

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
            if (((posPlayerY <= posObstacleBottom)) || ((posPlayerBottomY >= posObstacleTop))) {
                return true;
            }
        }


    }

    checkPass(obstacle) {
        let posRigthObstacleX = obstacle.getPositionRight_X();
        let posLeftPlayerX = this.player.getPositionLeft_X();
        if (posLeftPlayerX > posRigthObstacleX && !obstacle.getPassObs()) {
            obstacle.setPassObs(true);
            return true;
        }

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
        this.player.cambiarAnimacionMorir();
        for (let i = 0; i < this.obstacles.length; i++) {
            this.obstacles[i].stopAnimation();
        }
        this.player.addAnimationCaer();
        this.continuar.classList.remove("hidden");
        clearInterval(this.interval);
        // alert("Game Over");
    }

    reset() {
        this.player.cambiarAnimacionNormal();
        this.player.setInitialPosition();
        for (let i = 0; i < this.obstacles.length; i++) {
            this.obstacles[i].removeAnimation();
        }
        this.obstacles = [];
        // console.log(this.obstacles);

        this.player.removeAnimationCaer();
    }

}