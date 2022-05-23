
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

var box = {};

const buildBox = (box) => {
  let { height, width, positionX, positionY, color } = box;

  const div = document.createElement("div");

  mainDiv.append(div);

  div.style.width = height + "px";
  div.style.height = width + "px";
  div.style.position = "absolute";
  div.style.backgroundColor = color;
  div.style.left = positionX + "px";
  div.style.top = positionY + "px";
  return div;
};

const checkBoxCollision = (box, recList) => {
  let storeSpeed;
  for (let i = 0; i < recList.length; i++) {
    if (recList[i] === box) continue;

    if (
      box.positionX + box.width >= recList[i].positionX &&
      box.positionX <= recList[i].positionX + recList[i].width &&
      box.positionY + box.height >= recList[i].positionY &&
      box.positionY <= recList[i].positionY + box.height
    ) {
      box.directionX = box.directionX * -1;
      box.directionY = box.directionY * -1;
      storeSpeed = box.speed;
      box.speed = recList[i].speed;
      recList[i].speed = storeSpeed;
    }
  }
};

const checkWallCollision = (box) => {
  box.positionX = box.positionX + box.speed * box.directionX;

  box.positionY = box.positionY + box.speed * box.directionY;
  if (box.positionX + box.width >= maxLength.x || box.positionX <= 0) {
    box.directionX = box.directionX * -1;
  }
  if (box.positionY + box.height >= maxLength.y || box.positionY <= 0) {
    box.directionY = box.directionY * -1;
  }
};

const moveBox = (divBox, box, recList) => {
  setInterval(function () {
    checkWallCollision(box);

    checkBoxCollision(box, recList);

    divBox.style.left = `${box.positionX}px`;
    divBox.style.top = `${box.positionY}px`;
  }, 30);
};

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

  box = {
    height: boxHeight,
    width: boxWidth,
    positionX: positionX,
    positionY: positionY,
    directionX: Math.random() < 0.5 ? 1 : -1,
    directionY: Math.random() < 0.5 ? 1 : -1,
    speed: Math.floor(Math.random() * (15 - 5 + 1)) + 5,
    color: getRandomColor(),
  };

  totalBoxes.push(box);
}
let innerBox;

function loop() {
  totalBoxes.forEach((box) => {
    innerBox = buildBox(box);
    moveBox(innerBox, box, totalBoxes);
  });
}

loop();
