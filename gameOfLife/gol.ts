let cvs;
let ctx;
const gridSize = 80;
const tileSize = 10;
let grid = [];

window.onload = () => {
  cvs = document.getElementById("cvs");
  ctx = cvs.getContext("2d");
  initBoard();
  setInterval(() => {
    draw();
    nextGeneration();
  }, 1000 / 15);
};

const initBoard = () => {
  for (let i = -1; i < gridSize + 1; i++) {
    grid[i] = [];
    for (let j = -1; j < gridSize + 1; j++) {
      if (i < 0 || j < 0 || i > gridSize || j > gridSize) {
        grid[i][j] = 0;
      } else {
        grid[i][j] = Math.floor(Math.random() * 2);
      }
    }
  }
};

const draw = () => {
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      if (grid[i][j] === 1) {
        ctx.fillStyle = "#6497b1";
        ctx.fillRect(i * tileSize, j * tileSize, tileSize - 2, tileSize - 2);
      } else {
        ctx.fillStyle = "black";
        ctx.fillRect(i * tileSize, j * tileSize, tileSize - 2, tileSize - 2);
      }
    }
  }
};

const nextGeneration = () => {
  let newGrid = grid.slice(0);
  for (let i = -1; i < newGrid.length; i++) {
    newGrid[i] = grid[i].slice(0);
  }

  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      if (grid[i][j] === 0 && countNeighbors(i, j) === 3) {
        newGrid[i][j] = 1;
      }
      if (
        grid[i][j] === 1 &&
        (countNeighbors(i, j) < 2 || countNeighbors(i, j) > 3)
      ) {
        newGrid[i][j] = 0;
      }
    }
  }

  grid = newGrid.slice(0);
  for (let i = -1; i < newGrid.length; i++) {
    grid[i] = newGrid[i].slice(0);
  }
};

const countNeighbors = (x: number, y: number) => {
  let neighbors = 0;
  if (grid[x - 1][y - 1] > 0) neighbors++;
  if (grid[x][y - 1] > 0) neighbors++;
  if (grid[x + 1][y - 1] > 0) neighbors++;
  if (grid[x - 1][y] > 0) neighbors++;
  if (grid[x + 1][y] > 0) neighbors++;
  if (grid[x - 1][y + 1] > 0) neighbors++;
  if (grid[x][y + 1] > 0) neighbors++;
  if (grid[x + 1][y + 1] > 0) neighbors++;
  return neighbors;
};
