
const root = document.getElementById("root");

const viewPort = document.getElementById("viewport");
const nextButton = document.getElementById("next_button");
const prevButton = document.getElementById("prev_button");
const photos = document.querySelectorAll("img");

const indexButtons = document.querySelectorAll(".btn");

const indexes = Object.values(indexButtons);

const photoWidth = 500;

const photoArray = Object.values(photos);

const totalWidth = (photoArray.length - 1) * photoWidth;

let position = 0;
direction = 1;

var moveImage;

function startCycle() {
  moveImage = setInterval(function () {
    position = position + photoWidth * direction;
    if (position >= totalWidth || position <= 0) {
      direction *= -1;
    }
    index(position);
    viewPort.style.right = `${position}px`;
  }, 2500);
}

startCycle();

nextButton.addEventListener("click", () => {
  clearInterval(moveImage);
  if (direction < 0) {
    direction *= -1;
  }
  position = position + photoWidth * direction;
  if (position > totalWidth || position <= 0) {
    position = 0;
  }
  if (position === totalWidth) {
    direction *= -1;
  }
  index(position);
  viewPort.style.right = `${position}px`;

  startCycle();
});

prevButton.addEventListener("click", () => {
  clearTimeout(moveImage);
  if (direction < 0) {
    direction *= -1;
  }

  if (position === 0) {
    position = totalWidth + photoWidth;
  }

  position = position - photoWidth * direction;

  if (position === totalWidth) {
    direction *= -1;
  }
  index(position);
  viewPort.style.right = `${position}px`;
  startCycle();
});

const index = (position) => {
  if (position === 0) {
    indexes[0].className = "btn active";
    indexes[1].className = "btn ";
    indexes[2].className = "btn";
  }
  if (position === photoWidth) {
    indexes[1].className = "btn active";
    indexes[0].className = "btn";
    indexes[2].className = "btn";
  }
  if (position === totalWidth) {
    indexes[2].className = "btn active";
    indexes[0].className = "btn";
    indexes[1].className = "btn";
  }
};
