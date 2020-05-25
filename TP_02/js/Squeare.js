class Squeare extends Figure {
    constructor(x, y, width, height) {
        super(x, y);
        this.width = width;
        this.height = height;
    }

    draw() {
        this.ctx.beginPath();
        this.ctx.fillStyle = this.color;
        this.ctx.fillRect(this.x, this.y, this.width, this.height);
        this.ctx.closePath();
    }

    drawRandom(x2, y2, color2) {
        this.ctx.beginPath();
        this.ctx.fillStyle = color2;
        this.ctx.fillRect(this.x + x2, this.y + y2, this.width, this.height);
        this.ctx.closePath();
    }


}