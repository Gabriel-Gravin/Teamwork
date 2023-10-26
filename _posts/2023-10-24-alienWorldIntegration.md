---
layout: base
title: Main Game with Integration
image: /images/alien_planet.jpg
images:
  background:
    src: /images/Stone_Background.jpg
  dog:
    src: /images/dogSprite.png
  monkey:
    src: /images/monkeySprite.png
---

<!-- Liquid code, run by Jekyll, used to define location of asset(s) -->
{% assign backgroundFile = site.baseurl | append: page.images.background.src %}
{% assign dogSpriteImage = site.baseurl | append: page.images.dog.src %}
{% assign monkeySpriteImage = site.baseurl | append: page.images.monkey.src %}

<style>
    #controls {
        position: relative;
        z-index: 2; /* Ensure the controls are on top */
    }
</style>

<!-- Prepare DOM elements -->
<!-- Wrap both the dog canvas and controls in a container div -->
<div id="canvasContainer">
    <div id="controls"> <!-- Controls -->
        <!-- Background controls -->
        <button id="toggleCanvasEffect">Invert</button>
        <!-- Dog controls -->
        <input type="radio" name="animation" id="idle">
        <label for="idle">Idle</label>
        <input type="radio" name="animation" id="barking">
        <label for="barking">Barking</label>
        <input type="radio" name="animation" id="walking" checked>
        <label for="walking">Walking</label>
    </div>
</div>

<script type="module">
    import GameEnv from '{{site.baseurl}}/assets/js/alienWorld/GameEnv.js';
    import GameObject from '{{site.baseurl}}/assets/js/alienWorld/GameObject.js';
    import Background from '{{site.baseurl}}/assets/js/alienWorld/Background.js';
    import Character from '{{site.baseurl}}/assets/js/alienWorld/Character.js';
    import Platform from '{{site.baseurl}}/assets/js/alienWorld/Platform.js';
    import { initDog } from '{{site.baseurl}}/assets/js/alienWorld/CharacterDog.js';
    import { initMonkey } from '{{site.baseurl}}/assets/js/alienWorld/CharacterMonkey.js';

    // Create a function to load an image and return a Promise
    function loadImage(src) {
        return new Promise((resolve, reject) => {
        const image = new Image();
        image.src = src;
        image.onload = () => resolve(image);
        image.onerror = reject;
        });
    }

    // Game loop
    function gameLoop() {
        for (var gameObj of GameObject.gameObjectArray){
            gameObj.update();
            gameObj.draw();
        }
        requestAnimationFrame(gameLoop);  // cycle game, aka recursion
    }

    // Window resize
    function setSize() {
        GameEnv.setGameEnv();  // Update GameEnv dimensions

        // Call the sizing method on all game objects
        for (var gameObj of GameObject.gameObjectArray){
            gameObj.size();
        }
    }

    
    async function startGame() {
        // Resolve file dependencies before starting gam
        try {

            // Define data for Game Objects

            const [backgroundImg, dogImg, monkeyImg] = await Promise.all([
                loadImage('{{backgroundFile}}'),
                loadImage('{{dogSpriteImage}}'),
                loadImage('{{monkeySpriteImage}}'),
            ]);

            // Prepare HTML with Background Canvas
            const backgroundCanvas = document.createElement("canvas");
            backgroundCanvas.id = "background";
            document.querySelector("#canvasContainer").appendChild(backgroundCanvas);

            // Prepare HTML with Dog Canvas
            const dogCanvas = document.createElement("canvas");
            dogCanvas.id = "characters";
            document.querySelector("#canvasContainer").appendChild(dogCanvas);

            // Prepare HTML with Monkey Canvas
            const monkeyCanvas = document.createElement("canvas");
            monkeyCanvas.id = "characters";
            document.querySelector("#canvasContainer").appendChild(monkeyCanvas);

            // Setup Globals
            GameEnv.gameSpeed = 2;
            GameEnv.controls = document.getElementById("controls");
            GameEnv.gravity = 3;
        
            // Create Game Objects

            // Background object(s)
            const backgroundSpeedRatio = 0.2
            var backgroundObj = new Background(backgroundCanvas, backgroundImg, backgroundSpeedRatio);

            // Character object(s)
            const dogSpeedRatio = 0.2
            var dogObj = initDog(dogCanvas, dogImg, dogSpeedRatio);
            const monkeySpeedRatio = 0.7
            var monkeyObj = initMonkey(monkeyCanvas, monkeyImg, monkeySpeedRatio);

            //var platform = new Platform(0, GameEnv.bottom - 50, GameEnv.innerWidth, 10);

            // Define Event Listeners 

            // Listen for window resize events and trigger the handleResize function
            window.addEventListener('resize', setSize);

            /* Toggle "canvas filter property" between alien and normal */
            var isFilterEnabled = true;
            const defaultFilter = getComputedStyle(document.documentElement).getPropertyValue('--default-canvas-filter');

            toggleCanvasEffect.addEventListener("click", function () {
                if (isFilterEnabled) {  // toggle off
                    backgroundCanvas.style.filter = "none";  // remove filter
                    dogCanvas.style.filter = "none";
                    monkeyCanvas.style.filter = "none";
                } else { // toggle on
                    backgroundCanvas.style.filter = defaultFilter; // Apply the default filter value
                    dogCanvas.style.filter = defaultFilter;
                    monkeyCanvas.style.filter = defaultFilter;
                }
                isFilterEnabled = !isFilterEnabled;  // switch boolean value
            });


            // Start the game
            
            setSize();
            gameLoop();

        
        // Trap errors on bad images
        } catch (error) {
            console.error('Failed to load one or more images:', error);
        }
    }
  
    // Call the initializeGame function to start the game
    startGame();
  
</script>