import { setActiveState, updateAddressValue } from './forms.js';
import { newFragment } from './generation.js';

const map = L.map('map-canvas');

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
  updateAddressValue(mainMarker);
})
  .setView({
    lat: 35.682567,
    lng: 139.751143,
  }, 13);
mainMarker.on('moveend', () => {
  updateAddressValue(mainMarker);
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
  updateAddressValue(mainMarker);
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

export {renderMarks, resetMap};
