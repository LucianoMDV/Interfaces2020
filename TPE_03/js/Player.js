class Player {
    constructor() {
        this.posicion = null;
        this.playerDiv = document.querySelector('.container-player');

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
}