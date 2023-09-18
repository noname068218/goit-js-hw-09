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
