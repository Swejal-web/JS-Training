
const bigBox = document.getElementById("game-box");
const box = document.getElementsByClassName("box");
const scoreBoard = document.getElementById("score-board");
const timeBoard = document.getElementById("time");
const result = document.getElementById("result");

const boxArray = [];
for (i = 0; i < box.length; i++) {
  boxArray.push(box[i]);
}

let score = 0;
let time = 30;
let randomPosition;

boxArray.forEach((boxx) => {
  boxx.addEventListener("click", function () {
    if (boxArray[randomPosition].id === boxx.id) {
      score += 1;
      scoreBoard.innerHTML = `Score: ${score}`;
    }
  });
});

const loopMole = () => {
  boxArray.forEach((boxes) => {
    boxes.classList.remove("mole");
  });

  randomPosition = Math.floor(Math.random() * (9 - 1) + 1);
  boxArray[randomPosition].classList.add("mole");
};

scoreBoard.innerHTML = `Score: ${score}`;
timeBoard.innerHTML = `Timer : ${time} `;
const closeId = setInterval(() => {
  time = time - 1;
  timeBoard.innerHTML = `Timer : ${time}`;
  if (time === 0) {
    clearInterval(closeId);
    bigBox.style.display = "none";
    result.style.display = "block";
    result.innerHTML = `You're score is ${score}. Restart browser to start the game`;
  }
}, 1000);

setInterval(loopMole, 400);
