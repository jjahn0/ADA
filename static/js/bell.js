var data = $.get('/bell');

data.done(function(results){
    console.log(results);

});

var trace = [];

for ( var i = 0; i < results.length; i ++ ) {
    var result = results[i]
    };
    
trace.push(result);


var layout = {
     title: 'Sample Salary-Range Box Plot'
  };
  
Plotly.newPlot('plot', trace, layout);  
