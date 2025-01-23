export class Snake {
  constructor(gridSize) {
    this.gridSize = gridSize;
    this.segments = [{ x: 10, y: 10 }];
    this.direction = 'right';
    this.nextDirection = 'right';
  }

  move() {
    this.direction = this.nextDirection;
    const head = { ...this.segments[0] };

    switch (this.direction) {
      case 'up': head.y -= 1; break;
      case 'down': head.y += 1; break;
      case 'left': head.x -= 1; break;
      case 'right': head.x += 1; break;
    }

    this.segments.unshift(head);
    this.segments.pop();
  }

  grow() {
    const tail = { ...this.segments[this.segments.length - 1] };
    this.segments.push(tail);
  }

  changeDirection(key) {
    const directions = {
      'ArrowUp': 'up',
      'ArrowDown': 'down',
      'ArrowLeft': 'left',
      'ArrowRight': 'right'
    };

    const newDirection = directions[key];
    if (!newDirection) return;

    const opposites = {
      'up': 'down',
      'down': 'up',
      'left': 'right',
      'right': 'left'
    };

    if (opposites[newDirection] !== this.direction) {
      this.nextDirection = newDirection;
    }
  }

  checkCollision(width, height) {
    const head = this.segments[0];
    
    // Wall collision
    if (head.x < 0 || head.y < 0 || 
        head.x >= width / this.gridSize || 
        head.y >= height / this.gridSize) {
      return true;
    }

    // Self collision
    return this.segments.slice(1).some(segment => 
      segment.x === head.x && segment.y === head.y
    );
  }

  hasEatenFood(food) {
    const head = this.segments[0];
    return head.x === food.x && head.y === food.y;
  }
}