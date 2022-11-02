import {renderOffers} from './generation.js';
import { renderMarks } from './map.js';
fetch('https://27.javascript.pages.academy/keksobooking/data')
  .then((response) => {
    if (response.ok) {
      return response;
    }
    throw new Error ('ошибка');
  })
  .then((response) => response.json())
  .then((data) => {
    renderOffers(data);
    renderMarks(data);
  });

