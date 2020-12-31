let map;

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 13,
    center: new google.maps.LatLng(33.7830, -118.1129),
    mapTypeId: 'roadmap'
  });

  const iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';
  const icons = {
    activewells:{ 
      name: 'Active Wells',
      icon: 'http://maps.google.com/mapfiles/kml/paddle/blu-blank-lv.png'
    },
    miscWells:{
      name: 'Miscellaneous Wells',
      icon: 'http://maps.google.com/mapfiles/kml/paddle/ylw-blank-lv.png'
    },
    MonoWells:{
        name: "Monitoring wells",
        icon: 'http://maps.google.com/mapfiles/kml/paddle/grn-blank-lv.png'
    }
  };

  function addMarker(feature) {
    var marker = new google.maps.Marker({
      position: feature.position,
      icon: icons[feature.type].icon,
      map: map
    });

    // since not every feature has content, only add infoWindow when content exist
    if(feature.content){
        var marker_infoWindow = new google.maps.InfoWindow({
          content: feature.content
        });

        marker.addListener('click', function() {
          marker_infoWindow.open(map, marker);
        });


    }

  }

  var features = [
  // Active Wells in LB  
  {
      position: new google.maps.LatLng(33.83155, -118.102369),
      content: '<h6>Data Measurements</h6> <h6>ph = </h6> <h6>Ec = </h6> <h6>Temperature = 27.325</h6> <h6>Turbidity = </h6>',
      type: 'activewells'
    }, {
      position: new google.maps.LatLng(33.830464, -118.113013),
      content: '<h6>Data Measurements</h6> <h6>ph = </h6> <h6>Ec = </h6> <h6>Temp = </h6> <h6>Turbidity = </h6>',
      type: 'activewells'
    }, {
      position: new google.maps.LatLng(33.830378, -118.124025),
      content: '<h6>Data Measurements</h6> <h6>ph = </h6> <h6>Ec = </h6> <h6>Temp = </h6> <h6>Turbidity = </h6>',
      type: 'activewells'
    }, {
      position: new google.maps.LatLng(33.830375, -118.12082),
      content: '<h6>Data Measurements</h6> <h6>ph = </h6> <h6>Ec = </h6> <h6>Temp = </h6> <h6>Turbidity = </h6>',
      type: 'activewells'
    }, {
      position: new google.maps.LatLng(33.830417, -118.105052),
      content: '<h6>Data Measurements</h6> <h6>ph = </h6> <h6>Ec = </h6> <h6>Temp = </h6> <h6>Turbidity = </h6>',
      type: 'activewells'
    }, {
      position: new google.maps.LatLng(33.831926, -118.099261),
      content: '<h6>Data Measurements</h6> <h6>ph = </h6> <h6>Ec = </h6> <h6>Temp = </h6> <h6>Turbidity = </h6>',
      type: 'activewells'
    }, {
      position: new google.maps.LatLng(33.828767, -118.087819),
      content: '<h6>Data Measurements</h6> <h6>ph = </h6> <h6>Ec = </h6> <h6>Temp = </h6> <h6>Turbidity = </h6>',
      type: 'activewells'
    }, {
      position: new google.maps.LatLng(33.825665, -118.084148),
      content: '<h6>Data Measurements</h6> <h6>ph = </h6> <h6>Ec = </h6> <h6>Temp = </h6> <h6>Turbidity = </h6>',
      type: 'activewells'
    }, {
      position: new google.maps.LatLng(33.824912, -118.091661),
      content: '<h6>Data Measurements</h6> <h6>ph = </h6> <h6>Ec = </h6> <h6>Temp = </h6> <h6>Turbidity = </h6>',
      type: 'activewells'
    }, {
      position: new google.maps.LatLng(33.822133, -118.091354),
      content: '<h6>Data Measurements</h6> <h6>ph = </h6> <h6>Ec = </h6> <h6>Temp = </h6> <h6>Turbidity = </h6>',
      type: 'activewells'
    }, {
      position: new google.maps.LatLng(33.819996, -118.091016),
      content: '<h6>Data Measurements</h6> <h6>ph = </h6> <h6>Ec = </h6> <h6>Temp = </h6> <h6>Turbidity = </h6>',
      type: 'activewells'
    }, {
      position: new google.maps.LatLng(33.810208, -118.096899),
      content: '<h6>Data Measurements</h6> <h6>ph = </h6> <h6>Ec = </h6> <h6>Temp = </h6> <h6>Turbidity = </h6>',
      type: 'activewells'
    }, {
      position: new google.maps.LatLng(33.810353, -118.10339),
      content: '<h6>Data Measurements</h6> <h6>ph = </h6> <h6>Ec = </h6> <h6>Temp = </h6> <h6>Turbidity = </h6>',
      type: 'activewells'
    }, {
      position: new google.maps.LatLng(33.817933, -118.108255),
      content: '<h6>Data Measurements</h6> <h6>ph = </h6> <h6>Ec = </h6> <h6>Temp = </h6> <h6>Turbidity = </h6>',
      type: 'activewells'
    }, {
      position: new google.maps.LatLng(33.819242, -118.134382),
      content: '<h6>Data Measurements</h6> <h6>ph = </h6> <h6>Ec = </h6> <h6>Temp = </h6> <h6>Turbidity = </h6>',
      type: 'activewells'
    }, {
      position: new google.maps.LatLng(33.823555, -118.13427),
      content: '<h6>Data Measurements</h6> <h6>ph = </h6> <h6>Ec = </h6> <h6>Temp = </h6> <h6>Turbidity = </h6>',
      type: 'activewells'
    }, {
      position: new google.maps.LatLng(33.810244, -118.150926),
      content: '<h6>Data Measurements</h6> <h6>ph = </h6> <h6>Ec = </h6> <h6>Temp = </h6> <h6>Turbidity = </h6>',
      type: 'activewells'
    }, {
      position: new google.maps.LatLng(33.798083, -118.138175),
      content: '<h6>Data Measurements</h6> <h6>ph = </h6> <h6>Ec = </h6> <h6>Temp = </h6> <h6>Turbidity = </h6>',
      type: 'activewells'
    }, 
    {
      position: new google.maps.LatLng(33.798083, -118.138175),
      content: '<h6>Data Measurements</h6> <h6>ph = </h6> <h6>Ec = </h6> <h6>Temp = </h6> <h6>Turbidity = </h6>',
      type: 'activewells'
    }, {
      position: new google.maps.LatLng(33.799551, -118.138094),
      content: '<h6>Data Measurements</h6> <h6>ph = </h6> <h6>Ec = </h6> <h6>Temp = </h6> <h6>Turbidity = </h6>',
      type: 'activewells'
    },
    {
      position: new google.maps.LatLng(33.799508, -118.13641),
      content: '<h6>Data Measurements</h6> <h6>ph = </h6> <h6>Ec = </h6> <h6>Temp = </h6> <h6>Turbidity = </h6>',
      type: 'activewells'
    }, {
      position: new google.maps.LatLng(33.815513, -118.15928),
      content: '<h6>Data Measurements</h6> <h6>ph = </h6> <h6>Ec = </h6> <h6>Temp = </h6> <h6>Turbidity = </h6>',
      type: 'activewells'
    },
    {
      position: new google.maps.LatLng(33.827911, -118.165699),
      content: '<h6>Data Measurements</h6> <h6>ph = </h6> <h6>Ec = </h6> <h6>Temp = </h6> <h6>Turbidity = </h6>',
      type: 'activewells'
    }, {
      position: new google.maps.LatLng(33.851619, -118.175488),
      content: '<h6>Data Measurements</h6> <h6>ph = </h6> <h6>Ec = </h6> <h6>Temp = </h6> <h6>Turbidity = </h6>',
      type: 'activewells'
    },
    {
      position: new google.maps.LatLng(33.851542, -118.175488),
      content: '<h6>Data Measurements</h6> <h6>ph = </h6> <h6>Ec = </h6> <h6>Temp = </h6> <h6>Turbidity = </h6>',
      type: 'activewells'
    }, {
      position: new google.maps.LatLng(33.851443, -118.171968),
      content: '<h6>Data Measurements</h6> <h6>ph = </h6> <h6>Ec = </h6> <h6>Temp = </h6> <h6>Turbidity = </h6>',
      type: 'activewells'
    },
    {
      position: new google.maps.LatLng(33.83874, -118.167908),
      content: '<h6>Data Measurements</h6> <h6>ph = </h6> <h6>Ec = </h6> <h6>Temp = </h6> <h6>Turbidity = </h6>',
      type: 'activewells'
    }, {
      position: new google.maps.LatLng(33.830516, -118.133328),
      content: '<h6>Data Measurements</h6> <h6>ph = </h6> <h6>Ec = </h6> <h6>Temp = </h6> <h6>Turbidity = </h6>',
      type: 'activewells'
    },
    {
      position: new google.maps.LatLng(33.820374, -118.129576),
      content: '<h6>Data Measurements</h6> <h6>ph = </h6> <h6>Ec = </h6> <h6>Temp = </h6> <h6>Turbidity = </h6>',
      type: 'activewells'
    }, {
      position: new google.maps.LatLng(33.810344, -118.155230),
      content: '<h6>Data Measurements</h6> <h6>ph = </h6> <h6>Ec = </h6> <h6>Temp = </h6> <h6>Turbidity = </h6>',
      type: 'activewells'
    },

    //// MISC Wells 
    {
      position: new google.maps.LatLng(33.842163, -118.199212),
      content: '<h6>Data Measurements</h6> <h6>ph = </h6> <h6>Ec = </h6> <h6>Temp = </h6> <h6>Turbidity = </h6>',
      type: 'miscWells'
    }, {
      position: new google.maps.LatLng(33.825731, -118.08851),
      content: '<h6>Data Measurements</h6> <h6>ph = </h6> <h6>Ec = </h6> <h6>Temp = </h6> <h6>Turbidity = </h6>',
      type: 'miscWells',
    },

    // Adding Monitoring Wells 
    {
      position: new google.maps.LatLng(33.879445, -118.206371),
      content: '<h6>Data Measurements</h6> <h6>ph = </h6> <h6>Ec = </h6> <h6>Temp = </h6> <h6>Turbidity = </h6>',
      type: 'MonoWells'
    }, {
      position: new google.maps.LatLng(33.873186, -118.15452),
      content: '<h6>Data Measurements</h6> <h6>ph = </h6> <h6>Ec = </h6> <h6>Temp = </h6> <h6>Turbidity = </h6>',
      type: 'MonoWells',
    },
    {
      position: new google.maps.LatLng(33.865788, -118.186141),
      content: '<h6>Data Measurements</h6> <h6>ph = </h6> <h6>Ec = </h6> <h6>Temp = </h6> <h6>Turbidity = </h6>',
      type: 'MonoWells'
    }, {
      position: new google.maps.LatLng(33.836031, -118.193997),
      content: '<h6>Data Measurements</h6> <h6>ph = </h6> <h6>Ec = </h6> <h6>Temp = </h6> <h6>Turbidity = </h6>',
      type: 'MonoWells',
    },
    {
      position: new google.maps.LatLng(33.824112, -118.212817),
      content: '<h6>Data Measurements</h6> <h6>ph = </h6> <h6>Ec = </h6> <h6>Temp = </h6> <h6>Turbidity = </h6>',
      type: 'MonoWells'
    }, {
      position: new google.maps.LatLng(33.815198, -118.211367),
      content: '<h6>Data Measurements</h6> <h6>ph = </h6> <h6>Ec = </h6> <h6>Temp = </h6> <h6>Turbidity = </h6>',
      type: 'MonoWells',
    },
    {
      position: new google.maps.LatLng(33.788116, -118.211737),
      content: '<h6>Data Measurements</h6> <h6>ph = </h6> <h6>Ec = </h6> <h6>Temp = </h6> <h6>Turbidity = </h6>',
      type: 'MonoWells'
    }, {
      position: new google.maps.LatLng(33.821175, -118.086),
      content: '<h6>Data Measurements</h6> <h6>ph = </h6> <h6>Ec = </h6> <h6>Temp = </h6> <h6>Turbidity = </h6>',
      type: 'MonoWells',
    },
    {
      position: new google.maps.LatLng(33.808823, -118.125523),
      content: '<h6>Data Measurements</h6> <h6>ph = </h6> <h6>Ec = </h6> <h6>Temp = </h6> <h6>Turbidity = </h6>',
      type: 'MonoWells'
    }, {
      position: new google.maps.LatLng(33.795788, -118.107714),
      content: '<h6>Data Measurements</h6> <h6>ph = </h6> <h6>Ec = </h6> <h6>Temp = </h6> <h6>Turbidity = </h6>',
      type: 'MonoWells',
    },
    {
      position: new google.maps.LatLng(33.788594, -118.108074),
      content: '<h6>Data Measurements</h6> <h6>ph = </h6> <h6>Ec = </h6> <h6>Temp = </h6> <h6>Turbidity = </h6>',
      type: 'MonoWells'
    }, {
      position: new google.maps.LatLng(33.788582, -118.112514),
      content: '<h6>Data Measurements</h6> <h6>ph = </h6> <h6>Ec = </h6> <h6>Temp = </h6> <h6>Turbidity = </h6>',
      type: 'MonoWells',
    },
    {
      position: new google.maps.LatLng(33.787157, -118.123403),
      content: '<h6>Data Measurements</h6> <h6>ph = </h6> <h6>Ec = </h6> <h6>Temp = </h6> <h6>Turbidity = </h6>',
      type: 'MonoWells'
    }, {
      position: new google.maps.LatLng(33.783329, -118.156691),
      content: '<h6>Data Measurements</h6> <h6>ph = </h6> <h6>Ec = </h6> <h6>Temp = </h6> <h6>Turbidity = </h6>',
      type: 'MonoWells',
    },
    {
      position: new google.maps.LatLng(33.761466, -118.096569),
      content: '<h6>Data Measurements</h6> <h6>ph = </h6> <h6>Ec = </h6> <h6>Temp = </h6> <h6>Turbidity = </h6>',
      type: 'MonoWells',
    },
    {
      position: new google.maps.LatLng(33.763401, -118.102229),
      content: '<h6>Data Measurements</h6> <h6>ph = </h6> <h6>Ec = </h6> <h6>Temp = </h6> <h6>Turbidity = </h6>',
      type: 'MonoWells',
    },
  ];

  // Implement Rectangle for LBWD department
  const rectangle = new google.maps.Rectangle({
      map: map,
      strokeColor: "#0000FF",
      strokeOpacity: 0.8,
      strokeWidth: 2, 
      fillColor: "#0000FF",
      fillOpacity: 0.35,

      bounds: {
          north: 33.818798, 
          south: 33.817202,
          east: -118.168993,
          west: -118.171890, 
          }
      });

      // Implement Rectangle for LBWD treatment plant
      const rectangle2 = new google.maps.Rectangle({
          map: map,
          strokeColor: "#0000FF",
          strokeOpacity: 0.8,
          strokeWidth: 2, 
          fillColor: "#0000FF",
          fillOpacity: 0.35,
          bounds: {
              north: 33.804257,
              south: 33.801583,
              east: -118.149988,
              west: -118.151242
          }
      });

      const rectangle3 = new google.maps.Rectangle({
          map: map,
          strokeColor: "#0000FF",
          strokeOpacity: 0.8,
          strokeWidth: 2, 
          fillColor: "#0000FF",
          fillOpacity: 0.35,
          bounds: {
              north: 33.815217,
              south: 33.815044,
              east: -118.173690,
              west: -118.174024
          }
      });

  for (var i = 0, feature; feature = features[i]; i++) {
    addMarker(feature);
  }

  var legend = document.getElementById('legend');
  for (var key in icons) {
    var type = icons[key];
    var name = type.name;
    var icon = type.icon;
    var div = document.createElement('div');
    div.innerHTML = '<img src="' + icon + '"> ' + name;
    legend.appendChild(div);
  }

  map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(legend);
}


