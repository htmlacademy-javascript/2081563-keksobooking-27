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
  const COPY_POPUP = POPUP.cloneNode(true);
  if (mock.offer.title) {
    COPY_POPUP.querySelector('.popup__title').textContent = mock.offer.title;
  }
  else {
    COPY_POPUP.querySelector('.popup__title').remove();
  }
  if (mock.offer.address) {
    COPY_POPUP.querySelector('.popup__text--address').textContent = mock.offer.address;
  }
  else {
    COPY_POPUP.querySelector('.popup__text--address').remove();
  }
  if (mock.offer.price) {
    COPY_POPUP.querySelector('.popup__text--price').textContent = `${mock.offer.price} ₽/ночь`;
  }
  else {
    COPY_POPUP.querySelector('.popup__text--price').remove();
  }
  if (mock.offer.type) {
    COPY_POPUP.querySelector('.popup__type').textContent = TYPE_ROOMS[mock.offer.type];
  }
  else {
    COPY_POPUP.querySelector('.popup__type').remove();
  }
  if (mock.offer.rooms && mock.offer.guests) {
    COPY_POPUP.querySelector('.popup__text--capacity').textContent = `${mock.offer.rooms} комнаты для ${mock.offer.guests} гостей`;
  }
  else {
    COPY_POPUP.querySelector('.popup__text--capacity').remove();
  }
  if (mock.offer.checkin && mock.offer.checkout) {
    COPY_POPUP.querySelector('.popup__text--time').textContent = `Заезд после ${mock.offer.checkin}, выезд до ${mock.offer.checkout}`;
  }
  else {
    COPY_POPUP.querySelector('.popup__text--time').remove();
  }
  const FEATURES_LISTS = COPY_POPUP.querySelectorAll('.popup__feature');
  const MODIFIERS = mock.offer.features.map((el) => `popup__feature--${el}`);
  if (mock.offer.features) {
    FEATURES_LISTS.forEach((featureList) => {
      const MODIFIER = featureList.classList[1];
      if (!MODIFIERS.includes(MODIFIER)) {
        featureList.remove();
      }
    });
  }
  else {
    FEATURES_LISTS.remove();
  }
  // FEATURES_LISTS.forEach((featuresList) => {
  //   const itHave = mock.offer.features.some(
  //     (el) => {
  //       featuresList.classList.contains(`popup__feature--${el}`);
  //     });
  //   console.log(itHave);
  //   if (!itHave) {
  //     featuresList.remove();
  //   }
  // });
  if (mock.offer.description) {
    COPY_POPUP.querySelector('.popup__description').textContent = mock.offer.description;
  }
  else {
    COPY_POPUP.querySelector('.popup__description').remove();
  }
  if (mock.author.avatar) {
    COPY_POPUP.querySelector('.popup__avatar').src = mock.author.avatar;
  }
  else {
    COPY_POPUP.querySelector('.popup__avatar').remove();
  }
  const PHOTO_CONTAINER = COPY_POPUP.querySelector('.popup__photos');
  const PHOTO_ITEM = PHOTO_CONTAINER.querySelector('.popup__photo');
  PHOTO_ITEM.remove();
  if (mock.offer.photos) {
    mock.offer.photos.forEach((el) => {
      const PHOTO_ITEM_ELEMENT = PHOTO_ITEM.cloneNode(true);
      PHOTO_ITEM_ELEMENT.src = el;
      PHOTO_CONTAINER.append(PHOTO_ITEM_ELEMENT);
    });
  }
  else {
    PHOTO_CONTAINER.remove();
  }
  NEW_FRAGMENT.append(COPY_POPUP);
});

MAP_CANVAS.append(NEW_FRAGMENT.children[0]);
