let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let a;

let frog = new Image();
let car = [];
let frogX = 250;
let frogY = 450;
let win = 0;

function init() { //purpose: push image into array and use it by calling the array with an index.
  frog.src = "img/frog.png";
  car.push()
  drawBackground();
}

function start() {
  //change button to stop game
  let button = document.getElementById("toggle");
  let image = document.getElementById("toggleImage");
  image.setAttribute("src", "img/pause.png");
  button.setAttribute("onclick", "stop()");

  a = window.requestAnimationFrame(animate);
}

function stop() {
  let button = document.getElementById("toggle");
  let image = document.getElementById("toggleImage");
  image.setAttribute("src", "img/play.png");
  button.setAttribute("onclick", "start()");

  cancelAnimationFrame(a);
}

function animate() {//animations will run at fps of computer
  drawBackground();
  drawImages();

  a = window.requestAnimationFrame(animate);
}

$(document).keydown(function(event){
  switch (event.keyCode ? event.keyCode : event.which){
    case 37:
      frogX-=49;
    break;
    case 38:
      frogY-=34;
    break;
    case 39:
      frogX+=49;
    break;
    case 40:
      frogY+=34;
    break;
  }
  if (frogY <= 50){
    win = 1;
  }
});

function drawBackground() {
  //draw grass
  ctx.fillStyle = "lime";
  ctx.fillRect(0, 0, 500, 500);
  //draw roads
  ctx.fillStyle = "black";
  for (let i = 100; i < 400; i += 50) {
    ctx.fillRect(0, i, 500, 49);
  }
}

function drawImages() {
  ctx.drawImage(frog, frogX - frog.width / 2, frogY - frog.height / 2);
}

window.onload = function() {init()};
