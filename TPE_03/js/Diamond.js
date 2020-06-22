class Diamond {
    constructor() {
        this.diamondDiv = document.querySelector(".container-diamante");
        this.width = parseInt(window.getComputedStyle(this.diamondDiv, null).getPropertyValue("width").split("px")[0]);
        this.height = parseInt(window.getComputedStyle(this.diamondDiv, null).getPropertyValue("height").split("px")[0]);
        this.taked = false;
    }
    setAnimation() {
        this.diamondDiv.children[0].classList.add("animarDiamante");
    }

    getPositionLeft_X() {
        return parseInt(window.getComputedStyle(this.diamondDiv, null).getPropertyValue("left").split("px")[0]);
    }

    getPositionRight_X() {
        return (this.getPositionLeft_X() + this.width);
    }

    getTakeDiamond() {
        return this.taked;
    }

    setTakeDiamond(take) {
        this.taked = take;
    }

    getPositionTop() {
        return parseInt(window.getComputedStyle(this.diamondDiv, null).getPropertyValue("top").split("px")[0]);
    }
    getPositionBottom() {
        return (parseInt(window.getComputedStyle(this.diamondDiv, null).getPropertyValue("top").split("px")[0]) + this.height);
    }
    addhidden() {
        this.diamondDiv.classList.add("hidden");
    }
    removehidden() {
        this.diamondDiv.classList.remove("hidden");
    }

    checkFinish() {
        if (this.getPositionLeft_X() <= -43) {
            this.removehidden();
            this.diamond.setTakeDiamond(false);
            console.log("llegue al final DIAMANTE");
        }
    }
}