export class gameObject {
    constructor(canvas, image,) {
        this.x = 0;
        this.y = 0;
        this.canvas = canvas;
        this.ctx = getContext('2D');
        this.image = image;
        this.width = image.width;
        this.height = image.height;
    }
};