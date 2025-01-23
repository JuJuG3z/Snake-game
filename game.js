import { Snake } from './snake.js';
import { Food } from './food.js';

export class Game {
  constructor(canvas, ctx, scoreElement) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.scoreElement = scoreElement;
    this.gridSize = 20;
    
    // Initialize game elements
    this.snake = new Snake(this.gridSize);
    this.food = new Food(this.canvas.width, this.canvas.height, this.gridSize);
    
    // Game state
    this.score = 0;
    this.gameLoop = null;
    this.isGameRunning = false;
    
    // Bind methods
    this.handleInput = this.handleInput.bind(this);
  }

  start() {
    if (this.gameLoop) {
      clearInterval(this.gameLoop);
    }

    
    // Reset game state
    this.snake.reset();

    this.food = new Food(this.canvas.width, this.canvas.height, this.gridSize);
    this.score = 0;
    this.updateScore();
    this.isGameRunning = true;
    
    // Start game loop
    this.gameLoop = setInterval(() => this.update(), 200);
  }

  update() {

    // Move snake

    this.snake.move();
    
    // Check collisions
    if (this.snake.checkCollision(this.canvas.width, this.canvas.height)) {
      this.gameOver();
      return;
    }

    
    // Check if snake eats food
    if (this.snake.eat(this.food)) {
      this.score += 10;
      this.updateScore();
      this.food = new Food(this.canvas.width, this.canvas.height, this.gridSize);

    
    // Render game
    this.render();
  }


  render() {
    // Clear canvas
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Draw background
    this.ctx.fillStyle = '#000000';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Draw food
    this.food.draw(this.ctx);
    
    // Draw snake
    this.snake.draw(this.ctx);

  }

  updateScore() {
    this.scoreElement.textContent = `Score: ${this.score}`;
  }

  gameOver() {
    clearInterval(this.gameLoop);
    this.gameLoop = null;

    this.isGameRunning = false;
    alert(`Game Over! Final Score: ${this.score}`);
  }

  handleInput(e) {
    if (e.key === ' ' && !this.isGameRunning) {
      this.start();
    } else {
      this.snake.changeDirection(e.key);
    }
  }
}

