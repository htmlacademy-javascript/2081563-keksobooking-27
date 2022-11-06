import { sendData } from './api.js';
import { pristine, adFormElement, typeElement } from './validation.js';
import { resetMapInput } from './map.js';
import { showSuccesMessage, showErrorMessage } from './messages.js';
import { MIN_PRICE } from './const.js';

const adFormElements = adFormElement.querySelectorAll('.ad-form__element');
const mapFilterElement = document.querySelector('.map__filters');
const mapFilterElements = mapFilterElement.querySelectorAll('.map__filter');
const addressElement = document.querySelector('[name = "address"]');
const sliderElement = document.querySelector('.ad-form__slider');
const resetButtonElement = document.querySelector('.ad-form__reset');

const resetSlider = () => {
  sliderElement.noUiSlider.set(MIN_PRICE[typeElement.value]);
};

const setInactiveState = () => {
  adFormElement.classList.add('ad-form--disabled');
  mapFilterElement.classList.add('map__filters--disabled');
  for (const formElement of adFormElements) {
    formElement.disabled = true;
  }
  for (const mapFilter of mapFilterElements) {
    mapFilter.disabled = true;
  }
  sliderElement.setAttribute('disabled', true);
};

const setActiveState = () => {
  adFormElement.classList.remove('ad-form--disabled');
  mapFilterElement.classList.remove('map__filters--disabled');
  addressElement.readOnly = true;
  for (const formElement of adFormElements) {
    formElement.disabled = false;
  }
  for (const mapFilter of mapFilterElements) {
    mapFilter.disabled = false;
  }
  sliderElement.removeAttribute('disabled');
};

const attachFormListeners = () => {
  adFormElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();
    if (isValid) {
      const formData = new FormData(evt.target);
      sendData(formData)
        .then((response) => {
          if (response.ok) {
            evt.target.reset();
            resetMapInput();
            resetSlider();
            showSuccesMessage();
          }
          else {
            throw new Error('Ошибка оптравки данных');
          }
        })
        .catch(() => showErrorMessage());
    }
  });

  resetButtonElement.addEventListener('click', (evt) => {
    evt.preventDefault();
    adFormElement.reset();
    resetMapInput();
    resetSlider();
  });
};

export { setActiveState, setInactiveState, sliderElement, attachFormListeners };
