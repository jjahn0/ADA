var bubbleData = $.get('/bubble');

bubbleData.done( function(data){
    // console.log(data);
    console.log(data.pop());
     
    var layout = {
        title: 'Bubble Chart',
        showlegend: false,
        xaxis: { title: "Median Salary range", range: [0, 200000]},
        yaxis: { title: "Rating Score", range: [0, 5]},
        };
    Plotly.newPlot('bubble', data, layout);
})