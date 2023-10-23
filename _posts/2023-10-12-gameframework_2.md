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
        z-index: 2; /* Ensure the controls are on top of the link canvas */
    }

    /* Style the link canvas to be the same size as the viewport change!*/ 
    #linkCanvas {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 1; /* Place it below the background */
    }
</style>

<!-- Prepare DOM elements -->
<!-- Wrap both the linkn canvas and controls in a container div -->
<div id="canvasContainer">
    <div id="controls"> <!-- Controls -->
        <button id="toggleCanvasEffect">Invert</button>
        <input type="radio" name="animation" id="standing" />
        <label for="standing">Standing</label>
        <input type="radio" name="animation" id="left" />
        <label for="left">Left</label>
        <input type="radio" name="animation" id="back" />
        <label for="back">Back</label>
        <input type="radio" name="animation" id="right" />
        <label for="right">Right</label>
        <input type="radio" name="animation" id="front_walk" />
        <label for="front_walk">Front Walk</label>
        <input type="radio" name="animation" id="left_walk" />
        <label for="left_walk">Left Walk</label>
        <input type="radio" name="animation" id="back_walk" />
        <label for="back_walk">Back Walk</label>
        <input type="radio" name="animation" id="right_walk" />
        <label for="right_walk">Right Walk</label>
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
const linkImg = new Image();
linkImg.src = '{{site.baseurl}}/images/linksprites.png';

// Prepare Canvas
const canvas = document.getElementById("backgroundID");
const ctx = canvas.getContext('2d');

// Link animation part
const linkCanvas = document.createElement("canvas");
const linkCtx = linkCanvas.getContext("2d");

// Prepare Window extents related to viewport
const maxWidth = window.innerWidth;
const maxHeight = window.innerHeight;

backgroundImg.onload = function () {
    // Setup background constants from background image
    const WIDTH = backgroundImg.width;  // Image() width (meta data)
    const HEIGHT = backgroundImg.height; // Image() height
    const ASPECT_RATIO = WIDTH / HEIGHT;
    const ADJUST = 1 // visual layer adjust, use "1"" for a perfect loop change!!

    // Set Dimensions to match the image width
    const canvasWidth = maxWidth;
    const canvasHeight = canvasWidth / ASPECT_RATIO;  // height is oriented by width change!
    const canvasLeft = 0; // Start image from the left edge horizontally
    const canvasTop = (maxHeight - canvasHeight) / 2;  // center image vertically change!

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

    // Setup Link sprite constraints
    const SPRITE_WIDTH = 96;  // matches sprite pixel width
    const SPRITE_HEIGHT = 104; // matches sprite pixel height
    const SPRITE_FRAMES = 10;  // matches number of frames per sprite row; this code assumes each row is the same
    const SPRITE_SCALE = 2;  // controls the size of the sprite on the canvas

    class Link extends Layer {
        constructor(image, speedRatio) {
            super(image, speedRatio);
            this.minFrame = 0;
            this.maxFrame = SPRITE_FRAMES;
            this.frameX = 0;
            this.frameY = 2;  // left stabbing as default
            this.linkX = canvasWidth; // Initialize the link's x position to the right edge of the canvas
        }
    
        update() {
            if (this.frameY == 2) {
                this.linkX -= this.speed;  // Move the link to the left
                // Check if the link has moved off the left edge of the canvas
                if (this.linkX < -linkCanvas.width) {
                    this.linkX = canvasWidth; // Reset the link's x position to the right edge
                }
            }
            // Update frameX of the object
            if (this.frameX < this.maxFrame) {
                this.frameX++;
            } else {
                this.frameX = 0;
            }
        }
    
        // Draw link object
        draw() {
            // Set fixed dimensions and position for the linkCanvas
            linkCanvas.width = SPRITE_WIDTH * SPRITE_SCALE; // change!
            linkCanvas.height = SPRITE_HEIGHT * SPRITE_SCALE;
            linkCanvas.style.width = `${linkCanvas.width}px`;
            linkCanvas.style.height = `${linkCanvas.height}px`;
            linkCanvas.style.position = 'absolute';
            linkCanvas.style.left = `${this.linkX}px`; // Set the link's left position based on its x-coordinate
            linkCanvas.style.top = `${canvasHeight}px`;
    
            linkCtx.drawImage(
                this.image,
                this.frameX * SPRITE_WIDTH, //change!
                this.frameY * SPRITE_HEIGHT,
                SPRITE_WIDTH,
                SPRITE_HEIGHT,
                0,
                0,
                linkCanvas.width,
                linknCanvas.height
            );
        }
    }
    

    // Background object
    var backgroundObj = new Layer(backgroundImg, 0.2);
    var linkObj = new Link(linkImg, 0.5);

    // Append the link canvas to the body
    document.body.appendChild(linkCanvas);

    // Animation loop
    function animation() {
        backgroundObj.update();
        backgroundObj.draw();

        linkObj.update();
        linkObj.draw();

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
<<<<<<< HEAD
            linkCanvas.style.filter = "invert(100%)";
=======
            goblinCanvas.style.filter = "invert(100%)";
>>>>>>> f70e2562aa112f946c7cf37a843b8e41d50d92a2
        } else {
            canvas.style.filter = defaultFilter; // Apply the default filter value
            linkCanvas.style.filter = defaultFilter; 
        }

        isFilterEnabled = !isFilterEnabled;  // switch boolean value
    });
    /* Control "link action" 
     * changes y value, the row in sprite
    */
    // update frameY of link object, action from stomp, stab left, stab up, stab right, handstand radio control
    const controls = document.getElementById('controls');
    controls.addEventListener('click', function (event) {
        if (event.target.tagName === 'INPUT') {
            const selectedAnimation = event.target.id;
            switch (selectedAnimation) {
                case 'standing':
                    linkObj.frameY = 0;
                    linkObj.maxFrame = 2;
                    break;
                case 'left':
                    linkObj.frameY = 1;
                    linkObj.maxFrame = 2;
                    break;
                case 'back':
                    linkObj.frameY = 2;
                    linkObj.maxFrame = 0;
                    break;
                case 'right':
                    linkObj.frameY = 3;
                    linkObj.maxFrame = 2;
                    break;
                case 'front_walk':
                    linkObj.frameY = 4;
                    linkObj.maxFrame = 9;
                    break;
                case 'left_walk':
                    linkObj.frameY = 5;
                    linkObj.maxFrame = 9;
                    break;
                case 'back_walk':
                    linkObj.frameY = 6;
                    linkObj.maxFrame = 9;
                    break;
                case 'right_walk':
                    linkObj.frameY = 7;
                    linkObj.maxFrame = 9;
                    break;
                default:
                    break;
            }
        }
    });
};
</script>


