import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'notiflix/dist/notiflix-notify-aio-3.2.6.min.js';

const refs = {
  formEl: document.querySelector('.form'),
  btnSubmit: document.querySelector('button[type="submit"]')
}

const firstDelay = refs.formEl.elements.delay.value;
const delayStep = refs.formEl.elements.step.value;
const amountPromise = refs.formEl.elements.amount.value;

refs.btnSubmit.addEventListener('click', onSubmitBtnClick);
function onSubmitBtnClick(evt) {
  evt.preventDefault();

  for (let i = 0, firstDelay; i <= amountPromise; i++, firstDelay += delayStep) {
    createPromise(i, firstDelay)
    .then(({ i, firstDelay }) => {
      Notify.success(`✅ Fulfilled promise ${i} in ${firstDelay}ms`)
    })
    .catch(({ i, firstDelay }) => {
      Notify.failure(`❌ Rejected promise ${i} in ${firstDelay}ms`)
    })
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
    }    
  }
}