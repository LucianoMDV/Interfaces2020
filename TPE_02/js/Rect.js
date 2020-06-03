class Rect extends Figure {
    constructor(x, y, width, height, colour, canvas) {
        super(x, y, colour, canvas);
        this.width = width;
        this.height = height;
    }

    draw() {
        this.ctx.beginPath();
        this.ctx.fillStyle = this.colour;
        this.ctx.strokeRect(this.x, this.y, this.width, this.height);
        this.ctx.fillRect(this.x, this.y, this.width, this.height);
        this.ctx.closePath();
    }

    drawImage() {
        this.ctx.beginPath();
        this.ctx.fillStyle = this.colour;
        this.ctx.strokeRect(this.x, this.y, this.width, this.height);
        this.ctx.fillRect(this.x, this.y, this.width, this.height);
        if (this.image != null) {
            this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        }
        this.ctx.closePath();
    }

    hit(x, y) {
        return (x > this.x && x < this.x + this.width) && (y > this.y && y < this.y + this.height);
    }

    drawRandom(x2, y2, colour2) {
        this.ctx.beginPath();
        this.ctx.fillStyle = colour2;
        this.ctx.fillRect(this.x + x2, this.y + y2, this.width, this.height);
        this.ctx.closePath();
    }

}