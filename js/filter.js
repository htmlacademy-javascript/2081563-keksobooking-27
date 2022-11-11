import { MARKS_COUNT } from './const.js';
import { markerGroup, renderMarks } from './map.js';
import { renderOffers } from './generation.js';

const housingTypeElement = document.querySelector('[name = "housing-type"]');
const housingPriceElement = document.querySelector('[name = "housing-price"]');
const housingRoomsElement = document.querySelector('[name = "housing-rooms"]');
const housingGuestsElement = document.querySelector('[name = "housing-guests"]');
const mapFiltersElement = document.querySelector('.map__filters');

const mapFiltering = (array) => {
  mapFiltersElement.addEventListener('change', () => {
    const newArray = array.filter((el) => {
      if (el.offer.type === housingTypeElement.value) {
        return true;
      }
    });
    markerGroup.clearLayers();
    renderMarks(newArray.slice(0, MARKS_COUNT));
    renderOffers(newArray);
    renderMarks(newArray);
  });
};
export { mapFiltering };
