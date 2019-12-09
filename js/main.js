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
let explosionFrame = 0;

function init() { //purpose: push image into array and use it by calling the array with an index.
  frog.src = "img/frog.png";
  createCar("img/blueCar.png", "blueCar", 100, false);
  createCar("img/greenCar.png", "greenCar", 150, true);
  createCar("img/yellowCar.png", "yellowCar", 350 , false);

  drawBackground();
}

function createCar(src, title, y, left){
  let img = new Image();
  img.src = src.toString();
  img.title = title;
  img.alt = title;
  img.yCoord = y;
  if (left === true){
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
  frogX = 250;
  frogY = 450;
  win = 0;
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

function animate() {
  drawBackground();
  drawImages();
  if (win === -1) {
    cancelAnimationFrame(a);
    animateExplosion();
    run = false;
  }
  else if (frogY <= 50 && win !== -1){
    win = 1;
  }
  else{
    a = window.requestAnimationFrame(animate);
  }
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
    if (car[i].left === true){
      if(car[i].xCoord < -200){
        car[i].xCoord = 500;
      }
      car[i].xCoord -= carSpeed;
    }
    else{
      if(car[i].xCoord > 500){
        car[i].xCoord = -200;
      }
      car[i].xCoord += carSpeed;
    }
    if (frogX + frog.width> car[i].xCoord && frogX < car[i].xCoord + 75 && frogY + frog.height > car[i].yCoord && frogY < car[i].yCoord + 45) {
      win = -1;
    }
    ctx.drawImage(car[i], car[i].xCoord, car[i].yCoord, 75, 45);
  }
}

function animateExplosion() {
  let sprites = new Image();
  sprites.src = "img/explosion.png";
  drawBackground();
  ctx.drawImage(frog, frogX - frog.width / 2, frogY + 8);
  for (let i = 0; i < car.length; i++){
    ctx.drawImage(car[i], car[i].xCoord, car[i].yCoord, 75, 45);
  }
  if (explosionFrame < 7){
    switch (explosionFrame){
      case 0:
        ctx.drawImage(sprites, 0, 15, 13, 14, (frogX - 49/2), (frogY - 34/2), 49, 49);
        break;
      case 1:
        ctx.drawImage(sprites, 21, 8, 27, 28, (frogX - 49/2), (frogY - 34/2), 49, 49);
        break;
      case 2:
        ctx.drawImage(sprites, 55, 5, 36, 34, (frogX - 49/2), (frogY - 34/2), 49, 49);
        break;
      case 3:
        ctx.drawImage(sprites, 95, 5, 45, 38, (frogX - 49/2), (frogY - 34/2), 49, 49);
        break;
      case 4:
        ctx.drawImage(sprites, 153, 0, 42, 43, (frogX - 49/2), (frogY - 34/2), 49, 49);
        break;
      case 5:
        ctx.drawImage(sprites, 207, 5, 44, 42, (frogX - 49/2), (frogY - 34/2), 49, 49);
        break;
      case 6:
        ctx.drawImage(sprites, 263, 5, 45, 44, (frogX - 49/2), (frogY - 34/2), 49, 49);
        break;
      default:
        break;
    }
    explosionFrame+= 0.5;
    a = window.requestAnimationFrame(animateExplosion);
  }
  else{
    explosionFrame = 0;
    cancelAnimationFrame(a);
    if (confirm("You got hit! Continue?") === true){
      frogX = 250;
      frogY = 450;
      win = 0;
      start();
    }
  }
}

$(window).on("load", function() {init()});
