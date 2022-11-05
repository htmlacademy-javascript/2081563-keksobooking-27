import { setActiveState } from './forms.js';
import { newFragment } from './generation.js';

const addressElement = document.querySelector('[name = "address"]');
const map = L.map('map-canvas');
const titleElement = document.querySelector('[name = "title"]');
const descriptionElement = document.querySelector('[name = "description"]');

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

map.on('load', () => {
  setActiveState();
  addressElement.value = `lat: ${mainMarker.getLatLng().lat.toFixed(5)}, lng: ${mainMarker.getLatLng().lng.toFixed(5)}`;
})
  .setView({
    lat: 35.682567,
    lng: 139.751143,
  }, 13);
mainMarker.on('moveend', (evt) => {
  const coordinatLatLng = evt.target.getLatLng();
  addressElement.value = `lat: ${coordinatLatLng.lat.toFixed(5)}, lng: ${coordinatLatLng.lng.toFixed(5)}`;
});

const resetMap = () => {
  mainMarker.setLatLng({
    lat: 35.682567,
    lng: 139.751143,
  });
  map.setView({
    lat: 35.682567,
    lng: 139.751143
  }, 13);
  addressElement.value = `lat: ${mainMarker.getLatLng().lat.toFixed(5)}, lng: ${mainMarker.getLatLng().lng.toFixed(5)}`;
};

const markerGroup = L.layerGroup().addTo(map);

const createMarker = (offer, index) => {
  const minorMarker = L.marker({
    lat: offer.location.lat,
    lng: offer.location.lng
  },
  {
    icon: minorIcon
  });
  minorMarker.addTo(markerGroup).bindPopup(newFragment[index]);
};
const renderMarks = (offers) => {
  offers.forEach((offer, index) => {
    createMarker(offer, index);
  });
};

function resetForm () {
  titleElement.value = '';
  descriptionElement.value = '';
  mainMarker.setLatLng({
    lat: 35.682567,
    lng: 139.751143,
  });
  map.setView({
    lat: 35.682567,
    lng: 139.751143
  }, 13);
  addressElement.value = `lat: ${mainMarker.getLatLng().lat.toFixed(5)}, lng: ${mainMarker.getLatLng().lng.toFixed(5)}`;
}

export {renderMarks, resetForm, resetMap, addressElement};
