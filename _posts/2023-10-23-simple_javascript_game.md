---
toc: false
comments: false
layout: post
title: Simple javascript game
description: Simple javascript game using Youtube tutorial
type: hacks
courses: { compsci: {week: 7} }
---
<!DOCTYPE html>
<html lang="en" onclick = "jump()">
<head>
    <meta charset="UTF-8">
    <title>Game</title>
</head>

<body>
    <div id="game">
        <div id="character"></div>
        <div id="block"></div>
    </div>
</body>
</html>

<style>
    *{padding: 0;
    margin: 0;}
    #game {
        width: 500px;
        height: 200px;
        border: 1px solid black;
    }
    #character {
        width: 20px;
        height: 50px;
        background-color: red;
        position: relative;
        top: 150px;
    }
    .animate{
        animation: jump 500ms;
    }
    @keyframes jump {
        0%{top: 150px;}
        30%{top: 100px;}
        70%{top: 100px;}
        100%{top: 150px;}
    }
    #block {
        width: 20px;
        height: 20px;
        background-color: blue;
        position: relative;
        top: 130px;
        left: 480px;
        animation: block ls infinite linear;
    }
    @keyframes block {
        0%{left:480px;}
        100%{left:-40px;}
    }
</style>

<script>
    var character = document.getElementbyID("character");
    var block = document.getElementById("block");
    function jump() {
        if(character.classList != "animate"){
            character.classList.add("animate");
            }
        setTimeout(function(){
            character.classList.remove("animate");
        },500);
    }

    //add hit detection
    var checkDead = setInterval(function(){
        var characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
        var blockLeft = parseInt(window.getComputedStyle(block).getPropertyValue("left"));
        if(blockLeft<20 && blockLeft>0 %% characterTop>=130){
            block.style.animation = "none";
            block.style.display = "none";
            alert("u lose.")
        }
    },10);
</script>

