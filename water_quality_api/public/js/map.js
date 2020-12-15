var map;

function initMap () {
  map = new google.maps.Map(document.getElementById('map'),{
    center: { lat: 33.7830, lng: -118.1129 },
    mapTypeId: 'terrain',
    zoom: 13
  });
}

// Fetch wells from API
async function getWells(){
    const res = await fetch('/api/v1/wells');
    const data = await res.json();

    const wells = data.data.map(well => {
        return {
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: [
                    well.location.coordinates[0],
                    well.location.coordinates[1]
                ]
            },
            properites: {
                wellId: well.wellId,
                icon: 'shop'
            }
        };
    });
    loadMap();
}

// Load map with wells
function loadMap(wells){
    map.on('load', function(){
        map.addLayer({
            id: 'points',
            type: 'symbol',
            source: {
                type: 'geojson',
                data: {
                    type: 'FeatureCollection',
                    features: wells
                }
            },
            layout: {
                'icon-image': '{icon}-15',
                'icon-size': 1.5,
                'text-field': '{storeId}',
                'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
                'text-offset': [0, 0.9],
                'text-anchor': 'top'
            }
        });
    });
}