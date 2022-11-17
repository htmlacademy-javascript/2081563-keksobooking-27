import { MARKS_COUNT } from './const.js';
import { sendData, getData } from './api.js';
import { pristine } from './validation.js';
import { resetMap, closePopup, renderMarks, markerGroup } from './map.js';
import { showSuccessMessage, showErrorMessage } from './messages.js';
import { resetSlider, toggleDisabledState } from './slider.js';
import { previewImage } from './preview-image.js';
import { clearAvatar, clearPhoto } from './preview-image.js';

const adFormElement = document.querySelector('.ad-form');
const adFormElements = adFormElement.querySelectorAll('.ad-form__element');
const mapFilterElement = document.querySelector('.map__filters');
const mapFilterElements = mapFilterElement.querySelectorAll('.map__filter');
const addressElement = document.querySelector('[name = "address"]');
const resetButtonElement = document.querySelector('.ad-form__reset');
const mapFiltersElement = document.querySelector('.map__filters');
const housingFeaturesElement = document.querySelector('.map__features');
const avatarInputElement = document.querySelector('.ad-form-header__input');

const resetMarkers = () => {
  markerGroup.clearLayers();
  getData().then((data) => renderMarks(data.slice(0, MARKS_COUNT)));
};

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
  toggleDisabledState(true);
  housingFeaturesElement.disabled = true;
  avatarInputElement.disabled = true;
};

const setActiveForm = () => {
  previewImage();
  adFormElement.classList.remove('ad-form--disabled');
  addressElement.readOnly = true;
  for (const formElement of adFormElements) {
    formElement.disabled = false;
  }
  toggleDisabledState(false);
  housingFeaturesElement.disabled = false;
  avatarInputElement.disabled = false;
};

const setActiveFilters = () => {
  mapFilterElement.classList.remove('map__filters--disabled');
  for (const mapFilter of mapFilterElements) {
    mapFilter.disabled = false;
  }
};

const resetFormValue = () => {
  adFormElement.reset();
  resetMap();
  resetSlider();
  closePopup();
  mapFiltersElement.reset();
  clearAvatar();
  clearPhoto();
  resetMarkers();
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
            showSuccessMessage();
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

export { setInactiveState, attachFormListeners, updateAddressValue, setActiveForm, setActiveFilters };
