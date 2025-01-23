export class Food {
  constructor(canvasWidth, canvasHeight, gridSize) {
    this.gridSize = gridSize;
    this.x = Math.floor(Math.random() * (canvasWidth / gridSize));
    this.y = Math.floor(Math.random() * (canvasHeight / gridSize));
  }

  draw(ctx) {
    ctx.fillStyle = '#ff0000';
    ctx.fillRect(
      this.x * this.gridSize,
      this.y * this.gridSize,
      this.gridSize,
      this.gridSize
    );
  }
}
