

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

hello()
function renderAll(key, value){
    var queryString = '?key='+ key + '&value=' + value; 
    renderTable('/table' + queryString);
    renderBell('/bell' + queryString);
}

renderAll("city", "San Francisco");