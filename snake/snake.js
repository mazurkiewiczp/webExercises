var cvs;
var ctx;
var moveX = 0;
var moveY = 0;
var snakeX = 10;
var snakeY = 10;
var tailSize = 5;
var direction = "right";
var tail = [];
var gridSize = 20;
var tileSize = 20;
var appleX = 5;
var appleY = 15;
var score = 0;
window.onload = function () {
    cvs = document.getElementById("cvs");
    ctx = cvs.getContext("2d");
    document.addEventListener("keydown", keyDown);
    setInterval(function () {
        move();
        draw();
        document.getElementById("score").innerHTML = "Score: " + score;
    }, 1000 / 15);
};
var move = function () {
    snakeX += moveX;
    snakeY += moveY;
    wrap();
    checkApple();
};
var draw = function () {
    ctx.fillStyle = "#fdf498";
    ctx.fillRect(0, 0, cvs.width, cvs.height);
    ctx.fillStyle = "#0392cf";
    for (var i = 0; i < tail.length; i++) {
        ctx.fillRect(tail[i].x * gridSize, tail[i].y * gridSize, tileSize - 2, tileSize - 2);
        if (tail[i].x == snakeX && tail[i].y == snakeY) {
            reset();
        }
    }
    tail.push({ x: snakeX, y: snakeY });
    while (tail.length > tailSize) {
        tail.shift();
    }
    ctx.fillStyle = "#ee4035";
    ctx.fillRect(appleX * gridSize, appleY * gridSize, tileSize - 2, tileSize - 2);
};
var checkApple = function () {
    if (snakeX == appleX && snakeY == appleY) {
        tailSize++;
        score++;
        spawnApple();
    }
};
var spawnApple = function () {
    appleX = Math.floor(Math.random() * gridSize);
    appleY = Math.floor(Math.random() * gridSize);
    for (var i = 0; i < tail.length; i++) {
        if (tail[i].x == appleX && tail[i].y == appleY)
            spawnApple();
    }
};
var wrap = function () {
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
var keyDown = function (event) {
    if (event.keyCode == 37 && moveX != 1) {
        moveX = -1;
        moveY = 0;
    }
    else if (event.keyCode == 38 && moveY != 1) {
        moveX = 0;
        moveY = -1;
    }
    else if (event.keyCode == 39 && moveX != -1) {
        moveX = 1;
        moveY = 0;
    }
    else if (event.keyCode == 40 && moveY != -1) {
        moveX = 0;
        moveY = 1;
    }
};
var reset = function () {
    moveX = 0;
    moveY = 0;
    snakeX = 10;
    snakeY = 10;
    tailSize = 5;
    tail = [];
    score = 0;
};
