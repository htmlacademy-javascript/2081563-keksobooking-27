import { MARKS_COUNT, PRICE } from './const.js';
import { markerGroup, renderMarks } from './map.js';

const housingTypeElement = document.querySelector('[name = "housing-type"]');
const housingPriceElement = document.querySelector('[name = "housing-price"]');
const housingRoomsElement = document.querySelector('[name = "housing-rooms"]');
const housingGuestsElement = document.querySelector('[name = "housing-guests"]');
const mapFiltersElement = document.querySelector('.map__filters');
const featuresElements = document.querySelectorAll('.map__checkbox');

const filterByType = (data) => {
  const filtered = data.filter((el) => {
    if (el.offer.type === housingTypeElement.value || housingTypeElement.value === 'any') {
      return true;
    }
  });
  return filtered;
};

const filterByPrice = (data) => {
  const filtered = data.filter((el) => {
    if (housingPriceElement.value === 'low') {
      if (el.offer.price <= PRICE.low) {
        return true;
      }
    }
    else if (housingPriceElement.value === 'middle') {
      if (el.offer.price >= PRICE.low && el.offer.price <= PRICE.middle) {
        return true;
      }
    }
    else if (housingPriceElement.value === 'high') {
      if (el.offer.price >= PRICE.middle) {
        return true;
      }
    }
    else if (housingPriceElement.value === 'any') {
      return true;
    }
  });
  return filtered;
};

const filterByRooms = (data) => {
  const filtered = data.filter((el) => {
    if (el.offer.rooms === Number(housingRoomsElement.value) || housingRoomsElement.value === 'any') {
      return true;
    }
  });
  return filtered;
};

const filterByGuests = (data) => {
  const filtered = data.filter((el) => {
    if (el.offer.guests === Number(housingGuestsElement.value) || housingGuestsElement.value === 'any') {
      return true;
    }
  });
  return filtered;
};

const filterFeatures = (data) => {
  const selectedFeatures = [];
  featuresElements.forEach((el) => {
    if (el.checked) {
      selectedFeatures.push(el.value);
    }
  });
  const filtered = data.filter((el) => {
    if (el.offer.features) {
      if (el.offer.features.every((feature) => feature.includes(selectedFeatures))) {
        return true;
      }
    }
  });
  return filtered;
};

const filterMap = (array) => {
  mapFiltersElement.addEventListener('change', () => {
    const newArray = filterByType(filterByPrice(filterByRooms(filterByGuests(filterFeatures(array)))));
    markerGroup.clearLayers();
    renderMarks(newArray.slice(0, MARKS_COUNT));
  });
};


export { filterMap };
