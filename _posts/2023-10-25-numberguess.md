---
layout: post
title: guess the number!
description: guessing the number between 1-100
courses: {'compsci': {'week': 7}}
type: hacks
comments: True
---

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width">
    <title>Dinosaur Game Parody</title>
</head>
<body>
    <div id="gameDiv">
        <h1 class="gameText" id="instructionText">Guess a number between 1 and 100:</h1>
        <input type="number" id="userGuess" min="1" max="100">
        <button id="guessBtn">Submit Guess</button>
        <button id="restartBtn">Restart Game</button>
        <p class="gameText" id="resultText"></p>
    </div>
</body>
</html>

<script>
    const instructionText = document.querySelector("#instructionText");
    const userGuessInput = document.querySelector("#userGuess");
    const resultText = document.querySelector("#resultText");
    const guessBtn = document.querySelector("#guessBtn");
    const restartBtn = document.querySelector("#restartBtn");
    
    let secretNumber;
    let numberOfGuesses = 0;
    
    // Function to start a new game
    function startNewGame() {
        secretNumber = Math.floor(Math.random() * 100) + 1;
        numberOfGuesses = 0;
        userGuessInput.value = "";
        userGuessInput.disabled = false;
        guessBtn.disabled = false;
        resultText.textContent = "";
        instructionText.textContent = "Guess a number between 1 and 100:";
    }
    
    // Initial game start
    startNewGame();
    
    guessBtn.addEventListener("click", () => {
        const userGuess = parseInt(userGuessInput.value);
        numberOfGuesses++;
        
        if (userGuess === secretNumber) {
            resultText.textContent = `Congrats! You guessed the number in ${numberOfGuesses} tries! :D`;
            resultText.style.color = "green";
            userGuessInput.disabled = true;
            guessBtn.disabled = true;
        } else if (userGuess < secretNumber) {
            resultText.textContent = "Try a higher number.";
            resultText.style.color = "blue";
        } else {
            resultText.textContent = "Try a lower number.";
            resultText.style.color = "red";
        }
    });
    
    restartBtn.addEventListener("click", startNewGame);
</script>

<style>
    .gameText {
        font-family: 'Arial', sans-serif;
        text-align: center;
    }
    #gameDiv {
        font-family: 'Brush Script MT',
        border: 3px solid;
        border-radius: 25px;
        padding: 10px;
        background-color: black;
        text-align: center;
    }
</style>


