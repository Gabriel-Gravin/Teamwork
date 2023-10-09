---
layout: post
title: Werewolf Sprite
description: Creating a simple werewolf sprite using Javascript.
author: Daisy Zhang
courses: {'compsci': {'week': 6}}
type: hacks
comments: True
---
%%html

<body>
    <div>
        <canvas id="spriteContainer"> <!-- Within the base div is a canvas. An HTML canvas is used only for graphics. It allows the user to access some basic functions related to the image created on the canvas (including animation) -->
            <img id="werewolfSprite" src="/student/images/werewolfsprites.png">  <!-- change sprite here -->
        </canvas>
        <div id="controls"> <!--basic radio buttons which can be used to check whether each individual animaiton works -->
            <input type="radio" name="animation" id="idle">
            <label for="idle">Idle</label><br>
            <input type="radio" name="animation" id="walk">
            <label for="walk">Walk</label><br>
            <input type="radio" name="animation" id="run">
            <label for="run">Run</label><br>
            <input type="radio" name="animation" id="sprint">
            <label for="sprint">Sprint</label><br>
            <input type="radio" name="animation" id="jump">
            <label for="jump">Jump</label><br>
        </div>
    </div>
</body>

<script>
    // start on page load
    window.addEventListener('load', function () {
        const canvas = document.getElementById('spriteContainer');
        const ctx = canvas.getContext('2d');
        const SPRITE_WIDTH = 67.25;  // matches sprite pixel width
        const SPRITE_HEIGHT = 81.6; // matches sprite pixel height
        const SCALE_FACTOR = 4;  // control size of sprite on canvas
        const FRAME_LIMIT = 7;  // number of frames per row, this code assume each row is same
        // const FRAME_RATE = 15;  // not used

        canvas.width = SPRITE_WIDTH * SCALE_FACTOR;
        canvas.height = SPRITE_HEIGHT * SCALE_FACTOR;

        class Werewolf {
            constructor() {
                this.image = document.getElementById("werewolfSprite");
                this.spriteWidth = SPRITE_WIDTH;
                this.spriteHeight = SPRITE_HEIGHT;
                this.width = this.spriteWidth;
                this.height = this.spriteHeight;
                this.x = 0;
                this.y = 0;
                this.scale = SCALE_FACTOR;
                this.minFrame = 0;
                this.maxFrame = FRAME_LIMIT;
                this.frameX = 0;
                this.frameY = 0;
            }

            // draw werewolf object
            draw(context) {
                context.drawImage(
                    this.image,
                    this.frameX * this.spriteWidth,
                    this.frameY * this.spriteHeight,
                    this.spriteWidth,
                    this.spriteHeight,
                    this.x,
                    this.y,
                    this.width * this.scale,
                    this.height * this.scale
                );
            }

            // update frameX of object
            update() {
                if (this.frameX < this.maxFrame) {
                    this.frameX++;
                } else {
                    this.frameX = 0;
                }
            }
        }

        // werewolf object
        const werewolf = new Werewolf();

        // update frameY of werewolf object, action from idle, walk, run, sprint, jump radio control
        const controls = document.getElementById('controls');
        controls.addEventListener('click', function (event) {
            if (event.target.tagName === 'INPUT') {
                const selectedAnimation = event.target.id;
                switch (selectedAnimation) {
                    case 'idle':
                        werewolf.frameY = 0;
                        werewolf.maxFrame = 7;
                        break;
                    case 'walk':
                        werewolf.frameY = 1;
                        werewolf.maxFrame = 7;
                        break;
                    case 'run':
                        werewolf.frameY = 2;
                        werewolf.maxFrame = 7;
                        break;
                    case 'sprint':
                        werewolf.frameY = 3;
                        werewolf.maxFrame = 7;
                        break;
                    case 'jump':
                        werewolf.frameY = 4;
                        werewolf.maxFrame = 7;
                        break;
                    default:
                        break;
                }
            }
        });

        // Animation recursive control function
        let framesPerSecond = 5
        function animate() {
            // Clears the canvas to remove the previous frame.
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Draws the current frame of the sprite.
            werewolf.draw(ctx);

            // Updates the `frameX` property to prepare for the next frame in the sprite sheet.
            werewolf.update();

            // Uses `requestAnimationFrame` to synchronize the animation loop with the display's refresh rate,
            // ensuring smooth visuals.
            setTimeout(function() {
                requestAnimationFrame(animate);
            }, 1000 / framesPerSecond);
        }

        // run 1st animate
        animate();
    });
</script>



