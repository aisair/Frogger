let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let a;

let frog = new Image();
let car = [];
let frogX = 250;
let frogY = 450;
let win = 0;
let carSpeed = 10;
let run = false;

function init() { //purpose: push image into array and use it by calling the array with an index.
  frog.src = "img/frog.png";
  createCar("img/blueCar.png", "blueCar", -200, 100);
  createCar("img/greenCar.png", "greenCar", -200, 150);
  createCar("img/yellowCar.png", "yellowCar", , 350);

  drawBackground();
}

function createCar(src, title, x, y, direction){
  let img = new Image();
  img.src = src.toString();
  img.title = title;
  img.alt = title;
  img.yCoord = y;
  if (direction.toLowerCase() === "l"){
    img.left = true;
    img.xCoord = 500;
  }
  else{
    img.left = false;
    img.xCoord = -200;
  }
  car.push(img);
}

function start() {
  //change button to stop game
  let button = document.getElementById("toggle");
  let image = document.getElementById("toggleImage");
  image.setAttribute("src", "img/pause.png");
  button.setAttribute("onclick", "stop()");
  a = window.requestAnimationFrame(animate);
  run = true;
}

function stop() {
  let button = document.getElementById("toggle");
  let image = document.getElementById("toggleImage");
  image.setAttribute("src", "img/play.png");
  button.setAttribute("onclick", "start()");
  cancelAnimationFrame(a);
  run = false;
  drawBackground();
}

function animate() {//animations will run at fps of computer
  drawBackground();
  drawImages();
  if (frogY <= 50){
    win = 1;
  }
  a = window.requestAnimationFrame(animate);
}

function drawBackground() {
  //draw grass
  ctx.fillStyle = "lime";
  ctx.fillRect(0, 0, 500, 500);
  //draw roads
  ctx.fillStyle = "black";
  for (let i = 100; i < 200; i += 50) {
    ctx.fillRect(0, i, 500, 49);
  }
  for (let i = 300; i < 400; i += 50) {
    ctx.fillRect(0, i, 500, 49);
  }
  ctx.fillStyle = "yellow";
  ctx.fillRect(0, 149, 500, 2);
  ctx.fillRect(0, 349, 500, 2);
}

$(window).keydown(function(event){
  switch (event.key){
    case "ArrowLeft":
      frogX-=49;
      break;
    case "ArrowUp":
      frogY-=50;
      break;
    case "ArrowRight":
      frogX+=49;
      break;
    case "ArrowDown":
      frogY+=50;
      break;
  }
});

function drawImages() {
  ctx.drawImage(frog, frogX - frog.width / 2, frogY + 8);
  for (let i = 0; i < car.length; i++){
    car[i].xCoord += carSpeed;
    ctx.drawImage(car[i], car[i].xCoord, car[i].yCoord, 75, 45);
    if(car[i].xCoord > 500){
      car[i].xCoord = -200;
    }
  }
}

$(window).on("load", function() {init()});
