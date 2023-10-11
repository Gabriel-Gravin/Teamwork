// Get the canvas and its 2D rendering context
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Load the background image
const backgroundImage = new Image();
backgroundImage.src = '/student/images/park.jpg';

// Load the sprite image
const spriteImage = new Image();
spriteImage.src = '/student/images/linksprites.png';

// Initial sprite position and velocity
let spriteX = 100;
let spriteY = canvas.height - spriteImage.height;
let spriteVelocityY = 0;

// Constants for jump behavior
const gravity = 0.5;
const jumpStrength = -10;
let isJumping = false;

// Game loop
function gameLoop() {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the background image
    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);

    // Update the sprite position based on gravity
    spriteVelocityY += gravity;
    spriteY += spriteVelocityY;

    // Check if the sprite has landed
    if (spriteY >= canvas.height - spriteImage.height) {
        spriteY = canvas.height - spriteImage.height;
        spriteVelocityY = 0;
        isJumping = false;
    }

    // Draw the sprite
    ctx.drawImage(spriteImage, spriteX, spriteY);

    requestAnimationFrame(gameLoop);
}

// Handle player input (e.g., jump)
window.addEventListener('keydown', (event) => {
    if (event.key === ' ' && !isJumping) {
        spriteVelocityY = jumpStrength;
        isJumping = true;
    }
});

// Start the game loop
gameLoop();
