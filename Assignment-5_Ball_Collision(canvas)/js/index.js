const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.style.width = 1750 + "px";
canvas.style.height = 900 + "px";
canvas.style.backgroundColor = "grey";

const maxLength = {
  x: 1750,
  y: 900,
};

let positionX;
let positionY;
const balls = 7;

const totalBalls = [];

class Ball {
  constructor(
    radius,
    positionX,
    positionY,
    directionX,
    directionY,
    speed,
    color
  ) {
    this.radius = radius;
    this.positionX = positionX;
    this.positionY = positionY;
    this.directionX = directionX;
    this.directionY = directionY;
    this.speed = speed;
    this.color = color;
    this.deleteBox(this);
  }

  drawBall() {
    ctx.beginPath();
    ctx.arc(this.positionX, this.positionY, this.radius, 0, 2 * Math.PI);
    ctx.fillStyle = this.color;
    ctx.fill();
  }

  deleteBox(ball) {
    canvas.addEventListener("click", (e) => {
      const pos = {
        x: e.clientX,
        y: e.clientY,
      };
      if (this.isIntersect(pos, ball)) {
        ctx.clearRect(0, 0, this.positionX, this.positionY);
        delete ball.radius;
      }
    });
  }

  isIntersect(point, ball) {
    return (
      Math.sqrt(
        (point.x - ball.positionX) ** 2 + (point.y - ball.positionY) ** 2
      ) < ball.radius
    );
  }

  moveBall(totalBalls) {
    this.checkWallCollision();
    this.checkBoxCollision(totalBalls);
  }

  checkWallCollision() {
    this.positionX = this.positionX + this.speed * this.directionX;
    this.positionY = this.positionY + this.speed * this.directionY;

    if (
      this.positionX + this.radius >= maxLength.x ||
      this.positionX - this.radius <= 0
    ) {
      this.directionX = this.directionX * -1;
    }
    if (
      this.positionY + this.radius >= maxLength.y ||
      this.positionY - this.radius <= 0
    ) {
      this.directionY = this.directionY * -1;
    }
  }

  checkBoxCollision(totalBalls) {
    let storeSpeed;
    for (let i = 0; i < totalBalls.length; i++) {
      if (totalBalls[i] === this) continue;
      let dx = totalBalls[i].positionX - this.positionX;
      let dy = totalBalls[i].positionY - this.positionY;
      let distance = Math.sqrt(dx * dx + dy * dy);
      let sum = this.radius + totalBalls[i].radius;
      
      if (distance < sum) {
        {
          this.directionX = this.directionX * -1;
          this.directionY = this.directionY * -1;
          storeSpeed = this.speed;
          this.speed = totalBalls[i].speed;
          totalBalls[i].speed = storeSpeed;
        }
      }
    }
  }
}

function getRandomColor() {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

for (i = 0; i < balls; i++) {
  const maxRadius = 50;
  const minRadius = 20;
  const radius = Math.floor(
    Math.random() * (maxRadius - minRadius + 1) + minRadius
  );
  positionX = Math.floor(Math.random() * (maxLength.x - radius)) + radius;
  positionY = Math.floor(Math.random() * (maxLength.y - radius)) + radius;

  directionX = Math.random() < 0.5 ? 1 : -1;
  directionY = Math.random() < 0.5 ? 1 : -1;
  speed = Math.floor(Math.random() * (4 - 2 + 1)) + 2;
  color = getRandomColor();

  const ball = new Ball(
    radius,
    positionX,
    positionY,
    directionX,
    directionY,
    speed,
    color
  );

  totalBalls.push(ball);
}

const gameLoop = () => {
  ctx.clearRect(0, 0, maxLength.x, maxLength.y);
  requestAnimationFrame(gameLoop);

  totalBalls.forEach(function (ball) {
    ball.drawBall(ctx);
    ball.moveBall(totalBalls);
  });
};

gameLoop();
