const adForm = document.querySelector('.ad-form');
const adFormElements = adForm.querySelectorAll('.ad-form__element');
const mapFilterContainer = document.querySelector('.map__filters');
const mapFilters = mapFilterContainer.querySelectorAll('.map__filter');
/* eslint-disable */
const inactiveState = () => {
  adForm.classList.add('ad-form--disabled');
  mapFilterContainer.classList.add('map__filters--disabled');
  for (let adFormElement of adFormElements) {
    adFormElement.disabled = true;
  }
  for (let mapFilter of mapFilters) {
    mapFilter.disabled = true;
  }
};

const activeState = () => {
  adForm.classList.remove('ad-form--disabled');
  mapFilterContainer.classList.remove('map__filters--disabled');
  for (let adFormElement of adFormElements) {
    adFormElement.disabled = false;
  }
  for (let mapFilter of mapFilters) {
    mapFilter.disabled = false;
  }
};

export {activeState, inactiveState};
