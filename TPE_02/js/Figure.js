class Figure {
    constructor(x, y, colour, canvas) {
        this.x = x;
        this.y = y;
        this.colour = colour;
        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d');
        this.image = null;
    }

    setColour(colour) {
        this.colour = colour;
    }

    getColour() {
        return this.colour;
    }
    setImage(image) {
        this.image = image;
    }
    getImage() {
        return this.image;
    }

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