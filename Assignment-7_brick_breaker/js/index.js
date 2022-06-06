const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const canvasWidth = 1600;
const canvasHeight = 800;

const paddleHeight = 15;
const paddleWidth = 100;

let paddlePosition = canvasWidth / 2 - paddleWidth / 2;

const ballRadius = 15;

let ballPositionX = 200;
let ballPositionY = 400;

let directionX = 1;
let directionY = 1;

const speed = 20;

const ballSpeed = 3;

const brickHeight = 30;
const brickWidth = 160;

let gamePause = false;

let gameOver = false;

let game = null;

let gameCompleted = false;

let lives = 3;

canvas.style.border = "solid 10px black";

function drawPaddle() {
  ctx.fillStyle = "rgb(200, 0, 0)";
  ctx.fillRect(
    paddlePosition,
    canvasHeight - paddleHeight,
    paddleWidth,
    paddleHeight
  );
}

const level1 = [
  [0, 1, 1, 1, 0, 1, 0, 0, 1, 0],
  [1, 1, 0, 1, 0, 0, 1, 0, 1, 0],
  [1, 1, 0, 1, 1, 1, 1, 1, 0, 1],
];

var brickArray = [];

class Brick {
  constructor(brickPositionX, brickPositionY) {
    this.brickPositionX = brickPositionX;
    this.brickPositionY = brickPositionY;
    this.brickWidth = brickWidth;
    this.brickHeight = brickHeight;
    this.markedForDeletion = false;
  }

  buildBrick() {
    ctx.fillStyle = "blue";
    ctx.fillRect(
      this.brickPositionX,
      this.brickPositionY,
      this.brickWidth,
      this.brickHeight
    );
  }

  brickCollision(brickArray) {
    console.log(brickArray.length);
    if (brickArray.length === 0) {
      gameCompleted === true;
    }
    if (
      ballPositionX + ballRadius >= this.brickPositionX &&
      ballPositionX - ballRadius <= this.brickPositionX + this.brickWidth &&
      ballPositionY - ballRadius <= this.brickPositionY + this.brickHeight &&
      ballPositionY + ballRadius >= this.brickPositionY
    ) {
      this.markedForDeletion = true;
      directionY *= -1;
    }
  }
}

function drawBricks() {
  let brickPositionX;
  let brickPositionY;
  level1.forEach((row, rowIndex) => {
    row.forEach((brick, brickIndex) => {
      if (brick === 1) {
        brickPositionX = brickIndex * brickWidth;
        brickPositionY = 120 + rowIndex * brickHeight;
      }
      brickArray.push(new Brick(brickPositionX, brickPositionY));
    });
  });
}

function drawBall() {
  ctx.beginPath();
  ctx.arc(ballPositionX, ballPositionY, ballRadius, 0, 2 * Math.PI, false);
  ctx.fillStyle = "black";
  ctx.fill();
}

function wallCollision() {
  if (
    ballPositionX + ballRadius >= canvasWidth - 10 ||
    ballPositionX - ballRadius <= 0
  ) {
    directionX *= -1;
  }
  if (ballPositionY - ballRadius <= 0) {
    directionY *= -1;
  }
}

function paddleCollision() {
  if (
    ballPositionY + ballRadius >= canvasHeight - paddleHeight &&
    ballPositionX + ballRadius >= paddlePosition &&
    ballPositionX - ballRadius <= paddlePosition + paddleWidth
  ) {
    directionY *= -1;
  }
}

function paddleMiss() {
  if (ballPositionY + ballRadius >= canvasHeight) {
    if (lives > 0) {
      lives -= 1;
      directionY *= -1;
    }
    if (lives === 0) {
      gameOver = true;
      gamePause = true;
    }
  }
}

function moveBall() {
  ballPositionX = ballPositionX + ballSpeed * directionX;
  ballPositionY = ballPositionY + ballSpeed * directionY;
  wallCollision();
  paddleCollision();
  paddleMiss();
}

window.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "ArrowRight":
      console.log("ehy");
      if (paddlePosition + paddleWidth <= canvasWidth - 10) {
        paddlePosition = paddlePosition + speed;
      }
      break;

    case "ArrowLeft":
      if (paddlePosition >= 0) {
        paddlePosition = paddlePosition - speed;
      }
      break;

    case "Escape":
      if (!gamePause) {
        gamePause = true;
      } else {
        gamePause = false;
        gameLoop();
      }

      break;
  }
});

// function drawGameCompleted() {
//   ctx.clearRect(0, 0, canvasWidth, canvasHeight);

//   ctx.font = "30px Arial";
//   ctx.fillStyle = "red";
//   ctx.fillText("Game Completed", 700, 500);
// }

function scoreBar() {
  ctx.font = "30px Arial";
  ctx.fillText(`Lives: ${lives}`, 1200, 100);
}

function drawGameOver() {
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);

  ctx.font = "30px Arial";
  ctx.fillStyle = "red";
  ctx.fillText("Game Over", 700, 500);
  cancelAnimationFrame(game);
}

function escapeText() {
  ctx.font = "30px Arial";
  ctx.fillText("Press Esc to pause", 20, 500);
}

drawBricks();

function gameLoop() {
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);

  if (gameOver) {
    drawGameOver();
  }

  if (!gamePause) {
    game = requestAnimationFrame(gameLoop);
  }

  brickArray.map((brick, index, arr) => {
    brick.buildBrick();
    brick.brickCollision(brickArray);
    if (brick.markedForDeletion === true) {
      arr.splice(index, 1);
    }
  });

  drawPaddle();
  drawBall();
  moveBall();
  escapeText();
  scoreBar();
}

gameLoop();
