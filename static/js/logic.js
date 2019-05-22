var dataUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojson"

// Perform an API call to the USGS endpoint
d3.json(dataUrl, function(data) {
  console.log("data");
  var response = data.features;
    createFeatures(response);
});

function createFeatures(earthquakeData) {
  console.log("createFeatures");
  function markerSize(mag) {
    mag = +mag;
    // for (var i = 0; i < response.length; i++) {
      var quakeMark = "";
      if (response[i].mag > 6) {
        radius= 8,
        fillColor = "#e22626",
        color = "#961c1c",
        weight = 1,
        opacity = 1,
        fillOpacity = 0.7
      }
      else if (mag >= 5) {
        radius = 6,
        fillColor = "#ef6c2f",
        color = "#b25123",
        weight = 1,
        opacity = 1,
        fillOpacity = 0.7
      }
      else if (mag >= 4) {
        radius = 4,
        fillColor = "#f9c72f",
        color = "#a08020",
        weight = 1,
        opacity = 1,
        fillOpacity = 0.7
      }
      else if (mag >= 3) {
        radius = 2,
        fillColor = "#a7f92c",
        color = "#64931d",
        weight = 1,
        opacity = 1,
        fillOpacity = 0.7
      }
      else if (mag >= 2.5) {
        radius = 1,
        fillColor = "#2ece29",
        color = "#1d841a",
        weight = 1,
        opacity = 1,
        fillOpacity = 0.7
      };

}
  function onEachFeature(feature, layer) {
    layer.bindPopup("<h3>"  + feature.properties.place + "</h3><hr><p>" + new Date(feature.properties.time) + "</p>");
  }
  var earthquakes = L.geoJSON(earthquakeData, {onEachFeature: onEachFeature
  });
  
  createMap(earthquakes);

}
function createMap(earthquakes) {
  console.log("createMap")
  // Creating map object 
  

  // Adding tile layers
  var lightmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 13,
    id: "mapbox.light",
    accessToken: API_KEY
  });

  var streetmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 13,
    id: "mapbox.streets",
    accessToken: API_KEY
  });

  var baseMaps = {
    "Street Map": streetmap,
    "Light Map": lightmap
  };

  var myMap = L.map("map-id", {
    center: [39.8333, -98.5833],
    zoom: 4,
    layers: [streetmap, earthquakes]
  });

  var overlayMaps = {
    Earthquakes: earthquakes
  };

  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);
}
