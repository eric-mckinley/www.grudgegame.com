
function createChart3(ctx, data) {


    var gamesTotalA = 0;
    var gamesTotalB = 0;

    for (var i = 0; i < data.matches.length; i += 1) {
        if (data.matches[i].scorePlayerA > data.matches[i].scorePlayerB) {
            gamesTotalA++;
        }
        else {
            gamesTotalB++;
        }
    }

    var myDoughnutChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            datasets: [{
                backgroundColor: ['#' + data.config.colorA, '#' + data.config.colorB],
                data: [gamesTotalA, gamesTotalB]
            }],

            // These labels appear in the legend and in the tooltips when hovering different arcs
            labels: [
                data.playerA,
                data.playerB
            ]
        },
        options: {
            title: {
                display: true,
                text: 'Games Won'
            }
        }
    });
    return 'Overall Game Wins';
}
