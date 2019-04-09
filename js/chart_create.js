function createChart(chartNumber, data) {

    var chartName = 'chart' + chartNumber;
    var chartFunction = window['createChart' + chartNumber];

    var title = chartFunction(document.getElementById(chartName), data);
    document.getElementById(chartName + "Title").innerHTML = title;
    document.getElementById(chartName + "Panel").style.display = "block";
}
