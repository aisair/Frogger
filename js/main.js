let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

let background = new Image();
let frog = new Image();
let car = new Image();

function init() { //purpose: push image into array and use it by calling the array with an index.
  frog.src = "img/frog.png";
  background.src = "img/background.png";
  drawBackground();
}

function start() {
  //change button to stop game
  let button = document.getElementById("toggle");
  button.innerHTML = "Click to Stop Game";
  button.setAttribute("onclick", "stop()");

  window.requestAnimationFrame(animate);
}

function stop() {
  let button = document.getElementById("toggle");
  button.innerHTML = "Click to Start Game";
  button.setAttribute("onclick", "start()");

  cancelAnimationFrame(animate);
}

function animate() {//animations will run at fps of computer
  drawBackground();
  drawImages();
  window.requestAnimationFrame(animate);
}

function drawBackground() {
  ctx.drawImage(background, 0, 0, 500, 500);
}

function drawImages() {
  ctx.drawImage(frog, 100, 100);
}

window.onload = function() {
  init()
};
