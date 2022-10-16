import { createMocks } from './create-mocks.js';

const POPUP = document.querySelector('#card').content.querySelector('.popup');
const GENERATION_MOCKS = createMocks();
const TYPE_ROOMS = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель'
};
const MAP_CANVAS = document.querySelector('.map__canvas');
const NEW_FRAGMENT = document.createDocumentFragment();

GENERATION_MOCKS.forEach((mock) => {
  const COPY_ELEMENT = POPUP.cloneNode(true);
  COPY_ELEMENT.querySelector('.popup__title').textContent = mock.offer.title;
  COPY_ELEMENT.querySelector('.popup__text--address').textContent = mock.offer.address;
  COPY_ELEMENT.querySelector('.popup__text--price').textContent = `${mock.offer.price} ₽/ночь`;
  COPY_ELEMENT.querySelector('.popup__type').textContent = TYPE_ROOMS[mock.offer.type];
  COPY_ELEMENT.querySelector('.popup__text--capacity').textContent = `${mock.offer.rooms} комнаты для ${mock.offer.guests} гостей`;
  COPY_ELEMENT.querySelector('.popup__text--time').textContent = `Заезд после ${mock.offer.checkin}, выезд до ${mock.offer.checkout}`;
  const FEATURES_LISTS = COPY_ELEMENT.querySelectorAll('.popup__feature');
  const MODIFIERS = mock.offer.features.map((el) => `popup__feature--${el}`);
  FEATURES_LISTS.forEach((featureList) => {
    const MODIFIER = featureList.classList[1];
    if (MODIFIERS.includes(MODIFIER)) {
      featureList.remove();
    }
  });
  COPY_ELEMENT.querySelector('.popup__description').textContent = mock.offer.description;
  COPY_ELEMENT.querySelector('.popup__avatar').src = mock.author.avatar;
  const PHOTO_CONTAINER = COPY_ELEMENT.querySelector('.popup__photos');
  const PHOTO_ITEM = PHOTO_CONTAINER.querySelector('.popup__photo');
  PHOTO_ITEM.remove();
  mock.offer.photos.forEach((el) => {
    const PHOTO_ITEM_ELEMENT = PHOTO_ITEM.cloneNode(true);
    PHOTO_ITEM_ELEMENT.src = el;
    PHOTO_CONTAINER.append(PHOTO_ITEM_ELEMENT);
  });
  NEW_FRAGMENT.append(COPY_ELEMENT);
});

MAP_CANVAS.append(NEW_FRAGMENT.children[0]);

// massive mock.offer.features
// FEATURES_LISTS.forEach((featuresList) => {
//   const itHave = mock.offer.features.some(
//     (el) => {featuresList.classList.contains(`popup__feature--${el}`);
//     });
//   console.log(itHave);
//   if (!itHave) {
//     featuresList.remove();
//   }
// });
