let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

let frog = new Image();
let car = new Image();

function init() { //purpose: push image into array and use it by calling the array with an index.
  frog.src = "img/frog.png";
  drawBackground();
}

function start() {
  //change button to stop game
  let button = document.getElementById("toggle");
  button.innerHTML = "Stop Game";
  button.setAttribute("onclick", "stop()");

  window.requestAnimationFrame(animate);
}

function stop() {
  let button = document.getElementById("toggle");
  button.innerHTML = "Start Game";
  button.setAttribute("onclick", "start()");

  cancelAnimationFrame(animate);
}

function animate() {//animations will run at fps of computer
  drawBackground();
  drawImages();
  window.requestAnimationFrame(animate);
}

function drawBackground() {
  ctx.fillStyle = "lime"; //draw grass
  ctx.fillRect(0, 0, 500, 500);
  ctx.fillStyle = "black"; //draw roads
  for (let i = 100; i < 400; i += 50) {
    ctx.fillRect(0, i, 500, 49);
  }
}

function drawImages() {
  ctx.drawImage(frog, 100, 100);
}

window.onload = function() {
  init()
};
