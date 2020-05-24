class Circle extends Figure {
    constructor(x, y, radio) {
        super(x, y);
        this.radio = radio;
        this.ctx = super.getContext();
    }

    draw() {
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radio, 0, 2 * Math.PI);
        this.ctx.fillStyle = this.color;
        this.ctx.fill();
    }
}