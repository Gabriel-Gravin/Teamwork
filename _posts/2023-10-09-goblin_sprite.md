---
layout: post
title: Goblin Sprite
description: Creating a simple goblin sprite using Javascript.
author: Daisy Zhang
courses: {'compsci': {'week': 6}}
type: hacks
comments: True
---
%%html

<body>
    <div>
        <canvas id="spriteContainer"> <!-- Within the base div is a canvas. An HTML canvas is used only for graphics. It allows the user to access some basic functions related to the image created on the canvas (including animation) -->
            <img id="goblinSprite" src="/student/images/goblinsprites.png">  <!-- change sprite here -->
        </canvas>
        <div id="controls"> <!--basic radio buttons which can be used to check whether each individual animaiton works -->
            <input type="radio" name="animation" id="stomp">
            <label for="stomp">Stomp</label><br>
            <input type="radio" name="animation" id="stab1">
            <label for="stab1">Stab Left</label><br>
            <input type="radio" name="animation" id="stab2">
            <label for="stab2">Stab Up</label><br>
            <input type="radio" name="animation" id="stab3">
            <label for="stab3">Stab Right</label><br>
            <input type="radio" name="animation" id="handstand">
            <label for="handstand">Handstand</label><br>
        </div>
    </div>
</body>

<script>
    // start on page load
    window.addEventListener('load', function () {
        const canvas = document.getElementById('spriteContainer');
        const ctx = canvas.getContext('2d');
        const SPRITE_WIDTH = 30.27;  // matches sprite pixel width
        const SPRITE_HEIGHT = 30.2; // matches sprite pixel height
        const SCALE_FACTOR = 4;  // control size of sprite on canvas
        const FRAME_LIMIT = 7;  // number of frames per row, this code assume each row is same
        // const FRAME_RATE = 15;  // not used

        canvas.width = SPRITE_WIDTH * SCALE_FACTOR;
        canvas.height = SPRITE_HEIGHT * SCALE_FACTOR;

        class Goblin {
            constructor() {
                this.image = document.getElementById("goblinSprite");
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

            // draw goblin object
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

        // goblin object
        const goblin = new Goblin();

        // update frameY of goblin object, action from stomp, shoot, handstand radio control
        const controls = document.getElementById('controls');
        controls.addEventListener('click', function (event) {
            if (event.target.tagName === 'INPUT') {
                const selectedAnimation = event.target.id;
                switch (selectedAnimation) {
                    case 'stomp':
                        goblin.frameY = 0;
                        goblin.maxFrame = 10;
                        break;
                    case 'stab1':
                        goblin.frameY = 1;
                        goblin.maxFrame = 10;
                        break;
                    case 'stab2':
                        goblin.frameY = 2;
                        goblin.maxFrame = 10;
                        break;
                    case 'stab3':
                        goblin.frameY = 3;
                        goblin.maxFrame = 10;
                        break;
                    case 'handstand':
                        goblin.frameY = 4;
                        goblin.maxFrame = 4;
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
            goblin.draw(ctx);

            // Updates the `frameX` property to prepare for the next frame in the sprite sheet.
            goblin.update();

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



