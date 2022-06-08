import Paddle from "./paddle.js";
import Ball from "./ball.js";
import Brick from "./brick.js";

export default class Game {
  constructor(canvasWidth, canvasHeight) {
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.lives = 2;
    this.gamePause = false;
    this.gameOver = false;
    this.brickArray = [];
  }

  initializeBricks(level) {
    let brickPositionX;
    let brickPositionY;
    level.forEach((row, rowIndex) => {
      row.forEach((brick, brickIndex) => {
        if (brick === 1) {
          brickPositionX = brickIndex * 160;
          brickPositionY = 120 + rowIndex * 30;
        }
        this.brickArray.push(new Brick(brickPositionX, brickPositionY));
      });
    });
  }

  start(level) {
    this.paddle = new Paddle(this);
    this.ball = new Ball(this);

    this.initializeBricks(level);

    window.addEventListener("keydown", (e) => {
      switch (e.key) {
        case "ArrowRight":
          this.paddle.moveRight();
          break;

        case "ArrowLeft":
          this.paddle.moveLeft();
          break;

        case "Escape":
          if (!this.gamePause) {
            this.gamePause = true;
          } else {
            this.gamePause = false;
          }
          break;
      }
    });
  }

  draw(ctx) {
    this.paddle.draw(ctx);
    this.ball.draw(ctx);
    this.brickArray.map((brick) => {
      brick.draw(ctx);
    });
    this.escapeText(ctx);
  }

  update(cancelAnimationFrame, id, ctx) {
    let gameOver;
    this.scoreBar(ctx);
    if (!this.gamePause) {
      this.ball.moveBall();
      this.ball.wallCollision();
      this.ball.paddleCollision(this.paddle);
      this.brickArray.map((brick, index, arr) => {
        brick.brickCollision(this.ball);
        if (brick.markedForDeletion === true) {
          arr.splice(index, 1);
        }
      });

      gameOver = this.ball.paddleMiss(this, this.gameOver);
    }

    if (gameOver) {
      this.drawGameOver(ctx);
      cancelAnimationFrame(id);
    }

    if (this.brickArray.length === 1) {
      this.drawGameCompleted(ctx);
      cancelAnimationFrame(id);
    }
  }

  drawGameOver(ctx) {
    ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);

    ctx.font = "30px Arial";
    ctx.fillStyle = "red";
    ctx.fillText("Game Over", 700, 500);
  }

  drawGameCompleted(ctx) {
    ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);

    ctx.font = "30px Arial";
    ctx.fillStyle = "green";
    ctx.fillText("Game Completed", 700, 500);
  }

  escapeText(ctx) {
    ctx.font = "30px Arial";
    ctx.fillText("Press Esc to pause", 20, 500);
  }

  scoreBar(ctx) {
    ctx.font = "30px Arial";
    ctx.fillText(`Lives: ${this.lives}`, 1200, 100);
  }
}
