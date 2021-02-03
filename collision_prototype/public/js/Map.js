// Create variable to hold map element, give initial settings to map
const mymap = L.map('map',{ center: [33.7830, -118.1129], zoom: 12});
const freeDraw = new FreeDraw({ mode: FreeDraw.ALL});

// Add the freeDraw layer and tile layer
mymap.addLayer(freeDraw);
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiYXJhbWlyZXo0IiwiYSI6ImNrazdkempueDBhZmQydW1mMDRiZjF1OWkifQ.e6L3ae09liHFiHW3LvNPqg'
}).addTo(mymap);


document.addEventListener("keydown", event => {
  // Cancel the current FreeDraw action when the escape key is pressed.
  event.key === "Escape" && freeDraw.cancel();
});

freeDraw.on("markers", event => {
  // this event is called when a new polygon is drawn
  // disable polygon drawing 
  freeDraw.mode(0);
  // create polygon
  const polygon = new L.polygon(event.getLatLngs, {fill: false });
  if(polygon.getLatLngs()[0].length != 0){
    //callback is whatever function was passed in index.html
    callback(polygon);
    $(".draw").hide();
    //display "Draw an Outline" alert on map
    $(".remove").show(); 
  }
  // this array is cleared so this event is not triggered
  freeDraw._events.markers = [];
  // hides the "Draw an outline" alert on map
  $(".drawArea").hide(); 
});

// function to check if a latlng point is insed of a given polygon
function isMarkerInsidePolygon(x,y, poly) {
    var inside = false;
    for (var ii=0;ii<poly.getLatLngs().length;ii++){
        var polyPoints = poly.getLatLngs()[ii];
        for (var i = 0, j = polyPoints.length - 1; i < polyPoints.length; j = i++) {
            var xi = polyPoints[i].lat, yi = polyPoints[i].lng;
            var xj = polyPoints[j].lat, yj = polyPoints[j].lng;
            var intersect = ((yi > y) != (yj > y))
                && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
            if (intersect) inside = !inside;
        }
    }
    //returns true if the point is inside the polygon
    return inside;   
  }

const blueIcon = L.icon({
    iconSize: [25, 41],
    iconAnchor: [10, 41],
    popupAnchor: [2, -40],
    iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png",
   
  });

const redIcon = L.icon({
    iconSize: [25, 41],
    iconAnchor: [10, 41],
    popupAnchor: [2, -40],
    iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
   
  });

Promise.all([
    fetch(
        "https://data.lacity.org/resource/d5tf-ez2w.json"
    ),
    fetch(
        "https://data.lacity.org/resource/63jg-8b9z.json"
    )
]).then(async ([response1, response2]) => {
    const responseData1 = await response1.json();
    const responseData2 = await response2.json();

    const data1 = responseData1;
    const data2 = responseData2;

    const layerGroup = L.featureGroup().addTo(mymap);

    data1.forEach(({ location_1, date_rptd, time_occ, crm_cd_desc, vict_age, vict_sex, vict_descent, premis_desc, cross_street, location }) => {
        layerGroup.addLayer(
          L.marker([location_1.latitude, location_1.longitude], {icon: blueIcon}).bindPopup(
            `<table>
                    <tr>
                      <td>Date Occurred<br/>Time Occurred<br/>Crime Description<br/>Victim Age<br/>Victim Sex<br/>Victime Descent<br/>Premise Description<br/>Cross Street<br/>Location</td>
                      <td>${date_rptd}<br/>${time_occ}<br/>${crm_cd_desc}<br/>${vict_age}<br/>${vict_sex}<br/>${vict_descent}<br/>${premis_desc}<br/>${cross_street}<br/>${location}</td>
                    </tr>
            </table>`
          )
        );
    });
    data2.forEach(({lat, lon, date_rptd, time_occ, crm_cd_desc, vict_age, vict_sex, vict_descent, premis_desc, cross_street, location}) => {
        layerGroup.addLayer(
            L.marker([lat, lon], {icon: redIcon}).bindPopup(
                `<table>
                    <tr>
                        <td>Date Occurred<br/>Time Occurred<br/>Crime Description<br/>Victim Age<br/>Victim Sex<br/>Victime Descent<br/>Premise Description<br/>Cross Street<br/>Location</td>
                        <td>${date_rptd}<br/>${time_occ}<br/>${crm_cd_desc}<br/>${vict_age}<br/>${vict_sex}<br/>${vict_descent}<br/>${premis_desc}<br/>${cross_street}<br/>${location}</td>
                    </tr>
                </table>`
            )
        );
    })
    mymap.fitBounds(layerGroup.getBounds());
});