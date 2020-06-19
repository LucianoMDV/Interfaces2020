class Obstaculo {
    constructor(num) {
        this.obstaculo1 = document.querySelector('.obstaculo' + num);
        this.obstaculo2 = document.querySelector('.obstaculo' + (num + 1));
        this.width = parseInt(window.getComputedStyle(this.obstaculo1, null).getPropertyValue("width").split("px")[0]);
        this.body = document.querySelector('body');
        this.bodyHeight = parseInt(window.getComputedStyle(this.body, null).getPropertyValue("height").split("px")[0]);
        // this.left = porcentajeLeft;
        // this.obstaculo1.style.left += porcentajeLeft * 100;
        this.leftObstacle1 = parseInt(window.getComputedStyle(this.obstaculo1, null).getPropertyValue("left").split("px")[0]);
        this.obstaculo1.classList.add("moveObstacle");
        this.obstaculo2.classList.add("moveObstacle");
        this.obstaculo1.style.setProperty("animation-delay", num + "s");
        this.obstaculo2.style.setProperty("animation-delay", num + "s");
        // window.getComputedStyle(document.querySelector(".obstaculo3"), null).getPropertyValue("animation-delay");

        // this.leftObstacle2 = parseInt(window.getComputedStyle(this.obstaculo2, null).getPropertyValue("left").split("px")[0]);
        // this.obstaculo2.style.setProperty("left", this.leftObstacle2 + porcentajeLeft + "px");
        // this.cont = 0;
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

}