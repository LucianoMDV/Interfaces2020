class Player {
    constructor() {
        this.posicion = null;
        this.playerDiv = document.querySelector('.container-player');
        this.width = parseInt(window.getComputedStyle(this.playerDiv, null).getPropertyValue("width").split("px")[0]);
        this.height = parseInt(window.getComputedStyle(this.playerDiv, null).getPropertyValue("height").split("px")[0]);
        this.initialPosition = parseInt(window.getComputedStyle(this.playerDiv, null).getPropertyValue("top").split("px")[0]);

    }

    updateScreen() {
        this.playerDiv.style.top = this.posicion + "px";
    }

    setPosition(top) {
        this.posicion = top;
    }

    goUp(top) {
        this.setPosition(top);
    }

    update() {

    }

    getPositionLeft_X() {
        return parseInt(window.getComputedStyle(this.playerDiv, null).getPropertyValue("left").split("px")[0]);
    }
    getPositionRight_X() {
        return this.getPositionLeft_X() + this.width;
    }

    getPositionY() {
        // return parseInt(window.getComputedStyle(this.playerDiv, null).getPropertyValue("top").split("px")[0]);
        return this.posicion;
    }
    getPositionBottomY() {
        return this.posicion + this.height;
    }

    cambiarAnimacionSaltar() {
        // console.log(this.playerDiv.children[0]);

        this.playerDiv.children[0].classList.remove("subir");
        this.playerDiv.children[0].classList.add("subirTurbo");
    }
    cambiarAnimacionNormal() {
        // console.log(this.playerDiv.children[0]);

        this.playerDiv.children[0].classList.remove("subirTurbo");
        this.playerDiv.children[0].classList.add("subir");
    }

    setInitialPosition() {
        this.playerDiv.style.setProperty("top", this.initialPosition + "px");
    }
}