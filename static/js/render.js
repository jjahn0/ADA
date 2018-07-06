
function unique(input){
    var lookup = {};
    var result = [];

    for (var item, i = 0; item = input[i++];) {
        var company = item.company;

        if (!(company in lookup)) {
            lookup[company] = 1;
            result.push({
                title: item.title,
                company: item.company,
                city: item.city,
                state: item.state,
                salaryMIN: item.salaryMIN,
                salaryMED: item.salaryMED,
                salaryMAX: item.salaryMAX,
                rating: item.rating,
                duration: item.duration,
                lng: item.lng
            });
        }
    }
    return result
}
// [-200, -114, -89, 0]
function colorSelect(long){
    var color = "DodgerBlue";
    if (long > -89){
        color = "Green";
    }
    if (long <= -89 && long > -114){
        color = "DarkOrange";
    }
    return color
}

function bellData(input){
    var output = [];
    var entry = {};
    for (var item, i = 0; item = input[i++];){
        if (item.salaryMED != '' && item.lng != ''){
            entry = {
                y : [item.salaryMIN, item.salaryMED, item.salaryMAX],
                name: item.company,
                type: 'box',
                marker: {color: colorSelect(item.lng)}
            }
            output.push(entry);
        }
    }
    out = output.sort(function (a, b) {
        return a.y[1] - b.y[1];
    });
    return out
}

function bubbleData(input){
    var out = [];
    var entry = {};
    var x = [];
    var y = [];
    var text = [];
    var range = [-200, -114, -89, 0];
    var region = ["westcoast", "midwest", "eastcoast"];
    for (var index=0; index < range.length-1; index++){
        for (var item, i = 0; item = input[i++];){
            if (item.salaryMED != '' && item.lng != '' && item.lng > range[index] && item.lng < range[index+1]){
                x.push(item.salaryMED);
                y.push(item.rating);
                text.push(item.company)
            }
        entry = {
            x : x,
            y : y,
            mode: 'markers',
            name: region[index],
            text: text,
            markers: {
                color: colorSelect(item.lng),
                size: 20,
                line: {
                    color: 'rgba(0,0,0)',
                    width: 1
                }
            }
        }
    }
    out.push(entry);
    x=[];
    y=[];
    text=[];

    }
    return out
}

function mapData (input){
    result = []
    features = []
    geoJSON = {}
    entry = {}
    for (var item, i = 0; item = input[i++];){
        if (item.lat != ''){
            entry = {
                type: "Feature",
                geometry: {
                    type: "Point",
                    coordinates: [item.lng, item.lat]
                },
                properties: {
                    title: item.title,
                    city: item.city,
                    company: item.company,
                    state: item.state,
                    salaryMED: item.salaryMED,
                    rating: item.rating
                }
            }   
        }
        features.push(entry)
    }
    geoJSON = {
        type: "FeatureCollection",
        features: features
    }
    return geoJSON
}

function renderAll(key, value){
    if (key && value){ var queryString = '?key='+ key + '&value=' + value;}
    else {var queryString = '';}
    var JSONdata = $.get('/api/query' + queryString);
    JSONdata.done(function(data){
        var uniqueData = unique(data);
        var bellDB = bellData(uniqueData);
        var bubbleDB = bubbleData(uniqueData);
        var mapDB = mapData(data);
        renderTable(uniqueData);
        renderMap(mapDB);
        renderBell(bellDB);
        renderBubble(bubbleDB);
    });
}