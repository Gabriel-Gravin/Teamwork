---
toc: false
comments: false
layout: post
title: Tic-Tac-Toe
description: Simple Tic-Tac-Toe minigame made from youtube tutorial
type: hacks
courses: { compsci: {week: 7} }
---
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Tic-tac-toe JavaScript</title>
    <link rel="stylesheet" href="styvles.css">
</head>
<body>
    <div id="gameboard"></div>
    <p id="info"></p>
</body>
</html>

<script>
const gameBoard = document.querySelector('#gameboard')
const infoDisplay = document.querySelector('#info')
const startCells = [
    "", "", "", "", "", "", "", "", ""
    ]
let go = "circle"
infoDisplay.textContent = "Circle goes first"

function createBoard(){
    startCells.forEach((_cell, index) => {
        const cellElement = document.createElement('div')
        cellElement.classList.add('square')
        cellElement.id = index //giving id to each box element
        cellElement.addEventListener('click', addGo)
        gameBoard.append(cellElement)
    })
}
createBoard()


function addGo(e) { //add circle or cross if nothing is there yet
    console.log(e.target) //returns id of square each time you click it
    const goDisplay = document.createElement('div')
    goDisplay.classList.add(go) //add class of circle every time we click, append to whatever we click on
    e.target.append(goDisplay) //append element that we just created
    go = go === "circle" ? "cross" : "circle" //if this is true, return cross, otherwise return circle
    infoDisplay.textContent = "it is now " + go + "'s go." //will read, it is cross's go if it was circle's go before
    e.target.removeEventListener("click", addGo)
    checkScore()
}

function checkScore() {
    const allSquares = document.querySelectorAll(".square")
    const winningCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], //horizontal combos
        [0, 3, 6], [1, 4, 7], [2, 5, 8] //vertical combos
        [0, 4, 8], [2, 4, 6]
    ]

    console.log(allSquares[4])

    winningCombos.forEach(array => {
        const circleWins = array.every(cell => 
        allSquares[cell].firstChild?.classList.contains('circle'))

        if (circleWins) {
            infoDisplay.textContent = "Circle Wins!"
            allSquares.forEach(square => square.replaceWith(square.cloneNode(true)))
            return
        }

    })

    winningCombos.forEach(array => {
        const crossWins = array.every(cell => 
        allSquares[cell].firstChild?.classList.contains('cross'))

        if (crossWins) {
            infoDisplay.textContent = "Cross Wins!"
            allSquares.forEach(square => square.replaceWith(square.cloneNode(true)))
            return
        }

    })


}
</script>

<style>
body {
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 100vh;
}

#gameboard { /*hashtag for ID*/
    width: 300px;
    height: 300px;
    background-color: black;
    display: flex;
    flex-wrap: wrap;
    border: solid 1px black;
}

.square { /*class of square*/
    width: 100px;
    height: 100px;
    background-color: white;
    border: solid 2px black;
    box-sizing: border-box;
    display: flex;
    justify-content: center; /*centering O*/
    align-items: center;
}

.circle {
    height: 90px;
    width: 90px;
    border-radius: 50%;
    border: 15px solid blue;
    box-sizing: border-box;
}

.cross {
    height: 90px;
    width: 90px;
    position: relative;
    transform: rotate(45deg);
}

.cross:before, .cross:after {
    content: "";
    position: absolute;
    background-color: red;
}

.cross:before {
    left: 50%;
    width: 30%;
    margin-left: -15%;
    height: 100%;
}

.cross:after {
    top: 50%;
    height: 30%;
    margin-top: -15%;
    width: 100%;
}
</style>