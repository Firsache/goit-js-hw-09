import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'notiflix/dist/notiflix-notify-aio-3.2.6.min.js';

const refs = {
    startBtn: document.querySelector('[data-start]'),
    inputPickedTime: document.querySelector('#datetime-picker'),
    daysEL: document.querySelector('[data-days]'),
    hoursEL: document.querySelector('[data-hours]'),
    minutesEL: document.querySelector('[data-minutes]'),
    secondsEL: document.querySelector('[data-seconds]')
};

const INTERVAL_DELAY = 1000;
let intervalId = null;

refs.startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
    minuteIncrement: 1,
  
  onClose(selectedDates) {
    if (selectedDates[0] <= Date.now()) {
      refs.startBtn.disabled = true;
      Notify.failure('Please choose a date in the future');
    } else {
      refs.startBtn.disabled = false;

      refs.startBtn.addEventListener('click', onStartBtnClick);

        function onStartBtnClick() {      
            intervalId = setInterval(() => {
                refs.startBtn.disabled = true;
                
                const pickedTime = new Date(refs.inputPickedTime.value).getTime();
                const currentTime = new Date();
                const timeDifference = pickedTime - currentTime;
                
                if (timeDifference < 0) {
                    clearInterval(intervalId);
                    return;
                }
                const { days, hours, minutes, seconds } = convertMs(timeDifference);
                refs.daysEL.textContent = pad(days);
                refs.hoursEL.textContent = pad(hours);
                refs.minutesEL.textContent = pad(minutes);
                refs.secondsEL.textContent = pad(seconds);
                
            }, INTERVAL_DELAY);
        }
    }
  },
};

flatpickr(refs.inputPickedTime, options);

function pad(value) {
    return String(value).padStart(2, '0');
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
