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

    setPosition(x, y) {
        this.x = x;
        this.y = y;
    }
}