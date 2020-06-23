class Diamond {
    constructor(delay) {
        this.diamondDiv = document.querySelector(".container-diamante");
        this.width = parseInt(window.getComputedStyle(this.diamondDiv, null).getPropertyValue("width").split("px")[0]);
        this.height = parseInt(window.getComputedStyle(this.diamondDiv, null).getPropertyValue("height").split("px")[0]);
        this.taked = false;
        this.addAnimationMove();
        this.diamondDiv.style.setProperty("animation-delay", delay + "s");
    }

    addAnimationMove() {
        this.diamondDiv.classList.add("diamondMove");
    }

    removeAnimationMove() {
        this.diamondDiv.classList.remove("diamondMove");
    }

    stopAnimation() {
        this.diamondDiv.style.setProperty("animation-play-state", "paused");
    }

    runningAnimation() {
        this.diamondDiv.style.setProperty("animation-play-state", "running");
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
        if (this.getPositionLeft_X() <= -42) {
            this.removehidden();
            this.setTakeDiamond(false);
        }
    }
}