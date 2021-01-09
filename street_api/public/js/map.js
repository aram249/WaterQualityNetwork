var LaCollision = $.ajax({
    url: "https://data.lacity.org/resource/d5tf-ez2w.geojson",
    dataType: "json",
    success: console.log("County data successfully loaded."),
    error: function(xhr) {
      alert(`Counties: ${xhr.statusText}`);
    }
  });


//   var LaCitations = $.ajax({
//     url: "https://data.lacity.org/resource/wjz9-h9np.geojsons",
//     dataType: "json",
//     success: console.log("County data successfully loaded."),
//     error: function(xhr) {
//       alert(`LaCitations: ${xhr.statusText}`);
//     }
//   });

//   var LaCrime = $.ajax({
//     url: "https://data.lacity.org/resource/63jg-8b9z.geojson",
//     dataType: "json",
//     success: console.log("County data successfully loaded."),
//     error: function(xhr) {
//       alert(`LaCrime: ${xhr.statusText}`);
//     }
//   });
  
  
  
  /* when().done() SECTION*/
  // Add the variable for each of your AJAX requests to $.when()
  $.when(LaCollision).done(function() {
    var map = L.map("map").setView([37.857507, -85.632935], 19);
  
    var basemap = L.tileLayer(
      "https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png",
      {
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
        subdomains: "abcd",
        maxZoom: 19
      }
    ).addTo(map);
    
    // Add requested external GeoJSON to map
    var LaCollision = L.geoJSON(LaCollision.responseJSON, {
      fillOpacity: 0,
      color: '#b2b2b2',
      weight: 0.75
    }).addTo(map);

    var LaCitations = L.geoJSON(LaCitations.responseJSON, {
        color: '#ff0000',
        weight: 1
      }).addTo(map);
  
    var laCrime = L.geoJSON(laCrime.responseJSON, {
        pointToLayer: function(feature, latlng) {
          return L.circleMarker(latlng, {
            radius: 4,
            fillOpacity: 0,
            color: 'black',
            weight: 0.75
          })
        }
      }).addTo(map);

  });