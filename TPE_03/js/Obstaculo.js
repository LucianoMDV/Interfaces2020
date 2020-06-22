class Obstaculo {
    constructor(num, delay) {
        this.obstaculo1 = document.querySelector('.obstaculo' + num);
        this.obstaculo2 = document.querySelector('.obstaculo' + (num + 1));
        this.width = parseInt(window.getComputedStyle(this.obstaculo1, null).getPropertyValue("width").split("px")[0]);
        this.body = document.querySelector('body');
        this.bodyHeight = parseInt(window.getComputedStyle(this.body, null).getPropertyValue("height").split("px")[0]);
        this.leftObstacle1 = parseInt(window.getComputedStyle(this.obstaculo1, null).getPropertyValue("left").split("px")[0]);
        this.addAnimation();
        this.obstaculo1.style.setProperty("animation-delay", delay + "s");
        this.obstaculo2.style.setProperty("animation-delay", delay + "s");
    }

    update() {

    }

    getPositionLeft_X() { //RED
        // if (this.cont < 20) {
        // console.log("obst1: " + window.getComputedStyle(this.obstaculo1, null).getPropertyValue("left"));
        // console.log("obst2: " + window.getComputedStyle(this.obstaculo2, null).getPropertyValue("left"));
        return parseInt(window.getComputedStyle(this.obstaculo1, null).getPropertyValue("left").split("px")[0]);
        // }
        // this.cont++;
    }
    getPositionRight_X() { //BLUE
        return this.getPositionLeft_X() + this.width;
    }

    getPositionBottom() {
        return parseInt(window.getComputedStyle(this.obstaculo1, null).getPropertyValue("height").split("px")[0]);
    }

    getPositionTop() {
        return this.bodyHeight - parseInt(window.getComputedStyle(this.obstaculo2, null).getPropertyValue("height").split("px")[0]);
    }

    removeAnimation() {
        this.obstaculo1.classList.remove("moveObstacle");
        this.obstaculo2.classList.remove("moveObstacle");
    }
    addAnimation() {
        this.obstaculo1.classList.add("moveObstacle");
        this.obstaculo2.classList.add("moveObstacle");
    }

    checkFinish() {
        // if (this.getPositionLeft_X() < 0) {
        //     console.log(this.getPositionLeft_X());

        // }

        if (this.getPositionLeft_X() <= -61) {
            console.log("llegue al final");
            let random = (Math.floor((Math.random() * 80)) + 1);
            let random2 = (100 - random) - 20;
            console.log(random);
            console.log(random2);

            this.obstaculo1.style.setProperty("height", random + "vh");
            this.obstaculo2.style.setProperty("height", random2 + "vh");
            // this.obstaculo1.style.setProperty("animation-play-state", "running");
            // this.obstaculo2.style.setProperty("animation-play-state", "running");
            // this.removeAnimation();
            // this.addAnimation();
        }
    }

}