---
layout: post
title: Wizard Sprite
description: Creating a simple wizard sprite using Javascript.
author: Katelyn Gelle, Gabriel Gravin, Kaden Vo, Daisy Zhang
courses: {'compsci': {'week': 5}}
type: hacks
comments: True
---
%%html

<body>
    <div>
        <canvas id="spriteContainer"> <!-- Within the base div is a canvas. An HTML canvas is used only for graphics. It allows the user to access some basic functions related to the image created on the canvas (including animation) -->
            <img id="wizardSprite" src="{{site.baseurl}}/images/wizard_spritesheet.png">  <!-- change sprite here -->
        </canvas>
        <div id="controls"> <!--basic radio buttons which can be used to check whether each individual animaiton works -->
            <input type="radio" name="animation" id="idle1">
            <label for="idle1">Idle1</label><br>
            <input type="radio" name="animation" id="idle2">
            <label for="idle2">Idle2</label><br>
            <input type="radio" name="animation" id="idle3">
            <label for="idle3">Idle3</label><br>
            <input type="radio" name="animation" id="scare">
            <label for="scare">Scare</label><br>
            <input type="radio" name="animation" id="back">
            <label for="back">Back</label><br>
            <input type="radio" name="animation" id="skip">
            <label for="skip">Skip</label><br>
            <input type="radio" name="animation" id="walk">
            <label for="walk">Walk</label><br>
        </div>
    </div>
</body>

<script>
    // start on page load
    window.addEventListener('load', function () {
        const canvas = document.getElementById('spriteContainer');
        const ctx = canvas.getContext('2d');
        const SPRITE_WIDTH = 23.5;  // matches sprite pixel width
        const SPRITE_HEIGHT = 23.5; // matches sprite pixel height
        const SCALE_FACTOR = 4;  // control size of sprite on canvas
        const FRAME_LIMIT = 6;  // number of frames per row, this code assume each row is same
        // const FRAME_RATE = 15;  // not used

        canvas.width = SPRITE_WIDTH * SCALE_FACTOR;
        canvas.height = SPRITE_HEIGHT * SCALE_FACTOR;

        class Wizard {
            constructor() {
                this.image = document.getElementById("wizardSprite");
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

            // draw wizard object
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

        // wizard object
        const wizard = new Wizard();

        // update frameY of wizard object, action from idle, bark, walk radio control
        const controls = document.getElementById('controls');
        controls.addEventListener('click', function (event) {
            if (event.target.tagName === 'INPUT') {
                const selectedAnimation = event.target.id;
                switch (selectedAnimation) {
                    case 'idle1':
                        wizard.frameY = 0;
                        wizard.maxFrame = 3;
                        break;
                    case 'idle2':
                        wizard.frameY = 1;
                        wizard.maxFrame = 3;
                        break;
                    case 'idle3':
                        wizard.frameY = 2;
                        wizard.maxFrame = 3;
                        break;
                    case 'scare':
                        wizard.frameY = 3;
                        wizard.maxFrame = 4;
                        break;
                    case 'back':
                        wizard.frameY = 4;
                        wizard.maxFrame = 4;
                        break;
                    case 'skip':
                        wizard.frameY = 5;
                        wizard.maxFrame = 12;
                        break;
                    case 'walk':
                        wizard.frameY = 6;
                        wizard.maxFrame = 7;
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
            wizard.draw(ctx);

            // Updates the `frameX` property to prepare for the next frame in the sprite sheet.
            wizard.update();

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



