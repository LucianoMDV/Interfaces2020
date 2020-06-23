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
        return this.posicion;
    }
    getPositionBottomY() {
        return this.posicion + this.height;
    }

    cambiarAnimacionSaltar() {
        this.playerDiv.children[0].classList.remove("subir");
        this.playerDiv.children[0].classList.remove("morir");
        this.playerDiv.children[0].classList.add("subirTurbo");
    }
    cambiarAnimacionNormal() {
        this.playerDiv.children[0].classList.remove("subirTurbo");
        this.playerDiv.children[0].classList.remove("morir");
        this.playerDiv.children[0].classList.add("subir");
    }

    cambiarAnimacionMorir() {
        this.playerDiv.children[0].classList.remove("subirTurbo");
        this.playerDiv.children[0].classList.remove("subir");
        this.playerDiv.children[0].classList.add("morir");
    }
    addAnimationCaer() {
        this.playerDiv.classList.add("caer");
        //adapto el contenedor del player, al tamaño que necesita la animacion caer
        this.playerDiv.style.setProperty("width", 22 + "px");
        this.playerDiv.style.setProperty("height", 49 + "px");
    }
    removeAnimationCaer() {
        this.playerDiv.classList.remove("caer");
        //adapto el contenedor del player, al tamaño que necesita la animacion Normal
        this.playerDiv.style.setProperty("width", 46 + "px");
        this.playerDiv.style.setProperty("height", 41.1 + "px");
    }

    setInitialPosition() {
        this.playerDiv.style.setProperty("top", this.initialPosition + "px");
    }
}