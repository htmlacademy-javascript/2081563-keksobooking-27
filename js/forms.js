import { sendData } from './api.js';
import { pristine } from './validation.js';
import { resetMap } from './map.js';
import { showSuccesMessage, showErrorMessage } from './messages.js';
import { resetSlider, toogleDisabledState } from './slider.js';

const adFormElement = document.querySelector('.ad-form');
const adFormElements = adFormElement.querySelectorAll('.ad-form__element');
const mapFilterElement = document.querySelector('.map__filters');
const mapFilterElements = mapFilterElement.querySelectorAll('.map__filter');
const addressElement = document.querySelector('[name = "address"]');
const resetButtonElement = document.querySelector('.ad-form__reset');

const updateAddressValue = (marker) => {
  addressElement.value = `lat: ${marker.getLatLng().lat.toFixed(5)}, lng: ${marker.getLatLng().lng.toFixed(5)}`;
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
  toogleDisabledState(true);
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
  toogleDisabledState(false);
};

const resetFormValue = () => {
  adFormElement.reset();
  resetMap();
  resetSlider();
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
            resetFormValue();
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
    resetFormValue();
  });
};

export { setActiveState, setInactiveState, attachFormListeners, updateAddressValue };
