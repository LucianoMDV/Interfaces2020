class Figure {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.color = this.randomRGBA();
    }

    getContext() {
        let canvas = document.querySelector("#canvasOriginal");
        let ctx = canvas.getContext('2d');
        return ctx;
    }

    randomRGBA() {
        let r = Math.round(Math.random() * 255);
        let g = Math.round(Math.random() * 255);
        let b = Math.round(Math.random() * 255);
        let a = 255;
        return `rgba(${r}, ${g}, ${b}, ${a})`;
    }
}