import {LINK_GET, LINK_POST} from './const.js';


function getData() {
  return fetch(LINK_GET)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('При загрузке данных с сервера произошла ошибка');
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
