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
    this.isGameStarted = false;
  }

  start() {
    this.snake = new Snake(this.gridSize);
    this.food = new Food(this.canvas.width, this.canvas.height, this.gridSize);
    this.score = 0;
    this.updateScore();
    this.isGameStarted = true;
    this.startButton.textContent = 'Restart Game';
  }

  handleInput(e) {
    if (e.code === 'Space' && this.isGameStarted && !this.gameLoop) {
      this.startMovement();
    }
  }

  startMovement() {
    if (!this.gameLoop) {
      this.gameLoop = setInterval(() => this.update(), 150);
    }
  }

  update() {
    this.snake.move();

    if (this.snake.checkCollision(this.canvas.width, this.canvas.height)) {
      this.gameOver();
      return;
    }
  }

  gameOver() {
    clearInterval(this.gameLoop);
    this.gameLoop = null;
    this.isGameStarted = false;
    this.menu.style.display = 'block';
  }

  updateScore() {
    this.scoreElement.textContent = `Score: ${this.score}`;
  }
}