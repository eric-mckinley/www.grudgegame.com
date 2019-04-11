function createCharts(data) {

    for(fn = 1; fn <= 24; fn++) {

        var chartName = 'chart' + fn;
        var chartFunction = window['createChart' + fn];
        if (typeof chartFunction !== "undefined") {
            var title = chartFunction(document.getElementById(chartName), data);
            document.getElementById(chartName + "Title").innerHTML = title;
            document.getElementById(chartName + "Panel").style.display = "block";
        }
        else{
            return;
        }
    }
}
