import { setActiveState, adFormElement } from './forms.js';
import { newFragment } from './generation.js';
const addressElement = document.querySelector('[name = "address"]');
const map = L.map('map-canvas').on('load', () => {
  setActiveState();
})
  .setView({
    lat: 35.682567,
    lng: 139.751143,
  }, 13);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52]
});
const minorIcon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});

const mainMarker = L.marker({
  lat: 35.682567,
  lng: 139.751143,
},
{
  draggable: 'true',
  icon: mainIcon
});
mainMarker.addTo(map);

mainMarker.on('moveend', (evt) => {
  addressElement.value = evt.target.getLatLng();
});

adFormElement.addEventListener('reset', () => {
  mainMarker.setLatLng({
    lat: 35.682567,
    lng: 139.751143,
  });
  map.setView({
    lat: 35.682567,
    lng: 139.751143
  }, 13);
});

const markerGroup = L.layerGroup().addTo(map);

const createMarker = (_, index) => {
  const address = newFragment[index].querySelector('.popup__text--address').textContent;
  const minorMarker = L.marker({
    lat: address.split(',')[0],
    lng: address.split(',')[1]
  },
  {
    icon: minorIcon
  });
  minorMarker.addTo(markerGroup).bindPopup(newFragment[index]);
};
newFragment.forEach((_, index) => {
  createMarker(_, index);
});
