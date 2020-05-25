class Figure {
    constructor(x, y, canvas) {
        this.x = x;
        this.y = y;
        this.color = this.randomRGBA();
        // this.ctx = this.getContext();
        this.canvas = document.querySelector("#canvasOriginal");
        this.ctx = this.canvas.getContext('2d');
    }

    getCanvas() {
        return this.canvas;
    }

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


    randomRGBA() {
        let r = Math.round(Math.random() * 255);
        let g = Math.round(Math.random() * 255);
        let b = Math.round(Math.random() * 255);
        let a = 255;
        return `rgba(${r}, ${g}, ${b}, ${a})`;
    }
}