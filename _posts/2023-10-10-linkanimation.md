---
toc: true
comments: true
layout: post
title:  Link Animation 
subtitle: Katelyn Gelle
cover-img: /images/swordplaylink.gif
description: Link Animation Final
type: hacks
courses: { csse: {week: 6} }
categories: [C1.4]
---  

<body>
    <div>
        <canvas id="spriteContainer">
            <img id="linkSprite" src="/student/images/linksprites.png">
        </canvas>
        <div id="controls">
            <input type="radio" name="animation" id="idle" checked>
            <label for="idle">Idle</label><br>
            <input type="radio" name="animation" id="walkfront">
            <label for="walkfront">Walkfront</label><br>
            <input type="radio" name="animation" id="walkback">
            <label for="walkback">Walkback</label><br>
        </div>
    </div>
</body>
<script>
    window.addEventListener('load', function () {
        const canvas = document.getElementById('spriteContainer');
        const ctx = canvas.getContext('2d');
        const SPRITE_WIDTH = 96;
        const SPRITE_HEIGHT = 104;
        const SCALE_FACTOR = 1;
        const FRAME_LIMIT = 5;
        canvas.width = SPRITE_WIDTH * SCALE_FACTOR;
        canvas.height = SPRITE_HEIGHT * SCALE_FACTOR;
        class Link {
            constructor() {
                this.image = document.getElementById("linkSprite");
                this.spriteWidth = SPRITE_WIDTH;
                this.spriteHeight = SPRITE_HEIGHT;
                this.width = this.spriteWidth;
                this.height = this.spriteHeight;
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
                    canvas.width,
                    canvas.height,
                );
            }
            update() {
                if (this.frameX < this.maxFrame) {
                    this.frameX++;
                } else {
                    this.frameX = 0;
                }
            }
        }
        const link = new Link();
        const controls = document.getElementById('controls');
        controls.addEventListener('click', function (event) {
            if (event.target.tagName === 'INPUT') {
                const selectedAnimation = event.target.id;
                switch (selectedAnimation) {
                    case 'idle':
                        link.frameY = 0;
                        link.maxFrame = 3;
                        break;
                    case 'walkfront':
                        link.frameY = 4;
                        link.maxFrame = 10;
                        break;
                    case 'walkback':
                        link.frameY = 6;
                        link.maxFrame = 10;
                        break;
                    default:
                        break;
                }
            }
        });
        let framesPerSecond = 10
        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            link.draw(ctx);
            link.update();
             setTimeout(function() {
        requestAnimationFrame(animate);
        }, 1000 / framesPerSecond);
        }
        animate();
    });
</script>