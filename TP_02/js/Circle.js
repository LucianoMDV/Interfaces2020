class Circle extends Figure {
    constructor(x, y, radio) {
        super(x, y);
        this.radio = radio;
    }

    draw() {
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radio, 0, 2 * Math.PI);
        this.ctx.fillStyle = this.color;
        this.ctx.fill();
        this.ctx.closePath();
    }

    drawRandom(x2, y2, color2) {
        this.ctx.beginPath();
        this.ctx.arc(this.x + x2, this.y + y2, this.radio, 0, 2 * Math.PI);
        this.ctx.fillStyle = color2;
        this.ctx.fill();
        this.ctx.closePath();
    }
}