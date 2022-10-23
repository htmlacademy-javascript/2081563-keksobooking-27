const adFormElement = document.querySelector('.ad-form');
const adFormElements = adFormElement.querySelectorAll('.ad-form__element');
const mapFilterElemnt = document.querySelector('.map__filters');
const mapFilterElements = mapFilterElemnt.querySelectorAll('.map__filter');
const roomNumberElement = adFormElement.querySelector('[name = "rooms"]');
const capacityElement = adFormElement.querySelector('[name = "capacity"]');
const ROOM_OPTIONS = {
  '1': ['1'],
  '2': ['2', '1'],
  '3': ['3', '2', '1'],
  '100': ['0']
};

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
  for (const formElement of adFormElements) {
    formElement.disabled = false;
  }
  for (const mapFilter of mapFilterElements) {
    mapFilter.disabled = false;
  }
};

const pristine = new Pristine(adFormElement, {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
  errorTextClass: 'ad-form__element--invalid'
});
function validateRoomNuber() {
  return ROOM_OPTIONS[roomNumberElement.value].includes(capacityElement.value);
}
function errorMessage() {
  if (capacityElement.value === '0') {
    return `Только 100 комнат
    ${capacityElement.options[capacityElement.selectedIndex].text}`;
  }
  return `
  ${roomNumberElement.options[roomNumberElement.selectedIndex].text}
  не ${capacityElement.options[capacityElement.selectedIndex].text}
  `;
}

pristine.addValidator(roomNumberElement, validateRoomNuber, errorMessage);
pristine.addValidator(capacityElement, validateRoomNuber, errorMessage);
function validateOnChange(form, form2) {
  form.addEventListener('change', () => {
    pristine.validate(form2);
  });
  form2.addEventListener('change', () => {
    pristine.validate(form);
  });
}
validateOnChange(roomNumberElement, capacityElement);

adFormElement.addEventListener('submit', () => {
  pristine.validate();
});
export { setActiveState, setInactiveState };
