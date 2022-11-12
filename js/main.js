import { renderMarks } from './map.js';
import { getData } from './api.js';
import { showAlertMessage } from './messages.js';
import { attachFormListeners, setInactiveState } from './forms.js';
import { MARKS_COUNT } from './const.js';
import {filterMap} from './filter.js';

attachFormListeners();
getData()
  .then((data) => {
    renderMarks(data.slice(0, MARKS_COUNT));
    filterMap(data);
  })
  .catch((error) => {
    showAlertMessage(error.message);
    setInactiveState();
  });

