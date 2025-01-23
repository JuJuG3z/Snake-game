class SnakeGame {
  constructor() {
    this.canvas = document.getElementById('gameCanvas');
    this.ctx = this.canvas.getContext('2d');
    this.canvas.width = 400;
    this.canvas.height = 400;
    this.gridSize = 20;
    this.snake = [{x: 5, y: 5}];
    this.food = this.generateFood();
    this.direction = 'right';
    this.score = 0;
    this.scoreElement = document.getElementById('scoreValue');
    this.gameLoop = null;
    this.setupEventListeners();
  }

  generateFood() {
    const x = Math.floor(Math.random() * (this.canvas.width / this.gridSize));
    const y = Math.floor(Math.random() * (this.canvas.height / this.gridSize));
    return {x, y};
  }

  setupEventListeners() {
    document.addEventListener('keydown', (e) => {
      switch(e.key) {
        case 'ArrowUp':
          if (this.direction !== 'down') this.direction = 'up';
          break;
        case 'ArrowDown':
          if (this.direction !== 'up') this.direction = 'down';
          break;
        case 'ArrowLeft':
          if (this.direction !== 'right') this.direction = 'left';
          break;
        case 'ArrowRight':
          if (this.direction !== 'left') this.direction = 'right';
          break;
      }
    });
  }

  drawNeonRect(x, y, width, height, color) {
    this.ctx.shadowBlur = 20;
    this.ctx.shadowColor = color;
    this.ctx.fillStyle = color;
    this.ctx.fillRect(x, y, width, height);
    this.ctx.shadowBlur = 0;
  }

  update() {
    const head = {...this.snake[0]};

    switch(this.direction) {
      case 'up': head.y--; break;
      case 'down': head.y++; break;
      case 'left': head.x--; break;
      case 'right': head.x++; break;
    }

    if (head.x < 0 || head.x >= this.canvas.width / this.gridSize ||
        head.y < 0 || head.y >= this.canvas.height / this.gridSize ||
        this.snake.some(segment => segment.x === head.x && segment.y === head.y)) {
      this.gameOver();
      return;
    }

    this.snake.unshift(head);

    if (head.x === this.food.x && head.y === this.food.y) {
      this.score += 10;
      this.scoreElement.textContent = this.score;
      this.food = this.generateFood();
    } else {
      this.snake.pop();
    }
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Draw snake
    this.snake.forEach((segment, index) => {
      const color = index === 0 ? '#0ff' : '#0aa';
      this.drawNeonRect(
        segment.x * this.gridSize,
        segment.y * this.gridSize,
        this.gridSize - 2,
        this.gridSize - 2,
        color
      );
    });

    // Draw food
    this.drawNeonRect(
      this.food.x * this.gridSize,
      this.food.y * this.gridSize,
      this.gridSize - 2,
      this.gridSize - 2,
      '#f0f'
    );
  }

  gameOver() {
    cancelAnimationFrame(this.gameLoop);
    this.ctx.fillStyle = '#fff';
    this.ctx.shadowBlur = 20;
    this.ctx.shadowColor = '#0ff';
    this.ctx.font = '40px Arial';
    this.ctx.textAlign = 'center';
    this.ctx.fillText('Game Over!', this.canvas.width / 2, this.canvas.height / 2);
    
    setTimeout(() => {
      this.snake = [{x: 5, y: 5}];
      this.direction = 'right';
      this.score = 0;
      this.scoreElement.textContent = '0';
      this.food = this.generateFood();
      this.start();
    }, 2000);
  }

  start() {
    const gameLoop = () => {
      this.update();
      this.draw();
      this.gameLoop = requestAnimationFrame(gameLoop);
    };
    gameLoop();
  }
}

const game = new SnakeGame();
game.start();