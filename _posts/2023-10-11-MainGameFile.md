---
layout: post
title: Main Game!
description: Jump with Link!
author: Katelyn Gelle, Gabriel Gravin, Kaden Vo, Daisy Zhang
courses: {'compsci': {'week': 6}}
type: hacks
comments: True
---

**Directions**  
Freeplay with Link! Use "D" to make him move right, use the "A" to make him move left, and use the space bar to jump.  

<!DOCTYPE html>
<html>
<head>
    <title>Flip or Freeze!</title>
</head>
<body>
    <canvas id="gameCanvas" width="800" height="400"></canvas>
    <script type="module">
        import { Character } from '{{site.baseurl}}/assets/js/Character.js'
        var Link = new Character('{{site.baseurl}}/images/linksprites.png', 96, 104, 100, 400 - 104, -10, .5, 2);
        // Get the canvas and its 2D rendering context
        const canvas = document.getElementById('gameCanvas');
        const ctx = canvas.getContext('2d');
        // Load the background image
        const backgroundImage = new Image();
        backgroundImage.src = '{{site.baseurl}}/images/park.jpg';
        // Function to update sprite animation
        function updateSpriteAnimation() {
            if (Link.frameX < Link.maxFrame) {
                Link.frameX++;
            } else {
                Link.frameX = 0;
            }
        }
        // Function to handle jumping when spacebar is pressed
        function jump() {
            if (!Link.isJumping) {
                Link.spriteVelocityY = Link.jumpStrength;
                Link.isJumping = true;
            }
        }
        // Function to handle moving left when a is pressed
        function moveLeft() {
            Link.isMovingLeft = true;
            Link.isIdle = false;
            Link.frameY = 5;
            Link.maxFrame = 9;
        }
        // Function to handle moving right when d is pressed
        function moveRight() {
            Link.isMovingRight = true;
            Link.isIdle = false;
            Link.frameY = 7;
            Link.maxFrame = 9;
        }
        // Function to handle idle
        function idle() {
            Link.isIdle = true;
            Link.frameY = 0;
            Link.maxFrame = 2;
        }
        // Event listener for key downs
        window.addEventListener('keydown', (event) => {
            if (event.key === ' ') {
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
                Link.isMovingLeft = false;
            } else if (event.key === 'd') {
                idle();
                Link.isMovingRight = false;
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
            if (Link.isMovingLeft) {
                Link.spriteX -= 10;
            }
            if (Link.isMovingRight) {
                Link.spriteX += 10;
            }
            // Update the sprite position based on gravity
            Link.spriteVelocityY += Link.gravity;
            Link.spriteY += Link.spriteVelocityY;
            // Check if the sprite has landed
            if (Link.spriteY >= canvas.height - Link.spriteHeight) {
                Link.spriteY = canvas.height - Link.spriteHeight;
                Link.spriteVelocityY = 0;
                Link.isJumping = false;
            }
            // Draw the current sprite frame
            ctx.drawImage(
                Link.spriteImage,
                Link.frameX * Link.spriteWidth, // Adjust the X-coordinate of the frame within the sprite sheet
                Link.frameY * Link.spriteHeight, // The Y-coordinate within the sprite sheet (assuming Y is always 0 for frames)
                Link.spriteWidth, // Width of the frame
                Link.spriteHeight, // Height of the frame
                Link.spriteX, // X-coordinate where the frame is drawn on the canvas
                Link.spriteY, // Y-coordinate where the frame is drawn on the canvas
                Link.spriteWidth, // Width of the frame when drawn on the canvas
                Link.spriteHeight // Height of the frame when drawn on the canvas
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