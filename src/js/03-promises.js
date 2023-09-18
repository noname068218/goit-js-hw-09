import Notiflix from 'notiflix';

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
const hello = console.log('hello');
