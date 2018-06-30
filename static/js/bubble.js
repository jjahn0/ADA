var bubbleData = $.get('/bubble');

bubbleData.done( function(data){
    // console.log(data);
    console.log(data.pop());
     
    var layout = {
        title: 'Bubble Chart',
        showlegend: false,
        xaxis: { title: "Median Salary range"},
        yaxis: { title: "Rating Score"}
        };
    Plotly.newPlot('bubble', data, layout);
})