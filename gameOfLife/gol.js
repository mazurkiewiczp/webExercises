var cvs;
var ctx;
var gridSize = 80;
var tileSize = 10;
var grid = [];
window.onload = function () {
    cvs = document.getElementById("cvs");
    ctx = cvs.getContext("2d");
    initBoard();
    setInterval(function () {
        draw();
        nextGeneration();
    }, 1000 / 15);
};
var initBoard = function () {
    for (var i = -1; i < gridSize + 1; i++) {
        grid[i] = [];
        for (var j = -1; j < gridSize + 1; j++) {
            if (i < 0 || j < 0 || i > gridSize || j > gridSize) {
                grid[i][j] = 0;
            }
            else {
                grid[i][j] = Math.floor(Math.random() * 2);
            }
        }
    }
};
var draw = function () {
    for (var i = 0; i < gridSize; i++) {
        for (var j = 0; j < gridSize; j++) {
            if (grid[i][j] === 1) {
                ctx.fillStyle = "#6497b1";
                ctx.fillRect(i * tileSize, j * tileSize, tileSize - 2, tileSize - 2);
            }
            else {
                ctx.fillStyle = "black";
                ctx.fillRect(i * tileSize, j * tileSize, tileSize - 2, tileSize - 2);
            }
        }
    }
};
var nextGeneration = function () {
    var newGrid = grid.slice(0);
    for (var i = -1; i < newGrid.length; i++) {
        newGrid[i] = grid[i].slice(0);
    }
    for (var i = 0; i < gridSize; i++) {
        for (var j = 0; j < gridSize; j++) {
            if (grid[i][j] === 0 && countNeighbors(i, j) === 3) {
                newGrid[i][j] = 1;
            }
            if (grid[i][j] === 1 &&
                (countNeighbors(i, j) < 2 || countNeighbors(i, j) > 3)) {
                newGrid[i][j] = 0;
            }
        }
    }
    grid = newGrid.slice(0);
    for (var i = -1; i < newGrid.length; i++) {
        grid[i] = newGrid[i].slice(0);
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
