var cvs;
var ctx;
var gridSize = 80;
var tileSize = 10;
var grid = [];
// fillPercentage represents chance for an individual cell to be 1 (wall) during initial noise generation
var fillPercentage = 50;
window.onload = function () {
    cvs = document.getElementById("cvs");
    ctx = cvs.getContext("2d");
    document.getElementById("reset").addEventListener("click", function () {
        initBoard();
        draw();
    });
    document.getElementById("nextGen").addEventListener("click", function () {
        nextGen();
        draw();
    });
    initBoard();
    draw();
};
var initBoard = function () {
    for (var i = -1; i < gridSize + 1; i++) {
        grid[i] = [];
        for (var j = -1; j < gridSize + 1; j++) {
            if (i < 0 || j < 0 || i > gridSize || j > gridSize) {
                grid[i][j] = 0;
            }
            else {
                grid[i][j] = Math.floor(Math.random() * 100) < fillPercentage ? 1 : 0;
            }
        }
    }
};
var draw = function () {
    for (var i = 0; i < gridSize; i++) {
        for (var j = 0; j < gridSize; j++) {
            if (grid[i][j] == 1) {
                ctx.fillStyle = "#708090";
                ctx.fillRect(i * tileSize, j * tileSize, tileSize, tileSize);
            }
            else {
                ctx.fillStyle = "#36454f";
                ctx.fillRect(i * tileSize, j * tileSize, tileSize, tileSize);
            }
        }
    }
};
var nextGen = function () {
    for (var i = 0; i < gridSize; i++) {
        for (var j = 0; j < gridSize; j++) {
            if (grid[i][j] == 1 && countNeighbors(i, j) >= 4) {
                grid[i][j] = 1;
            }
            else if (grid[i][j] == 0 && countNeighbors(i, j) >= 5) {
                grid[i][j] = 1;
            }
            else {
                grid[i][j] = 0;
            }
        }
    }
};
var countNeighbors = function (x, y) {
    var neighbors = 0;
    if (grid[x - 1][y - 1] > 0)
        neighbors++;
    if (grid[x][y - 1] > 0)
        neighbors++;
    if (grid[x + 1][y - 1] > 0)
        neighbors++;
    if (grid[x - 1][y] > 0)
        neighbors++;
    if (grid[x + 1][y] > 0)
        neighbors++;
    if (grid[x - 1][y + 1] > 0)
        neighbors++;
    if (grid[x][y + 1] > 0)
        neighbors++;
    if (grid[x + 1][y + 1] > 0)
        neighbors++;
    return neighbors;
};
