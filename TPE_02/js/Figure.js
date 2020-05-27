class Figure {
    constructor(x, y, colour, canvas) {
        this.x = x;
        this.y = y;
        this.colour = colour;
        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d');
    }

    drawImage(image, x1, y1) {
        this.ctx.drawImage(image, this.x + x1, this.y + y1, 50, 50);
    }

    setColor(colour) {
        this.colour = colour;
    }

    // getCanvas() {
    //     return this.canvas;
    // }

    // randomX() {
    //     return Math.floor(Math.random() * this.canvas.height);
    // }
    // randomY() {
    //     return Math.floor(Math.random() * this.canvas.width);
    // }

    // getContext() {
    //     this.canvas = document.querySelector("#canvasOriginal");
    //     let ctx = canvas.getContext('2d');
    //     return ctx;
    // }

    // getHeight() {
    //     return 
    // }

    setPosition(x, y) {
        this.x = x;
        this.y = y;

    }

    randomRGBA() {
        let r = Math.round(Math.random() * 255);
        let g = Math.round(Math.random() * 255);
        let b = Math.round(Math.random() * 255);
        let a = 255;
        return `rgba(${r}, ${g}, ${b}, ${a})`;
    }
}