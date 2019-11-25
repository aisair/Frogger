let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

let pictArray = [];
function init() { //purpose: push image into array and use it by calling the array with an index.
  for (let i = 0; i < 2; i++) {
    let picture = new Image();
    picture.src = "https://picsum.photos/200";
    pictArray.push(picture);
  }
  drawBackground();
}

function start() {
  //change button to stop game
  let button = document.getElementById("toggle");
  button.innerHTML = "Click to Stop Game";
  button.setAttribute("onclick", "stop()")

  animate()
}

function stop() {
  cancelAnimationFrame(animate);
}

function animate() {//animations will run at fps of computer
  requestAnimationFrame(animate);
  drawImages();
}

function drawBackground() {
  ctx.fillStyle = "#95f5e2";
  ctx.fillRect(0, 0, canvas.width, canvas.height)

}

function drawImages() {
  for (let i = 0; i < pictArray.length; i++) {
    pictArray[i].left += 10;
    ctx.drawImage(pictArray[i], pictArray[i].left, pictArray[i].top)
  }
}

window.onload = function() {
  init()
};
