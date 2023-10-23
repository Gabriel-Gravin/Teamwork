---
layout: post
title: Freeplay Minigame test !
description: Jump with Link!
courses: {'compsci': {'week': 7}}
type: hacks
comments: True
---

**Directions**  
Freeplay with Link! Use "D" to make him move right, use the "A" to make him move left, and use "W" to make him jump.  

<!DOCTYPE html>
<html>
<head>
    <title>Flip or Freeze!</title>
</head>
<body>
    <canvas id="gameCanvas" width="800" height="400"></canvas>
    <script>
        // Get the canvas and its 2D rendering context
        const canvas = document.getElementById('gameCanvas');
        const ctx = canvas.getContext('2d');
        // Load the background image
        const backgroundImage = new Image();
        backgroundImage.src = '{{site.baseurl}}/images/throneroom.jpeg';
        // Load the sprite image
        const spriteImage = new Image();
        spriteImage.src = '{{site.baseurl}}/images/linksprites.png';
        // Define sprite properties
        const spriteWidth = 96; // Width of a single sprite frame
        const spriteHeight = 104; // Height of a single sprite frame
        // Initial sprite position and velocity
        let spriteX = 100;
        let spriteY = canvas.height - spriteHeight;
        let spriteVelocityY = 0;
        // Constants for jump behavior
        const gravity = 0.5;
        const jumpStrength = -10;
        let isJumping = false;
        // Constants for left and right behavior
        let frameX = 0;
        let frameY = 0;
        let maxFrame = 2;
        let isMovingLeft = false;
        let isMovingRight = false;
        let isIdle = true;
        // Function to update sprite animation
        function updateSpriteAnimation() {
            if (frameX < maxFrame) {
                frameX++;
            } else {
                frameX = 0;
            }
        }
        // Function to handle jumping when spacebar is pressed
        function jump() {
            if (!isJumping) {
                spriteVelocityY = jumpStrength;
                isJumping = true;
            }
        }
        // Function to handle moving left when a is pressed
        function moveLeft() {
            isMovingLeft = true;
            isIdle = false;
            frameY = 5;
            maxFrame = 9;
        }
        // Function to handle moving right when d is pressed
        function moveRight() {
            isMovingRight = true;
            isIdle = false;
            frameY = 7;
            maxFrame = 9;
        }
        // Function to handle idle
        function idle() {
            isIdle = true;
            frameY = 0;
            maxFrame = 2;
        }
        // Event listener for key downs
        window.addEventListener('keydown', (event) => {
            if (event.key === 'w') {
                jump();
            } else if (event.key === 'a') {
                moveLeft();
            } else if (event.key === 'd') {
                moveRight();
            }
        });
        // Event listener for key ups
        window.addEventListener('keyup', (event) => {
            if (event.key === 'a') {
                idle();
                isMovingLeft = false;
            } else if (event.key === 'd') {
                idle();
                isMovingRight = false;
            }
        })
        // Game loop
        let framesPerSecond = 30;
        function gameLoop() {
            // Clear the canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            // Draw the background image
            ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
            // Update sprite position based on key down left and right
            if (isMovingLeft) {
                spriteX -= 10;
            }
            if (isMovingRight) {
                spriteX += 10;
            }
            // Update the sprite position based on gravity
            spriteVelocityY += gravity;
            spriteY += spriteVelocityY;
            // Check if the sprite has landed
            if (spriteY >= canvas.height - spriteHeight) {
                spriteY = canvas.height - spriteHeight;
                spriteVelocityY = 0;
                isJumping = false;
            }
            // Draw the current sprite frame
            ctx.drawImage(
                spriteImage,
                frameX * spriteWidth, // Adjust the X-coordinate of the frame within the sprite sheet
                frameY * spriteHeight, // The Y-coordinate within the sprite sheet (assuming Y is always 0 for frames)
                spriteWidth, // Width of the frame
                spriteHeight, // Height of the frame
                spriteX, // X-coordinate where the frame is drawn on the canvas
                spriteY, // Y-coordinate where the frame is drawn on the canvas
                spriteWidth, // Width of the frame when drawn on the canvas
                spriteHeight // Height of the frame when drawn on the canvas
            );
            // Update sprite animation
            updateSpriteAnimation();
            // Keeps loop running
            setTimeout(function() {
            requestAnimationFrame(gameLoop);
            }, 1000 / framesPerSecond);
        }
        gameLoop();
    </script>
</body>
</html>