const adFormElement = document.querySelector('.ad-form');
const adFormElements = adFormElement.querySelectorAll('.ad-form__element');
const mapFilterElement = document.querySelector('.map__filters');
const mapFilterElements = mapFilterElement.querySelectorAll('.map__filter');
const roomNumberElement = adFormElement.querySelector('[name = "rooms"]');
const capacityElement = adFormElement.querySelector('[name = "capacity"]');
const typeElement = adFormElement.querySelector('[name = "type"]');
const priceElement = adFormElement.querySelector('[name = "price"]');
const timeOutElement = adFormElement.querySelector('[name = "timeout"]');
const timeInElement = adFormElement.querySelector('[name = "timein"]');
const ROOM_OPTIONS = {
  '1': ['1'],
  '2': ['2', '1'],
  '3': ['3', '2', '1'],
  '100': ['0']
};
const MIN_PRICE = {
  'bungalow': 0,
  'flat': 1000,
  'hotel': 3000,
  'house': 5000,
  'palace': 10000
};

//Слайдер
const sliderElement = document.querySelector('.ad-form__slider');

noUiSlider.create(sliderElement, {
  start: MIN_PRICE[typeElement.value],
  range: {
    min: MIN_PRICE[typeElement.value],
    max: 100000
  },
  connect: 'lower',
  step: 0
});

sliderElement.noUiSlider.on('update', () => {
  priceElement.value = Math.round(sliderElement.noUiSlider.get());
});

typeElement.addEventListener('change', () => {
  sliderElement.noUiSlider.updateOptions({
    start: MIN_PRICE[typeElement.value],
    range: {
      min: MIN_PRICE[typeElement.value],
      max: 100000
    }
  });
});

priceElement.addEventListener('change', () => {
  sliderElement.noUiSlider.set(priceElement.value);
});

const setInactiveState = () => {
  adFormElement.classList.add('ad-form--disabled');
  mapFilterElement.classList.add('map__filters--disabled');
  for (const formElement of adFormElements) {
    formElement.disabled = true;
  }
  for (const mapFilter of mapFilterElements) {
    mapFilter.disabled = true;
  }
  sliderElement.setAttribute('dissabled', true);
};

// Состояние сайта
const setActiveState = () => {
  adFormElement.classList.remove('ad-form--disabled');
  mapFilterElement.classList.remove('map__filters--disabled');
  for (const formElement of adFormElements) {
    formElement.disabled = false;
  }
  for (const mapFilter of mapFilterElements) {
    mapFilter.disabled = false;
  }
  sliderElement.disabled('dissabled', false);
};

// Валидация
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

adFormElement.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
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

export { setActiveState, setInactiveState };
