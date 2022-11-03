import './create-mocks.js';
import { renderOffers } from './generation.js';
import './slider.js';
import './validation.js';
import { renderMarks } from './map.js';
import './forms.js';
import { getData } from './api.js';
import './util.js';

getData()
  .then((response) => response.json())
  .then((data) => {
    renderOffers(data);
    renderMarks(data);
  })
  .catch((error) => error);
