const adFormElement = document.querySelector('.ad-form');
const adFormElements = adFormElement.querySelectorAll('.ad-form__element');
const mapFilterElemnt = document.querySelector('.map__filters');
const mapFilterElements = mapFilterElemnt.querySelectorAll('.map__filter');

const setInactiveState = () => {
  adFormElement.classList.add('ad-form--disabled');
  mapFilterElemnt.classList.add('map__filters--disabled');
  for (const formElement of adFormElements) {
    formElement.disabled = true;
  }
  for (const mapFilter of mapFilterElements) {
    mapFilter.disabled = true;
  }
};

const setActiveState = () => {
  adFormElement.classList.remove('ad-form--disabled');
  mapFilterElemnt.classList.remove('map__filters--disabled');
  for (const FormElement of adFormElements) {
    FormElement.disabled = false;
  }
  for (const mapFilter of mapFilterElements) {
    mapFilter.disabled = false;
  }
};

export {setActiveState, setInactiveState};
