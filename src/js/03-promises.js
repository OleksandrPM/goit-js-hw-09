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
    createPromise(i, delay)
      .then(value => {
        Notify.info(
          `✅ Fulfilled promise ${value.position} in ${value.delay}ms`
        );
      })
      .catch(value => {
        Notify.failure(
          `❌ Rejected promise ${value.position} in ${value.delay}ms`
        );
      });
    delay += delayStep;
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
