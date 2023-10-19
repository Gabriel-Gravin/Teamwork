class link {
    constructor() {
        
    }
    moveRight() {
        isMovingRight = true;
        isIdle = false;
        frameY = 7;
        maxFrame = 9;
    }
    moveLeft() {
        isMovingLeft = true;
        isIdle = false;
        frameY = 5;
        maxFrame = 9;
    }
    idle() {
        isIdle = true;
        frameY = 0;
        maxFrame = 2;
    }
};