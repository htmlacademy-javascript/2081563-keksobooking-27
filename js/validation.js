import { adFormElement, typeElement, MIN_PRICE, priceElement } from './forms.js';
import { sendData } from './api.js';
import { resetForm } from './map.js';
import { copySuccessElement, showErrorMessage } from './util.js';
const roomNumberElement = adFormElement.querySelector('[name = "rooms"]');
const capacityElement = adFormElement.querySelector('[name = "capacity"]');
const timeOutElement = adFormElement.querySelector('[name = "timeout"]');
const timeInElement = adFormElement.querySelector('[name = "timein"]');
const ROOM_OPTIONS = {
  '1': ['1'],
  '2': ['2', '1'],
  '3': ['3', '2', '1'],
  '100': ['0']
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

const onEscDown = (evt) => {
  if (evt.key === 'Escape') {
    hiddenSuccesMessage();
  }
};

const onClick = () => {
  hiddenSuccesMessage();
};

function showSuccesMessage() {
  document.body.append(copySuccessElement);
  document.addEventListener('keydown', onEscDown);
  document.addEventListener('click', onClick);
}

function hiddenSuccesMessage() {
  copySuccessElement.remove();
  document.removeEventListener('keydown', onEscDown);
  document.removeEventListener('click', onClick);
}

adFormElement.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();
  if (isValid) {
    const formData = new FormData(evt.target);
    sendData(formData)
      .then((response) => {
        if (response.ok) {
          return response;
        }
        throw showErrorMessage();
      })
      .then(() => {
        resetForm(evt.target);
        showSuccesMessage();
      }).catch((error) => error);
  }
});

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
