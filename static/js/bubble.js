var bubbleData = $.get('/bubble')

bubbleData.done( function(data){
    // console.log(data);
    console.log(data.pop());
     
    var layout = {
        title: 'Bubble Chart',
        showlegend: false,
        width:100%
      };
      
    Plotly.newPlot('bubble', data, layout);
})