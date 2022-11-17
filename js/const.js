const LINK_GET = 'https://27.javascript.pages.academy/keksobooking/data';
const LINK_POST = 'https://27.javascript.pages.academy/keksobooking';
const MARKS_COUNT = 10;
const FILE_TYPES = ['jpg', 'jpeg', 'png'];
const RoomOptions = {
  '1': ['1'],
  '2': ['2', '1'],
  '3': ['3', '2', '1'],
  '100': ['0']
};

const MinPrice = {
  'BUNGALOW': 0,
  'FLAT': 1000,
  'HOTEL': 3000,
  'HOUSE': 5000,
  'PALACE': 10000
};

const RoomType = {
  FLAT: 'Квартира',
  BUNGALOW: 'Бунгало',
  HOUSE: 'Дом',
  PALACE: 'Дворец',
  HOTEL: 'Отель'
};

const Price = {
  LOW: 10000,
  MIDDLE: 50000
};

export {LINK_GET, LINK_POST, RoomOptions, MinPrice, RoomType, MARKS_COUNT, Price, FILE_TYPES};
