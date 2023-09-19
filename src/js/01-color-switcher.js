const btnStartColor = document.querySelector('button[data-start]');
const btnStopColor = document.querySelector('button[data-stop]');
const bodyEl = document.querySelector('body');

let isRunning = false;
let intervalId = null;
const toggleButtons = () => {
  isRunning = !isRunning;

  btnStartColor.disabled = isRunning;
  btnStopColor.disabled = !isRunning;

  if (isRunning) {
    intervalId = setInterval(getRandomHexColor, 1000);
  } else {
    clearInterval(intervalId);
  }
};

btnStartColor.addEventListener('click', () => {
  toggleButtons();
});

btnStopColor.addEventListener('click', () => {
  toggleButtons();
});

function getRandomHexColor() {
  const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  bodyEl.style.backgroundColor = randomColor;
}
import * as PIXI from 'pixi.js';

const app = new PIXI.Application({ resizeTo: window });

document.body.appendChild(app.view);

let count = 0;
let isAnimationRunning = true;

// build a rope!
const ropeLength = 918 / 20;

const points = [];

for (let i = 0; i < 20; i++) {
  points.push(new PIXI.Point(i * ropeLength, 0));
}

const strip = new PIXI.SimpleRope(
  PIXI.Texture.from('https://pixijs.com/assets/snake.png'),
  points
);

strip.x = -459;

const snakeContainer = new PIXI.Container();

snakeContainer.x = 400;
snakeContainer.y = 300;

snakeContainer.scale.set(800 / 1100);
app.stage.addChild(snakeContainer);

snakeContainer.addChild(strip);
btnStopColor.addEventListener('click', () => {
  isAnimationRunning = false; // Зупиняємо анімацію
});
btnStartColor.addEventListener('click', () => {
  isAnimationRunning = true; // Запускаємо анімацію
});

app.ticker.add(() => {
  if (isAnimationRunning) {
    count += 0.1;

    // make the snake
    for (let i = 0; i < points.length; i++) {
      points[i].y = Math.sin(i * 0.5 + count) * 30;
      points[i].x = i * ropeLength + Math.cos(i * 0.3 + count) * 20;
    }
  }
});
