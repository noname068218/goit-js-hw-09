import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import Notiflix from 'notiflix';

const startBtn = document.querySelector('button[data-start]');
const timerField = document.querySelectorAll('.value');

startBtn.disabled = true;

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    const currentDate = new Date();

    if (selectedDate <= currentDate) {
      Notiflix.Notify.failure('Please choose a date in the future');
      startBtn.disabled = true;
    } else {
      Notiflix.Notify.success('Valid date chosen');
      startBtn.disabled = false;
    }
  },
};

const flatpickrInstance = flatpickr('#datetime-picker', options);

let countdownInterval;

startBtn.addEventListener('click', () => {
  const selectedDate = flatpickrInstance.selectedDates[0];
  const currentDate = new Date();

  if (selectedDate > currentDate) {
    startBtn.disabled = true;
    clearInterval(countdownInterval);
    countdownInterval = setInterval(updateTimer, 1000);
    updateTimer();
  }
});

function updateTimer() {
  const selectedDate = flatpickrInstance.selectedDates[0];
  const currentDate = new Date();
  const timeDifference = selectedDate - currentDate;

  if (timeDifference <= 0) {
    clearInterval(countdownInterval);
    timerField.forEach(field => (field.textContent = '00'));
    Notiflix.Notify.success('Countdown finished');
    return;
  }

  const { days, hours, minutes, seconds } = convertMs(timeDifference);
  timerField[0].textContent = addLeadingZero(days);
  timerField[1].textContent = addLeadingZero(hours);
  timerField[2].textContent = addLeadingZero(minutes);
  timerField[3].textContent = addLeadingZero(seconds);
}
