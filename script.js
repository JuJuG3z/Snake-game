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
    drawSquare(food.x, food.y, 'red');
  }
}

function move() {
  const head = { ...snake[0] };

  switch (direction) {
    case 'up': head.y--; break;
    case 'down': head.y++; break;
    case 'left': head.x--; break;
    case 'right': head.x++; break;
  }

  if (head.x < 0 || head.x >= canvas.width / GRID_SIZE ||
      head.y < 0 || head.y >= canvas.height / GRID_SIZE ||
      snake.some(segment => segment.x === head.x && segment.y === head.y)) {
    gameOver();
    return;
  }

  snake.unshift(head);

  if (food && head.x === food.x && head.y === food.y) {
    food = null;
    generateFood();
  } else {
    snake.pop();
  }
}

function gameLoop() {
  move();
  draw();
  generateFood();
}

function startGame() {
  if (gameLoop) return; // Prevent multiple instances
  snake = [{ x: 10, y: 10 }];
  direction = 'right';
  food = null;
  gameLoop = setInterval(gameLoop, GAME_SPEED);
}

function gameOver() {
  clearInterval(gameLoop);
  gameLoop = null;
  alert('Game Over! Press OK to restart');
  startGame();
}

document.addEventListener('keydown', (event) => {
  switch (event.key) {
    case 'ArrowUp': if (direction !== 'down') direction = 'up'; break;
    case 'ArrowDown': if (direction !== 'up') direction = 'down'; break;
    case 'ArrowLeft': if (direction !== 'right') direction = 'left'; break;
    case 'ArrowRight': if (direction !== 'left') direction = 'right'; break;
  }
});

startGame();