import './create-mocks.js';
import { renderOffers } from './generation.js';
import { sliderReset } from './slider.js';
import { pristine } from './validation.js';
import { renderMarks, resetForm } from './map.js';
import { adFormElement } from './forms.js';
import { getData, sendData } from './api.js';
import './util.js';
import { showSuccesMessage, showErrorMessage } from './messages.js';

getData()
  .then((response) => response.json())
  .then((data) => {
    renderOffers(data);
    renderMarks(data);
  })
  .catch((error) => error);

adFormElement.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();
  if (isValid) {
    const formData = new FormData(evt.target);
    sendData(formData)
      .then((response) => {
        if (response.ok) {
          return response;
        }
        throw showErrorMessage();
      })
      .then(() => {
        resetForm();
        sliderReset();
        showSuccesMessage();
      }).catch((error) => error);
  }
});

adFormElement.addEventListener('reset', (evt) => {
  evt.preventDefault();
  resetForm();
  sliderReset();
});
