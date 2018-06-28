// function renderTable() {
//     var url = "/api/json";
//     d3.json(url, function(jobs){
//         console.log(jobs[0].title)
//     });

// }

// renderTable();

var dataTable = $.get('/table');

dataTable.done( function(data){
    results = data.slice(0,9);
    const keys = Object.keys(results[0]);
    // console.log(keys);
    var table = d3.select("#datatable")
        .append("table")
        .attr("class", "table table-striped table-responsive");
    var thead = table.append("thead");
    var tbody = table.append("tbody");

    thead.append('tr')
        .selectAll('th')
        .data(keys).enter()
        .append('th')
            .text(function (key) {return key;});

    var rows = tbody.selectAll('tr')
        .data(results)
        .enter()
        .append('tr');
    
    var cells = rows.selectAll('td')
        .data(function (row){
            return keys.map(function(column) {
                return {column: column, value: row[column]};
            });
        })
        .enter()
        .append('td')
            .attr("style", "font-size:7px")
            // .append('a')
            // .attr('href', '#')
            .text(function(d){return d.value});

})
