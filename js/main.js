import { renderOffers } from './generation.js';
import { renderMarks } from './map.js';
import { getData } from './api.js';
import { showAlertMessage } from './messages.js';
import {attachFormListeners} from './forms.js';
import './slider.js';

attachFormListeners();
getData()
  .then((data) => {
    renderOffers(data);
    renderMarks(data);
  })
  .catch(() => showAlertMessage());
