var bellData = $.get('/bell');

bellData.done( function (data){
    
    var boxNumber = length.data;
    var boxColor = [];
    var allColors = numeric.linspace(0, 360, boxNumber);
    // var data = [];
    // var yValues = [];

    //Colors

    for( var i = 0; i < boxNumber;  i++ ){
    var result = 'hsl('+ allColors[i] +',50%'+',50%)';
    boxColor.push(result);
    }

    function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
    };
    var layout = {
    xaxis: {
        showgrid: false,
        zeroline: false,
        tickangle: 60,
        showticklabels: false
    },
    yaxis: {
        zeroline: false,
        gridcolor: 'white'
    },
    paper_bgcolor: 'rgb(233,233,233)',
    plot_bgcolor: 'rgb(233,233,233)',
    showlegend:false,
    };

    Plotly.newPlot('bell', data, layout);
});