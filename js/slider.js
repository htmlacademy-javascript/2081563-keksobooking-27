import {MIN_PRICE} from './const.js';
import {typeElement, priceElement} from './validation.js';

const sliderElement = document.querySelector('.ad-form__slider');

noUiSlider.create(sliderElement, {
  start: MIN_PRICE[typeElement.value],
  range: {
    min: MIN_PRICE[typeElement.value],
    max: 100000
  },
  connect: 'lower',
  step: 0
});

sliderElement.noUiSlider.on('update', () => {
  priceElement.value = Math.round(sliderElement.noUiSlider.get());
});

typeElement.addEventListener('change', () => {
  sliderElement.noUiSlider.updateOptions({
    start: MIN_PRICE[typeElement.value],
    range: {
      min: MIN_PRICE[typeElement.value],
      max: 100000
    }
  });
});

priceElement.addEventListener('change', () => {
  sliderElement.noUiSlider.set(priceElement.value);
});

export {sliderElement};
