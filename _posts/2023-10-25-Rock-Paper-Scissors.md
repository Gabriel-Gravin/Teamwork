---
toc: false
comments: false
layout: post
title: Rock-Paper-Scissors minigame
description: Simple Rock-Paper-Scissors minigame made from youtube tutorial
type: hacks
courses: { compsci: {week: 7} }
---
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width">
</head>
<body>
    <div id="gameDiv">
        <h1 class="gameText" id="playerText">Player: </h1>
        <h1 class="gameText" id="computerText">Computer: </h1>
        <h1 class="gameText" id="resultText">Result: </h1>
        <button class="choiceBtn">ROCK</button>
        <button class="choiceBtn">PAPER</button>
        <button class="choiceBtn">SCISSORS</button>
    </div>
</body>
</html>

<script>
    const playerText = document.querySelector("#playerText"); //querySelector method to select HTML element, finding any elements with id playerText
    const computerText = document.querySelector("#computerText");
    const resultText = document.querySelector("#resultText"); //resultText ID
    const choiceBtns = document.querySelectorAll(".choiceBtn"); //selecting choice button class
    //creating three variables
    //player and computer variable assigned a string
    let player; 
    let computer;
    let result;
    choiceBtns.forEach(button => button.addEventListener("click", ()=>{
        player = button.textContent;
        computerTurn();
        //set text with choices
        playerText.textContent = `Player: ${player}`; //template literal, placeholder of player
        computerText.textContent = `Computer: ${computer}`;
        resultText.textContent = checkWinner();
    }));
    function computerTurn(){
        const randNum = Math.floor(Math.random()*3) + 1; //get a random number between 1 and 3
        switch(randNum) {
            case 1: 
                computer = "ROCK";
                break;
            case 2:
                computer = "PAPER";
                break;
            case 3:
                computer = "SCISSORS";
                break; 
        } 
    } 
    // defining checkWinner() function
    function checkWinner() {
        if(player == computer) {
            return "Draw!"; 
        }
        else if(computer == "ROCK") { //if the computer is equal to rock, is the player equal to paper?, if so then return string (win), if false return different string (lose)
            return (player == "PAPER") ? "You Win!" : "You Lose!"
        }
        else if(computer == "PAPER") { //if the computer is equal to paper, is the player equal to scissors?, if so then return string (win), if false return different string (lose)
            return (player == "SCISSORS") ? "You Win!" : "You Lose!"
        }
        else if(computer == "SCISSORS") { //if the computer is equal to scissors, is the player equal to rock?, if so then return string (win), if false return different string (lose)
            return (player == "ROCK") ? "You Win!" : "You Lose!"
        }
    }
</script>
<style>
    .choiceBtn { /*class choiceBtn*/
        line-height: 30px;
        width: 150px
    }
    #gameDiv { /*id*/
        font-family: 'Brush Script MT', cursive;
        border: 3px solid;
        border-radius: 25px;
        padding: 10px;
        background-color: lightgrey;
        text-align: center;
}
    #playerText {
        color: blue;
    }
    #computerText {
        color: red;
    }
    #resultText {
        color: hotpink;
    }
</style>