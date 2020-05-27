class Circle extends Figure {
    constructor(x, y, radio, colour, canvas) {
        super(x, y, colour, canvas);
        this.radio = radio;
    }

    draw() {
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radio, 0, 2 * Math.PI);
        this.ctx.fillStyle = this.colour;
        this.ctx.fill();
        this.ctx.lineWidth = 1;
        this.ctx.lineCap = 'round';
        this.ctx.strokeStyle = 'black';
        this.ctx.stroke();
        this.ctx.closePath();
    }

    drawRandom(x2, y2, color2) {
        this.ctx.beginPath();
        this.ctx.arc(this.x + x2, this.y + y2, this.radio, 0, 2 * Math.PI);
        this.ctx.fillStyle = color2;
        this.ctx.fill();
        this.ctx.closePath();
    }

    setX(x) {
        this.x += x;
    }
    setY(y) {
        this.y += y;
    }
    setColor(colour) {
        this.colour = colour;
    }
}