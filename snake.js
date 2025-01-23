export class Snake {
  constructor(gridSize) {
    this.gridSize = gridSize;
    this.body = [{ x: 10, y: 10 }];
    this.direction = { x: 0, y: 0 };
    this.nextDirection = { x: 0, y: 0 };
  }

  move() {
    this.direction = { ...this.nextDirection };
    
    const head = { 
      x: this.body[0].x + this.direction.x,
      y: this.body[0].y + this.direction.y
    };
    
    this.body.unshift(head);
    
    if (!this.growing) {
      this.body.pop();
    }
    this.growing = false;
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
      if (this.direction.x !== -newDirection.x && this.direction.y !== -newDirection.y) {
        this.nextDirection = newDirection;
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
    
    // Self collision
    return this.body.slice(1).some(segment => 
      segment.x === head.x && segment.y === head.y
    );
  }
}