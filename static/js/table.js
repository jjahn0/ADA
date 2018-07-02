
// $("#test-button").click(function(){
//     $.post("/table?key=city&value=San%20Francisco",
//     renderBell(data)


function renderTable(url){
    var dataTable = $.get(url);
    dataTable.done( function(data){
        results = data.slice(0,49);
        const keys = Object.keys(results[0]);
        // console.log(keys);
        var table = d3.select("#datatable")
            .append("table")
            .attr("class", "table table-striped table-responsive");
        var thead = table.append("thead");
        var tbody = table.append("tbody");

        thead.append('tr')
            .selectAll('th')
            .attr("class","mdb-color lighten-4")
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
                // .attr("style", "font-size:9px")
                // .append('a')
                // .attr('href', '#')
                .text(function(d){return d.value});

    })
}

// renderTable('/table?key=company&value=LendUp')