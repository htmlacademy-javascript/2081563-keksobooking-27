function getRandomNumber(min, max, round = 1) {
  let result;

  if (min < 0 || max < 0 || round < 0) {
    result = NaN;
  }

  else if (min > max) {
    result = (Math.random() * (min - max + 1) + min).toFixed(round);
  }

  result = (Math.random() * (max - min + 1) + min).toFixed(round);

  return +result;
}

getRandomNumber();

const TYPE = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const TIME = ['12:00', '13:00', '14:00'];
const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator'];
const PHOTOS = ['https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg', 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg', 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'];

const getAvatar = function() {
  return String(getRandomNumber(1,10,0)).padStart(2, '0');
};

const shuffleArray = function (array) {
  return array.sort( () => .5 - Math.random());
};

const createObject = function() {
  const LAT = getRandomNumber(35.65000, 35.70000, 5);
  const LNG = getRandomNumber(139.70000, 139.80000, 5);
  return {
    author: {
      avatar: `img/avatars/user${getAvatar()}.png`
    },
    offer: {
      title: 'Обратите внимание!',
      address: `${LAT}, ${LNG}`,
      price: getRandomNumber(1, 1000000, 0),
      type: TYPE[getRandomNumber(0,4,0)],
      rooms: getRandomNumber(1, 5, 0),
      guests: getRandomNumber(1, 3, 0),
      checkin: TIME[getRandomNumber(0,2,0)],
      checkout: TIME[getRandomNumber(0,2,0)],
      features: shuffleArray(FEATURES).slice(0, getRandomNumber(0, FEATURES.length - 1, 0)),
      description: 'Милая уютная квартира на окраине города',
      photos: shuffleArray(PHOTOS).slice(0, getRandomNumber(0, PHOTOS.length - 1, 0)),
    },
    location: {
      lat: LAT,
      lng: LNG
    }
  };
};

createObject();

const similarObject = Array.from({length: 10}, createObject);

let uniqueArray = similarObject.filter(function(item, pos) {
  return similarObject.indexOf(item) == pos;
})
