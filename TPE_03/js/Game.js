class Game {
    constructor() {
        this.container = document.querySelector(".container-player");
        this.body = document.querySelector('body');
        this.bodyHeight = window.getComputedStyle(this.body, null).getPropertyValue("height");
        this.BODYHEIGHT = parseInt(this.bodyHeight.split('px')[0]);
        this.height = window.getComputedStyle(this.container, null).getPropertyValue("height");
        this.diferencia = this.BODYHEIGHT - parseInt(this.height.split('px')[0]);
        this.player = new Player();
        this.obstacles = [];
        this.score;
        this.goUp = false;
        this.interval;
    }

    initGame() {
        this.score = 0;
        this.player.setPosition();

        // for (let i = 0; i < 5; i++) {
        //     this.obstacles.push(new Obstacle());
        // }

        window.addEventListener('keyup', e => {
            if (e.keyCode === 38) {
                console.log("entre");

                this.goUp = true;
            }
        });

        this.interval = setInterval(this.loop.bind(this), 40);

    }

    loop() {

        let top = window.getComputedStyle(this.container, null).getPropertyValue("top");
        top = parseInt(top.split('px')[0]);
        if (this.goUp) {
            if ((top - 25) >= 0) {
                this.player.goUp(top - 25);
                this.goUp = false;
            } else {
                top = 0;
                this.goUp = false;
            }
        } else {

            if ((top + 1) <= this.diferencia) {
                this.player.setPosition(top + 1);
            }
        }

        // this.player.update();

        // for (let i = 0; i < this.obstacles.length; i++) {
        //     this.obstacles[i].update();
        // }

        // if (this.checkColition(this.obstacles[n])) {
        //     this.endGame();
        // } else {
        //     this.score++;
        // }

        this.updateScreen();

    }

    checkColition(obstacle) {
        //Ver si el pajaro choco;
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
    }

}