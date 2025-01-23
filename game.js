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
    this.isGameRunning = false;
  }

  start() {
    if (this.gameLoop) {
      clearInterval(this.gameLoop);
    }
    this.snake = new Snake(this.gridSize);
    this.food = new Food(this.canvas.width, this.canvas.height, this.gridSize);
    this.score = 0;
    this.updateScore();
    this.draw();
    this.startButton.textContent = 'Restart Game';
  }

  update() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.snake.move();

    if (this.snake.checkCollision(this.canvas.width, this.canvas.height)) {
      this.gameOver();
      return;
    }

    if (this.snake.hasEatenFood(this.food)) {
      this.score += 10;
      this.updateScore();
      this.food = new Food(this.canvas.width, this.canvas.height, this.gridSize);
      this.snake.grow();
    }

    this.draw();
  }

  draw() {
    this.ctx.fillStyle = '#ff0000';
    this.ctx.fillRect(
      this.food.x * this.gridSize,
      this.food.y * this.gridSize,
      this.gridSize,
      this.gridSize
    );

    this.ctx.fillStyle = '#00ff00';
    this.snake.segments.forEach(segment => {
      this.ctx.fillRect(
        segment.x * this.gridSize,
        segment.y * this.gridSize,
        this.gridSize,
        this.gridSize
      );
    });
  }

  updateScore() {
    this.scoreElement.textContent = `Score: ${this.score}`;
  }

  gameOver() {
    clearInterval(this.gameLoop);
    this.gameLoop = null;
    this.isGameRunning = false;
    this.menu.style.display = 'flex';
    this.startButton.textContent = 'Play Again';
  }

  handleInput(e) {
    if (e.key === ' ') {
      if (!this.isGameRunning) {
        this.isGameRunning = true;
        this.gameLoop = setInterval(() => this.update(), 150);
      }
    } else {
      this.snake.changeDirection(e.key);
    }
  }
}