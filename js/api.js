import {LINK_GET, LINK_POST} from './util.js';
import {showAlertMessage} from './messages.js';

function getData() {
  return fetch(LINK_GET)
    .then((response) => {
      if (response.ok) {
        return response;
      }
      throw new Error(showAlertMessage());
    });
}

function sendData(data) {
  return fetch(LINK_POST,
    {
      method: 'POST',
      body: data
    });
}

export { getData, sendData };
