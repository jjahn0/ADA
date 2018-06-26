// function renderTable() {
//     var url = "/api/json";
//     d3.json(url, function(jobs){
//         console.log(jobs[0].title)
//     });

// }

// renderTable();

var dataTable = $.get('/table');

dataTable.done( function(results){
    const keys = Object.keys(results[0]);
    console.log(keys);
    var table = d3.select("#datatable")
        .append("table")
        .attr("class", "table table-striped");
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
            .text(function(d){return d.value});

})
