
// var bellData = $.get('/bell', function() {
//     alert( "success" );
//   })
//     .done(function() {
//       alert( "second success" );
//     })
//     .fail(function() {
//       alert( "error" );
//     })
//     .always(function() {
//       alert( "finished" );
//     });


function renderAll(key, value){
    if (key && value){
        var queryString = '?key='+ key + '&value=' + value;
    }
    else {
        var queryString = '';
    }
    
    renderTable('/table' + queryString);
    renderBell('/bell' + queryString);
    renderBubble('/bubble'+ queryString);
}

// renderAll(qkey, qvalue);

$("#test-button").on("click", function(event){
    if( window.confirm("onClick event detected")){
        window.open('/', 'rerouting to home');
    }
});