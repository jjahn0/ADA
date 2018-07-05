function renderBubble(data){
    var layout = {
        showlegend: true,
        xaxis: { title: "Median Salary range"},
        yaxis: { title: "Rating Score"},
        paper_bgcolor: 'rgb(233,233,233)',
        plot_bgcolor: 'rgb(233,233,233)'
        };
    Plotly.newPlot('bubble', data, layout);
    var myPlot = document.getElementById('bubble')
    myPlot.on('plotly_click', function (d) {
        var index = d.points[0].pointNumber;
        window.location.replace("/?key=salaryMED&value="+ d.points[0].data.x[index]);
        // window.location.replace("/?key=company&value="+ d.points[0].data.name);
    });
}
