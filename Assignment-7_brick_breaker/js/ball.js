export default class Ball {
  constructor(game) {
    this.ballPositionX = 200;
    this.ballPositionY = 400;
    this.ballRadius = 15;
    this.color = "black";
    this.ballSpeed = 3;
    this.directionX = 1;
    this.directionY = 1;
    this.game = game;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(
      this.ballPositionX,
      this.ballPositionY,
      this.ballRadius,
      0,
      2 * Math.PI,
      false
    );
    ctx.fillStyle = this.color;
    ctx.fill();
  }

  moveBall() {
    this.ballPositionX = this.ballPositionX + this.ballSpeed * this.directionX;
    this.ballPositionY = this.ballPositionY + this.ballSpeed * this.directionY;
  }

  wallCollision() {
    if (
      this.ballPositionX + this.ballRadius >= this.game.canvasWidth - 10 ||
      this.ballPositionX - this.ballRadius <= 0
    ) {
      this.directionX *= -1;
    }
    if (this.ballPositionY - this.ballRadius <= 0) {
      this.directionY *= -1;
    }
  }

  paddleCollision(paddle) {
    if (
      this.ballPositionY + this.ballRadius >=
        this.game.canvasHeight - paddle.paddleHeight &&
      this.ballPositionX + this.ballRadius >= paddle.paddlePositionX &&
      this.ballPositionX - this.ballRadius <=
        paddle.paddlePositionX + paddle.paddleWidth
    ) {
      this.directionY *= -1;
    }
  }

  paddleMiss(game, gameOver) {
    if (this.ballPositionY + this.ballRadius >= this.game.canvasHeight) {
      console.log(game.lives);
      if (game.lives > 0) {
        game.lives -= 1;
        this.directionY *= -1;
      }
      if (game.lives === 0) {
        gameOver = !gameOver;
        game.gamePause = true;
        return gameOver;
      }
    }
  }
}
