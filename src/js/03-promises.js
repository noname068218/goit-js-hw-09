import Notiflix from 'notiflix';
import * as PIXI from 'pixi.js';

// Отримуємо необхідні елементи.
const formEl = document.querySelector('.form');
const formInputs = document.querySelectorAll('input');
const formLabels = document.querySelectorAll('label');
const formButton = document.querySelectorAll('button');

formEl.addEventListener('submit', handlerForm);

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  // Перевіряємо, чи проміс виконується або відхиляється.
  if (shouldResolve) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({ position, delay });
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      }, delay);
    });
  } else {
    return new Promise(reject => {
      setTimeout(() => {
        reject({ position, delay });
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      }, delay);
    });
  }
}

function handlerForm(event) {
  event.preventDefault();

  const firstDelay = parseInt(formInputs[0].value, 10);
  const stepDelay = parseInt(formInputs[1].value, 10);
  const amount = parseInt(formInputs[2].value, 10);

  if (isNaN(firstDelay) || isNaN(stepDelay) || isNaN(amount)) {
    Notiflix.Notify.failure('Please enter valid numbers');
    return;
  }

  const promises = [];

  for (let i = 0; i < amount; i++) {
    const delay = firstDelay + i * stepDelay;
    const promise = createPromise(i + 1, delay);

    promise
      .then(({ position, delay }) => {
        console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        console.log(`❌ Rejected promise ${position} in ${delay}ms`);
      });

    promises.push(promise);
  }

  Promise.all(promises)
    .then(() => {
      Notiflix.Notify.success('All promises resolved');
    })
    .catch(() => {
      Notiflix.Notify.failure('At least one promise rejected');
    });
}

const app = new PIXI.Application({ resizeTo: window });

document.body.appendChild(app.view);

const geometry = new PIXI.Geometry()
  .addAttribute(
    'aVertexPosition', // the attribute name
    [
      -100,
      -50, // x, y
      100,
      -50, // x, y
      0.0,
      100.0,
    ], // x, y
    2
  ) // the size of the attribute

  .addAttribute(
    'aColor', // the attribute name
    [
      1,
      0,
      0, // r, g, b
      0,
      1,
      0, // r, g, b
      0,
      0,
      1,
    ], // r, g, b
    3
  ); // the size of the attribute

const shader = PIXI.Shader.from(
  `

    precision mediump float;
    attribute vec2 aVertexPosition;
    attribute vec3 aColor;

    uniform mat3 translationMatrix;
    uniform mat3 projectionMatrix;

    varying vec3 vColor;

    void main() {

        vColor = aColor;
        gl_Position = vec4((projectionMatrix * translationMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);

    }`,

  `precision mediump float;

    varying vec3 vColor;

    void main() {
        gl_FragColor = vec4(vColor, 1.0);
    }

`
);

const triangle = new PIXI.Mesh(geometry, shader);

triangle.position.set(400, 300);
triangle.scale.set(2);

app.stage.addChild(triangle);

app.ticker.add(delta => {
  triangle.rotation += 0.01;
});
