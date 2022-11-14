import { getInputValue, onChangeTypeElement, onChangePriceElement, pristine } from './validation.js';

const sliderElement = document.querySelector('.ad-form__slider');
const resetSlider = () => {
  sliderElement.noUiSlider.set(getInputValue());
};

const toogleDisabledState = (disabled) => {
  if (disabled) {
    return sliderElement.setAttribute('disabled', true);
  }
  else {
    return sliderElement.removeAttribute('disabled');
  }
};

noUiSlider.create(sliderElement, {
  start: getInputValue(),
  range: {
    min: getInputValue(),
    max: 100000
  },
  connect: 'lower',
  step: 0
});

sliderElement.noUiSlider.on('update', () => {
  getInputValue(sliderElement);
  pristine.validate();
});

onChangeTypeElement(sliderElement);

onChangePriceElement(sliderElement);

export { resetSlider, toogleDisabledState };
