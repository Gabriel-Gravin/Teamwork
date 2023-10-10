---
layout: post
title: Rhythm Jump Minigame -- Flip or Freeze!
description: Jump with Link!
author: Katelyn Gelle, Gabriel Gravin, Kaden Vo, Daisy Zhang
courses: {'compsci': {'week': 6}}
type: hacks
comments: True
---

**Directions**  
Link is jumping on the trampoline! Press the space bar to make Link jump. If your screen says "Flip!", press the UP arrow, and Link will do a spin. If your screen says "Freeze!", don't do anything! If you press anything, Link will step off the trampoline. Let's play!

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

        // Define the source rectangle for the sprite
        const spriteSourceX = 0; // X coordinate of the top-left corner of the sprite in the sprite sheet
        const spriteSourceY = 0; // Y coordinate of the top-left corner of the sprite in the sprite sheet
        const spriteWidth = 96; // Width of the sprite in the sprite sheet
        const spriteHeight = 104; // Height of the sprite in the sprite sheet

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
            if (spriteY >= canvas.height - spriteHeight) {
                spriteY = canvas.height - spriteHeight;
                spriteVelocityY = 0;
                isJumping = false;
            }

            // Draw the sprite with the specified source rectangle
            ctx.drawImage(spriteImage, spriteSourceX, spriteSourceY, spriteWidth, spriteHeight, spriteX, spriteY, spriteWidth, spriteHeight);

            requestAnimationFrame(gameLoop);
        }

        // Handle player input (e.g., jump)
        window.addEventListener('keydown', (event) => {
            if (event.key === ' ' && !isJumping) {
                spriteVelocityY = jumpStrength;
                isJumping = true;
            }
        });

        // Wait for both images to load
        backgroundImage.onload = () => {
            spriteImage.onload = () => {
                // Start the game loop after both images are loaded
                gameLoop();
            };
        };
    </script>
</body>
</html>
