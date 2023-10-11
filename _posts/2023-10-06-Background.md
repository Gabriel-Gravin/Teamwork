---
toc: false
comments: true
layout: post
title: Background
description: Background for our game
type: hacks
courses: { compsci: {week: 7} }
---

<canvas id="canvas" width="500" height="1000"></canvas>
<script>
    //create empty canvas
    let canvas = document.getElementById("canvas");
    let c = canvas.getContext("2d");
    var bgImage = new Image();
    bgImage.src = "{{site.baseurl}}/images/Stone_Background.jpg";
    bgImage.onload = function () {
        //set up backgrounds
        var bg1 = {
            width: 500,
            height: 1000,
            x: 0,
            y: 0
        }
        var bg2 = {
            width: 500,
            height: 1000,
            x: 0,
            y: -1000
        }
        var bg3 = {
            width: 500,
            height: 1000,
            x: 0,
            y: -2000
        }
        var interval = setInterval(function() {
            bg1.y +=5;
            bg2.y +=5;
            bg3.y +=5;
            if (bg1.y == 2000) {
                bg1.y = 0;
            }
            if (bg2.y == 1000) {
                bg2.y = -1000;
            }
            if (bg3.y == 0) {
                bg3.y = -2000;
            }
            c.drawImage(bgImage, bg1.x, bg1.y)
            c.drawImage(bgImage, bg2.x, bg2.y)
            c.drawImage(bgImage, bg3.x, bg3.y)
        }, 50);
    };
</script>