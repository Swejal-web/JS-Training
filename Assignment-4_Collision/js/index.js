
const mainDiv = document.getElementById("root");


mainDiv.style.width = 1750 + "px";
mainDiv.style.height = 900 + "px";
mainDiv.style.backgroundColor = "grey";


const maxLength = {
  x: 1750,
  y: 900,
};

let positionX;
let positionY;
const totalRectangles = 7;
const maxBoxHeight = 100;
const maxBoxWidth = 100;
const minBoxHeight = 10;
const minBoxWidth = 10;

const totalBoxes = [];

class Box {
  constructor(
    height,
    width,
    positionX,
    positionY,
    directionX,
    directionY,
    speed,
    color
  ) {
    this.height = height;
    this.width = width;
    this.positionX = positionX;
    this.positionY = positionY;
    this.directionX = directionX;
    this.directionY = directionY;
    this.speed = speed;
    this.color = color;
    this.divBox = this.drawBox();
    this.moveBox(totalBoxes);
  }

  drawBox() {
    const div = document.createElement("div");
    mainDiv.append(div);

    div.style.width = this.height + "px";
    div.style.height = this.width + "px";
    div.style.position = "absolute";
    div.style.backgroundColor = this.color;
    div.style.left = this.positionX + "px";
    div.style.top = this.positionY + "px";
    return div;
  }

  moveBox(totalBoxes) {
    setInterval(() => {
      this.checkWallCollision();
      this.checkBoxCollision(totalBoxes);
      this.divBox.style.left = `${this.positionX}px`;
      this.divBox.style.top = `${this.positionY}px`;
    }, 30);
  }

  checkWallCollision() {
    this.positionX = this.positionX + this.speed * this.directionX;
    this.positionY = this.positionY + this.speed * this.directionY;

    if (this.positionX + this.width >= maxLength.x || this.positionX <= 0) {
      this.directionX = this.directionX * -1;
    }
    if (this.positionY + this.height >= maxLength.y || this.positionY <= 0) {
      this.directionY = this.directionY * -1;
    }
  }

  checkBoxCollision(totalBoxes) {
    let storeSpeed;
    for (let i = 0; i < totalBoxes.length; i++) {
      if (totalBoxes[i] === this) continue;

      if (
        this.positionX + this.width >= totalBoxes[i].positionX &&
        this.positionX <= totalBoxes[i].positionX + totalBoxes[i].width &&
        this.positionY + this.height >= totalBoxes[i].positionY &&
        this.positionY <= totalBoxes[i].positionY + this.height
      ) {
        this.directionX = this.directionX * -1;
        this.directionY = this.directionY * -1;
        storeSpeed = this.speed;
        this.speed = totalBoxes[i].speed;
        totalBoxes[i].speed = storeSpeed;
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

for (i = 0; i < totalRectangles; i++) {
  const boxHeight = 50;
  const boxWidth = 50;
  positionX =
    Math.floor(Math.random() * (maxLength.x - maxBoxWidth)) + boxWidth;
  positionY =
    Math.floor(Math.random() * (maxLength.y - maxBoxHeight)) + boxHeight;

  directionX = Math.random() < 0.5 ? 1 : -1;
  directionY = Math.random() < 0.5 ? 1 : -1;
  speed = Math.floor(Math.random() * (15 - 5 + 1)) + 5;
  color = getRandomColor();

  const box = new Box(
    boxHeight,
    boxWidth,
    positionX,
    positionY,
    directionX,
    directionY,
    speed,
    color
  );

  totalBoxes.push(box);
}




