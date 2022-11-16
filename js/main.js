import { renderMarks } from './map.js';
import { getData } from './api.js';
import { showAlertMessage } from './messages.js';
import { attachFormListeners, setInactiveState, setActiveState } from './forms.js';
import { MARKS_COUNT } from './const.js';
import {filterOffers} from './filter.js';

setInactiveState();
attachFormListeners();
getData()
  .then((data) => {
    setActiveState();
    renderMarks(data.slice(0, MARKS_COUNT));
    filterOffers(data);
  })
  .catch((error) => {
    showAlertMessage(error.message);
    setInactiveState();
  });

