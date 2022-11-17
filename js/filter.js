import { MARKS_COUNT, Price } from './const.js';
import { markerGroup, renderMarks } from './map.js';
import { debounce } from './debounce.js';

const housingTypeElement = document.querySelector('[name = "housing-type"]');
const housingPriceElement = document.querySelector('[name = "housing-price"]');
const housingRoomsElement = document.querySelector('[name = "housing-rooms"]');
const housingGuestsElement = document.querySelector('[name = "housing-guests"]');
const featuresElements = document.querySelectorAll('.map__checkbox');

const filterByType = (data) => data.filter((el) => el.offer.type === housingTypeElement.value || housingTypeElement.value === 'any');

const filterByPrice = (data) => data.filter((el) => {
  if (housingPriceElement.value === 'low') {
    return (el.offer.price <= Price.LOW);
  }
  else if (housingPriceElement.value === 'middle') {
    return (el.offer.price >= Price.LOW && el.offer.price <= Price.MIDDLE);
  }
  else if (housingPriceElement.value === 'high') {
    return (el.offer.price >= Price.MIDDLE);
  }
  return (housingPriceElement.value === 'any');
});

const filterByRooms = (data) => data.filter((el) => el.offer.rooms === Number(housingRoomsElement.value) || housingRoomsElement.value === 'any');

const filterByGuests = (data) => data.filter((el) => el.offer.guests === Number(housingGuestsElement.value) || housingGuestsElement.value === 'any');

const filterFeatures = (data) => {
  const selectedFeatures = [];
  featuresElements.forEach((el) => {
    if (el.checked) {
      selectedFeatures.push(el.value);
    }
  });
  return data.filter((el) => {
    if (el.offer.features) {
      return selectedFeatures.every((feature) => el.offer.features.includes(feature));
    }
  }
  );
};

const renderFilterMarks = (array) => {
  const newFilterArray = filterByType(filterByPrice(filterByRooms(filterByGuests(filterFeatures(array)))));
  markerGroup.clearLayers();
  renderMarks(newFilterArray.slice(0, MARKS_COUNT));
};

const filterMarks = (element, array) => {
  element.addEventListener('change', debounce(() => {
    renderFilterMarks(array);
  }, 500));
};

const filterOffers = (array) => {
  filterMarks(housingTypeElement, array);
  filterMarks(housingPriceElement, array);
  filterMarks(housingRoomsElement, array);
  filterMarks(housingGuestsElement, array);
  featuresElements.forEach((el) => {
    el.addEventListener('change', debounce(() => {
      renderFilterMarks(array);
    }, 500));
  });
};

export { filterOffers, filterFeatures };
