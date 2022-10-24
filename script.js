"use strict";

const guessBtn = document.querySelector(".guess");
const againBtn = document.querySelector(".again");
const numberInput = document.querySelector(".number");
const message = document.querySelector(".message");
const messageImg = document.querySelector(".message-img");
const currentScoreMessage = document.querySelector(".current");
const bestScoreMessage = document.querySelector(".best");

let mysteryNumber = Math.trunc(Math.random() * 10) + 1;
let currentScore = 10;
let bestScore = 0;
let gaming = 1;

guessBtn.addEventListener("click", function () {
  const guess = numberInput.valueAsNumber;

  if (!guess) {
    displayMessage(`Введите число от 1 до 10`);
  } else if (guess === mysteryNumber) {
    win();
    if (currentScore > bestScore) bestScore = currentScore;
    bestScoreMessage.textContent = bestScore;
  } else if (guess !== mysteryNumber && gaming === 1) {
    if (currentScore > 0) {
      currentScore--;
      displayScore(currentScore);
      displayMessage(
        guess > mysteryNumber
          ? `Слишком большое число`
          : `Слишком маленькое число`
      );
    } else {
      lose();
    }
  }
});

againBtn.addEventListener("click", function () {
  mysteryNumber = Math.trunc(Math.random() * 10) + 1;
  currentScore = 10;
  displayScore(currentScore);
  displayMessage(`Начните угадывать...`);
  messageImg.src = "";
  numberInput.value = "";
  document.querySelector(".container").style.backgroundColor = `#f0f5f9`;
  document.querySelector(".between").style.color = `#91999e`;
  document.querySelector(".mystery").style.opacity = 1;
  document.querySelector(".mystery").classList.add("mystery-animation");
  document.querySelector(".guess").classList.add("guess-animation");
  gaming = 1;
});

function displayMessage(newMessage) {
  message.textContent = newMessage;
}

function displayScore(newScore) {
  currentScoreMessage.textContent = newScore;
}

function win() {
  displayMessage(`Победа! Вы угадали число ${mysteryNumber}`);
  messageImg.src = "img/win.png";
  document.querySelector(".container").style.backgroundColor = `#1fab89`;
  document.querySelector(".between").style.color = `#0d7058`;
  document.querySelector(".mystery").style.opacity = 0;
  document.querySelector(".mystery").classList.remove("mystery-animation");
  document.querySelector(".guess").classList.remove("guess-animation");
  document.querySelector(".guess").style.backgroundColor = `#1e2022`;
  gaming = 0;
}

function lose() {
  displayMessage(`Поражение! Вы не смогли угадать число ${mysteryNumber}`);
  messageImg.src = "img/lose.png";
  document.querySelector(".container").style.backgroundColor = `#e23e57`;
  document.querySelector(".between").style.color = `#A52539`;
  document.querySelector(".mystery").style.opacity = 0;
  document.querySelector(".guess").classList.remove("guess-animation");
  document.querySelector(".guess").style.backgroundColor = `#1e2022`;
  gaming = 0;
}
