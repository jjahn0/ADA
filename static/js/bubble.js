var bubbleData = $.get('/bubble')

bubbleData.done( function(data){
    console.log(data);
})