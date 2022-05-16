const root = document.getElementById("root");

let para = document.createElement("p");

let ms = 0;
let sec = 0;
let min = 0;
let hour = 0;
let t = null;
let time = hour + ":" + min + ":" + sec + ":" + ms;
para.append(time);

const startButton = document.createElement("button");
startButton.append("Start");
const stopButton = document.createElement("button");
stopButton.append("Stop");
const resetButton = document.createElement("button");
resetButton.append("Reset");
root.append(startButton, stopButton, resetButton, para);

startButton.addEventListener("click", () => {
  if (t !== null) {
    clearInterval(t);
  }
  t = setInterval(startWatch, 1);
});

stopButton.addEventListener("click", () => {
  clearInterval(t);
});

resetButton.addEventListener("click", () => {
  clearInterval(t);
  ms = 0;
  sec = 0;
  min = 0;
  hour = 0;
  para.removeChild(para.lastChild);
  para.append(hour + ":" + min + ":" + sec + ":" + ms);
});

const startWatch = () => {
  ms = ms + 1;
  if (ms === 1000) {
    ms = 0;
    sec = sec + 1;
  }
  if (sec === 60) {
    sec = 0;
    min = min + 1;
  }
  if (min === 60) {
    min = 0;
    hour = hour + 1;
  }

  time = hour + ":" + min + ":" + sec + ":" + ms;
  para.removeChild(para.lastChild);
  para.append(time);
  root.appendChild(para);
};
