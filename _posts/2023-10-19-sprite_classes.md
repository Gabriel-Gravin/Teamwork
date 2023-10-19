---
toc: false
comments: false
layout: post
title: Platform test
description: Testing platforms for sprites
type: hacks
courses: { compsci: {week: 7} }
---
<style>
    #canvas {
        margin: 0;
        border: 3px solid yellow;
    }
</style>
<canvas id="canvas"></canvas>
<script>
    // Create empty canvas
    let canvas = document.getElementById('canvas');
    let c = canvas.getContext('2d');
    // Set the canvas dimensions
    canvas.width = 700;
    canvas.height = 700;
    // Define gravity value
    let gravity = 3.8;
    // Define the Player class
    class Player {
        constructor() {
            // Initial position and velocity of the player
            this.position = {
                x: 100,
                y: 600,
            };
            this.velocity = {
                x: 0,
                y: 0,
            };
            // Dimensions of the player
            this.width = 50;
            this.height = 50;
        }
        // Method to draw the player on the canvas
        draw() {
            c.fillStyle = 'pink';
            c.fillRect(this.position.x, this.position.y, this.width, this.height);
        }
        // Method to update the players position and velocity
        update() {
            this.draw();
            this.position.y += this.velocity.y;
            this.position.x += this.velocity.x;
            // Apply gravity if player is not at the bottom
            if (this.position.y + this.height + this.velocity.y <= canvas.height)
                this.velocity.y += gravity;
            else
                this.velocity.y = 0;
        }
    }
    //--
    // NEW CODE - PLATFORM
    //--
    // Define the Platform class
    class Platform {
        constructor(image) {
            // Initial position of the platform
            this.position = {
                x: 0,
                y: 500
            }
            this.image = image;
            this.width = 118;
            this.height = 31;
        }
        // Method to draw the platform on the canvas
        draw() {
            c.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
        }
    }
    class Platform2 {
        constructor(image) {
            // Initial position of the platform
            this.position2 = {
                x: 650,
                y: 500
            }
            this.image2 = image2;
            this.width2 = 508;
            this.height2 = 64;
        }
        // Method to draw the platform on the canvas
        draw() {
            c.drawImage(this.image2, this.position2.x, this.position2.y, this.width2, this.height2);
        }
    }
    //--
    // NEW CODE - CREATE PLATFORM OBJECT WITH IMAGE
    //--
    // Load platform image
    let image = new Image();
    image.src = "{{site.baseurl}}/images/bubbleyum.png"
    let image2 = new Image();
    image2.src = "{{site.baseurl}}/images/starburst.png"
    // Create a platform object
    let platform = new Platform(image);
    let platform2 = new Platform(image2);
    // Create a player object
    player = new Player();
    // Define keyboard keys and their states
    let keys = {
        right: {
            pressed: false
        },
        left: {
            pressed: false
        }
    }

    // Animation function to continuously update and render the canvas
    function animate() {
        requestAnimationFrame(animate);
        c.clearRect(0, 0, canvas.width, canvas.height);
        //--
        // NEW CODE - DRAW PLATFORM
        //--
        platform.draw();
        player.update();
        // Control players horizontal movement
        if (keys.right.pressed && player.position.x + player.width <= canvas.width - 50) {
            player.velocity.x = 15;
        } else if (keys.left.pressed && player.position.x >= 50) {
            player.velocity.x = -15;
        } else {
            player.velocity.x = 0;
        }
        //--
        // NEW CODE  - PLATFORM COLLISIONS
        //--
        // Check for collision between player and platform
        if (
            player.position.y + player.height <= platform.position.y &&
            player.position.y + player.height + player.velocity.y >= platform.position.y &&
            player.position.x + player.width >= platform.position.x &&
            player.position.x <= platform.position.x + platform.width
        ) {
            player.velocity.y = 0;
        }
    }
    // Start the animation loop
    animate();


    


    // Event listener for keydown events
    addEventListener('keydown', ({ keyCode }) => {
        switch (keyCode) {
            case 65:
                console.log('left');
                keys.left.pressed = true;
                break;
            case 83:
                console.log('down');
                break;
            case 68:
                console.log('right');
                keys.right.pressed = true;
                break;
            case 87:
                console.log('up');
                player.velocity.y -= 20;
                break;
        }
    });
    // Event listener for keyup events
    addEventListener('keyup', ({ keyCode }) => {
        switch (keyCode) {
            case 65:
                console.log('left');
                keys.left.pressed = false;
                break;
            case 83:
                console.log('down');
                break;
            case 68:
                console.log('right');
                keys.right.pressed = false;
                break;
            case 87:
                console.log('up');
                player.velocity.y = -20;
                break;
        }
    })
</script>



Specific Hack

    Add creative “death pits” (gap between platforms) that restart game if fallen through

Open Ended Hack

    Experiment with different terrains (ice could cause sliding)

