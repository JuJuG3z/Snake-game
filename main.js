import { Game } from './game.js';
import { Snake } from './snake.js';
import { Food } from './food.js';

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const startButton = document.getElementById('startButton');
const menu = document.getElementById('menu');
const scoreElement = document.getElementById('score');

canvas.width = 400;
canvas.height = 400;

const game = new Game(canvas, ctx, scoreElement);

startButton.addEventListener('click', () => {
  menu.style.display = 'none';
  game.start();
});

document.addEventListener('keydown', (e) => {
  game.handleInput(e);
});