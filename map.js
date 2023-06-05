const customIcon = L.icon({
  iconUrl: 'icon.png',
  iconSize: [15, 15],
  iconAnchor: [6, 15],
  popupAnchor: [0, -4],
  tooltipAnchor: [5, -10]
});

const markers = [];
let markerIndex = 0;

const imageUrl = 'map_auratera.jpg';
const imageWidth = 4096;
const imageHeight = 2560;

const map = L.map('map', {
  crs: L.CRS.Simple,
  minZoom: -Infinity,
  maxZoom: Infinity,
  attributionControl: false
});

function pixelToLatLng(pixelCoordinates) {
  const zoom = map.getZoom();
  return map.unproject(pixelCoordinates, zoom);
}

const southWest = map.unproject([0, imageHeight]);
const northEast = map.unproject([imageWidth, 0]);
const imageBounds = L.latLngBounds(southWest, northEast);

L.imageOverlay(imageUrl, imageBounds).addTo(map);

map.setView([-imageWidth / 2, imageHeight / 2], 0);

import pointsOfInterest from './locations.mjs';

function createMarker(point) {
  const [x, y, name, desc, img] = point;
  const pixelCoordinates = [x, y];
  const latLng = pixelToLatLng(pixelCoordinates);
  const marker = L.marker(latLng, {
    icon: customIcon
  });

  const link = document.createElement('a');
  link.href = '#';
  link.textContent = name;
  link.setAttribute('index', markerIndex);
  link.classList.add('planet-link');
  const markerLinks = document.getElementById('marker-links');
  markerLinks.appendChild(link);

  const span = document.createElement('span');
  span.textContent = '  |  ';
  span.classList.add('planet-link');
  markerLinks.appendChild(span);

  marker.bindTooltip('<b>' + name + '</b>');

  let text = '<b>' + name + '</b><hr />' + desc + '<hr />' + img;
  
  marker.bindPopup(text);
  marker.addTo(map);

  marker._id = markerIndex;
  marker.on('click', function() {
    const markerId = this._id;
  });
  markers.push(marker);

  markerIndex++;
}

for (const point of pointsOfInterest) {
  createMarker(point);
}

const links = document.querySelectorAll('#marker-links a');
links.forEach(function(link) {
  link.addEventListener('click', function(event) {
    event.preventDefault();
    const markerIndex = parseInt(this.getAttribute('index'), 10);
    markers[markerIndex].unbindTooltip();

    const markerClicked = markers[markerIndex];
    markerClicked.fire('click');

    setTimeout(function() {
      markers[markerIndex].bindTooltip();
    }, 1000);
  });
});
