import { ROOM_OPTIONS, MIN_PRICE } from './const.js';

const adFormElement = document.querySelector('.ad-form');
const roomNumberElement = adFormElement.querySelector('[name = "rooms"]');
const priceElement = adFormElement.querySelector('[name = "price"]');
const typeElement = adFormElement.querySelector('[name = "type"]');
const capacityElement = adFormElement.querySelector('[name = "capacity"]');
const timeOutElement = adFormElement.querySelector('[name = "timeout"]');
const timeInElement = adFormElement.querySelector('[name = "timein"]');
const getInputValue = (slider) => {
  if (slider)
  {priceElement.value = Math.round(slider.noUiSlider.get());}
  else {
    return MIN_PRICE[typeElement.value];
  }
};

const pristine = new Pristine(adFormElement, {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
  errorTextClass: 'ad-form__element--invalid'
});
function validateRoomNumber() {
  return ROOM_OPTIONS[roomNumberElement.value].includes(capacityElement.value);
}
function getErrorMessage() {
  if (capacityElement.value === '0') {
    return `Только 100 комнат
    ${capacityElement.options[capacityElement.selectedIndex].text}`;
  }
  return `
  ${roomNumberElement.options[roomNumberElement.selectedIndex].text}
  не ${capacityElement.options[capacityElement.selectedIndex].text}
  `;
}

pristine.addValidator(roomNumberElement, validateRoomNumber, getErrorMessage);
pristine.addValidator(capacityElement, validateRoomNumber, getErrorMessage);
function validateOnChange(form, form2) {
  form.addEventListener('change', () => {
    pristine.validate(form2);
  });
  form2.addEventListener('change', () => {
    pristine.validate(form);
  });
}
validateOnChange(roomNumberElement, capacityElement);

function validatePrice(value) {
  return value >= MIN_PRICE[typeElement.value];
}
function getPriceErrorMessage() {
  return `Минимальная цена ${MIN_PRICE[typeElement.value]}руб.`;
}
pristine.addValidator(priceElement, validatePrice, getPriceErrorMessage);
typeElement.addEventListener('change', () => {
  priceElement.placeholder = MIN_PRICE[typeElement.value];
  priceElement.min = MIN_PRICE[typeElement.value];
  pristine.validate(priceElement);
});

timeInElement.addEventListener('change', () => {
  timeOutElement.value = timeInElement.value;
});
timeOutElement.addEventListener('change', () => {
  timeInElement.value = timeOutElement.value;
});

const onChangeTypeElement = (element) => {
  typeElement.addEventListener('change', () => {
    element.noUiSlider.updateOptions({
      start: getInputValue(),
      range: {
        min: getInputValue(),
        max: 100000
      }
    });
  });
};

const onChangePriceElement = (element) => {
  priceElement.addEventListener('change', () => {
    element.noUiSlider.set(priceElement.value);
  });
};

export { pristine, getInputValue, onChangeTypeElement, onChangePriceElement };
