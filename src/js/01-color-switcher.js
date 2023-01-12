const refs = {
        startBtn: document.querySelector('button[data-start]'),
        stopBtn: document.querySelector('button[data-stop]')
    // =======================================================
    //      which var is better?
    // startBtn: document.querySelector('[data-start]'),
    // stopBtn: document.querySelector('[data-stop]')
}
const INTERVAL_DURATION = 1000;
let intervalId = null;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function onStartBtnClick() {
    refs.startBtn.disabled = true;
    refs.stopBtn.disabled = false;
    intervalId = setInterval(() => {
        document.body.style.backgroundColor = getRandomHexColor();
    },INTERVAL_DURATION)
}
function onStopBtnClick() {
    refs.stopBtn.disabled = true;
    refs.startBtn.disabled = false;
    clearInterval(intervalId);
}

refs.startBtn.addEventListener('click', onStartBtnClick)
refs.stopBtn.addEventListener('click', onStopBtnClick)