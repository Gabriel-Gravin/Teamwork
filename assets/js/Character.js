export class Character {
    constructor(spriteURL, spritewidth, spriteheight, x, y, jump, gravity, maxFrame) {
        this.frameX = 0;
        this.frameY = 0;
        this.maxFrame = maxFrame;
        this.spriteX = x;
        this.spriteY = y;
        this.spritewidth = spritewidth;
        this.spriteheight = spriteheight;
        this.isMovingLeft = false;
        this.isMovingRight = false;
        this.isJumping = false;
        this.isIdle = true;
        this.spriteImage = new Image();
        this.spriteImage.src = spriteURL;
        this.spriteVelocityY = 0;
        this.gravity = gravity;
        this.jumpStrength = jump;
    }
};