import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import "dist/notiflix-notify-aio-3.2.6.min.js";

const refs = {
    datePicker: document.querySelector('input#datetime-picker'),
    startBtn: document.querySelector('[data-start'),
    hours: document.querySelector('[data-hours'),
    minutes: document.querySelector('[data-minutes'),
    seconds: document.querySelector('[data-seconds')
}

const INTERVAL_DELAY = 1000;
const currentDate = Date.now;
let intervalId = null;
let dif = null;

refs.startBtn.disabled = true;
refs.startBtn.addEventListener('click', onStartBtnClick)

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {
        if (selectedDates < currentDate) {
          Notify.failure("Please choose a date in the future")
        } else {
            refs.startBtn.disabled = false;
        }
        
    console.log(selectedDates[0]);
  },
};

function flatpickr(refs.datePicker, options);

function onStartBtnClick{
    intervalId = setInterval(() => {
        dif = selectedDates - currentDate;
        convertMs(dif);
    },INTERVAL_DELAY)
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

// Notify.failure('your message is here')