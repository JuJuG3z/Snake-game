export class Snake {
  constructor(gridSize) {
    this.gridSize = gridSize;
    this.reset();
  }

  reset() {
    this.body = [{ x: 10, y: 10 }];
    this.direction = { x: 1, y: 0 };
    this.growing = false;
  }

  move() {
    // Calculate new head position
    const head = {
      x: this.body[0].x + this.direction.x,
      y: this.body[0].y + this.direction.y
    };
    
    // Add new head to body
    this.body.unshift(head);
    
    // Remove tail unless growing
    if (!this.growing) {
      this.body.pop();
    } else {
      this.growing = false;
    }
  }

  changeDirection(key) {
    const directions = {
      ArrowUp: { x: 0, y: -1 },
      ArrowDown: { x: 0, y: 1 },
      ArrowLeft: { x: -1, y: 0 },
      ArrowRight: { x: 1, y: 0 }
    };

    const newDirection = directions[key];
    if (newDirection) {
      // Prevent reversing direction
      if (this.direction.x !== -newDirection.x || 
          this.direction.y !== -newDirection.y) {
        this.direction = newDirection;
      }
    }
  }

  eat(food) {
    const head = this.body[0];
    if (head.x === food.x && head.y === food.y) {
      this.growing = true;
      return true;
    }
    return false;
  }

  checkCollision(width, height) {
    const head = this.body[0];
    
    // Wall collision
    if (head.x < 0 || head.x >= width / this.gridSize ||
        head.y < 0 || head.y >= height / this.gridSize) {
      return true;
    }
    
    // Self collision (only check if snake has more than 4 segments)
    if (this.body.length > 4) {
      return this.body.slice(1).some(segment => 
        segment.x === head.x && segment.y === head.y
      );
    }
    return false;
  }

  draw(ctx) {
    ctx.fillStyle = '#00ff00';
    this.body.forEach(segment => {
      ctx.fillRect(
        segment.x * this.gridSize,
        segment.y * this.gridSize,
        this.gridSize,
        this.gridSize
      );
    });
  }
}
