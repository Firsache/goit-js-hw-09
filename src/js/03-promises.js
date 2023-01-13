import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'notiflix/dist/notiflix-notify-aio-3.2.6.min.js';

const refs = {
  formEl: document.querySelector('.form')
}

refs.formEl.addEventListener('submit', onFormSubmit);
function onFormSubmit(evt) {
  evt.preventDefault();

  let firstDelay = Number(refs.formEl.elements.delay.value);
  const delayStep = Number(refs.formEl.elements.step.value);
  const amountPromise = Number(refs.formEl.elements.amount.value);

  for (let i = 1; i <= amountPromise; i++, firstDelay += delayStep) {
    createPromise(i, firstDelay)
      .then(({ position, delay }) => {
      Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`)
    })
    .catch(({ position, delay }) => {
      Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`)
    })

    refs.formEl.reset()
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
    })    
  }
}