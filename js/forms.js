const adFormElement = document.querySelector('.ad-form');
const adFormElements = adFormElement.querySelectorAll('.ad-form__element');
const mapFilterElement = document.querySelector('.map__filters');
const mapFilterElements = mapFilterElement.querySelectorAll('.map__filter');
const typeElement = adFormElement.querySelector('[name = "type"]');
const priceElement = adFormElement.querySelector('[name = "price"]');
const addressElement = document.querySelector('[name = "address"]');
const sliderElement = document.querySelector('.ad-form__slider');
const MIN_PRICE = {
  'bungalow': 0,
  'flat': 1000,
  'hotel': 3000,
  'house': 5000,
  'palace': 10000
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
export { setActiveState, setInactiveState, adFormElement, sliderElement, MIN_PRICE, typeElement, priceElement };
