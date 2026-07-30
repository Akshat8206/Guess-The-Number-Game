// ===============================
// Random Number    
// ===============================

let secretNumber = Math.floor(Math.random() * 50) + 1;

// ===============================
// Variables
// ===============================

let attempts = 0;
let score = 100;
let bestScore = Number(localStorage.getItem("bestScore")) || 0;
let gameOver = false;
let darkMode = localStorage.getItem("darkMode")==="true";
let maxAttempts = Infinity;

// ===============================
// Getting HTML Elements
// ===============================

const difficulty =document.getElementById("difficulty");
const guessInput = document.getElementById("guessInput");
const checkBtn = document.getElementById("checkBtn");
const playAgain = document.getElementById("playAgain");
const confetti = document.getElementById("confetti");
const message = document.getElementById("message");
const attemptsText = document.getElementById("attempts");
const scoreText = document.getElementById("score");
const bestScoreText = document.getElementById("bestScore");
bestScoreText.textContent = bestScore;

const correctSound = new Audio("sounds/correct.mp3");

const wrongSound = new Audio("sounds/wrong.mp3");

const clickSound = new Audio("sounds/click.mp3");

const themeBtn =document.getElementById("themeBtn");

if (darkMode) {

    document.body.style.background = "#121212";

    document.querySelector(".container").style.background = "#1f1f1f";

    document.querySelector(".container").style.color = "white";

    themeBtn.textContent = "☀️ Light Mode";

}


// ===============================
// Button Click Event
// ===============================

checkBtn.addEventListener("click", function () {

    clickSound.play();

    let selectedDifficulty =difficulty.value;

    if (selectedDifficulty === "easy") {

        maxAttempts = Infinity;

    }

    else if (selectedDifficulty === "medium") {

        maxAttempts = 10;

    }

    else {

        maxAttempts = 5;

    }

    difficulty.disabled = true;

    if (gameOver) {
    return;
    }

    let userGuess = Number(guessInput.value);

    if (guessInput.value === "") {

    message.textContent = "Please enter a number.";

    message.style.color="orange";

    return;

    }

    if (userGuess < 1 || userGuess > 50) {

    message.textContent = "Enter a number between 1 and 50.";

    message.style.color="orange";

    return;

    }

    attempts++;

    if (attempts >= maxAttempts &&
    userGuess !== secretNumber) {

    gameOver = true;

    guessInput.disabled = true;

    message.textContent =
    "💀 Game Over!";

    message.style.color = "red";

    return;

}

    attemptsText.textContent = attempts;

    if (userGuess === secretNumber) {

        confetti.style.display = "block";

        correctSound.play();

        document.querySelector(".container").style.boxShadow = "0 0 30px lime";

        message.textContent = "🎉 Correct!";

        message.style.color="green";

        gameOver = true;
        


        if (score > bestScore) {

            bestScore = score;

            bestScoreText.textContent = bestScore;

            localStorage.setItem("bestScore", bestScore);

        }

        return;

    }

    else if (userGuess > secretNumber) {

        wrongSound.play();

        message.textContent = "📈 Too High!";

        guessInput.classList.add("shake");

        setTimeout(function(){

        guessInput.classList.remove("shake");

        },300);

        message.style.color="red";

        if (score > 0) {
        score--;
        }

    }

    else {

        wrongSound.play();

        message.textContent = "📉 Too Low!";

        guessInput.classList.add("shake");

        setTimeout(function(){

        guessInput.classList.remove("shake");

        },300);

        if (score > 0) {
        score--;
        }

        message.style.color="red";

    }

    scoreText.textContent = score;

});

playAgain.addEventListener("click", function () {

    document.querySelector(".container").style.boxShadow = "0px 10px 25px rgba(0,0,0,0.3)";

    secretNumber = Math.floor(Math.random() * 50) + 1;

    attempts = 0;

    score = 100;

    gameOver = false;

    guessInput.disabled = false;

    attemptsText.textContent = attempts;

    scoreText.textContent = score;

    message.textContent = "Start Guessing...";

    message.style.color = "#1e3c72";

    guessInput.value = "";

    guessInput.focus();

    confetti.style.display = "none";

    difficulty.disabled = false;

});


guessInput.addEventListener("keydown", function(event){

    if(event.key==="Enter"){

        checkBtn.click();

    }

});



themeBtn.addEventListener("click", function(){

    if(darkMode===false){

        darkMode=true;

        localStorage.setItem("darkMode", true);

        document.body.style.background="#121212";

        document.querySelector(".container").style.background="#1f1f1f";

        document.querySelector(".container").style.color="white";

        themeBtn.textContent="☀️ Light Mode";

    }

    else{

        darkMode=false;

        localStorage.setItem("darkMode", false);

        document.body.style.background="linear-gradient(135deg,#1e3c72,#2a5298)";

        document.querySelector(".container").style.background="white";

        document.querySelector(".container").style.color="black";

        themeBtn.textContent="🌙 Dark Mode";

    }

});