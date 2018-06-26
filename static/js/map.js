var data = $.get('/map');

data.done(function(result) {
    console.log(result);
    var myMap = L.map("map", {
        center: [37.09, -95.71],
        zoom: 5
      });
      
      // Add a tile layer
      L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/outdoors-v10/tiles/256/{z}/{x}/{y}?" +
        "access_token=pk.eyJ1IjoiamphaG4wIiwiYSI6ImNqaWR4MHVycTAzZHAza213dzh0aGoxZmMifQ.b_qp4GxECuFlH3xUCZFb-Q." +
        "T6YbdDixkOBWH_k9GbS8JQ"
      ).addTo(myMap);
});

