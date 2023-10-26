import GameEnv from './GameEnv.js';
import GameObject from './GameObject.js';

export class Background extends GameObject {
    constructor(canvas, image, speedRatio) {
        super(canvas, image, speedRatio);
    }
    bg1 = {
        width: 500,
        height: 1000,
        x: 0,
        y: 0
    }
    bg2 = {
        width: 500,
        height: 1000,
        x: 0,
        y: -1000
    }
    bg3 = {
        width: 500,
        height: 1000,
        x: 0,
        y: -2000
    }
    // Updates by changing the position of 3 seperate backgrounds. One on top, one in the middle, and one on the bottom.
    update() {
        this.bg1.y += this.speedRatio;
        this.bg2.y += this.speedRatio;
        this.bg3.y += this.speedRatio;
        if (this.bg1.y == 2000) {
            this.bg1.y = 0;
        }
        if (this.bg2.y == 1000) {
            this.bg2.y = -1000;
        }
        if (this.bg3.y == 0) {
            this.bg3.y = -2000;
        }
    }

    // Draws the posion of each background
    draw() {
        this.ctx.drawImage(this.image, this.bg1.x, this.bg1.y)
        this.ctx.drawImage(this.image, this.bg2.x, this.bg2.y)
        this.ctx.drawImage(this.image, this.bg3.x, this.bg3.y)
    }

    /* Background camvas is set to screen
     * the ADJUST contant elements portions of image that don't wrap well
     * the GameEnv.top is a getter used to set canvas under Menu
     * the GameEnv.bottom is setter used to establish game bottom at offsetHeight of canvas 
    */ 
    size() {
        // Update canvas size
        const ADJUST = 1 // visual layer adjust; alien_planet.jpg: 1.42, try 1 for others

        const canvasWidth = GameEnv.innerWidth;
        const canvasHeight = canvasWidth / this.aspect_ratio;
        const canvasLeft = 0;

        this.canvas.width = this.width / ADJUST;
        this.canvas.height = this.height / ADJUST;
        this.canvas.style.width = `${canvasWidth}px`;
        this.canvas.style.height = `${canvasHeight}px`;
        this.canvas.style.position = 'absolute';
        this.canvas.style.left = `${canvasLeft}px`;
        this.canvas.style.top = `${GameEnv.top}px`;

        // set bottom of game to new background height
        GameEnv.setBottom();
    }
}

export default Background;