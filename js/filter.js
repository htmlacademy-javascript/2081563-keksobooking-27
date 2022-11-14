import { MARKS_COUNT, PRICE } from './const.js';
import { markerGroup, renderMarks } from './map.js';
import { debounce } from './debounce.js';

const housingTypeElement = document.querySelector('[name = "housing-type"]');
const housingPriceElement = document.querySelector('[name = "housing-price"]');
const housingRoomsElement = document.querySelector('[name = "housing-rooms"]');
const housingGuestsElement = document.querySelector('[name = "housing-guests"]');
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
  return data.filter((el) => {
    if (el.offer.features) {
      return selectedFeatures.every((feature) => el.offer.features.includes(feature));
    }
  }
  );
};

const filteredMarks = (element, array) => {
  element.addEventListener('change', debounce( () => {
    const newArray = filterByType(filterByPrice(filterByRooms(filterByGuests(filterFeatures(array)))));
    markerGroup.clearLayers();
    renderMarks(newArray.slice(0, MARKS_COUNT));
  }, 500));
};

const filterOffers = (array) => {
  filteredMarks(housingTypeElement, array);
  filteredMarks(housingPriceElement, array);
  filteredMarks(housingRoomsElement, array);
  filteredMarks(housingGuestsElement, array);
  featuresElements.forEach((el) => {
    el.addEventListener('change', debounce( () => {
      const newArray = filterByType(filterByPrice(filterByRooms(filterByGuests(filterFeatures(array)))));
      markerGroup.clearLayers();
      renderMarks(newArray.slice(0, MARKS_COUNT));
    }, 500));
  });
};

export { filterOffers, filterFeatures };
