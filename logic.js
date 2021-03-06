// for proj3 cal fire data display

// Add a tile layer.
var street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
})

var Esri_WorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'

});

// read from json and manipulate.
// var fire_data = "../Resources/fire_data.json"
// var fire_csv = "../Resources/California_Fire_Incidents_v1.csv"
var fire_csv = "../Resources/fire_data.csv"

// d3.json(fire_data).then(function() {
  

d3.csv(fire_csv).then(function(data) {

  // for marker size use acresburned
  function markerSize(AcresBurned) {
    return Math.sqrt(AcresBurned) * 100 ;
  }

  // dropdown selection

  d3.selectAll("#selectYear").on("change", updateMap);

  //use selection to update map

   function updateMap() {
    // Use D3 to select the dropdown menu
    var dropdownMenu = d3.select("#selectYear");
    // Assign the value of the dropdown menu option to a variable
    var yearset = dropdownMenu.property("value");

    // console.log(yearset);
    //variable for refresh
    let yearlist = [] ;

    for (var i = 0; i < data.length; i++) {
     if (data[i].ArchiveYear == yearset) {
       // push to a layer to draw
       let fire = L.circle([data[i].Latitude, data[i].Longitude], {
         fillOpacity: 0.4,
         color: "turquoise",
         fillColor: "turquoise",
       // Setting our circle's radius to equal the output of our markerSize() function:
         radius: markerSize(data[i].AcresBurned)
       }).bindPopup(`<h4>Name: ${data[i].FireName}</h4><h5>Duration: ${data[i].Duration}</h5>`)
       //push to make a layer for display
       yearlist.push(fire);
       }
     else {
     };
    };
    // refresh with new selection
    myMap.removeLayer(blanky);
    blanky=L.layerGroup(yearlist);
    blanky.addTo(myMap);
  }; 

// end of pull down options

  // write data to console
  console.log(data);

  // set variables
  var AllFires = [];
  var yearfires = [];
  var marker1 = [];
  var dixie = [];
  var blank = [];

  // loop through data
  for (var i = 0; i < data.length; i++) {

    // layer for all fires with marker size acrage burned
    AllFires.push(L.circle([data[i].Latitude, data[i].Longitude], {
        fillOpacity: 0.5,
        color: "red",
        fillColor: "orange",
      // Setting our circle's radius to equal the output of our markerSize() function:
        radius: markerSize(data[i].AcresBurned)
      }).bindPopup(`<h4>Name: ${data[i].FireName}</h4><h5>Duration: ${data[i].Duration}</h5>`)
      // .addTo(myMap)
    );

    // make layer colored by year 
     if (data[i].ArchiveYear == "2013") {
         colory = "red"
     } else if (data[i].ArchiveYear == "2014"){
         colory = "yellow"
     } else if (data[i].ArchiveYear == "2015"){
      colory = "green"
     } else if (data[i].ArchiveYear == "2016"){
      colory = "lightblue"
     } else if (data[i].ArchiveYear == "2017"){
      colory = "violet"
     } else if (data[i].ArchiveYear == "2018"){
      colory = "purple"
     } else if (data[i].ArchiveYear == "2019"){
      colory = "orange"
     } else {
      colory = "white"
     };

    yearfires.push(L.circle([data[i].Latitude, data[i].Longitude], {
      fillOpacity: 0.5,
      color: colory ,
      fillColor: colory ,
     // Setting our circle's radius to equal the output of our markerSize() function:
      radius: 1000
     }).bindPopup(`<h4>Name: ${data[i].FireName}</h4> <h5>Year: ${data[i].ArchiveYear}<br>Acres Burnt: ${data[i].AcresBurned}</h5>`)
     // .addTo(myMap)
    );
  //end i loop
  };
  
  // marker near Fresno
  marker1.push(L.marker([36.7542022991528, -119.8095611131692]).bindPopup(`Near Fresno`));
  dixie.push(L.marker([40.07173560759751, -121.20983910716066]).bindPopup(`Dixie Fire`));


  // create overlays.
  var mark = L.layerGroup(marker1);
  var fires = L.layerGroup(AllFires);
  var firesy = L.layerGroup(yearfires);
  var dixief = L.layerGroup(dixie);
  var blanky = L.layerGroup(blank);

  var overlayMaps = {
  "Near Fresno": mark,
  "Dixie Fire": dixief,
  "All Fires with Acrerage": fires,
  "All Fires by year": firesy,
  };

 // Create basemap selections
 var baseMaps = {
   "Street Map": street,
   "Satellite": Esri_WorldImagery
 };

 // Create a map object.
 var myMap = L.map("map", {
   center: [37.420258, -120.622549],
   zoom: 6,
   layers: [street, mark]
 });

 // controls open
 L.control.layers(baseMaps, overlayMaps, {
  collapsed: false
 }).addTo(myMap);

// end of then
});

