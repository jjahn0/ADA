// Store our API endpoint inside queryUrl
//var queryUrl = "assets/dataJobs.json";

//JQuery to get data from endpoint
var query = $.get('/api/query');
if (query) {
    console.log("There is a query")
}
var jobsData = $.get('/map');

//JQuery to push data (state,city)
//var call = $.get('/api/query/<key>&<value>');
//error handling?

//Jquery call, only proceed once we get data back from call
jobsData.done(function (result) {
    //console.log( "Query done" );
    //console.log(result)
    createFeatures(result.features);
});

// function findStateCity(lat, lng) {
//     var latlng = new google.maps.LatLng(lat, lng);
//     //This is making the Geocode request
//     var geocoder = new google.maps.Geocoder();
//     geocoder.geocode({ 'latLng': latlng }, function (results, status) {
//         if (status !== google.maps.GeocoderStatus.OK) {
//             alert(status);
//         }
//         //This is checking to see if the Geoeode Status is OK before proceeding
//         if (status == google.maps.GeocoderStatus.OK) {
//             console.log(results[0].address_components[2].long_name);
//             console.log(results[0].address_components[4].short_name);
//             var address = (results[0].formatted_address[0]);
//         }
//     });
// }

function createFeatures(jobsData) {

    //console.log("jobsData");
    // Creating a new marker cluster group
    var markers = L.markerClusterGroup({
        spiderfyOnMaxZoom: false,
        showCoverageOnHover: false,
        //zoomToBoundsOnClick: false
    });
    console.log("Before Loop")
    //console.log(jobsData.length)
    // Loop through our data...
    for (var i = 0; i < jobsData.length; i++) {
    // set the data location property to a variable
        var location = jobsData[i].geometry;

    // If the data has a location property...
        if (location) {
            //console.log("Adding pop-ups")
            // Add a new marker to the cluster group and bind a pop-up
            markers.addLayer(L.marker([location.coordinates[1], location.coordinates[0]])
            .bindPopup(jobsData[i].properties.company));
        }
    }//end of for loop

  //event handle for each marker in the cluster
    markers.on('click', function (a) {
        console.log('marker ' + a.layer);
    });
  
    //event handle for the cluster
    markers.on('clusterclick', function (a) {
        // a.layer is actually a cluster
        //var obj = a.layer.getAllChildMarkers()
        var obj = a.layer
        //console.dir(obj)
        console.log(obj.getLatLng());
        var coor = obj.getLatLng()
        console.log(coor.lat);
        //findStateCity does reserve geocoding, but I think it's better to pass coordinates to app.py and filter there
        //findStateCity(coor.lat, coor.lng);
        //cityState = findStateCity(coor.lat, coor.lng);
        // var newData = $.get('/api/query?lat=' + coor.lat + '&lng=' + coor.lng);
        //var newData = $.get('/api/query?key=location' + '&value=[' + coor.lat + ',' + coor.lng + ']')
        //$.get('/api/query?key=location' + '&value=[' + coor.lat + ',' + coor.lng + ']')
        // //Add error handling?
        var location = [coor.lat, coor.lng];
        renderAll("location",location);

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
    console.log("Creating Map");
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
    console.log("Adding control layers")
    L.control.layers(baseMaps, overlayMaps, {
        collapsed: false
    }).addTo(myMap);

    // var myMap = document.getElementById('map');
    // myMap.on('plotly_click', function (d) {
    //     window.alert("Click on map registered");
    });
}
