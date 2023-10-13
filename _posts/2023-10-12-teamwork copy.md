---
layout: post
title: Framework of Game2
description: Game framework (sprite + background)!
author: Katelyn Gelle, Gabriel Gravin, Kaden Vo, Daisy Zhang
courses: {'compsci': {'week': 7}}
type: hacks
comments: False
---
<!DOCTYPE html>

<style>
    #controls {
        position: relative;
        z-index: 2; /* Ensure the controls are on top of the goblin canvas */
    }

    /* Style the goblin canvas to be the same size as the viewport */
    #goblinCanvas {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 1; /* Place it below the background */
    }
</style>


<!-- Prepare DOM elements -->
<!-- Wrap both the goblin canvas and controls in a container div -->
<div id="canvasContainer">
    <div id="controls"> <!-- Controls -->
        <button id="toggleCanvasEffect">Invert</button>
        <input type="radio" name="animation" id="stomp" />
        <label for="stomp">Stomp</label>
        <input type="radio" name="animation" id="stab1" />
        <label for="stab1">Stab Left</label>
        <input type="radio" name="animation" id="stab2" />
        <label for="stab2">Stab Up</label>
        <input type="radio" name="animation" id="stab3" />
        <label for="stab3">Stab Right</label>
        <input type="radio" name="animation" id="handstand" />
        <label for="handstand">Handstand</label>
    </div>
    <canvas id="backgroundID">
        <img id="backgroundImage" src="{{site.baseurl}}/images/Stone_Background.jpg" />
    </canvas>
</div>


<script>
/* Background part of Game
 * scrolling 
*/
// Prepare Background Image
const backgroundImg = new Image();
backgroundImg.src = '{{site.baseurl}}/images/Stone_Background.jpg';  // Jekyll/Liquid puts filename here

// Prepare Sprite Image
const goblinImg = new Image();
goblinImg.src = '{{site.baseurl}}/images/linksprites.png';

// Prepare Canvas
const canvas = document.getElementById("backgroundID");
const ctx = canvas.getContext('2d');

// Goblin animation part
const goblinCanvas = document.createElement("canvas");
const goblinCtx = goblinCanvas.getContext("2d");

// Prepare Window extents related to viewport
const maxWidth = window.innerWidth;
const maxHeight = window.innerHeight;