async function getWells(){
  const res = await fetch('/api/v1/wells');
  const data = await res.json();

  const wells = data.data.map(well => {
    return {
      properites: {
        Temperature: well.Temperature
      }
    }
  })
}

getWells();



// Fetch and get from the API will come back to this eventually 
//
//
// // Fetch wells from API
// async function getWells(){
//     const res = await fetch('/api/v1/wells');
//     const data = await res.json();

//     const wells = data.data.map(well => {
//         return {
//             type: 'Feature',
//             geometry: {
//                 type: 'Point',
//                 coordinates: [
//                     well.location.coordinates[0],
//                     well.location.coordinates[1]
//                 ]
//             },
//             properites: {
//                 wellId: well.wellId,
//                 icon: 'shop'
//             }
//         };
//     });
//     loadMap();
// }

// // Load map with wells
// function loadMap(wells){
//     map.on('load', function(){
//         map.addLayer({
//             id: 'points',
//             type: 'symbol',
//             source: {
//                 type: 'geojson',
//                 data: {
//                     type: 'FeatureCollection',
//                     features: wells
//                 }
//             },
//             layout: {
//                 'icon-image': '{icon}-15',
//                 'icon-size': 1.5,
//                 'text-field': '{storeId}',
//                 'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
//                 'text-offset': [0, 0.9],
//                 'text-anchor': 'top'
//             }
//         });
//     });
// }

// getWells();