class Game {
    constructor() {
        this.continuar = document.querySelector("#continuar");
        this.container = document.querySelector(".container-player");
        this.winner = document.querySelector("#ganaste");
        this.body = document.querySelector('body');
        this.bodyHeight = parseInt(window.getComputedStyle(this.body, null).getPropertyValue("height").split("px")[0]);
        this.height = parseInt(window.getComputedStyle(this.container, null).getPropertyValue("height").split("px")[0]);
        this.diferencia = this.bodyHeight - this.height;
        this.player = new Player();
        this.obstacles = [];
        this.diamond;
        this.scoreDiamond;
        this.score;
        this.scoreBest = 0;
        this.goUp = false;
        this.interval;
        this.cont = 0;
        this.audioTakeDiamond = new Audio("./audio/Collectable.wav");
        this.audioAmbient = new Audio("./audio/platformer_level03.mp3");
    }

    initGame() {
        this.scoreDiamond = 0;
        this.audioAmbient.play();
        this.score = 0;
        this.player.setPosition();
        let num = 1;
        for (let i = 0; i < 3; i++) {
            this.obstacles.push(new Obstaculo(num, (3.5 * i)));
            this.obstacles[i].runningAnimation();
            num += 2;
        }

        let delay = 2;
        this.diamond = new Diamond(delay);
        this.diamond.runningAnimation();

        window.addEventListener('keydown', e => {
            if (e.keyCode === 38) {
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
                if ((top - seCorre - 2) >= 0) {
                    this.player.goUp(top - seCorre - 2);
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

        if (this.scoreDiamond >= 1) {
            this.win();
        }


        this.updateScreen();

        for (let i = 0; i < this.obstacles.length; i++) {
            if (this.checkColition(this.obstacles[i])) {
                this.endGame();
            } else {
                if ((this.checkPass(this.obstacles[i])) && (this.obstacles[i].getPassObs() == true)) {
                    this.score++;
                    if (this.score > this.scoreBest) {
                        this.scoreBest = this.score;
                    }

                }
                this.obstacles[i].checkFinish();
            }
        }

        document.querySelector("#point").innerHTML = this.score;

        if (this.checkColitionDiamond()) {
            this.audioTakeDiamond.play();
            this.diamond.removeAnimationMove();
            this.diamond.addAnimation("taked");
            // this.diamond.addhidden();
            debugger;
            this.scoreDiamond++;
            document.querySelector("#pointDiamond").innerHTML = this.scoreDiamond;
        }
        this.diamond.checkFinish();
    }

    checkColitionDiamond() {
        let posRightPlayerX = this.player.getPositionRight_X();
        let posLeftPlayerX = this.player.getPositionLeft_X();
        let posPlayerBottomY = this.player.getPositionBottomY();
        let posPlayerY = this.player.getPositionY();

        let posLeftDiamondX = this.diamond.getPositionLeft_X();
        let posRightDiamondX = this.diamond.getPositionRight_X();
        let posTopDiamondY = this.diamond.getPositionTop();
        let posBottomDiamondY = this.diamond.getPositionBottom();

        if (!this.diamond.getTakeDiamond()) {
            if (posRightPlayerX >= posLeftDiamondX && posLeftPlayerX <= posRightDiamondX) {
                if (posTopDiamondY <= posPlayerBottomY && posBottomDiamondY >= posPlayerY) {
                    this.diamond.setTakeDiamond(true);
                    return true;
                }
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
        this.player.updateScreen();
    }

    endGame() {
        this.player.cambiarAnimacionMorir();
        for (let i = 0; i < this.obstacles.length; i++) {
            this.obstacles[i].stopAnimation();
        }
        this.player.addAnimationCaer();
        this.continuar.classList.remove("hidden");
        this.diamond.stopAnimation();
        clearInterval(this.interval);
    }

    reset() {
        this.audioAmbient.pause();
        document.querySelector("#pointBest").innerHTML = this.scoreBest;
        this.score = 0;
        document.querySelector("#point").innerHTML = this.score;
        this.player.cambiarAnimacionNormal();
        this.player.setInitialPosition();
        for (let i = 0; i < this.obstacles.length; i++) {
            this.obstacles[i].removeAnimation();
        }
        this.obstacles = [];

        this.player.removeAnimationCaer();

        this.scoreDiamond = 0;
        document.querySelector("#pointDiamond").innerHTML = this.scoreDiamond;
        this.diamond.removehidden();
        this.diamond.removeAnimationMove();
        this.winner.classList.add("hidden");
    }

    win() {
        this.audioAmbient.pause();
        this.winner.classList.remove("hidden");
        this.continuar.classList.remove("hidden");
        for (let i = 0; i < this.obstacles.length; i++) {
            this.obstacles[i].stopAnimation();
        }
        this.player.addAnimationCaer();
        this.continuar.classList.remove("hidden");
        // this.diamond.stopAnimation();
        this.player.removeAnimationCaer();
        clearInterval(this.interval);
    }

}