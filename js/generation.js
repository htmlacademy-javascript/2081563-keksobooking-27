import { TYPE_ROOMS } from './const.js';

const popupElement = document.querySelector('#card').content.querySelector('.popup');
const newFragment = [];
const renderOffers = (offers) => {
  offers.forEach(({ author, offer }) => {
    const copyPopupElement = popupElement.cloneNode(true);
    const removeElement = (selector) => {
      copyPopupElement.querySelector(selector).remove();
    };
    if (offer.title) {
      copyPopupElement.querySelector('.popup__title').textContent = offer.title;
    }
    else {
      removeElement('.popup__title');
    }
    if (offer.address) {
      copyPopupElement.querySelector('.popup__text--address').textContent = offer.address;
    }
    else {
      removeElement('.popup__text--address');
    }
    if (offer.price) {
      copyPopupElement.querySelector('.popup__text--price').textContent = `${offer.price} ₽/ночь`;
    }
    else {
      removeElement('.popup__text--price');
    }
    if (offer.type) {
      copyPopupElement.querySelector('.popup__type').textContent = TYPE_ROOMS[offer.type];
    }
    else {
      removeElement('.popup__type');
    }
    if (offer.rooms && offer.guests) {
      copyPopupElement.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
    }
    else {
      removeElement('.popup__text--capacity');
    }
    if (offer.checkin && offer.checkout) {
      copyPopupElement.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
    }
    else {
      removeElement('.popup__text--time');
    }
    const featuresListElements = copyPopupElement.querySelectorAll('.popup__feature');
    if (offer.features) {
      const modifiers = offer.features.map((el) => `popup__feature--${el}`);
      featuresListElements.forEach((featureList) => {
        const modifier = featureList.classList[1];
        if (!modifiers.includes(modifier)) {
          featureList.remove();
        }
      });
    }
    else {
      featuresListElements.forEach((el) => el.remove());
    }
    if (offer.description) {
      copyPopupElement.querySelector('.popup__description').textContent = offer.description;
    }
    else {
      removeElement('.popup__description');
    }
    if (author.avatar) {
      copyPopupElement.querySelector('.popup__avatar').src = author.avatar;
    }
    else {
      removeElement('.popup__avatar');
    }
    const photoContainerElement = copyPopupElement.querySelector('.popup__photos');
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
    newFragment.push(copyPopupElement);
  });
};
export { newFragment, renderOffers };
