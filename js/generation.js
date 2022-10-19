import { createMocks } from './create-mocks.js';

const popupElement = document.querySelector('#card').content.querySelector('.popup');
const offers = createMocks();
const TYPE_ROOMS = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель'
};
const mapCanvasElement = document.querySelector('.map__canvas');
const newFragment = document.createDocumentFragment();

offers.forEach(({author, offer}) => {
  const copyPopup = popupElement.cloneNode(true);
  const removeElement = (selector) => {
    copyPopup.querySelector(selector).remove();
  };
  if (offer.title) {
    copyPopup.querySelector('.popup__title').textContent = offer.title;
  }
  else {
    removeElement('.popup__title');
  }
  if (offer.address) {
    copyPopup.querySelector('.popup__text--address').textContent = offer.address;
  }
  else {
    removeElement('.popup__text--address');
  }
  if (offer.price) {
    copyPopup.querySelector('.popup__text--price').textContent = `${offer.price} ₽/ночь`;
  }
  else {
    removeElement('.popup__text--price');
  }
  if (offer.type) {
    copyPopup.querySelector('.popup__type').textContent = TYPE_ROOMS[offer.type];
  }
  else {
    removeElement('.popup__type');
  }
  if (offer.rooms && offer.guests) {
    copyPopup.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
  }
  else {
    removeElement('.popup__text--capacity');
  }
  if (offer.checkin && offer.checkout) {
    copyPopup.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
  }
  else {
    removeElement('.popup__text--time');
  }
  const featuresListElements = copyPopup.querySelectorAll('.popup__feature');
  const modifiers = offer.features.map((el) => `popup__feature--${el}`);
  if (offer.features) {
    featuresListElements.forEach((featureList) => {
      const modifier = featureList.classList[1];
      if (!modifiers.includes(modifier)) {
        featureList.remove();
      }
    });
  }
  else {
    featuresListElements.remove();
  }
  if (offer.description) {
    copyPopup.querySelector('.popup__description').textContent = offer.description;
  }
  else {
    removeElement('.popup__description');
  }
  if (author.avatar) {
    copyPopup.querySelector('.popup__avatar').src = author.avatar;
  }
  else {
    removeElement('.popup__avatar');
  }
  const photoContainerElement = copyPopup.querySelector('.popup__photos');
  const photoElement = photoContainerElement.querySelector('.popup__photo');
  photoElement.remove();
  if (offer.photos) {
    offer.photos.forEach((el) => {
      const photoItemElement = photoElement.cloneNode(true);
      photoItemElement.src = el;
      photoContainerElement.append(photoItemElement);
    });
  }
  else {
    photoContainerElement.remove();
  }
  newFragment.append(copyPopup);
});

mapCanvasElement.append(newFragment.children[0]);
