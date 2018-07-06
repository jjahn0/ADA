
function renderTable(data){
    // var pages = ["<<",1,2,3,4,5,">>"];
    const keys = Object.keys(data[0]);
 
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
        .data(data)
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
            .html(function(d,i){
                return "<a href='/?key="+keys[i]+"&value="+d.value+"'>"+d.value+"</a>";
        });
}



