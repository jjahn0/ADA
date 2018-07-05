
function renderMap(input) {
    var jobsData = input.features;
    // Creating a new marker cluster group
    var markers = L.markerClusterGroup({
        spiderfyOnMaxZoom: false,
        showCoverageOnHover: false,
        //zoomToBoundsOnClick: false
    });
    for (var item, i = 0; item = jobsData[i++];) {
    // set the data location property to a variable
        var location = item.geometry;

    // If the data has a location property...
        if (location) {
            //console.log("Adding pop-ups")
            // Add a new marker to the cluster group and bind a pop-up
            markers.addLayer(L.marker([location.coordinates[1], location.coordinates[0]])
            .bindPopup(item.properties.city));
        }
    }

    // event handler for cross display intergration
    markers.on('clusterclick', function(a) {
        var what = a.layer.getAllChildMarkers();
        var coords = what[0].getLatLng();
        var ask = window.confirm("Search this coords?")
        if (ask){
            window.location.replace("/?key=lng&value="+coords.lng);
       }
    });


    // Sending our jobs layer to the createMap function
    createMap(markers);
}//end of CreateFeatures function

function createMap(jobs) {

    // Define streetmap and satellitemap layers
    var outdoormap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/outdoors-v10/tiles/256/{z}/{x}/{y}?" +
    "access_token=pk.eyJ1IjoicHJvc2FzcyIsImEiOiJjamlkdmdsdTcwZnJyM2x0NGZ2d2tnM2V0In0." +
    "lYdBMOj5aNZMNggd2U2BuA");

    var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?" +
    "access_token=pk.eyJ1IjoicHJvc2FzcyIsImEiOiJjamlkdmdsdTcwZnJyM2x0NGZ2d2tnM2V0In0." +
    "lYdBMOj5aNZMNggd2U2BuA");

    // Define a baseMaps object to hold our base layers
    var baseMaps = {
        "Light Map": lightmap,
        "Outdoor Map": outdoormap
    };

    // Create overlay object to hold our overlay layer
    var overlayMaps = {
        Jobs: jobs
    };

    // Create our map, giving it the streetmap and jobs layers to display on load
    var myMap = L.map("map", {
        center: [37.09, -95.71],
        minZoom: 4,
        maxZoom: 11,
        zoom: 4,
        layers: [lightmap, jobs]
    });

    // Create a layer control
    // Pass in our baseMaps and overlayMaps
    // Add the layer control to the map
    L.control.layers(baseMaps, overlayMaps, {
        collapsed: true
    }).addTo(myMap);
}
