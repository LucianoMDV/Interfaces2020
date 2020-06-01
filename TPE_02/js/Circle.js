class Circle extends Figure {
    constructor(x, y, radio, colour, canvas) {
        super(x, y, colour, canvas);
        this.radio = radio;
        // let img = document.querySelector("#img4");
        // let pat = this.ctx.createPattern(img, "no-repeat");
        // this.image = pat;
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

    drawImage2() {
        // var c = document.getElementById("myCanvas");
        // var ctx = c.getContext("2d");
        this.ctx.beginPath();
        // this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        // var img = document.querySelector("#img4");
        // var pat = this.ctx.createPattern(img, "repeat");
        this.ctx.arc(this.x, this.y, this.radio, 0, 2 * Math.PI);
        // this.ctx.rect(0, 0, this.canvas.width, this.canvas.height);
        // this.ctx.fillStyle = this.colour;
        this.ctx.fillStyle = this.image;
        this.ctx.fill();

        this.ctx.lineWidth = 3;
        this.ctx.stroke();
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
    setImage(pattern) {
        this.image = pattern;
    }
    getImage() {
        return this.image;
    }

    hit(x, y) {
        let temp = false;
        let m = Math.pow(x - this.x, 2) + Math.pow(y - this.y, 2);
        return m < Math.pow(this.radio, 2);
    }
}