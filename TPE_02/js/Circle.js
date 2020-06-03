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
        // this.ctx.lineWidth = 1;
        // this.ctx.lineCap = 'round';
        // this.ctx.strokeStyle = 'black';
        this.ctx.stroke();
        this.ctx.closePath();
    }

    drawImage() {
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radio, 0, 2 * Math.PI);
        this.ctx.fillStyle = this.colour;
        this.ctx.fill();
        this.ctx.lineWidth = 1;
        this.ctx.lineCap = 'round';
        this.ctx.strokeStyle = 'black';
        this.ctx.stroke();
        if (this.image != null) {
            this.ctx.drawImage(this.image, this.x - this.radio, this.y - this.radio, this.radio * 2, this.radio * 2);
        }
        this.ctx.closePath();
    }

    drawRandom(x2, y2, colour2) {
        this.ctx.beginPath();
        this.ctx.arc(this.x + x2, this.y + y2, this.radio, 0, 2 * Math.PI);
        this.ctx.fillStyle = colour2;
        this.ctx.fill();
        this.ctx.closePath();
    }

    setX(x) {
        this.x += x;
    }
    setY(y) {
        this.y += y;
    }
    setColour(colour) {
        this.colour = colour;
    }

    hit(x, y) {
        let temp = false;
        let m = Math.pow(x - this.x, 2) + Math.pow(y - this.y, 2);
        return m < Math.pow(this.radio, 2);
    }
}