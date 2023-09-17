import 'particles.js';

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
///particlesJS
particlesJS('particles-js', {
  particles: {
    number: {
      value: 380,
      density: {
        enable: true,
        value_area: 800,
      },
    },
    color: {
      value: '#ffffff',
    },
    shape: {
      type: 'circle',
      stroke: {
        width: 0,
        color: '#000000',
      },
      polygon: {
        nb_sides: 5,
      },
      image: {
        src: 'img/github.svg',
        width: 100,
        height: 100,
      },
    },
    opacity: {
      value: 0.5,
      random: false,
      anim: {
        enable: false,
        speed: 1,
        opacity_min: 0.1,
        sync: false,
      },
    },
    size: {
      value: 3,
      random: true,
      anim: {
        enable: true,
        speed: 40,
        size_min: 0.1,
        sync: false,
      },
    },
    line_linked: {
      enable: true,
      distance: 150,
      color: '#f0f',
      opacity: 0.4,
      width: 1,
    },
    move: {
      enable: true,
      speed: 6,
      direction: 'none',
      random: false,
      straight: false,
      out_mode: 'out',
      bounce: false,
      attract: {
        enable: false,
        rotateX: 600,
        rotateY: 1200,
      },
    },
  },
  interactivity: {
    detect_on: 'canvas',
    events: {
      onhover: {
        enable: true,
        mode: 'repulse',
      },
      onclick: {
        enable: true,
        mode: 'push',
      },
      resize: true,
    },
    modes: {
      grab: {
        distance: 140,
        line_linked: {
          opacity: 1,
        },
      },
      bubble: {
        distance: 400,
        size: 40,
        duration: 2,
        opacity: 8,
        speed: 3,
      },
      repulse: {
        distance: 200,
        duration: 0.4,
      },
      push: {
        particles_nb: 4,
      },
      remove: {
        particles_nb: 2,
      },
    },
  },
  retina_detect: true,
});
