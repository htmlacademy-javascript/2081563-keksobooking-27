const LINK_GET = 'https://27.javascript.pages.academy/keksobooking/data';
const LINK_POST = 'https://27.javascript.pages.academy/keksobooking';

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

const TYPE_ROOMS = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель'
};

export {LINK_GET, LINK_POST, ROOM_OPTIONS, MIN_PRICE, TYPE_ROOMS};
