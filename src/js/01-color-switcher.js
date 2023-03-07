const colorChangingTime = 1000;

const bodyEl = document.querySelector('body');

bodyEl.addEventListener('click', onStartButtonClick);

let intervalId;

function onStartButtonClick(event) {
  if (event.target.hasAttribute('data-start')) {
    intervalId = setInterval(() => {
      bodyEl.style.backgroundColor = getRandomHexColor();
    }, colorChangingTime);
    bodyEl.querySelector('[data-start]').disabled = true;
    bodyEl.querySelector('[data-stop]').disabled = false;
  }

  if (event.target.hasAttribute('data-stop')) {
    clearInterval(intervalId);
    bodyEl.querySelector('[data-start]').disabled = false;
    bodyEl.querySelector('[data-stop]').disabled = true;
  }
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
