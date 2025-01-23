export class Food {
  constructor(width, height, gridSize) {
    this.gridSize = gridSize;
    this.x = Math.floor(Math.random() * (width / gridSize));
    this.y = Math.floor(Math.random() * (height / gridSize));
  }
}