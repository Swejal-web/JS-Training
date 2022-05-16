const setTime = document.getElementById("clock");

function showClock() {
  const time = new Date();
  const hour = time.getHours();
  const min = time.getMinutes();
  const second = time.getSeconds();
  let ampm;

  if (hour > 12) {
    ampm = "PM";
  } else {
    ampm = "AM";
  }

  let currentTime = hour + ":" + min + ":" + second + ampm;
  const setPara = document.createElement("p");
  setPara.append(currentTime);
  while (setTime.hasChildNodes()) {
    setTime.removeChild(setTime.lastChild);
  }
  setTime.append(setPara);
}

setInterval(showClock, 1000);
