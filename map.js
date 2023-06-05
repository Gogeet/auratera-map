var i = 0;
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

map.setView([-imageHeight / 2, imageWidth / 2], 0);

import pointsOfInterest from './locations.mjs';

function createMarker(point) {
  const [x, y, name, short_desc, desc, pics] = point;
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

  if(i < pointsOfInterest.length-1) {
    const span = document.createElement('span');
    span.textContent = '  |  ';
    span.classList.add('planet-link');
    markerLinks.appendChild(span);
  }

  i++;
  
  marker.bindTooltip('<b>' + name + '</b>');

  let text = '<b>' + name + '</b><hr />' + short_desc;

  marker.bindPopup(text);
  marker.addTo(map);

  marker._id = markerIndex;
  marker.on('click', function() {
    const markerId = this._id;
    const locationName = document.getElementById('location-name');
    const locationDescription = document.getElementById('location-description');
    const locationPics = document.getElementById('location-pics');

    const point = pointsOfInterest[markerId];

    locationName.innerHTML = '<h2>' + name + '</h2><hr />';
    locationDescription.innerHTML = desc;

    if(pics !== undefined) {
      locationPics.innerHTML = '<hr />' + pics;
    } else {
      locationPics.innerHTML = '';
    }
    

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

function setAurateraContent() {
  const locationName = document.getElementById('location-name');
  const locationDescription = document.getElementById('location-description');
  const locationPics = document.getElementById('location-pics');

  const name = "Auratera"
  const desc = '<h3>The Vorzyd Sector</h3><p>The VORZYD SECTOR is a sector within the Outer Rim in R-6 of the Galactic Standard Grid (Atlas Appendix, p. 241) and is connected to the Salin Corridor hyperroute. In 343 BTC it was part of the Empire. The last great battle in that region was during the Mandalorian Wars at 308 BTC where the planet was in hands of the Republic since and the last known conflict in the region was in 15 ATC during the Second Galactic War (SWTOR: Rise of the Hutt Cartel).<br/><br /><img src=\"./img_loc/vorzyd.png\" alt=\"Image of the Vorzyd Sector\"></img></p><hr /><h3>The Auratera System</h3><p>The AURATERA SYSTEM is a binary star system within the Vorzyd sector in the galaxy\'s Outer Rim region. It is a dual-star system hosting the two suns Aurell and Ryern that are orbited by three planets, including the terrestrial world Auratera. (Nexus of Power, p. 49) It is located at the point R-6 in the Galactic Standard Grid (Atlas Appendix, p. 241) and close to the hyperroute Warriors\' Trace/Salin Corridor (Nexus of power, p. 48)</p><br /><h4>The large sun - Aurell</h4><p>AURELL is the larger star of the Auratera system, along with Ryern, located in the Vorzyd sector of the galaxy. Several planets in the star system pass by AURELL , and the position of the sun to the worlds also has a significant impact on how brightly the worlds are illuminated.<br /><br />The unusual star system configuration of the Auratera system ensures that the sky of the world Auratera is always brightly illuminated, and night only falls when the star AURELL eclipses the smaller sun Ryern. Apart from that, the amount of sunlight that illuminates Auratera depends on how close the world is to the smaller star. In some cases where both Ryern and AURELL are positioned next to each other, Auratera experiences particularly bright standard days and very warm temperatures, with the world even shining at night. Ryern emits one-third of the light that AURELL does, when the sun is positioned very close to Auratera. (Nexus of Power, p. 49)</p><br /><h4>The small sun - Ryern</h4><p>RYERN is beside Aurell the smaller star of the Auratera system located within the Vorzyd sector of the known galaxy. Several planets orbit RYERN and the sun\'s position to these worlds has a significant effect on how strongly these worlds are illuminated.<br /><br />The unusual star system configuration of the Auratera system ensures that the sky of the world Auratera is always brightly illuminated, and night only falls when the star Aurell eclipses the smaller sun RYERN. Apart from that, the amount of sunlight that illuminates Auratera depends on how close the world is to the smaller star. In some cases where both RYERN and Aurell are positioned next to each other, Auratera experiences particularly bright standard days and very warm temperatures, with the world even shining at night. RYERN emits one-third of the light that Aurell does, when the sun is positioned very close to Auratera. (Nexus of Power, p. 49)</p><br /><img src=\"./img_loc/aurell.png\" alt=\"Image of the Twin Suns\"></img><hr /><h3>The main hyperroute</h3><p>Auratera is close to the oldest hyperroute of the galaxy, the SALIN CORRIDOR. At the time of Auratera\'s discovery it was still named by its antic name WARRIOR\'S TRACE (Nexus of Power, p. 48). Many hyperspace beacons of the Tionese Empire were there too. (StarWars.com).<br /><br /><img src=\"./img_loc/hyperroute.png\" alt=\"Image of the Salin Corridor\"></img></p>';

  locationName.innerHTML = '<h2>' + name + '</h2><hr />';
  locationDescription.innerHTML = desc;
  locationPics.innerHTML = '';
}

const aurateraLink = document.getElementById("auratera-link");
aurateraLink.addEventListener("click", function(event) {
  event.preventDefault();
  setAurateraContent();
});