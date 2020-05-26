class Squeare extends Figure {
    constructor(x, y, width, height, canvas) {
        super(x, y, canvas);
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

    drawRandom2(x2, y2) {
        this.ctx.beginPath();
        // this.ctx.fillStyle = color2;
        this.ctx.fillRect(this.x + x2, this.y + y2, this.width, this.height);
        this.ctx.closePath();
    }

    fillFigure(pattern) {
        // debugger;
        this.ctx.beginPath();
        this.ctx.fillStyle = pattern;
        this.ctx.fillRect(this.posX, this.posY, this.width, this.height);
        this.ctx.fillStyle = pattern;
        this.ctx.fill();
        this.ctx.closePath();
    }

}