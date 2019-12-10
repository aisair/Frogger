let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let a; //animating function identifier

let frog = new Image();
let car = [];
let frogX = 250;
let frogY = 450;
let carSpeed = 10;

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
  //toggle start button to stop button
  let button = document.getElementById("toggle");
  let image = document.getElementById("toggleImage");
  image.setAttribute("src", "img/pause.png");
  button.setAttribute("onclick", "stop()");
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
  switch (event.key){
    case "ArrowLeft":
      frogX -= 49;
      break;
    case "ArrowUp":
      frogY -= 50;
      break;
    case "ArrowRight":
      frogX += 49;
      break;
    case "ArrowDown":
      frogY += 50;
      break;
  }
});

function animate() {
  drawBackground();
  if (drawImages() === true) { //if collision is detected, stop animation and draw explosion
    cancelAnimationFrame(a);
    animateExplosion();
  }
  else if (frogY < 50){
      //if frog reaches top, end the game with a win
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
    //check for collision
    if (frogX + frog.width> car[i].xCoord && frogX < car[i].xCoord + 75 && frogY + frog.height > car[i].yCoord && frogY < car[i].yCoord + 45) {
      return true;
    }
  }
}

function animateExplosion() {
  //get the explosion sprite sheet
  let sprites = new Image();
  sprites.src = "img/explosion.png";
  //drawImage() function but without moving the cars
  drawBackground();
  ctx.drawImage(frog, frogX - frog.width / 2, frogY + 8);
  for (let i = 0; i < car.length; i++){
    ctx.drawImage(car[i], car[i].xCoord, car[i].yCoord, 75, 45);
  }
  //draw the explosion. every frame of the explosion animation runs every 2 frames of the browser
  for (let i = 0; i <= 6; i += 0.5) {
    switch (i) {
      case 0:
        ctx.drawImage(sprites, 0, 15, 13, 14, (frogX - 49 / 2), (frogY - 34 / 2), 49, 49);
        break;
      case 1:
        ctx.drawImage(sprites, 21, 8, 27, 28, (frogX - 49 / 2), (frogY - 34 / 2), 49, 49);
        break;
      case 2:
        ctx.drawImage(sprites, 55, 5, 36, 34, (frogX - 49 / 2), (frogY - 34 / 2), 49, 49);
        break;
      case 3:
        ctx.drawImage(sprites, 95, 5, 45, 38, (frogX - 49 / 2), (frogY - 34 / 2), 49, 49);
        break;
      case 4:
        ctx.drawImage(sprites, 153, 0, 42, 43, (frogX - 49 / 2), (frogY - 34 / 2), 49, 49);
        break;
      case 5:
        ctx.drawImage(sprites, 207, 5, 44, 42, (frogX - 49 / 2), (frogY - 34 / 2), 49, 49);
        break;
      case 6:
        ctx.drawImage(sprites, 263, 5, 45, 44, (frogX - 49 / 2), (frogY - 34 / 2), 49, 49);
        break;
    }
  }
  //reset vars and stop the animation
  cancelAnimationFrame(a);
  if (confirm("You got hit! Continue?") === true){ //ask user if they want to restart
    start();
  }
  else{
    stopGame(false);
  }
}

function stopGame(win){ //stops the game
  if (win){
    //won case
    alert("You have won the game!")
  }
  else{
    //loss case
    cancelAnimationFrame(a);
    alert("You lost.")
  }
}

$(window).on("load", function() {init()});
