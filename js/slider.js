import {sliderElement, typeElement, MIN_PRICE, priceElement} from './forms.js';

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

const sliderReset = () => {
  sliderElement.noUiSlider.set(MIN_PRICE[typeElement.value]);
};

export {sliderReset};
