const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const canvasHeight = 900;
const canvasWidth = 900;

let score = 0;
let timer = 30;

let ImagePositionX1 = 30;
let ImagePositionY1 = 30;
let ImagePositionX2 = 330;
let ImagePositionY2 = 330;
let ImagePositionX3 = 630;
let ImagePositionY3 = 630;

const ImagePositionX = [ImagePositionX1, ImagePositionX2, ImagePositionX3];
const ImagePositionY = [ImagePositionY1, ImagePositionY2, ImagePositionY3];
var gameOver = false;
var reGame = false;

let randomHeight;
let randomWidth;

const draw = () => {
  for (var i = 0; i <= 3; i++) {
    for (var j = 0; j <= 3; j++) {
      ctx.moveTo(i * 300, 0);
      ctx.lineTo(i * 300, canvasHeight);
      ctx.stroke();
      ctx.moveTo(0, j * 300);
      ctx.lineTo(canvasWidth, j * 300);
      ctx.stroke();
    }
  }
};

const drawImage = () => {
  base_image = new Image();
  base_image.src = "mole.jpeg";
  randomHeight = Math.floor(Math.random() * (2 - 0 + 1) + 0);
  randomWidth = Math.floor(Math.random() * (2 - 0 + 1) + 0);

  base_image.onload = function () {
    ctx.drawImage(
      base_image,
      ImagePositionX[randomWidth],
      ImagePositionY[randomHeight],
      200,
      200
    );
  };
};

canvas.addEventListener("mousedown", (e) => {
  const pos = {
    x: e.clientX,
    y: e.clientY,
  };

  if (
    pos.x >= ImagePositionX[randomWidth] &&
    pos.x <= ImagePositionX[randomWidth] + 250 &&
    pos.y >= ImagePositionY[randomHeight] &&
    pos.y <= ImagePositionY[randomHeight] + 250
  ) {
    score += 1;
  }
  canvas.style.pointerEvents = "none";
  setTimeout(() => {
    canvas.style.pointerEvents = "auto";
  }, 1000);
});

const addText = () => {
  ctx.font = "30px Arial";
  if (!gameOver) {
    ctx.fillText(`Score: ${score}`, 1000, 50);
  }
};

const addTimer = () => {
  ctx.clearRect(950, 780, 1100, 850);

  ctx.fillText(`Timer: ${timer}`, 1000, 800);
  timer -= 1;
  if (timer < 0) {
    gameOver = true;
    reGame = true;
    ctx.clearRect(900, 30, 1100, 110);

    canvas.style.pointerEvents = "none";
  }
  if (!gameOver) {
    setTimeout(() => {
      requestAnimationFrame(addTimer);
    }, 1000);
  }
};

const restartGame = () => {
  ctx.fillText(`Score is ${score}.Restart browser`, 1000, 50);
};

function gameLoop() {
  ctx.clearRect(0, 0, 900, 900);
  ctx.clearRect(920, 30, 1100, 95);

  addText();
  draw();
  //addTimer();
  drawImage();
  if (!gameOver) {
    setTimeout(function () {
      requestAnimationFrame(gameLoop);
    }, 600);
  }
  if (reGame) {
    restartGame();
  }
}

gameLoop();
addTimer();
