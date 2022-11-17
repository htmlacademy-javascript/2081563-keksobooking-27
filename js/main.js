import { MARKS_COUNT } from './const.js';
import { renderMarks, setOnMapLoad } from './map.js';
import { getData } from './api.js';
import { showAlertMessage } from './messages.js';
import { attachFormListeners, setInactiveState, setActiveForm, setActiveFilters } from './forms.js';
import { filterOffers } from './filter.js';


setInactiveState();
attachFormListeners();

setOnMapLoad(() => {
  setActiveForm();
  getData()
    .then((data) => {
      setActiveFilters();
      renderMarks(data.slice(0, MARKS_COUNT));
      filterOffers(data);
    })
    .catch((error) => {
      showAlertMessage(error.message);
    });
});
