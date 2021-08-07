// Create a map object.
// var myMap = L.map("map", {
//   center: [37.420258, -120.622549],
//   zoom: 6,
//   layers: [street]
// });

// Add a tile layer.
var street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
})

var Esri_WorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'

});
// .addTo(myMap);

// City markers


let marker1 = L.marker([36.7542022991528, -119.8095611131692]).bindPopup(`$marker.getLatLng()`)
// .bindPopup(marker.getLatLng())

// marker1.addTo(myMap)

// Add code to create a marker for each of the following cities and to add it to the map.
var mark = L.layerGroup(marker1);

var overlayMaps = {
  "near Fresno": mark
};


var baseMaps = {
  "Street Map": street,
  "Satellite": Esri_WorldImagery
};

var myMap = L.map("map", {
  center: [37.420258, -120.622549],
  zoom: 6,
  layers: [street, mark]
});

marker1.addTo(myMap)

L.control.layers(baseMaps, overlayMaps, {
  collapsed: false
}).addTo(myMap);


