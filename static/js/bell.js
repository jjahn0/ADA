var bellData = $.get('/bell');

bellData.done( function (data){
    
    var boxNumber = length.data;
    var boxColor = [];
    var allColors = numeric.linspace(0, 360, boxNumber);

    for( var i = 0; i < boxNumber;  i++ ){
        var result = 'hsl('+ allColors[i] +',50%'+',50%)';
        boxColor.push(result);
    }

    function getRandomArbitrary(min, max) {
        
    };
    var layout = {
        xaxis: {
            title: "hiring companies",
            showgrid: false,
            zeroline: false,
            tickangle: 60,
            showticklabels: false
        },
        yaxis: {
            title: "maximum-median-minimum salary($)",
            zeroline: false,
            gridcolor: 'white'
        },
        paper_bgcolor: 'rgb(233,233,233)',
        plot_bgcolor: 'rgb(233,233,233)',
        showlegend:false,
    };

    Plotly.newPlot('bell', data, layout);
});