backgroundImg.onload = function () {
    // Setup background constants from background image
    const WIDTH = backgroundImg.width;  // Image() width (meta data)
    const HEIGHT = backgroundImg.height; // Image() height
    const ASPECT_RATIO = HEIGHT / WIDTH;
    const ADJUST = 1 // visual layer adjust, use "1"" for a perfect loop 

    // Set Dimensions to match the image width
    const canvasWidth = maxWidth;
    const canvasHeight = canvasWidth / ASPECT_RATIO;  // height is oriented by width
    const canvasLeft = 0; // Start image from the left edge horizontally
    const canvasTop = (maxHeight - canvasHeight) / 2;  // center image vertically

    // Set Style properties for the background canvas
    canvas.width = WIDTH / ADJUST;
    canvas.height = HEIGHT / ADJUST;
    canvas.style.width = `${canvasWidth}px`;
    canvas.style.height = `${canvasHeight}px`;
    canvas.style.position = 'absolute';
    canvas.style.left = `${canvasLeft}px`;
    canvas.style.top = `${canvasTop}px`;

    // Game speed is a common game variable
    var gameSpeed = 10;

    // Layer is set up to support Parallax, multiple layers
    class Layer {
        constructor(image, speedRatio) {
            this.x = 0;
            this.y = 0;
            this.width = WIDTH;
            this.height = HEIGHT;
            this.image = image;
            this.speedRatio = speedRatio;
            this.speed = gameSpeed * this.speedRatio;
            this.frame = 0;
        }
        update() {
            this.x = (this.x - this.speed) % this.width;
        }
        draw() {
            ctx.drawImage(this.image, this.x, this.y);
            ctx.drawImage(this.image, this.x + this.width, this.y);
        }
    }

    // Setup Goblin sprite constraints
    const SPRITE_WIDTH = 96;  // matches sprite pixel width
    const SPRITE_HEIGHT = 104; // matches sprite pixel height
    const SPRITE_FRAMES = 10;  // matches number of frames per sprite row; this code assumes each row is the same
    const SPRITE_SCALE = 2;  // controls the size of the sprite on the canvas

    class Goblin extends Layer {
        constructor(image, speedRatio) {
            super(image, speedRatio);
            this.minFrame = 0;
            this.maxFrame = SPRITE_FRAMES;
            this.frameX = 0;
            this.frameY = 2;  // left stabbing as default
            this.goblinX = canvasWidth; // Initialize the goblin's x position to the right edge of the canvas
        }
    
        update() {
            if (this.frameY == 2) {
                this.goblinX -= this.speed;  // Move the goblin to the left
                // Check if the goblin has moved off the left edge of the canvas
                if (this.goblinX < -goblinCanvas.width) {
                    this.goblinX = canvasWidth; // Reset the goblin's x position to the right edge
                }
            }
            // Update frameX of the object
            if (this.frameX < this.maxFrame) {
                this.frameX++;
            } else {
                this.frameX = 0;
            }
        }
    
        // Draw goblin object
        draw() {
            // Set fixed dimensions and position for the goblinCanvas
            goblinCanvas.width = SPRITE_WIDTH * SPRITE_SCALE;
            goblinCanvas.height = SPRITE_HEIGHT * SPRITE_SCALE;
            goblinCanvas.style.width = `${goblinCanvas.width}px`;
            goblinCanvas.style.height = `${goblinCanvas.height}px`;
            goblinCanvas.style.position = 'absolute';
            goblinCanvas.style.left = `${this.goblinX}px`; // Set the goblin's left position based on its x-coordinate
            goblinCanvas.style.top = `${canvasHeight}px`;
    
            goblinCtx.drawImage(
                this.image,
                this.frameX * SPRITE_WIDTH,
                this.frameY * SPRITE_HEIGHT,
                SPRITE_WIDTH,
                SPRITE_HEIGHT,
                0,
                0,
                goblinCanvas.width,
                goblinCanvas.height
            );
        }
    }
    

    // Background object
    var backgroundObj = new Layer(backgroundImg, 0.2);
    var goblinObj = new Goblin(goblinImg, 0.5);

    // Append the goblin canvas to the body
    document.body.appendChild(goblinCanvas);

    // Animation loop
    function animation() {
        backgroundObj.update();
        backgroundObj.draw();

        goblinObj.update();
        goblinObj.draw();

        requestAnimationFrame(animation);  // cycle animation, recursion
    }

    // Start animation process
    animation();

    /* Toggle "canvas filter property" 
    * look in _sass/minima/dark-mode.scss
    */
    var isFilterEnabled = true;
    const defaultFilter = getComputedStyle(document.documentElement).getPropertyValue('--default-canvas-filter');
    toggleCanvasEffect.addEventListener("click", function () {
        if (isFilterEnabled) {
            canvas.style.filter = "invert(100%)";  // remove filter
            goblinCanvas.style.filter = "invert(100%)";
        } else {
            canvas.style.filter = defaultFilter; // Apply the default filter value
            goblinCanvas.style.filter = defaultFilter; 
        }

        isFilterEnabled = !isFilterEnabled;  // switch boolean value
    });
    /* Control "goblin action" 
     * changes y value, the row in sprite
    */
    // update frameY of goblin object, action from stomp, stab left, stab up, stab right, handstand radio control
    const controls = document.getElementById('controls');
    controls.addEventListener('click', function (event) {
        if (event.target.tagName === 'INPUT') {
            const selectedAnimation = event.target.id;
            switch (selectedAnimation) {
                case 'stomp':
                    goblinObj.frameY = 0;
                    goblinObj.maxFrame = 2;
                    break;
                case 'stab1':
                    goblinObj.frameY = 1;
                    break;
                case 'stab2':
                    goblinObj.frameY = 2;
                    break;
                case 'stab3':
                    goblinObj.frameY = 3;
                    break;
                case 'handstand':
                    goblinObj.frameY = 4;
                    break;
                default:
                    break;
            }
        }
    });
};
</script>


