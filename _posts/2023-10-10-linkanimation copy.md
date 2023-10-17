---
toc: true
comments: true
layout: post
title:  Link Animation Copy
subtitle: Katelyn Gelle
cover-img: /images/swordplaylink.gif
description: Link Animation Final
type: hacks
courses: {'compsci': {'week': 7}}
categories: [C1.4]
---  
<canvas id="link" width="500" height="500"></canvas>
<script>
    window.addEventListener('load', function () {
        const canvas = document.getElementById('link');
        const ctx = canvas.getContext('2d');
        const SPRITE_WIDTH = 96;
        const SPRITE_HEIGHT = 104;
        const SCALE_FACTOR = 1;
        const FRAME_LIMIT = 5;
        class Link {
            constructor() {
                this.image = new Image();
                this.image.src = '{{site.baseurl}}/images/linksprites.png';
                this.spriteX = 100;
                this.spriteY = 0;
                this.x = 0;
                this.y = 0;
                this.scale = 1;
                this.minFrame = 0;
                this.maxFrame = FRAME_LIMIT;
                this.frameX = 0;
                this.frameY = 0;
            }
            draw(context) {
                context.drawImage(
                    this.image,
                    this.frameX * SPRITE_WIDTH,
                    this.frameY * SPRITE_HEIGHT,
                    SPRITE_WIDTH,
                    SPRITE_HEIGHT,
                    this.x,
                    this.y,
                    SPRITE_WIDTH * SCALE_FACTOR,
                    SPRITE_HEIGHT * SCALE_FACTOR,
                );
            }
            update() {
                if (isMovingLeft) {
                    this.moveLeft()
                } else if (isMovingRight) {
                    this.moveRight()
                } else if (isIdle) {
                    this.idle()
                }
        }
        // Constants for jump behavior
        const gravity = 0.5;
        const jumpStrength = -10;
        let isJumping = false;
        // Constants for left and right behavior
        let isMovingLeft = false;
        let isMovingRight = false;
        let isIdle = true;
        // Function to handle jumping when spacebar is pressed
        function jump() {
            if (!isJumping) {
                spriteVelocityY = jumpStrength;
                isJumping = true;
            }
        }
        // Function to handle moving left when a is pressed
        function moveLeft() {
            if (!isMovingLeft) {
                isMovingLeft = true;
                link.frameY = 5;
                link.maxFrame = 9;
                spriteX -= 5;
            }
        }
        // Function to handle moving right when d is pressed
        function moveRight() {
            if (!isMovingRight) {
                isMovingRight = true;
                link.frameY = 7;
                link.maxFrame = 9;
                spriteY += 5;
            }
        }
        // Function to handle idle
        function idle() {
            if (!isIdle) {
                isIdle = true;
                link.frameY = 0;
                link.maxFrame = 3;
            }
        }
        // Event listener for key downs
        window.addEventListener('keydown', (event) => {
            if (event.key === ' ') {
                jump();
            } else if (event.key === 'a') {
                moveLeft();
            } else if (event.key === 'd') {
                moveRight();
            } else () {
                idle();
            }
        });
        // Event listener for key ups
        window.addEventListener('keyup', (event) => {
            if (event.key === 'a') {
                isMovingLeft = false;
            } else if (event.key === 'd') {
                isMovingRight = false;
            } else {
                isIdle = true;
            }
        })
        let framesPerSecond = 10
        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            link.draw(ctx);
            link.update();
            requestAnimationFrame(animate);
        }
        animate();
        link.image.onload = function() {
            animate();
        };
    });
</script>