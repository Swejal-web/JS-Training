export default class Paddle {
  constructor(game) {
    this.paddleWidth = 100;
    this.paddleHeight = 15;
    this.paddlePositionX = game.canvasWidth / 2 - this.paddleWidth / 2;
    this.paddlePositionY = game.canvasHeight - this.paddleHeight;
    this.color = "rgb(200, 0, 0)";
    this.paddleSpeed = 20;
    this.canvasWidth = game.canvasWidth;
    this.game = game;
  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(
      this.paddlePositionX,
      this.paddlePositionY,
      this.paddleWidth,
      this.paddleHeight
    );
  }

  moveLeft() {
    if (this.paddlePositionX >= 0) {
      this.paddlePositionX = this.paddlePositionX - this.paddleSpeed;
    }
  }

  moveRight() {
    if (this.paddlePositionX + this.paddleWidth <= this.canvasWidth - 10) {
      this.paddlePositionX = this.paddlePositionX + this.paddleSpeed;
    }
  }
}
