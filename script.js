const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const GRID_SIZE = 20;
const GAME_SPEED = 150; // Slower speed

let snake = [{ x: 10, y: 10 }];
let food = null;
let direction = 'right';
let gameLoop = null;

function generateFood() {
  if (!food) {
    food = {
      x: Math.floor(Math.random() * (canvas.width / GRID_SIZE)),
      y: Math.floor(Math.random() * (canvas.height / GRID_SIZE))
    };
  }
}

function drawSquare(x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x * GRID_SIZE, y * GRID_SIZE, GRID_SIZE - 2, GRID_SIZE - 2);
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  snake.forEach((segment) => {
    drawSquare(segment.x, segment.y, 'green');
  });
  
  if (food) {
    drawSquare(food.x, food.y, 'orange');
  }
}