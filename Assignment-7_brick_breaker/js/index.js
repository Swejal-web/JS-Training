import Game from "./game.js";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const canvasWidth = 1600;
const canvasHeight = 800;

let id = null;

canvas.style.border = "solid 10px black";

const game = new Game(canvasWidth, canvasHeight);

const level = [
  [0, 1, 1, 1, 0, 1, 0, 0, 1, 0],
  [1, 1, 0, 1, 0, 0, 1, 0, 1, 0],
  [1, 1, 0, 1, 1, 1, 1, 1, 0, 1],
];

game.start(level);

function gameLoop() {
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);

  id = requestAnimationFrame(gameLoop);

  game.draw(ctx);
  game.update(cancelAnimationFrame, id, ctx);
}

gameLoop();
