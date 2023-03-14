import { Notify } from 'notiflix/build/notiflix-notify-aio';

let firstDelay = 0;
let delayStep = 0;
let amount = 0;

const formEl = document.querySelector('.form');

formEl.addEventListener('input', onFormElInput);
formEl.addEventListener('submit', onFormElSubmit);

function onFormElSubmit(event) {
  event.preventDefault();
  generatePromises(firstDelay, delayStep, amount);
}

function onFormElInput(event) {
  if (event.target.name === 'delay') {
    firstDelay = Number(event.target.value);
  }
  if (event.target.name === 'step') {
    delayStep = Number(event.target.value);
  }
  if (event.target.name === 'amount') {
    amount = Number(event.target.value);
  }
}

function generatePromises(initialDelay, delayStep, promisesAmount) {
  let delay = initialDelay;
  for (let i = 1; i <= promisesAmount; i++) {
    setTimeout(() => {
      createPromise(i, delay);
    }, delay);
    delay += delayStep;
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  if (shouldResolve) {
    Notify.info(`✅ Fulfilled promise ${position} in ${delay}ms`);
  } else {
    Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
  }
}
