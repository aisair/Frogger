let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let a; //animating function identifier

let frog = new Image();
let car = [];
let frogX = 250;
let frogY = 450;
let frogLives = 3;
let carSpeed = 10;
let level = 1;

function init() { //purpose: push image into array and use it by calling the array with an index.
  frog.src = "img/frog.png";
  createCar("img/blueCar.png", "blueCar", 100, false);
  createCar("img/greenCar.png", "greenCar", 150, true);
  createCar("img/yellowCar.png", "yellowCar", 350 , false);
  document.getElementById("level").innerHTML = "0";

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
  //toggle start button to stop button
  let button = document.getElementById("toggle");
  let image = document.getElementById("toggleImage");
  image.setAttribute("src", "img/pause.png");
  button.setAttribute("onclick", "stop()");
  //update level element
  document.getElementById("level").innerHTML = level.toString();
  //reset vars for new game
  frogX = 250;
  frogY = 450;
  //start animation
  animate();
}

function stop() {
  //toggle stop button to start button
  let button = document.getElementById("toggle");
  let image = document.getElementById("toggleImage");
  image.setAttribute("src", "img/play.png");
  button.setAttribute("onclick", "start()");
  //cancel animation
  cancelAnimationFrame(a);
  //draw a clean background so it doesn't look messy
  drawBackground();
}

$(window).keydown(function(event){ //detect keypress using jQuery and update frog position
  let moveX = 0;
  let moveY = 0;
  switch (event.key){
    case "ArrowLeft":
      moveX -= 49;
      break;
    case "ArrowUp":
      moveY -= 50;
      break;
    case "ArrowRight":
      moveX += 49;
      break;
    case "ArrowDown":
      moveY += 50;
      break;
  }
  //check for wall collisions
  if (frogX + moveX - frog.width / 2 >= 0 && frogX + frog.width / 2 + moveX <= 500){
    frogX += moveX;
  }
  if (frogY + frog.height / 2 + moveY <= 500){
    frogY += moveY;
  }
});

function animate() {
  drawBackground();
  if (frogLives === 0){
    stopGame(false);
  }
  else if (drawImages() === true) { //if collision is detected, stop animation and draw explosion
    cancelAnimationFrame(a);
    animateExplosion();
    frogLives--;
  }
  else if (frogY < 50 && carSpeed < 25){
    //if frog reaches top, end the game with a win
    alert("You beat the level! Faster!");
    level++;
    start();
    carSpeed += 5;
  }
  else if (carSpeed >= 25){
    stopGame(true);
  }
  else{
      //run another frame of the animation
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
  //draw yellow road lines
  ctx.fillStyle = "yellow";
  ctx.fillRect(0, 149, 500, 2);
  ctx.fillRect(0, 349, 500, 2);
}

function drawImages() {
  //draw frog
  ctx.drawImage(frog, frogX - frog.width / 2, frogY + 8);
  //draw frog lives
  let heart = new Image();
  let emptyHeart = new Image();
  heart.src = "img/heart.png";
  emptyHeart.src = "img/heartEmpty.png";
  let lifeCounter = frogLives;
  for (let i = 0; i < 3; i++){
    if (lifeCounter > 0){
      ctx.drawImage(heart, 10 + i * 40, 10, 30, 30);
    }
    else{
      ctx.drawImage(emptyHeart, 10 + i * 40, 10, 30, 30);
    }
    lifeCounter--;
  }
  //draw cars
  for (let i = 0; i < car.length ; i++){
    //move car to other side of screen if it is offscreen
    if (car[i].left === true){
      if (car[i].xCoord < -200){
        car[i].xCoord = 500;
      }
      car[i].xCoord -= carSpeed;
    }
    else {
      if (car[i].xCoord > 500){
        car[i].xCoord = -200;
      }
      car[i].xCoord += carSpeed;
    }
    //draw the car!
    ctx.drawImage(car[i], car[i].xCoord, car[i].yCoord, 75, 45);
    //check for collision with car
    if (frogX + frog.width > car[i].xCoord &&
      frogX < car[i].xCoord + 75 &&
      frogY + frog.height > car[i].yCoord &&
      frogY < car[i].yCoord + 45) {
      return true;
    }
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function animateExplosion() {
  //get the explosion sprite sheet
  let sprites = new Image();
  sprites.src = "img/explosion.png";
  //draw the explosion. every frame of the explosion animation runs every 2 frames of the browser
  for (let i = 0; i <= 6; i += 0.5) {
    switch (i) {
      case 0:
        ctx.drawImage(sprites, 0, 15, 13, 14, frogX - frog.width / 3, frogY, 49, 49);
        break;
      case 1:
        ctx.drawImage(sprites, 21, 8, 27, 28, frogX - frog.width / 3, frogY, 49, 49);
        break;
      case 2:
        ctx.drawImage(sprites, 55, 5, 36, 34, frogX - frog.width / 3, frogY, 49, 49);
        break;
      case 3:
        ctx.drawImage(sprites, 95, 5, 45, 38, frogX - frog.width / 3, frogY, 49, 49);
        break;
      case 4:
        ctx.drawImage(sprites, 153, 0, 42, 43, frogX - frog.width / 3, frogY, 49, 49);
        break;
      case 5:
        ctx.drawImage(sprites, 207, 5, 44, 42, frogX - frog.width / 3, frogY, 49, 49);
        break;
      case 6:
        ctx.drawImage(sprites, 263, 5, 45, 44, frogX - frog.width / 3, frogY, 49, 49);
        break;
    }
    await sleep(50);
  }
  //check for restart and reset vars
  if (confirm("You got hit! Continue?")){ //ask user if they want to restart
    start();
  }
  else{
    stopGame(false);
  }
}

function stopGame(win){ //stops the game
  if (win){
    //won case
    alert("You have won the game!");
  }
  else{
    //loss case
    cancelAnimationFrame(a);
    alert("You lost.")
  }
}

$(window).on("load", function() {init()});
