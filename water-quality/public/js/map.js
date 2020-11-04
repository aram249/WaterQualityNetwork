var map;

function initMap () {
  map = new google.maps.Map(document.getElementById('map'),{
    center: { lat: 33.7830, lng: -118.1129 },
    mapTypeId: 'terrain',
    zoom: 13
  });
};