export default class Brick {
  constructor(brickPositionX, brickPositionY, game) {
    this.brickPositionX = brickPositionX;
    this.brickPositionY = brickPositionY;
    this.brickWidth = game.canvasWidth / 10;
    this.brickHeight = 30;
    this.markedForDeletion = false;
    this.color = "blue";
  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(
      this.brickPositionX,
      this.brickPositionY,
      this.brickWidth,
      this.brickHeight
    );
  }

  brickCollision(ball) {
    if (
      ball.ballPositionX + ball.ballRadius >= this.brickPositionX &&
      ball.ballPositionX - ball.ballRadius <=
        this.brickPositionX + this.brickWidth &&
      ball.ballPositionY - ball.ballRadius <=
        this.brickPositionY + this.brickHeight &&
      ball.ballPositionY + ball.ballRadius >= this.brickPositionY
    ) {
      this.markedForDeletion = true;
      ball.directionY *= -1;
    }
  }
}
