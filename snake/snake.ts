let cvs;
let ctx;

let moveX = 0;
let moveY = 0;
let snakeX = 10;
let snakeY = 10;
let tailSize = 5;
let direction = "right";
let tail = [];

let gridSize = 20;
let tileSize = 20;

let appleX = 5;
let appleY = 15;
let score = 0;

window.onload = () => {
  cvs = document.getElementById("cvs");
  ctx = cvs.getContext("2d");
  document.addEventListener("keydown", keyDown);
  setInterval(() => {
    move();
    draw();
    document.getElementById("score").innerHTML = "Score: " + score;
  }, 1000 / 15);
};

const move = () => {
  snakeX += moveX;
  snakeY += moveY;
  wrap();
  checkApple();
};

const draw = () => {
  ctx.fillStyle = "#fdf498";
  ctx.fillRect(0, 0, cvs.width, cvs.height);
  ctx.fillStyle = "#0392cf";
  for (let i = 0; i < tail.length; i++) {
    ctx.fillRect(
      tail[i].x * gridSize,
      tail[i].y * gridSize,
      tileSize - 2,
      tileSize - 2
    );
    if (tail[i].x == snakeX && tail[i].y == snakeY) {
      reset();
    }
  }
  tail.push({ x: snakeX, y: snakeY });
  while (tail.length > tailSize) {
    tail.shift();
  }
  ctx.fillStyle = "#ee4035";
  ctx.fillRect(
    appleX * gridSize,
    appleY * gridSize,
    tileSize - 2,
    tileSize - 2
  );
};

const checkApple = () => {
  if (snakeX == appleX && snakeY == appleY) {
    tailSize++;
    score++;
    spawnApple();
  }
};

const spawnApple = () => {
  appleX = Math.floor(Math.random() * gridSize);
  appleY = Math.floor(Math.random() * gridSize);
  for (let i = 0; i < tail.length; i++) {
    if (tail[i].x == appleX && tail[i].y == appleY) spawnApple();
  }
};

const wrap = () => {
  if (snakeX < 0) {
    snakeX = gridSize - 1;
  }
  if (snakeX > gridSize - 1) {
    snakeX = 0;
  }
  if (snakeY < 0) {
    snakeY = gridSize - 1;
  }
  if (snakeY > gridSize - 1) {
    snakeY = 0;
  }
};

const keyDown = event => {
  if (event.keyCode == 37 && moveX != 1) {
    moveX = -1;
    moveY = 0;
  } else if (event.keyCode == 38 && moveY != 1) {
    moveX = 0;
    moveY = -1;
  } else if (event.keyCode == 39 && moveX != -1) {
    moveX = 1;
    moveY = 0;
  } else if (event.keyCode == 40 && moveY != -1) {
    moveX = 0;
    moveY = 1;
  }
};

const reset = () => {
  moveX = 0;
  moveY = 0;
  snakeX = 10;
  snakeY = 10;
  tailSize = 5;
  tail = [];
  score = 0;
};
