function renderBubble(url){
    var bubbleData = $.get(url);

    bubbleData.done( function(data){
        
        var layout = {
            showlegend: true,
            xaxis: { title: "Median Salary range"},
            yaxis: { title: "Rating Score"},
            paper_bgcolor: 'rgb(233,233,233)',
            plot_bgcolor: 'rgb(233,233,233)'
            };
        Plotly.newPlot('bubble', data, layout);
    })
};