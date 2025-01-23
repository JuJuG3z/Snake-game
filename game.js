import { Snake } from './snake.js';
import { Food } from './food.js';

export class Game {
  constructor(canvas, ctx, scoreElement) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.scoreElement = scoreElement;
    this.gridSize = 20;
    this.snake = new Snake(this.gridSize);
    this.food = new Food(canvas.width, canvas.height, this.gridSize);
    this.score = 0;
    this.gameLoop = null;
    this.menu = document.getElementById('menu');
    this.startButton = document.getElementById('startButton');
  }

  start() {
    this.snake = new Snake(this.gridSize);
    this.food = new Food(this.canvas.width, this.canvas.height, this.gridSize);
    this.score = 0;
    this.updateScore();
    this.gameLoop = setInterval(() => this.update(), 150);
    this.startButton.textContent = 'Restart Game';
  }

  update() {
    this.snake.move();

    if (this.snake.checkCollision(this.canvas.width, this.canvas.height)) {
      this.gameOver();
      return;
    }

    if (this.snake.eat(this.food)) {
      this.food = new Food(this.canvas.width, this.canvas.height, this.gridSize);
      this.score += 10;
      this.updateScore();
    }

    this.draw();
  }

  draw() {
    this.ctx.fillStyle = '#000';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // Draw snake
    this.ctx.shadowBlur = 20;
    this.ctx.shadowColor = '#0ff';
    this.ctx.fillStyle = '#0ff';
    this.snake.body.forEach(segment => {
      this.ctx.fillRect(
        segment.x * this.gridSize,
        segment.y * this.gridSize,
        this.gridSize - 2,
        this.gridSize - 2
      );
    });

    // Draw food
    this.ctx.shadowColor = '#f0f';
    this.ctx.fillStyle = '#f0f';
    this.ctx.fillRect(
      this.food.x * this.gridSize,
      this.food.y * this.gridSize,
      this.gridSize - 2,
      this.gridSize - 2
    );
  }

  gameOver() {
    clearInterval(this.gameLoop);
    this.menu.style.display = 'block';
  }

  handleInput(e) {
    this.snake.changeDirection(e.key);
  }

  updateScore() {
    this.scoreElement.textContent = `Score: ${this.score}`;
  }
}