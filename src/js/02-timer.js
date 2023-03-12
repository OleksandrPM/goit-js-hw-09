import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const period = 1000;
const alertMessedge = 'Please choose a date in the future';

let selectedDateMS;
let currentDateMs;
let timerId;

const flatpickrOptions = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedDateMS = Date.parse(selectedDates[0]);
    currentDateMs = Date.parse(flatpickrOptions.defaultDate);

    if (selectedDateMS <= currentDateMs) {
      Notify.failure(alertMessedge);
    } else {
      startButtonEl.disabled = false;
      startButtonEl.addEventListener('click', onStartButtonElClick);
    }
  },
};

const bodyEl = document.querySelector('body');

const inputEl = document.querySelector('#datetime-picker');
const startButtonEl = document.querySelector('[data-start]');
const timerEl = document.querySelector('.timer');

startButtonEl.disabled = true;
inputEl.disabled = false;

const fl = flatpickr(inputEl, flatpickrOptions);

setDocumentStyles(bodyEl);

function onStartButtonElClick(event) {
  timerId = setInterval(() => {
    setTimer(selectedDateMS, timerEl);
  }, period);
  event.target.removeEventListener('click', onStartButtonElClick);
  event.target.disabled = true;
  inputEl.disabled = true;
  fl.destroy();
}

function setTimer(selectedDateMs, timerElement) {
  const currentDateMs = Date.parse(new Date());

  if (selectedDateMs < currentDateMs) {
    Notify.info('Time is over!');
    clearInterval(timerId);
    return;
  } else {
    const timerMs = selectedDateMs - currentDateMs;
    const { days, hours, minutes, seconds } = convertMs(timerMs);
    timerElement.querySelector('[data-days]').textContent =
      addLeadingZero(days);
    timerElement.querySelector('[data-hours]').textContent =
      addLeadingZero(hours);
    timerElement.querySelector('[data-minutes]').textContent =
      addLeadingZero(minutes);
    timerElement.querySelector('[data-seconds]').textContent =
      addLeadingZero(seconds);
  }
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

function setDocumentStyles(element) {
  const pEl = element.querySelector('p');
  const inputEl = element.querySelector('#datetime-picker');
  const buttonEl = element.querySelector('[data-start]');
  const timerEl = element.querySelector('.timer');
  const fields = element.querySelectorAll('.field');

  element.style.minHeight = '100vh';
  element.style.alignItems = 'center';
  element.style.background = `linear-gradient(45deg, rgb(26, 1, 117) 0%, 
  rgba(225, 5, 34, 0) 70%), linear-gradient(135deg, rgb(225, 5, 152) 10%, 
  rgba(49, 5, 209, 0) 80%), linear-gradient(225deg, hsla(179, 81%, 45%, 1) 10%,
  rgba(10, 219, 216, 0) 80%), rgba(0, 0, 0, 0) linear-gradient(315deg, rgb(189, 5, 245) 100%,
  rgba(9, 245, 5, 0) 70%)`;

  pEl.style.display = 'inline';
  pEl.style.paddingLeft = '20px';
  pEl.style.paddingRight = '20px';
  pEl.style.border = 'solid';
  pEl.style.borderRadius = '75px';
  pEl.style.backgroundColor = '#fff';

  inputEl.style.display = 'block';
  inputEl.style.margin = '20px';
  inputEl.style.marginLeft = 'auto';
  inputEl.style.marginRight = 'auto';
  inputEl.style.textAlign = 'center';
  inputEl.style.fontWeight = 'bold';
  inputEl.style.fontSize = '25px';
  inputEl.style.border = 'solid';
  inputEl.style.borderRadius = '75px';

  buttonEl.style.display = 'block';
  buttonEl.style.margin = '20px';
  buttonEl.style.marginLeft = 'auto';
  buttonEl.style.marginRight = 'auto';
  buttonEl.style.textAlign = 'center';
  buttonEl.style.fontWeight = 'bold';
  buttonEl.style.fontSize = '25px';
  buttonEl.style.border = 'solid';
  buttonEl.style.borderRadius = '75px';

  timerEl.style.display = 'flex';
  timerEl.style.gap = '20px';
  timerEl.style.justifyContent = 'center';
  timerEl.style.fontWeight = 'bold';

  for (let i = 0; i < fields.length; i++) {
    const valueEl = fields[i].querySelector('.value');
    const labelEl = fields[i].querySelector('.label');

    valueEl.style.display = 'block';
    valueEl.style.fontSize = '50px';

    labelEl.style.display = 'block';
    labelEl.style.fontSize = '25px';

    fields[i].style.display = 'flex';
    fields[i].style.flexDirection = 'column';
    fields[i].style.width = '150px';
    fields[i].style.height = '150px';

    fields[i].style.alignItems = 'center';
    fields[i].style.justifyContent = 'center';
    fields[i].style.border = 'solid';
    fields[i].style.borderRadius = '75px';
    fields[i].style.backgroundColor = '#fff';
  }
}
